import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
3;
import { LogBox } from "react-native";
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default function TopTen() {
  const [coins, setCoins] = useState("");
  const [selection, setSelection] = useState(20);
  const [loading, setLoading] = useState(true);

  const getCoins = () => {
    fetch(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&start=1&limit=" +
        selection +
        "&cryptocurrency_type=coins&convert=EUR",
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
        setCoins(data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };
  const RenderLoading = () => {
    if (loading) {
      return <Image style={styles.loading} source={require("./loading.gif")} />;
    } else {
      return <Text></Text>;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
            <View style={styles.centeredView}>
<View style={{flexDirection:"row"}}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
            item.id +
            ".png",
        }}
      />
        <Text style={styles.coinName}>{item.name}<Text style={{fontSize:15}}>({item.symbol}) | #{item.cmc_rank}</Text></Text></View>
        <Text style={styles.value}>
            {Math.round(item.quote.EUR.price * 100) / 100}€
        </Text>
        <Text style={styles.changes}>
          Change(1h) {Math.round(item.quote.EUR.percent_change_1h * 100) / 100}%
        </Text>
        <Text style={styles.changes}>
          Change(24h) {Math.round(item.quote.EUR.percent_change_24h * 100) / 100}%
        </Text>
        <Text style={styles.changes}>
          Change(7d) {Math.round(item.quote.EUR.percent_change_7d * 100) / 100}%
        </Text>
      </View>
    </View>
  );
  useEffect(() => {
    getCoins();
  });
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.header}>
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "bottom",
              fontSize: 30,
            }}
          >
            Top {selection} crypto currencies
          </Text>
        </View>
        <RenderLoading />
        <View style={styles.table}>
          <FlatList
            data={coins.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

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
    flex: 8,
  },
  item: {
    backgroundColor: "#2196F3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  changes: {
    fontSize: 15,
    color: "#ecf6fe",
  },
  value: {
    fontSize: 20,
    color: "#ecf6fe",
  },
  coinName: {
    fontSize: 35,
    fontWeight:"bold",
    color: "#ecf6fe",
  },
  button: {
    width: 20,
    margin: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight:10,
  },
  loading: {
    width: 250,
    height: 250,
  },
});
