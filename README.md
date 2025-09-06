# React Nativeを用いたニュースおよび天気情報提供アプリケーションの開発

## 1. 概要

本アプリケーションはReact NativeおよびExpoフレームワークを基盤とし、モバイルデバイス向けにニュース記事と天気情報を集約・提供するものである。NewsAPIから最新のニュースヘッドラインを、OpenWeatherMap APIから日本の各地域の気象データを非同期的に取得している。


## 2. 技術スタック (Technology Stack)

本システムの構築にあたり、以下の技術要素を採用した。

* **フレームワーク**: [React Native](https://reactnative.dev/)
  * 単一のコードベースからiOSおよびAndroidのネイティブアプリケーションを構築するために採用。
* **プラットフォーム**: [Expo](https://expo.dev/)
  * ビルドプロセスの簡素化、OTA (Over-the-Air) アップデート、および豊富なネイティブAPIへのアクセスを提供するため、開発環境として利用。
* **ナビゲーション**: [React Navigation](https://reactnavigation.org/)
  * アプリケーション内の画面遷移（スタックナビゲーション、タブナビゲーション）を宣言的に管理するために導入。
* **HTTPクライアント**: [Axios](https://axios-http.com/)
  * 外部APIとの非同期通信を実装するため、PromiseベースのHTTPクライアントとして採用。
* **外部API**:
  * [NewsAPI](https://newsapi.org/): 最新ニュース記事の取得。
  * [OpenWeatherMap API](https://openweathermap.org/): 地域ごとの天気情報の取得。

## 3. システム構成

本アプリケーションは、以下の主要コンポーネントから構成される。

* **`NewsScreen`**: NewsAPIから取得したニュース記事の一覧を表示する。各記事は`NewsKizi`コンポーネントによって描画される。
* **`DetailScreen`**: ユーザーが選択したニュース記事の詳細を`WebView`コンポーネントを用いて表示する。
* **`WeatherScreen`**: OpenWeatherMap APIから取得した日本各地の天気情報を一覧表示する。各地域の天気は`WeatherItem`コンポーネントによって描画される。
* **ナビゲーション**: `createBottomTabNavigator`を用いて「ニュース」と「天気予報」の主要画面を分離し、`createStackNavigator`によってニュース一覧から詳細ページへの遷移を実現している。

## 4. 使い方 (Usage)

### 4.1. 環境構築

本アプリケーションを実行するためには、以下の手順に従い環境を構築する必要がある。

1. **リポジトリのクローン**:
    ```bash
    git clone https://github.com/e235221/ReactNative_NewsApp.git
    cd ReactNative_NewsApp
    ```

2. **依存パッケージの導入**:
    ```bash
    npm install
    ```

3. **APIキーの設定**:
    本システムは、NewsAPIおよびOpenWeatherMap APIへのアクセスを必要とする。プロジェクトルートに存在する `app.config.js` ファイル内の `extra` フィールドに、各APIから取得したAPIキーを以下のように設定する。

    ```javascript
    // app.config.js
    module.exports = {
      expo: {
        // ... (既存の設定)
        extra: {
          newsApiKey: "YOUR_NEWS_API_KEY",
          weatherApiKey: "YOUR_OPENWEATHERMAP_API_KEY"
        }
      }
    };
    ```
    `"YOUR_NEWS_API_KEY"` および `"YOUR_OPENWEATHERMAP_API_KEY"` の箇所を、各自で取得した有効なキーに置換すること。

### 4.2. アプリケーションの実行

環境構築完了後、以下のコマンドを実行することで、開発サーバーが起動する。

```bash
npx expo start
```

ターミナルに表示されるQRコードを、Expo Goアプリケーション（iOS/Android対応）でスキャンすることにより、スマートフォンでの動作検証が可能となる。
