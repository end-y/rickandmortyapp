import { useState } from "react"
import { TouchableOpacity, Text, View } from "react-native"

function Pagination({pageNumbers, setPageNumber, pageNumber}) {
    return (
        <View style={{display:"flex", flexDirection:"row" ,alignSelf:"flex-end", borderTopWidth:1, width:"100%", justifyContent:"flex-end", marginTop:20}}>
            {new Array(pageNumbers).fill(0).map((e,i) => 
                {
                    return (
                    pageNumber == i+1 ?
                        <Text style={{padding:10, fontWeight:"800"}}  key={"page"+i}>{i+1}</Text>
                    :
                        <TouchableOpacity style={{padding:10}} onPress={() => setPageNumber({type:"setPageNumber",payload:i+1})} key={"page"+i}>
                            <Text>{i+1}</Text>
                        </TouchableOpacity>
                    )
                }
            
            )}
        </View>
        
    )
}
export default Pagination