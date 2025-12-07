import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { EmpleadosNavigator } from './src/navigator/EmpleadosNavigator';
import { ApiConfigProvider } from './src/context/ApiConfigContext';

export default function App() {
  return (
    <ApiConfigProvider>
      <NavigationContainer>
        <EmpleadosNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ApiConfigProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
