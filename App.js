import BottomNav from './components/BottomNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './utils/AuthContext';

export default function App() {
  return (
     <SafeAreaProvider>
       <NavigationContainer>
        <AuthProvider>
          <BottomNav/>
        </AuthProvider>
       </NavigationContainer>
     </SafeAreaProvider>

  );
}
