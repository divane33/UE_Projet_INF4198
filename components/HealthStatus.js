import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HealthStatus() {

  const [casebox, setCasebox] = React.useState('unchecked');
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: 'white'}}>
         <ScrollView>
            <View>
               <Text style={{
                 fontSize: 29,
                 fontWeight: 'bold',
                 paddingHorizontal: '5%',
                 textAlign: 'center',
                 marginTop: '10%'
               }}>Check your Health Status</Text>

            <TouchableOpacity style={{
               //borderWidth: 2,
               width: '90%',
               marginLeft: '5%',
               marginTop: '7%',
               padding: '2.5%',
               borderRadius: 15,
               backgroundColor: 'rgb(129, 60, 175)'
            }}
            
              onPress = {()=>{
                navigation.navigate("Calculate BMI");
              }}
            
            >
               <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                   Calculate your BMI
               </Text>
               <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                   (Body Mass Index)
               </Text>
            </TouchableOpacity>

            <Text style={{
              padding: '2%',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
              marginTop: '10%',
              fontStyle: 'italic'
            }}>Please fill in the form below to save your current state of health.</Text>

            <View style={{
              marginTop: '8%',
              borderWidth: 3,
              width: '90%',
              marginLeft: '5%',
              paddingLeft: '3%',
              paddingVertical: '5%',
              marginBottom: '20%',
              borderColor: 'rgb(129, 60, 175)',
              borderRadius: 10
            }}>

               <Text style={{fontSize: 18}}>How are you feeling today ?</Text>

                 <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '85%',
                      }}>
                          <Checkbox.Item status={casebox} onPress={()=>{
                            if(casebox == 'unchecked'){
                              setCasebox ("checked");
                            }else{
                              setCasebox ("unchecked");
                            }
                          }}/>
                          <Text style={{marginStart: -15, fontSize: 14, fontWeight:'bold'}}>Feeling Well</Text>
                  </View>

                  <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginTop: '5%'
                  }}>
                     <Text style={{fontSize: 18}}>Heart Rate:</Text>
                     <TextInput placeholder='Press here to fill in'
                        style={{
                          backgroundColor: 'rgb(194, 167, 212)',
                          marginLeft: 10,
                          padding: '2%',
                          width: '60%',
                          borderRadius: 10,
                          paddingLeft: '5%'
                        }}
                     />
                  </View>

                  <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginTop: '5%'
                  }}>
                     <Text style={{fontSize: 18}}>Steps taken:</Text>
                     <TextInput placeholder='Press here to fill in'
                        style={{
                          backgroundColor: 'rgb(194, 167, 212)',
                          marginLeft: 10,
                          padding: '2%',
                          width: '57%',
                          borderRadius: 10,
                          paddingLeft: '5%'
                        }}
                     />
                  </View>

                  <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginTop: '5%'
                  }}>
                     <Text style={{fontSize: 18}}>Blood Pressure:</Text>
                     <TextInput placeholder='Press here to fill in'
                        style={{
                          backgroundColor: 'rgb(194, 167, 212)',
                          marginLeft: 10,
                          padding: '2%',
                          width: '48%',
                          borderRadius: 10,
                          paddingLeft: '5%'
                        }}
                     />
                  </View>

                  <TouchableOpacity style={{
                    //borderWidth: 2,
                    padding: '4%',
                    width: '80%',
                    marginLeft: '8%',
                    marginTop: '13%',
                    marginBottom: '4%',
                    borderRadius: 15,
                    backgroundColor: 'rgb(113, 8, 184)'
                  }}>
                      <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white'
                        }}>Save Now</Text>
                  </TouchableOpacity>

            </View>

            </View>
         </ScrollView>
    </View>
  )
}
