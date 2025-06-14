import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import ProductDetail from './screens/ProductDetail.js';
import ProductScreen from './screens/ProductScreen.js';
import BlogsScreen from './screens/BlogsScreen.js';
import BlogDetail from './screens/BlogDetails.js';
import GalleryScreen from './screens/GalleryScreen.js';
import PreferencesScreen from './screens/PreferencesScreen.js';
import { useFonts, SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import AppLoading from 'expo-app-loading';
import colors from './styles/colors.js';
import HeaderBar from './components/HeaderBar.js';
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
              showLogo
              />,
            }}
          />
          <stack.Screen 
            name="ProductScreen" 
            component={ProductScreen}
            options={{
              header: () => <HeaderBar 
              title='Products'
              showBack
              />,
            }}
          />
          <stack.Screen 
            name="ProductDetail" 
            component={ProductDetail}
            options={{
              header: () => <HeaderBar 
              title='Product Details'
              showBack
              />,
            }}
          />
          <stack.Screen 
            name="Blogs" 
            component={BlogsScreen}
            options={{
              header: () => <HeaderBar 
              title='Blogs'
              showBack
              />,
            }}
          />
          <stack.Screen 
            name="BlogDetail" 
            component={BlogDetail}
            options={{
              header: () => <HeaderBar 
              title='Blog Details'
              showBack
              />,
            }}
          />
          <stack.Screen 
            name="Gallery" 
            component={GalleryScreen}
            options={{
              header: () => <HeaderBar 
              title='Gallery'
              showBack
              />,
            }}
          />
          <stack.Screen 
            name="Preferences" 
            component={PreferencesScreen}
            options={{
              header: () => <HeaderBar 
              title='Preferences'
              showBack
              />,
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}