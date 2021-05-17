import React, { useState, useEffect, useRef } from "react";
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
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";
import { render } from "react-dom";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function Alerts() {
  const [coinToTrack, setCoinToTrack] = useState({
    coinId: 1,
  });
  const [newCoin, setNewCoin] = useState({
    coinId: 1,
  });
  const [coinDetails, setCoinDetails] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [coinIds, setCoinIds] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [coinData, setCoinData] = React.useState(null);
  const [loading, setLoading] = useState(true);

  const list = coinIds.map((coin) => (
    <Picker.Item key={coin.id} label={coin.name} value={coin.id} />
  ));
  const handleOpen = () => {
    setModalVisible(true);
  };
  const handleSave = () => {
    setCoinToTrack(newCoin);
    setModalVisible(false);
    schedulePushNotification();
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
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Error", error.toString());
      });
  };
  useEffect(() => {
    populateData(coinToTrack.coinId);
  });
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    getCoinInfo();
  });

  const RenderData = () => {
    if (coinData === null) {
      return (
        <Image style={styles.tinyLogo} source={require("./loading.gif")} />
      );
    } else {
      return (
        <View style={styles.centeredView}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
                coinToTrack.coinId +
                ".png",
            }}
          />
          <Text style={styles.title}>
            Current value in EUR:
            {coinData.data[coinToTrack.coinId].quote.EUR.price}€
          </Text>
        </View>
      );
    }
  };

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
            <Text style={styles.modalText}>
              Select which crypto you want to recieve daily updates about:
            </Text>
            <Picker
              style={{ height: 100, width: 300, border: "2px solid red" }}
              name="crypto"
              selectedValue={coinToTrack}
              onValueChange={(itemValue, itemIndex) => {
                setNewCoin({ coinId: itemValue });
              }}
            >
              {list}
            </Picker>

            <View style={{ flexDirection: "row" }}>
              <View style={{ marginHorizontal: 20 }}>
                <Button
                  title="Save"
                  onPress={() => {
                    handleSave();
                  }}
                ></Button>
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
          Value alerts
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.item}>
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "bottom",
              marginBottom: 5,
              fontSize: 30,
              color: "#fff",
            }}
          >
            Selected coin:
          </Text>

          <RenderData />
        </View>
        <View style={{ flex: 5, margin: 10 }}>
          <View style={{ margin: 20 }}>
            <Button
              style={styles.button}
              title="change coin"
              onPress={() => handleOpen()}
            ></Button>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Button
              title="Demo for notification functionality"
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📈Daily value reminder📈",
      body: "The value of {COIN} is now {VALUE}€",
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
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
    marginHorizontal: 20,
    minHeight: 200,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#ecf6fe",
  },
  button: {
    width: 20,
    margin: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  loading: {
    width: 250,
    height: 250,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  picker: {
    width: 90,
  },
});
