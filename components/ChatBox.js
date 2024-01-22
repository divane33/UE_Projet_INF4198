import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, TextInput } from 'react-native';
import { Icon } from 'react-native-paper';


export default function ChatBox() {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
        
     <ImageBackground source={require("../images/chatBack.jpg")} style={{width:'100%', height:'100%'}}/>
      <ScrollView style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.300)',
          //padding: '2%',
          //paddingVertical: '5%',
          //paddingBottom: '25%',
          //borderWidth: 2
      }}>
        <View style={{
           //borderWidth: 2,
           paddingBottom: '20%',
           padding: '2%'
        }}>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'rgb(140, 243, 140)',
              marginBottom: '5%',
              marginTop: '5%'
          }}>
                <Text>
                    Thank you dear User to choose our app. Feel free to send us a message if you 
                    have a problem.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: 'white',
              marginLeft: '25%'
              
          }}>
                <Text>
                    Thank you.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'rgb(140, 243, 140)',
              marginBottom: '5%',
              marginTop: '5%'
          }}>
                <Text>
                    Thank you dear User to choose our app. Feel free to send us a message if you 
                    have a problem.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: 'white',
              marginLeft: '25%'
              
          }}>
                <Text>
                    Thank you.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'rgb(140, 243, 140)',
              marginBottom: '5%',
              marginTop: '5%'
          }}>
                <Text>
                    Thank you dear User to choose our app. Feel free to send us a message if you 
                    have a problem.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: 'white',
              marginLeft: '25%'
              
          }}>
                <Text>
                    Thank you.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'rgb(140, 243, 140)',
              marginBottom: '5%',
              marginTop: '5%'
          }}>
                <Text>
                    Thank you dear User to choose our app. Feel free to send us a message if you 
                    have a problem.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: 'white',
              marginLeft: '25%'
              
          }}>
                <Text>
                    Thank you.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'rgb(140, 243, 140)',
              marginBottom: '5%',
              marginTop: '5%'
          }}>
                <Text>
                    Thank you dear User to choose our app. Feel free to send us a message if you 
                    have a problem.
                </Text>
          </View>
          <View style={{
              //borderWidth: 2,
              width: '75%',
              padding: '4%',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              backgroundColor: 'white',
              marginLeft: '25%'
              
          }}>
                <Text>
                    Thank you.
                </Text>
          </View>
        </View>

       </ScrollView>
       <View style={{
              //borderWidth: 2,
              position: 'absolute',
              bottom: 5,
              height: 55,
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: '1%'
          }}>
              <TouchableOpacity style={{
                  //borderWidth: 2,
                  //borderColor: 'red',
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'orange',
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
              }}>
                  <Icon
                    source="folder"
                    size={30}
                    color="white"
                  />
              </TouchableOpacity>

              <TextInput placeholder='Tap here to write a message...'

                   multiline={true}

                   style={{
                       width: '65%',
                       backgroundColor: 'white',
                       padding: '2%'
                   }}
              >
              </TextInput>

              <TouchableOpacity style={{
                  //borderWidth: 2,
                  //borderColor: 'red',
                  width: '20%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgb(3, 187, 3)',
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
              }}>
                  <Icon
                    source="send"
                    size={35}
                    color="white"
                  />
              </TouchableOpacity>
                
       </View>
       
    </View>
  )
}
