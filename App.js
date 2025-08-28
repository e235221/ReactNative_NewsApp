import React from 'react';
import { StyleSheet, Text, View, Image,} from 'react-native';
import NewsKizi from './components/NewsKizi';

export default function App() {
  return (
    <View style={styles.container}>
      <NewsKizi imageuri="" title="" subtext="" />
    </View>
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
