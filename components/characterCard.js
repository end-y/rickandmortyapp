import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
function CharacterCard({inf, keyNumber, getCharacter}){
    return(
        <TouchableOpacity onPress={() => getCharacter(inf["id"])} style={{width:150, height:80, marginBottom:50, borderRadius:5, marginLeft:5, position:"relative"}} key={"character"+keyNumber}>
            <ImageBackground imageStyle={{ borderTopLeftRadius:5, borderTopRightRadius:5}} source={{uri:inf["image"]}} resizeMode={"cover"}>
                <View style={{paddingVertical:30, backgroundColor:"rgba(255,255,255,.7)"}}>
                    <Text style={{fontWeight:"900", textAlign:"center"}}>{inf["name"]}</Text>
                    <Text style={{textAlign:"center"}}>Episode Count: {inf["episodeAmount"]}</Text>
                </View>
            </ImageBackground>
            <View style={{backgroundColor: inf["isAlive"] == "Alive" ? "green" : inf["isAlive"] == "Dead" ? "red" : "gray", borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
                <Text style={{marginLeft:5, color:"white"}}>{inf["isAlive"]}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default CharacterCard