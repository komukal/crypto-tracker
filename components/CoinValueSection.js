import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  FlatList,
  Modal,
  Image,
  TextInput,
} from "react-native";

const CoinValueSection=(props)=>{
    const [coinData, setCoinData] = React.useState();
    const [loading, setLoading] = useState(true);

      const populateData=()=>{
        fetch(
          "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id="+props.coin.crypto+"&convert=eur",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Accept-Encoding": "deflate, gzip",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setCoinData(data);
            setLoading(false)
          })
          .catch((error) => {
            Alert.alert("Error", error.toString());
          });  
          
      }
      useEffect(() => {
        populateData();
      });


      const RenderData=()=>{
        
          if(loading){
            return <Image
            style={styles.tinyLogo}
            source={require('./loading.gif')}
          />
          }else{
            return (
          <View style={styles.centeredView}>
            <Text style={styles.coinName}>{coinData.data[props.coin.crypto].name}</Text>
            <Text style={styles.title}>Current value in EUR: {Math.round((coinData.data[props.coin.crypto].quote.EUR.price*props.coin.ammount)*100)/100}€</Text>
            </View>
            )
          }
          }

      

      return (
        
          <RenderData />
        
      )
    }
    export default CoinValueSection;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      header: {
        flex: 1,
        alignContent: "center",
      },
      table: {
        flex: 5,
      },
      item: {
        backgroundColor: "#2196F3",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 20,
        alignItems: "center",
      },
      title: {
        fontSize: 20,
        color: "#ecf6fe",
      },
      coinName: {
        fontSize: 25,
        color: "#ecf6fe",
        fontWeight:"bold",
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        minWidth: 300,
        shadowOffset: {
          width: 10,
          height: 2,
        },
    
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      picker: {
        width: 90,
      },
      tinyLogo: {
        width: 50,
        height: 50,
      
      },
    });
    