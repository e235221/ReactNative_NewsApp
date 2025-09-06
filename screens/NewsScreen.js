import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import NewsKizi from "../components/NewsKizi";
import Constants from "expo-constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// ニュース記事を取得するAPIエンドポイント
const URI = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${Constants.expoConfig.extra.newsApiKey}`;

export default function NewsScreenApp() {
  const [news, setNews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const response = await axios.get(URI);
      setNews(response.data.articles);
      console.log("取得した記事:", response.data.articles);
    } catch (error) {
      console.error("ニュース取得エラー:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsKizi
            imageuri={item.urlToImage}
            title={item.title}
            subtext={item.publishedAt}
            onPress={() => navigation.navigate("詳細ページ", { article: item })}
          />
        )}
        keyExtractor={(item, index) =>
		
          item.url ? item.url : index.toString()
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // SafeAreaView内で全画面に広がる
    backgroundColor: "#fff",
  },
});
