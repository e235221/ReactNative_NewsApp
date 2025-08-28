import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image,} from 'react-native';
import NewsKizi from './components/NewsKizi';

export default function App() {
	const [news, seeNews] = useState([]);
	useEffect(() => { alert('useEffectが動いたよ') }, []);
  return (
    <View style={styles.container}>
      <NewsKizi imageuri="" title="箱テスト" subtext="箱テスト" />
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
