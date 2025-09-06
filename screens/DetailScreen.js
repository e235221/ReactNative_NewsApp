import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
  const { article } = route.params;
  console.log(article);

  return (
    <WebView
      style={styles.container}
      source={{ uri: article.url }}
    />
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
