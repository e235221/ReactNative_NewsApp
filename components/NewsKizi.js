import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import useTranslation from "../hooks/useTranslation";

const NewsKizi = ({ imageuri, title, subtext, onPress }) => {
  var date = new Date(subtext);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var koukaihiduke = year + "年" + month + "月" + day + "日";

  const { translatedText, isTranslating, error, translate } = useTranslation();
  const [displayTitle, setDisplayTitle] = useState(title);
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    if (translatedText) {
      setDisplayTitle(translatedText);
    }
  }, [translatedText]);

  const handleTranslate = () => {
    if (isTranslated) {
      // 元のタイトルに戻す
      setDisplayTitle(title);
      setIsTranslated(false);
    } else {
      // 翻訳を実行
      translate(title, "Japanese");
      setIsTranslated(true);
    }
  };

  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.moziBox}>
        <Text numberOfLines={3} style={styles.text}>
          {displayTitle}
        </Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.subText}>{koukaihiduke}</Text>
          {isTranslating ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Button
              title={isTranslated ? "原文に戻す" : "翻訳"}
              onPress={handleTranslate}
            />
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.gazoBox}>
        <Image style={{ width: 100, height: 100 }} source={{ url: imageuri }} />
      </View>
    </TouchableOpacity>
  );
};

export default NewsKizi;

const styles = StyleSheet.create({
  box: {
    height: 130,
    width: "100%",
    borderColor: "lightblue",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 5,
  },

  moziBox: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },

  gazoBox: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5,
  },

  text: {
    fontSize: 16,
  },

  subText: {
    fontSize: 12,
    color: "darkblue",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
