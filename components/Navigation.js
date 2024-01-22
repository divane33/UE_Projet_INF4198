import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Avatar } from 'react-native-paper';
import { Icon } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

import LaunchingPage from './LaunchingPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import Home from './Home';
import AddFood from './AddFood';
import YourFoods from './YourFoods';
import YourProfil from './YourProfil';
import UpdateProfil from './UpdateProfil';
import HealthStatus from './HealthStatus';
import Statistics from './Statistics';
import Bmi from './Bmi';
import ChatBox from './ChatBox';
import ForgetPass from './ForgetPass';
import Panier from './Panier';
import RechargerSolde from './RechargerSolde';
import Commandes from './Commandes';
import CentreAdmin from './CentreAdmin';
import LivraisonsAF from './LivraisonsAF';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {

  const navigation = useNavigation();
  // const photo = getProfil();

  // Constantes pour différencier le client, le livreur et l'administrateur
     const [displayClient, setDisplayClient] = useState("block");
     const [displayLivreur, setDisplayLivreur] = useState("flex");
     const [displayAdmin, setDisplayAdmin] = useState("flex");

  const [profilUser, setProfilUser] = useState();
  const [solde, setSolde] = useState();
  let lien; let genreType; let money;

  const getlinkProf = async () => {
    
        try {
            
          lien = await AsyncStorage.getItem("LienProfil");
          genreType = await AsyncStorage.getItem("Genre");
          money = await AsyncStorage.getItem("Solde");

        } catch (error) {
          alert(error)
        }

        setProfilUser(lien);
        setSolde(money);

        if(genreType === "Client") {
           setDisplayLivreur("none");
           setDisplayAdmin("none");
        }else if(genreType === "Livreur"){
          setDisplayLivreur("flex");
          setDisplayAdmin("none");
        }else{
          setDisplayLivreur("none");
          setDisplayAdmin("flex");
        }
  }

  useEffect(()=>{
    setInterval(() => {
     getlinkProf();
    }, 2000)
  }, []);

  return (
    
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 , alignItems: 'center', overflow: 'hidden'}}>

       <StatusBar  backgroundColor='transparent' />

      <Image style={styles.profilLogo} source={profilUser ? {uri:profilUser} : require("../images/Profil.png")}/> 
      
      <View>
          <Text
          
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 14,
            marginBottom: '2%'
          }}
            
          >Solde: <Text style={{
            color: 'orangered',
            fontWeight: 'bold',
            fontSize: 18,
          }}>{solde}Fcfa</Text></Text>
      </View> 

      {/* <TouchableOpacity
      
      style={{
      // borderWidth: 2, 
       marginTop: 5, 
       width: '102%', 
       padding: 9,
       borderRadius: 13,
       backgroundColor: 'rgb(17, 73, 138)',
       flexDirection: 'row',
       alignItems: 'center',
       gap: 10,
       }}
    
        onPress={()=>{
        navigation.navigate('Home');
       }}

    >
      <Icon
          source="home"
          size={30}
          color="white"
      />
       <Text
       
       style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
      }}
        
       >Home</Text>
    </TouchableOpacity> */}

    <TouchableOpacity
      
      style={{
      // borderWidth: 2, 
       marginTop: 5, 
       width: '102%', 
       padding: 9,
       borderRadius: 13,
       backgroundColor: 'rgb(103, 159, 243)',
       flexDirection: 'row',
       alignItems: 'center',
       gap: 10,
       }}
    
        onPress={()=>{
        navigation.navigate('Recharger Solde');
       }}

    >
      <Icon
          source="cash"
          size={30}
          color="white"
      />
       <Text
       
       style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
      }}
        
       >Recharger Solde</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.navigate('Vos Commandes');
         }}

    >
        <Icon
            source="package-variant-closed"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Commandes</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.navigate('Your Foods');
         }}
    >
        <Icon
            source="calendar-clock"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Historiques</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.navigate('Your Profil');
         }}
    >
        <Icon
            source="account"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Compte</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.navigate('Update your Profil');
         }}
    >
        <Icon
            source="account-settings"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Update Profil</Text>
    </TouchableOpacity> */}

    {/* <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.navigate('Your Health Status');
         }}
    >
        <Icon
            source="heart"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Health Status</Text>
    </TouchableOpacity> */}

    <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.navigate('Statistics');
         }}
    >
        <Icon
            source="graphql"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Statistiques</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           display: displayLivreur
           }}

           onPress = {() => {
            navigation.navigate('Livraisons à faire');
         }}
    >
        <Icon
            source="motorbike"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >A livrer</Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={{
          // borderWidth: 2, 
           marginTop: 5, 
           width: '102%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'rgb(103, 159, 243)',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           display: displayAdmin
           }}

           onPress = {() => {
            navigation.navigate('Centre Administrateur');
         }}
    >
        <Icon
            source="office-building"
            size={30}
            color="white"
        />
        <Text
         style={{
           color: 'white',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Centre Administrateur</Text>
    </TouchableOpacity>



    <TouchableOpacity
        style={{
           position: 'absolute',
           borderWidth: 2, 
           borderColor:'gray',
           bottom: '3%',
           marginTop: 5, 
           width: '90%', 
           padding: 9,
           borderRadius: 13,
           backgroundColor: 'white',
           flexDirection: 'row',
           alignItems: 'center',
           gap: 10,
           }}

           onPress = {() => {
            navigation.reset({
              index: 0,
              routes: [{ name: ' ' }],
            });
           }}

    >
        <Icon
            source="door"
            size={30}
            color="gray"
        />
        <Text
         style={{
           color: 'gray',
           fontWeight: 'bold',
           fontSize: 16
         }}
        >Log Out</Text>
    </TouchableOpacity>
    </View>
  );
}


function DrawerRoutes() {
     
      return (
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name=' ' component={Home} options={{
                  headerTransparent: true,
                  drawerLabel: 'Home',
                  drawerLabelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold'
                  },
                  drawerIcon: () => (
                      <Icon
                          source="home"
                          size={30}
                          color="gray"
                      />
                  ),
                  }}/>

                <Drawer.Screen name='Log Out' component={LaunchingPage} options={{
                      headerShown: false,
                      headerTransparent: true,
                      drawerLabel: 'Log Out',
                      headerStyle: {
                        borderWidth: 2,
                        backgroundColor: 'orange'
                      },
                      drawerLabelStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                      },
                      drawerItemStyle: {
                        marginTop: '35%'
                      },
                      drawerIcon: () => (
                        <Icon
                            source="door"
                            size={30}
                            color="gray"
                        />
                    ),
                  }}/>

            </Drawer.Navigator> 
      )

}


export default function Navigation() {

  // constante pour ouvrir ma base de données GFOOD 
  const db = SQLite.openDatabase("GFOOD_db");


  return (
        <NavigationContainer>
                <Stack.Navigator screenOptions={{
                  headerTintColor: 'white'
                }}>

                    
                    
                    
                    <Stack.Screen name='Home' component={DrawerRoutes} options={{headerShown: false}} />
                    <Stack.Screen name=' ' component={LaunchingPage} options={{headerShown: false}}/>
                    <Stack.Screen name='SignUp' component={SignUpPage} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(235, 120, 44)',
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                      },
                      title: "S'enregistrer"
                    }}/>
                    <Stack.Screen name='LogIn' component={LoginPage} options={{
                      headerStyle: {
                        backgroundColor: 'orangered',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Se Connecter"
                    }}/>
                   
                  
                   
                    <Stack.Screen name='Add Food' component={AddFood} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(41, 106, 180)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      }
                    }} />

                   <Stack.Screen name='Your Foods' component={YourFoods} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(41, 180, 145)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Votre Historique"
                    }} />

                   <Stack.Screen name='Your Profil' component={YourProfil} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(127, 180, 41)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Infos du Compte"
                    }} />

                   <Stack.Screen name='Update your Profil' component={UpdateProfil} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(114, 112, 24)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Mettre à jour"
                    }} />
                  
                  <Stack.Screen name='Your Health Status' component={HealthStatus} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(175, 36, 180)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      }
                    }} />

                    <Stack.Screen name='Statistics' component={Statistics} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(82, 66, 57)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Vos Satistiques"
                    }} />

                    <Stack.Screen name='Calculate BMI' component={Bmi} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(6, 211, 238)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      }
                    }} />

                    <Stack.Screen name='Messaging support' component={ChatBox} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(10, 146, 10)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Support de messagerie"
                    }} />

                    <Stack.Screen name='Votre Panier' component={Panier} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(96, 58, 158)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                    }} />

                    <Stack.Screen name='Recharger Solde' component={RechargerSolde} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(58, 138, 34)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                    }} />

                     <Stack.Screen name='Vos Commandes' component={Commandes} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(192, 118, 7)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                    }} />

                     <Stack.Screen name='Centre Administrateur' component={CentreAdmin} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(192, 118, 7)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                    }} />

                     <Stack.Screen name='Livraisons à faire' component={LivraisonsAF} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(245, 198, 70)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                    }} />

                    <Stack.Screen name='Password Recovery' component={ForgetPass} options={{
                      headerStyle: {
                        backgroundColor: 'rgb(204, 117, 3)',
                        //backgroundColor: 'rgba(1, 27, 1, 0.808)',
                      },
                      headerLargeStyle: {
                        color: 'white'
                      },
                      headerTitleStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20
                      },
                      title: "Recupération MDP"
                    }} />
                    
                    
                </Stack.Navigator>

        </NavigationContainer>
  );
}


const styles = StyleSheet.create({

  profilLogo: {
     marginTop: '1%',
     marginBottom:'10%',
     width: 180,
     height: 180,
     borderWidth: 1,
     borderRadius: 150
  }

})