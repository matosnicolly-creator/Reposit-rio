import * as React from 'react';
import { Image, View, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas do seu aplicativo
import HomeScreen from './screens/HomeScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ToolsScreen from './screens/ToolsScreen';
import StepsScreen from './screens/StepsScreen';

const Stack = createStackNavigator();

// Componente LogoTitle para customizar o título do cabeçalho
function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{ width: 30, height: 30, marginRight: 10 }}
        source={require('./assets/logo.png')} // Imagem do logo
      />
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
        Receitas Incríveis
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#552F6E' },
          headerTintColor: '#552F6E',
          // Ajuste crucial para comportamentos corretos em plataformas diferentes
          cardStyle: {
            flex: 1,
            backgroundColor: '#B15AE0',
            overflow: Platform.OS === 'web' ? 'visible' : 'hidden', // Controlando o overflow na web
          },
        }}
      >
        {/* Tela principal (HomeScreen) com título personalizado */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
       
        {/* Outras telas (Ingredientes, Utensílios, Passo a Passo) */}
        <Stack.Screen name="Ingredientes" component={IngredientsScreen} />
        <Stack.Screen name="Utensílios" component={ToolsScreen} />
        <Stack.Screen name="Passo a Passo" component={StepsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
