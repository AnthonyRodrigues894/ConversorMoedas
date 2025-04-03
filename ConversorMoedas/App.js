import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [bitcoin, setBitcoin] = useState(null);
  const [dolar, setDolar] = useState(null);
  const [textButton, setTextButton] = useState("Converter");
  const [message, setMessage] = useState("valor em Bitcoin");
  // Taxa de conversao (1 BTC = X USD)
  const [exchangeRate, setExchangeRate] = useState(60000); 

  function convertToDolar() {
    setDolar((bitcoin * exchangeRate).toFixed(2));
  }

  function validateConversion() {
    if (bitcoin != null) {
      Keyboard.dismiss();
      convertToDolar();
      setBitcoin(null);
      setTextButton("Converter novamente");
      setMessage("Valor em Dólares:");
      return;
    }
    setDolar(null);
    setTextButton("Converter");
    setMessage("valor em Bitcoin");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>Conversor Bitcoin-Dólar</Text>
      </View>
    
      <View style={styles.content}> 
        <Text style={styles.subTitle}>Conversor de Criptomoedas</Text>

        <View>
          <Text style={styles.label}>Valor em Bitcoin (BTC)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBitcoin}
            value={bitcoin ?? ''}
            placeholder='Ex. 0.5'
            keyboardType='numeric'
          />
        </View>

        <View style={{ marginTop: 25 }}>
          <Text style={styles.label}>Taxa de câmbio atual (1 BTC = USD)</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setExchangeRate(parseFloat(text) || 60000)}
            value={String(exchangeRate)}
            placeholder='Ex. 60000'
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => validateConversion()}
        >
          <Ionicons name={"cash-outline"} size={24} color='#000000'/>
          <Text style={styles.text}>Converter</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{message}</Text>
          <Text style={styles.resultValue}>${dolar}</Text>
        </View>

      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 120,
    backgroundColor: '#FF9500', // 
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  titleText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 40,
    width: '100%',
    backgroundColor: '#edf2f4',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 40,
  }, 
  label: {
    color: '#000000',
    fontSize: 19,
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 18,
    borderColor: '#FF9500',
    borderWidth: 2,
    marginVertical: 5, 
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 7
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 48,
    color: '#FF9500',
    fontWeight: 'bold',
    marginTop: 10,
  }
});