import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';

export default function Statistics() {

    const data = {
      labels: ['Ja', 'Fe', 'Ma', 'Av', 'Mai', 'Ju', 'Jui', 'Ao', 'Se', 'Oc', 'No', 'De'],
      datasets: [{
        data: [20, 45, 28, 80, 99, 43, 8, 15, 19, 98, 23, 5],
      }]
    };

    const data2 = [
      { name: 'Cmd (Ja)', population: 20, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Fe)', population: 45, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Ma)', population: 28, color: 'yellow', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Av)', population: 80, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Mai)', population: 99, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Ju)', population: 43, color: 'indigo', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Jui)', population: 8, color: 'violet', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Ao)', population: 15, color: 'grey', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Se)', population: 19, color: 'brown', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (Oc)', population: 98, color: 'cyan', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (No)', population: 23, color: 'yellowgreen', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Cmd (De)', population: 5, color: 'black', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const renderCustomLegend = () => {
      return data2.map((item, index) => (
        <Text key={index} style={{ marginBottom: 5 }}>{item.name}</Text>
      ));
    };

  return (
    <View style={{backgroundColor: 'white', height: "100%"}}>
      <ScrollView>
          <View>
                <Text style={{
                  fontSize: 25,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '10%',
                  paddingHorizontal: '3%'
                }}>
                    Consultez vos statistiques ci-dessous
                </Text>
                <Text style={{textAlign: 'center', fontSize: 34, fontWeight: 'bold', marginTop: 25, fontStyle: 'italic', color: 'grey'}}>Cette page n'est pas encore prête pour le moment !</Text>
          </View>
              <View style={{justifyContent: "center", alignItems: "center"}}>
                  <LineChart
                      data={data}
                      width={330}
                      height={250}
                      yAxisLabel={'Com'}
                      chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: 'grey',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        }
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        borderRadius: 16,
                      }}
                  />
             </View>
             <View style={{justifyContent: "center", alignItems: "center", marginTop: 25, marginBottom: 105}}>
                  <PieChart
                          data={data2}
                          width={330}
                          height={240}
                          chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                          }}
                          accessor="population"
                          backgroundColor="transparent"
                          paddingLeft="15"
                          absolute
                          hasLegend={true}
                          renderLegend={renderCustomLegend}
                  />
             </View>
       </ScrollView>
    </View>
  )
}
