import { useEffect, useState } from "react";
import { View, ScrollView, Button, Alert } from "react-native";
import CharacterCard from "../components/characterCard";
import DB from "../reducers/db";
import {connect} from 'react-redux';
import { deleteFavorites, setFavorites } from '../reducers/slice';
function Favorites({favorites_list,deleteFavorites, setFavorites, ...props}) {
    const [characters, setCharacters] = useState([])
    useEffect(() => {
      async function get(){
        let list = JSON.parse(await DB.getList())
        list2 = list.map(e => e.id)
        let characters = await DB.getCharacters(list2,"https://rickandmortyapi.com/api/character/")
        setFavorites({data:list})
        setCharacters(characters)
      }
      get()
    },[favorites_list])
    function ask(id){
      Alert.alert('Remove from favorites', 'Character you chose will be removed from the favorites list', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteFavorites({id})},
      ]);
    }
    
    return (
      <ScrollView contentContainerStyle={{ paddingVertical:20, display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center" }}>
        {characters.map((character,index) => {
          return (
            <View>
              <CharacterCard getCharacter={() => {}} key={index*Math.random()+"fav"} inf={character} />
              <View style={{width:150,  marginBottom:50, borderRadius:5, marginLeft:5, position:"relative"}}>
                <Button color={"#3d5a80"} title="Remove" onPress={() => ask(character["id"])} />
              </View>
            </View>
          )
        })}
      </ScrollView>
    );
}
const mapStateToProps = (state, myOwnProps) => {
  return {
      favorites_list: state.favorites.favorites_list,
  }
}
const mapDispatchToProps = {
  deleteFavorites,
  setFavorites
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites) 