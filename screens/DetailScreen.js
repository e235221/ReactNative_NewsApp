import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
  Linking,
} from "react-native";
import useTranslation from "../hooks/useTranslation";

export default function DetailScreen(props) {
  const { route } = props;
  const { article } = route.params;

  // タイトル用と本文用の翻訳フックをそれぞれ用意
  const {
    translatedText: translatedTitle,
    isTranslating: isTranslatingTitle,
    error: titleError,
    translate: translateTitle,
  } = useTranslation();
  const {
    translatedText: translatedContent,
    isTranslating: isTranslatingContent,
    error: contentError,
    translate: translateContent,
  } = useTranslation();

  const [displayTitle, setDisplayTitle] = useState(article.title);
  const [displayContent, setDisplayContent] = useState(
    article.content || "コンテンツがありません。"
  );
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    if (translatedTitle) {
      setDisplayTitle(translatedTitle);
    }
  }, [translatedTitle]);

  useEffect(() => {
    if (translatedContent) {
      setDisplayContent(translatedContent);
    }
  }, [translatedContent]);

  const handleTranslate = () => {
    if (isTranslated) {
      // 元のテキストに戻す
      setDisplayTitle(article.title);
      setDisplayContent(article.content || "コンテンツがありません。");
      setIsTranslated(false);
    } else {
      // 翻訳を実行
      translateTitle(article.title, "Japanese");
      translateContent(article.content, "Japanese");
      setIsTranslated(true);
    }
  };

  const openOriginalArticle = () => {
    Linking.openURL(article.url).catch((err) =>
      console.error("URLを開けませんでした:", err)
    );
  };

  const isTranslating = isTranslatingTitle || isTranslatingContent;
  const error = titleError || contentError;

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{displayTitle}</Text>

        <View style={styles.buttonContainer}>
          {isTranslating ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <Button
              title={isTranslated ? "原文に戻す" : "日本語に翻訳"}
              onPress={handleTranslate}
            />
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.content}>{displayContent}</Text>

        <View style={styles.openSiteButton}>
          <Button
            title="原文サイトで続きを読む"
            onPress={openOriginalArticle}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  buttonContainer: {
    marginVertical: 16,
  },
  openSiteButton: {
    marginTop: 24,
  },
  errorText: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
});

