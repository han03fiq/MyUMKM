import BottomNav from './components/BottomNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';

export default function App() {
  return (
     <SafeAreaProvider>
       <NavigationContainer>
         <BottomNav/>
       </NavigationContainer>
     </SafeAreaProvider>

  );
}
