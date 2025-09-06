import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsScreen from './screens/NewsScreen';
import DetailScreen from './screens/DetailScreen';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ニュース" component={NewsScreen} />
		<Stack.Screen name="詳細ページ" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 
