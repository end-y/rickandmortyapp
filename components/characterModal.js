import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, Modal, Image, Button } from "react-native";
function CharacterModal({character, setModalVisible, modalVisible, arrange, buttonName}){
    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
        }}>
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <View style={{backgroundColor:"white", width:"80%", flex:0.5,position:"relative"}}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{position:"absolute", backgroundColor:"white", right:0, top:0, zIndex:99}}>
                        <Ionicons  size={25} name="close" color={"#3d5a80"} />
                    </TouchableOpacity>
                    <View style={{display:"flex",flexDirection:"column"}}>
                        <View>
                            <Image style={{width:"100%",height:200}} source={{uri:character["image"]}}></Image>
                        </View>
                        <View style={{marginVertical:20}} >
                            <Text style={{textAlign:"center"}}>Name: {character["name"]}</Text>
                            <Text style={{textAlign:"center"}}>Species: {character["species"]}</Text>
                            <Text style={{textAlign:"center"}}>Gender: {character["gender"]}</Text>
                        </View>
                    </View>
                    <View style={{position:"absolute", width:"100%", bottom:0}}>
                        <Button title={ buttonName} onPress={async () => await arrange(character["id"])} color={"#3d5a80"} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CharacterModal