import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import NewsKizi from "./components/NewsKizi";
import Constants from "expo-constants";
import axios from "axios";

// 英語のニュース記事を取得するように変更
const URI = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${Constants.expoConfig.extra.newsApiKey}`; // 修正: Constants.manifest.extra を Constants.expoConfig.extra に変更

export default function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const response = await axios.get(URI);
    setNews(response.data.articles);
    console.log(response);
  };

  
  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsKizi
            imageuri={item.urlToImage}
            title={item.title}
            subtext={item.publishedAt}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
