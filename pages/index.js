import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, PermissionsAndroid, Alert, Linking } from "react-native";
import PushNotification from "react-native-push-notification";
import Pagination from "../components/pagination";
import DB from "../reducers/db";
import pageReducers from "../reducers/pageReducer";

function HomeScreen({navigation}) {
    const [state, dispatch] = pageReducers()
    const [loading,setLoading] = useState(false)
    const [text, setText] = useState("")
    const [temp, setTemp] = useState()
    useEffect(() => {   
        PushNotification.configure({
            popInitialNotification: true,
            requestPermissions: Platform.OS === 'ios',
          });
        async function start(){
            await PermissionsAndroid.request("android.permission.POST_NOTIFICATIONS").then(e => {
                if(e == "never_ask_again" || e == "denied"){
                    Alert.alert("Notifikasyon izini","Uygulamanın doğru çalışabilmesi için lütfen notifikasyonlara izin verin",[
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {text: 'OK', onPress: () => Linking.openSettings()},
                    ])
                }
            }) 
            await DB.createDB()
        }
        start()
        setLoading(true)
        let abortController = new AbortController()
        let {signal} = abortController
        fetch("https://rickandmortyapi.com/api/episode?page="+state.pageNumber, signal)
        .then((response) => 
            response.json()
        )
        .then(async (data) => {
            setTemp(data["results"])
            dispatch({type:"setEpisodes",payload:data["results"]})
            dispatch({type:"setPageNumberAmount",payload:data["info"]["pages"]})
            setLoading(false)
        });
        return () => {
            abortController.abort()
        }
    },[state.pageNumber])
    function filterList(text) {
        let regex = new RegExp(text.toLowerCase())
        let list = state.episodes.filter(e => e["name"].toLowerCase().match(regex))
        if(text.length == 0){
            dispatch({type:"setEpisodes",payload:temp})
        }else{
            dispatch({type:"setEpisodes",payload:list})
        }

    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: "flex-start", paddingHorizontal:20, width:"100%" }}>
        <TextInput style={{height:40, borderWidth:1, width:"100%",  marginTop:20}} placeholder={"Search..."} onChangeText={(text) => {setText(text); filterList(text)}} />
        {loading 
        ? 
            <ActivityIndicator color={"blue"} size={"large"} style={{ width:"100%", flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        :
            <ScrollView style={{width:"100%"}}>
                {state.episodes?.map((e,i) => {
                    return(
                        <TouchableOpacity onPress={() => navigation.navigate("Detail",{id:e["id"], head:e["name"]})} key={"ep"+i} style={{borderWidth:1, borderRadius:5, marginTop:10, padding:10}}>
                            <Text>{e["name"]}</Text>
                            <Text style={{fontSize:10, fontWeight:"600", textAlign:"right"}}>{new Date(e["created"]).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"})}</Text>
                        </TouchableOpacity>
                    )
                })}
                {
                    state.episodes?.length < 20 ||
                    <Pagination pageNumbers={state.amount} setPageNumber={dispatch} pageNumber={state.pageNumber}/>
                }
                
            </ScrollView>
        }
      </View>
    );
  }

export default HomeScreen