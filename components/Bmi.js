import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';

export default function Statistics() {

  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");

  const calculateBMI = () => {
      if(weight <= 0 || size <= 0 || size > 5 || !weight || !size){
         alert(`Errors have occurred in the calculation of your BMI. Please check your fields and enter positive numbers and a height that is not greater than 5`)
      }else{
          alert("Your BMI is "+weight/(size*size));
      }
  }

  return (
    <View>
        <ScrollView>
            <View>
                <Text style={{
                    fontSize: 25,
                    paddingHorizontal: '8%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginTop: '25%'
                }}>
                    Fill in the following form to get out your BMI
                </Text>

                <View style={{
                    marginTop: '20%',
                    alignItems: 'center',
                    borderWidth: 3,
                    paddingVertical: '12%',
                    width: '90%',
                    marginLeft: '5%',
                    borderRadius: 10,
                    borderColor: 'rgb(27, 135, 185)',
                    marginBottom: '15%'
                }}>

                    <Text style={{
                        fontWeight: 'bold',
                        marginBottom: '1%'
                    }}>Enter your Weight :</Text>
                    <TextInput placeholder='Press here to fill in' 
                    
                     onChangeText={setWeight}
                    
                    style={{
                        backgroundColor: 'rgb(206, 210, 211)',
                        padding: '2%',
                        width: '80%',
                        paddingLeft: '5%',
                        borderRadius: 10,
                        marginBottom: '5%'
                    }}/>

                   <Text style={{
                            fontWeight: 'bold',
                            marginBottom: '1%'
                        }}>Enter your Size :</Text>
                        <TextInput placeholder='Press here to fill in' 
                        
                        onChangeText={setSize}
                        
                        style={{
                            backgroundColor: 'rgb(206, 210, 211)',
                            padding: '2%',
                            width: '80%',
                            paddingLeft: '5%',
                            borderRadius: 10
                    }}/>

                  <TouchableOpacity 
                  
                  onPress={()=>{
                      calculateBMI();
                  }}
                  
                  style={{
                      //borderWidth: 2,
                      width: '65%',
                      marginTop: '10%',
                      paddingVertical: '3.5%',
                      borderRadius: 10,
                      backgroundColor: 'rgb(27, 135, 185)'
                  }}>
                       <Text style={{
                           textAlign: 'center',
                           fontWeight: 'bold',
                           fontSize: 17,
                           color: 'white'
                       }}>Calculate</Text>
                  </TouchableOpacity>

                </View>

            </View>
       </ScrollView>
    </View>
  )
}
