import AsyncStorage from "@react-native-async-storage/async-storage"

class DB{
    static async createDB(){
        if(!(await AsyncStorage.getAllKeys()).includes("favoriteList")){
            await AsyncStorage.setItem("favoriteList",JSON.stringify([]))
        }
    }
    static async isFavorites(id){
        let list = await AsyncStorage.getItem("favoriteList") ||  false;
        if(list){
            list = JSON.parse(list)
            return list.some(e => e.id == id)
        }
        return list
    }
    static async getList(){
        let list = await AsyncStorage.getItem("favoriteList") || false;
        return list

    }
    static async block(){
        let list = await AsyncStorage.getItem("favoriteList") || [];
        list = JSON.parse(list);
        return list.length == 10
    }
    static async getCharacters(ch, url=""){
        return new Promise((res,rej) => {
            Promise.all(ch.map(u=>fetch(url+u))).then(responses =>
                Promise.all(responses.map(res => res.json()))
            ).then(characters => {
                res(characters.map(e => {
                    return {
                        id:e["id"],
                        name: e["name"],
                        isAlive: e["status"],
                        image:e["image"],
                        episodeAmount: e["episode"].length
                    }

                }))
            })
        })
    }
}

export default DB;