import { useEffect, useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import PushNotification from "react-native-push-notification";
import {connect} from 'react-redux';
import CharacterCard from "../components/characterCard";
import CharacterModal from "../components/characterModal";
import DB from "../reducers/db";
import { addFavorites, deleteFavorites, setFavorites } from '../reducers/slice';
function Detail({ favorites_list, addFavorites, deleteFavorites, setFavorites, route, ...props }) {
    const [characters, setCharacters] = useState([])
    const [character, setCharacter] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonName, setButtonName] = useState("Add to Favorites");
    function pushNotif(){
        PushNotification.createChannel(
            {
              channelId: "channel",
              channelName: "Rick And Morty",
              importance: 4,
              vibrate: true,
              invokeApp:false,

          },
            (created) => console.log(`createChannel returned '${created}'`)
          );
        PushNotification.localNotification({
          channelId:'channel',
          title:'Karakter sınırı',
          message:'10 adetden fazla karakter ekleyemezsiniz'
        })
       }
    useEffect(() => {
        let abortController = new AbortController()
        let {signal} = abortController
        fetch("https://rickandmortyapi.com/api/episode/"+route.params["id"], signal)
        .then((response) => 
            response.json()
        ).then(async (data) => {
            setCharacters(await DB.getCharacters(data["characters"])) 
            let list = await DB.getList()
            if(list){
                setFavorites({data:JSON.parse(list)})
            }
        });
        return () => {
            abortController.abort()
        }
    },[])
    
    function getCharacter(id){
        fetch("https://rickandmortyapi.com/api/character/"+id).then((response) => 
            response.json()
        ).then(async (data) => {
            setCharacter(data)
            setModalVisible(true)
            if((await DB.isFavorites(id))) {
                setButtonName("Remove from Favorites")
            }else{
                setButtonName("Add to Favorites")
            }
        })
    }
    async function arrange(id){
        if(await DB.block() && buttonName == "Add to Favorites"){
            pushNotif()
            return;
        }
        if(!(await DB.isFavorites(id))) {
            addFavorites({id})
            setButtonName("Remove from Favorites")
        } else{
            deleteFavorites({id})
            setButtonName("Add to Favorites")
        }
    }
    
    
    return (
        <>
            <Text style={{fontWeight:"800", fontSize:15, textAlign:"center", marginTop:15}}>{route.params["head"]} characters</Text>
            <ScrollView contentContainerStyle={{flexDirection:"row", justifyContent:"center", flexWrap:"wrap", paddingVertical:20}}>
                {characters.map((e,i) => {
                    return(
                        <CharacterCard getCharacter={getCharacter} key={i} inf={e} />
                    )
                })}
            </ScrollView>
            <CharacterModal buttonName={buttonName} setModalVisible={setModalVisible} modalVisible={modalVisible} arrange={arrange} character={character} />
        </>

    );
}
const mapStateToProps = (state, myOwnProps) => {
    return {
        favorites_list: state.favorites.favorites_list,
    }
}
const mapDispatchToProps = {
    addFavorites,
    deleteFavorites,
    setFavorites
  }
export default connect(mapStateToProps, mapDispatchToProps)(Detail) 