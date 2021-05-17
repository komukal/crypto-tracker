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
import { FloatingAction } from "react-native-floating-action";
import { Picker } from "@react-native-picker/picker";
import CoinValueSection from "./CoinValueSection";
export default function HomeScreen() {
  const [coinToAdd, setCoinToAdd] = React.useState({
    crypto: "1",
    ammount: "",
    wallet: "",
  });
  const [myCoins, setMyCoins] = React.useState([
    {
      crypto: "1",
      ammount: "0.84462",
      wallet: "Kriptomat",
    },
    {
      crypto: "1027",
      ammount: "8.2245",
      wallet: "Electrum",
    },
  ]);
  const [coinIds, setCoinIds] = React.useState([]);
  const list = coinIds.map((coin) => (
    <Picker.Item key={coin.id} label={coin.name} value={coin.id} />
  ));

  const [modalVisible, setModalVisible] = React.useState(false);

  const inputChangedCryptoWallet = (value) => {
    setCoinToAdd({ ...coinToAdd, wallet: value });
  };
  const inputChangedCryptoAmmount = (value) => {
    setCoinToAdd({ ...coinToAdd, ammount: value });
  };
  const [selectedCrypto, setselectedCrypto] = useState(1);
  const [selectedCryptoAmmount, setselectedCryptoAmmount] = useState();

  const addCrypto = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    setMyCoins((myCoins) => [...myCoins, coinToAdd]);
    setModalVisible(!modalVisible);
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

  const actions = [
    {
      text: "Add cryptos",
      icon: require("../assets/favicon.png"),
      name: "bt_language",
      position: 1,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
            item.crypto +
            ".png",
        }}
      />
      <CoinValueSection coin={item} />
      <Text style={styles.title}>Ammount:{item.ammount}</Text>
      <Text style={styles.title}>Wallet: {item.wallet}</Text>

    </View>
  );
  useEffect(() => {
    getCoinInfo();
  });
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add crypto</Text>
            <Picker
              style={{ height: 100, width: 300, border: "2px solid red" }}
              name="crypto"
              selectedValue={selectedCrypto}
              onValueChange={(itemValue, itemIndex) => {
                setCoinToAdd({ ...coinToAdd, crypto: itemValue });
                console.log(coinToAdd);
              }}
            >
              {list}
            </Picker>
            <TextInput
              style={{ height: 100, width: 300 }}
              name="ammount"
              onChangeText={inputChangedCryptoAmmount}
              placeholder="Ammount of crypto"
              keyboardType="numeric"
            />

            <TextInput
              style={{ height: 100, width: 300 }}
              name="wallet"
              onChangeText={inputChangedCryptoWallet}
              placeholder="Which wallet/service"
              keyboardType="default"
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginHorizontal: 20 }}>
                <Button title="Save" onPress={handleSave}></Button>
              </View>

              <View style={{ marginHorizontal: 20 }}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "bottom",
            fontSize: 30,
          }}
        >
          My cryptos
        </Text>
      </View>

      <View style={styles.table}>
        <FlatList
          data={myCoins}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>

      <FloatingAction actions={actions} onPressItem={addCrypto} />
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
