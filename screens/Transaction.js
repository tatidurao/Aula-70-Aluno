import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

//carregue as imagens abaixo
//const bgImage = require("../assets/background2.png");
//const appIcon = 
//const appName = 

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // inserir os estados bookId: "" e studentId: "" e remover o scannedData
      domState: 'normal', //modo digtalizar ou digitalizado
      hasCameraPermissions: null, //camera tem permissoes = null
      scanned: false, //foi digitalizado = false
      scannedData: '', //guardar os dados digitalizados
    };
  }

  getCameraPermissions = async (domState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      domState: domState,
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
      //criar o if else
    this.setState({
      scannedData: data,
      domState: 'normal',
      scanned: true,
    });
  };


  render() {
    //remove o scannedData e acrescente o bookId e studentId
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
      if (domState === 'scanner' && hasCameraPermissions === true) {
        return (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      } 

    return (
      <View style={styles.container2}>

        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Autorize"}
        </Text>
      
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.getCameraPermissions('scanner')}>
          <Text style={styles.buttonText}>Digitalizar QR CODE</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5653D4',
  },
  text: {
    color: '#ffff',
    fontSize: 30,
  },
  button: {
    width: '43%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F48D20',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 180,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 20,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  }
});
