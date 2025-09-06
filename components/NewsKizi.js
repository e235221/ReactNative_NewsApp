import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

const NewsKizi = ({ imageuri, title, subText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.moziBox}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>

        <View style={styles.gazoBox}>
          {imageuri ? (
            <Image style={styles.image} source={{ uri: imageuri }} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]} />
          )}
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.moziBox}>
          <Text style={styles.text}>ニュース記事がここに入ります。アプリを作るのは楽しいです。</Text>
          <Text style={styles.subText}>テム</Text>
        </View>

        <View style={styles.gazoBox}>
          <Image style={styles.image} source={{ uri: 'https://picsum.photos/id/25/150/300' }} />
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.moziBox}>
          <Text style={styles.text}>ROCKSYSTEMACADEMYは大阪にある実務を経験できるプログラミングスクールです</Text>
          <Text style={styles.subText}>テム</Text>
        </View>

        <View style={styles.gazoBox}>
          <Image style={styles.image} source={{ uri: 'https://picsum.photos/id/27/100/100' }} />
        </View>
      </View>
    </View>
  );
};

export default NewsKizi;

const styles = StyleSheet.create({
  container: { // コンテナの基本レイアウトを設定する
    gap: 8,
    padding: 8,
    backgroundColor: 'white',
  },

  box: {
    height: 100,
    width: '100%',
    borderColor: 'lightblue',
    borderWidth: 1,
    flexDirection: 'row',
  },

  moziBox: {
    flex: 1,
    backgroundColor: 'steelblue',
    padding: 16,
    justifyContent: 'space-between',
  },

  gazoBox: {
    width: 100,
    backgroundColor: 'powderblue',
  },

  image: { // 画像の共通サイズを定義する
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },

  imagePlaceholder: { // 画像が無い場合のプレースホルダを示す
    backgroundColor: '#ddd',
  },

  text: {
    fontSize: 16,
  },

  subText: {
    fontSize: 12,
    color: 'red',
  },
});
