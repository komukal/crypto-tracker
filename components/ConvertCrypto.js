import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
  ViewBase,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ConvertCrypto() {
  const [loading, setLoading] = useState(false);
  const [euro, setEuro] = React.useState(0);
  const [resultText, setResultText] = React.useState();
  const [coin, setCoin] = useState({
    coinId: 1,
  });
  const [coinIds, setCoinIds] = React.useState([]);
  const [coinData, setCoinData] = React.useState(null);

  const list = coinIds.map((coin) => (
    <Picker.Item key={coin.id} label={coin.name} value={coin.id} />
  ));

  const handleConvert = () => {
    setResultText(euro / coinData.data[coin.coinId].quote.EUR.price);
  };
  const getCoinInfo = () => {
    fetch(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=30",
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
        setCoinIds(data.data);
      })
      .catch((error) => {
        Alert.alert("Error", error.toString());
      });
  };
  const populateData = (coinId) => {
    fetch(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=" +
        coinId +
        "&convert=eur",
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
        setConvButton(<Button title="convert" onPress={()=>{handleConvert()}} />)

      })
      .catch((error) => {
        Alert.alert("Error", error.toString());
      });
  };
  const [convButton,setConvButton]=useState( <Text>LOADING</Text>);
  const displayButton = () => {
    if (loading === true) {
        setConvButton("Not loading");

    }
    if (loading === false) {
        setConvButton("Not loading");
    }
  };
  useEffect(() => {
    getCoinInfo();
    populateData(coin.coinId);
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "auto",
            fontSize: 30,
          }}
        >
          Crypto Converter
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text>Convert euro to crypto</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.textBox}
            autoFocus
            keyboardType={"numeric"}
            clearTextOnFocus
            onChangeText={(text) => setEuro(Number.parseInt(text, 10))}
          />
          <Text style={styles.title}>€</Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: "#555" }}>
          <Picker
            style={{
              height: 100,
              width: 300,
            }}
            name="crypto"
            selectedValue={coin}
            onValueChange={(itemValue, itemIndex) => {
              setConvButton(<Text>Loading</Text>)
              setCoin({ coinId: itemValue });
              populateData(itemValue);
            }}
          >
            {list}
          </Picker>
        </View>
        <View style={[styles.center, styles.buttonView]}>{convButton}</View>
        <Text style={styles.resText}>Result: {resultText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 50,
  },
  resText: {
    fontSize: 20,
  },
  header: {
    flex: 1,
    alignContent: "center",
  },
  textBox: {
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#555",
    width: 300,
    fontSize: 40,
    marginBottom: "5%",
  },
  buttonView: {
    width: "80%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
