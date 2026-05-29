//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

//Ícones
import Ionicons from '@expo/vector-icons/Ionicons';

//Importação das Fontes
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter"
import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes"

//Tema central
import { cores, fontes, tamanhosFonte } from "./tema"

//Telas
import TelaBoasVindas from "./telas/BoasVindas"
import TelaProdutos from "./telas/Produtos"
import TelaSobre from "./telas/Sobre"
import TelaPerfil from "./telas/Perfil"
import TelaDetalhe from "./telas/Detalhe"

//MENU - BOTTOM TABS
const Tab = createBottomTabNavigator();

function Menu(){
  return <Tab.Navigator
            initialRouteName="Sobre"
            screenOptions={({route})=>({
              tabBarIcon:({focused, color, size})=>{
                let iconName: any;

                if(route.name==="Loja"){
                  iconName = focused ? 'storefront' : 'storefront-outline';
                }else if(route.name==="Sobre"){
                  iconName = focused ? 'book' : 'book-outline';
                }else if(route.name==="Perfil"){
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color}/>
              },
              headerShown: false,
              tabBarActiveTintColor: cores.primaria,
              tabBarInactiveTintColor: cores.textoSuave,
              tabBarLabelStyle: {
                fontFamily: fontes.padrao,
                fontSize: tamanhosFonte.micro,
              },
              tabBarStyle: {
                backgroundColor: cores.branco,
                borderTopColor: cores.borda,
                height: 64,
                paddingTop: 6,
                paddingBottom: 8,
              },
            })}
          >
            <Tab.Screen name="Loja" component={TelaProdutos}/>
            <Tab.Screen name="Sobre" component={TelaSobre}/>
            <Tab.Screen name="Perfil" component={TelaPerfil}/>
        </Tab.Navigator>
}

//STACK RAIZ
const Stack = createNativeStackNavigator();

export default function App() {

  const [fonteCarregada] = useFonts({
    "FontePadrao": Inter_400Regular,
    "FonteLogo": GreatVibes_400Regular,
  });

  if(!fonteCarregada){
    return <View />
  }

  return <NavigationContainer>
            <Stack.Navigator
              initialRouteName="BoasVindas"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="BoasVindas" component={TelaBoasVindas}/>
              <Stack.Screen name="Menu" component={Menu}/>
              <Stack.Screen name="DetalheVestido" component={TelaDetalhe}/>
            </Stack.Navigator>
        </NavigationContainer>

}
