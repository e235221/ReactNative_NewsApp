import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// アイコンコードをURLに正規化する処理である
const toIconUri = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string" && (icon.startsWith("http://") || icon.startsWith("https://"))) {
    return icon;
  }
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

const WeatherItem = ({ description, icon, name }) => {
	console.log(description, icon, name);

  // 受領したアイコン値をURLに変換する処理である
  const iconUri = toIconUri(icon);

  return (
    <View style={styles.box}>
      <View style={styles.moziBox}>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={styles.gazoBox}>
        {iconUri ? (
          <Image style={{ width: 95, height: 95 }} source={{ uri: iconUri }} />
        ) : (
          <View style={{ width: 95, height: 95 }} />
        )}
        <Text style={styles.subText}>{description}</Text>
      </View>
    </View>
  );
};
export default WeatherItem;

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: "100%",
    borderColor: "lightblue",
    borderWidth: 1,
    flexDirection: "row",
  },

  gazoBox: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  moziBox: {
    flex: 1,
    padding: 35,
    justifyContent: "center",
  },

  text: {
    fontSize: 17,
  },

  subText: {
    fontSize: 14,
    color: "darkblue",
  },
});
