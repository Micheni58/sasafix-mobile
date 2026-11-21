import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>SASAFIX SERVICE APP</Text>
      <StatusBar style="auto" />
      <Text style={styles.version} >Version 1.0.0</Text>
      <Button title="Press me " style ={styles.button} onPress ={() => alert('Button Pressed!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 100%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  version:{
    fontSize: 12,
    color: 'blue',
    marginTop: 10,
  },
  button:{
    size: 30,
  },
  alert:{
    color: 'red',
  }
});
