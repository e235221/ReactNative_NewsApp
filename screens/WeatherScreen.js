import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import WeatherItem from "../components/WeatherItem";
import Constants from "expo-constants";
import axios from "axios";

// APIキーを安全に取得
const WEATHER_API_KEY =
  Constants?.expoConfig?.extra?.weatherApiKey ?? "DUMMY_KEY";

// 各地域のAPI情報
const Hokkaido = {
  name: "北海道",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Asahikawa&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Touhoku = {
  name: "東北",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Yamagata&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Kantou = {
  name: "関東",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Hokuriku = {
  name: "北陸",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Nagano&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Toukai = {
  name: "東海",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Nagoya&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Kinki = {
  name: "近畿",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Osaka&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Chugoku = {
  name: "中国",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Hiroshima&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Shikoku = {
  name: "四国",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Matsuyama&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Kyusyu = {
  name: "九州",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Ozu&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};
const Okinawa = {
  name: "沖縄",
  uri: `https://api.openweathermap.org/data/2.5/weather?q=Okinawa&lang=ja&exclude=hourly,minutely&units=metric&APPID=${WEATHER_API_KEY}`,
};

// 地域の一覧
const TotalUri = [
  Hokkaido,
  Touhoku,
  Kantou,
  Hokuriku,
  Toukai,
  Kinki,
  Chugoku,
  Shikoku,
  Kyusyu,
  Okinawa,
];

export default function WeatherScreen() {
  const [weather, setWeathers] = useState([]);

  useEffect(() => {
    // 各地域ごとに天気情報を取得
    TotalUri.forEach((info) => {
      getWeathers(info);
    });
  }, []);

  // 天気情報を取得
  const getWeathers = async (info) => {
    try {
      const response = await axios.get(info.uri);
      const uriData = response.data.weather;
      // 地域名を追加
      uriData[0].name = info.name;
      // stateに追加
      setWeathers((prev) => [...prev, uriData[0]]);
    } catch (error) {
      console.error(`天気情報の取得に失敗しました (${info.name}):`, error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={weather}
        renderItem={({ item }) => (
          <WeatherItem
            description={item.description}
            icon={item.icon}
            name={item.name}
          />
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
