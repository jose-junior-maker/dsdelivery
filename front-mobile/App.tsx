import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/Routes';


export default function App() {

  const [fontsLoaded, error] = useFonts({
    OpenSans_400Regular, OpenSans_700Bold
  });


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Routes />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
