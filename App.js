import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailsScreen from './screens/ProductDetail.js';
import { useFonts, SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import AppLoading from 'expo-app-loading';
import colors from './styles/colors.js';
import HeaderBar from './globalElements/HeaderBar.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';  


const stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              header: () => <HeaderBar 
              title='Home'
              showBack
              />,
            }}
          />
          <stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{
              headerShown: false
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}