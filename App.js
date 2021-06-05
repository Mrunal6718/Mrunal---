import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      result1: '',
      result2: '',
      input: '',
      error: '',
    };
  }
  error() {
    this.setState({
      error: 'Word Not Available',
      result1: null,
      result2: null,
      word: this.state.input,
    });
  }
  render() {
    console.log(this.state.input)
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'blue'}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: 'white', fontSize: 22, fontWeight: 'bold' },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              input: text.toLowerCase(),
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            var url =
              'https://rupinwhitehatjr.github.io/dictionary/' +
              this.state.input +
              '.json';
            return fetch(url)
              .then((response) => response.json())
              .then((responseJSON) => {
                this.setState({
                  result1: 'Type :- ' + responseJSON.definitions[0].wordtype,
                  result2:
                    'Description:- ' + responseJSON.definitions[0].description,
                  word: this.state.input,
                  error: null,
                });
              })
              .catch((error) => {
                this.error();
                console.error('ERROR');
              });
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 100,
          }}>
          {this.state.error}
        </Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
          {this.state.word.toUpperCase()}
        </Text>
        <Text style={styles.displayText}>{this.state.result1}</Text>
        <Text style={styles.displayText}>{this.state.result2}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b8b8b8',
    flex: 1,
  },
  inputBox: {
    marginTop: 20,
    width: 280,
    height: 40,
    alignSelf: 'center',
    textAlign: 'center',
    borderWidth: 4,
    backgroundColor: 'white',
  },
  button: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'red',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'left',
    fontSize: 20,
    padding: 20,
  },
});
