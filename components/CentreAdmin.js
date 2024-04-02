import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-paper';

export default function CentreAdmin() {

  const navigation = useNavigation();


  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>
 
        <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '45%',
           height: '25%',
           zIndex: -1,
           borderBottomRightRadius: 250,
           backgroundColor: 'rgb(220, 207, 231)'
         }}></View>
         <View style={{
           position: 'absolute',
           //borderWidth: 3,
           width: '100%',
           height: '48%',
           zIndex: -1,
           borderTopLeftRadius: 250,
           backgroundColor: 'rgb(220, 207, 231)',
           bottom: 0,
           right: 0
         }}></View>


      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%',
                  color: "rgb(51, 27, 70)"
                }}>
                    Ici vous pouvez faire la gestion de l'application
                </Text>

                <View style = {{
                  //borderWidth: 2,
                  justifyContent: "center",
                  alignItems: 'center',
                  marginTop: "15%",
                  marginBottom: "20%"
                }}>

                   <TouchableOpacity style = {{
                        //borderWidth: 2,
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "rgb(123, 105, 138)",
                        marginBottom: 15
                   }} 
                   
                   onPress = {() => {
                        // alert("ok le manager !")
                        navigation.navigate("GererProduits");
                   }}>
                     <Icon
                      source="tools"
                      size={40}
                      color="white"
                     />
                     <Text style = {{
                       marginLeft: 20,
                       marginRight: 20,
                       fontSize: 19,
                       fontWeight: 'bold',
                       color: 'white'
                     }}>Gérer les Produits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{
                        //borderWidth: 2,
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "rgb(123, 105, 138)",
                        marginBottom: 15
                   }} onPress = {() => {
                        // alert("ok le manager !")
                   }}>
                     <Icon
                      source="tools"
                      size={40}
                      color="white"
                     />
                     <Text style = {{
                       marginLeft: 20,
                       marginRight: 20,
                       fontSize: 19,
                       fontWeight: 'bold',
                       color: 'white'
                     }}>Gérer les Catégories</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{
                        //borderWidth: 2,
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "rgb(123, 105, 138)",
                        marginBottom: 15
                   }} onPress = {() => {
                        // alert("ok le manager !")
                   }}>
                     <Icon
                      source="tools"
                      size={40}
                      color="white"
                     />
                     <Text style = {{
                       marginLeft: 20,
                       marginRight: 20,
                       fontSize: 19,
                       fontWeight: 'bold',
                       color: 'white'
                     }}>Gérer les utilisateurs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{
                        //borderWidth: 2,
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "rgb(123, 105, 138)",
                        marginBottom: 15
                   }} onPress = {() => {
                        // alert("ok le manager !")
                   }}>
                     <Icon
                      source="tools"
                      size={40}
                      color="white"
                     />
                     <Text style = {{
                       marginLeft: 20,
                       marginRight: 20,
                       fontSize: 19,
                       fontWeight: 'bold',
                       color: 'white'
                     }}>Gérer les Commandes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{
                        //borderWidth: 2,
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "rgb(123, 105, 138)",
                        marginBottom: 15
                   }} onPress = {() => {
                        navigation.navigate("Gerer les recharges")
                   }}>
                     <Icon
                      source="tools"
                      size={40}
                      color="white"
                     />
                     <Text style = {{
                       marginLeft: 20,
                       marginRight: 20,
                       fontSize: 19,
                       fontWeight: 'bold',
                       color: 'white'
                     }}>Gérer les Recharges</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{
                        //borderWidth: 2,
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        borderRadius: 10,
                        backgroundColor: "rgb(123, 105, 138)",
                        marginBottom: 15
                   }} onPress = {() => {
                          navigation.navigate("Messages reçus")
                   }}>
                     <Icon
                      source="tools"
                      size={40}
                      color="white"
                     />
                     <Text style = {{
                       marginLeft: 20,
                       marginRight: 20,
                       fontSize: 19,
                       fontWeight: 'bold',
                       color: 'white',
                     }}>Gérer les Messages reçus</Text>
                    </TouchableOpacity>

                </View>

          </View>
       </ScrollView>
    </View>
  )
}
