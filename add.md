# 翻訳機能の追加

Gemini API を利用して、ニュース記事のタイトルと本文を英語から日本語へ翻訳する機能を追加しました。

## 1. 必要なライブラリのインストール

翻訳機能の実装に必要なライブラリをインストールしました。

-   `@google/generative-ai`: Google AI SDK。Gemini API との通信に使用します。
-   `react-native-dotenv`: APIキーなどの機密情報を環境変数として安全に管理するために使用します。

```bash
npm install @google/generative-ai react-native-dotenv
```

## 2. 環境設定

### APIキーの管理
- プロジェクトルートに `.env` ファイルを作成し、Gemini API のキーを記述しました。
  ```
  GEMINI_API_KEY="YOUR_API_KEY"
  ```
- `.env` ファイルが Git の追跡対象外となるように、`.gitignore` に `.env` を追加しました。

### `react-native-dotenv` の設定
- `babel.config.js` を作成し、`react-native-dotenv` プラグインを有効化しました。これにより、`@env` から環境変数をインポートできるようになります。

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'module:react-native-dotenv'
    ]
  };
};
```

## 3. 翻訳カスタムフックの作成

Gemini API を呼び出し、テキストの翻訳を実行するロジックを再利用可能なカスタムフックとして `hooks/useTranslation.js` に実装しました。

-   **機能**:
    -   テキストと翻訳先言語を引数に取る `translate` 関数。
    -   翻訳処理中の状態 (`isTranslating`)。
    -   翻訳結果 (`translatedText`)。
    -   エラー情報 (`error`)。
-   **モデル**: `gemini-pro` を使用。

## 4. UIコンポーネントへの組み込み

作成した `useTranslation` フックを利用して、各画面に翻訳機能を実装しました。

### `components/NewsKizi.js` (ニュース一覧の項目)
-   各ニュース記事のカードに「翻訳」ボタンを追加しました。
-   ボタンを押すと、記事のタイトルが日本語に翻訳され、表示が切り替わります。
-   翻訳中はローディングインジケーターが表示されます。
-   「原文に戻す」ボタンで元のタイトルに戻すことも可能です。

### `screens/DetailScreen.js` (ニュース詳細画面)
-   従来は `WebView` で元サイトを表示していましたが、React Native のネイティブコンポーネント（`<Text>`, `<Image>`など）で記事の内容を表示するように全面的に改修しました。
-   タイトルと本文の両方を翻訳する「日本語に翻訳」ボタンを設置しました。
-   翻訳ロジックはタイトル用と本文用でそれぞれ `useTranslation` フックを呼び出して管理しています。
-   元記事のウェブページを閲覧したいユーザーのために、「原文サイトで続きを読む」ボタンを設置し、ブラウザでリンクを開く機能も追加しました。
