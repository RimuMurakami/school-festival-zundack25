# 学祭クイズアプリ　〜ずんダック２５〜

## 所感

当アプリは私が初めて React コードで作成したアプリです。  
よって、ディレクトリ設計は甘く、useState がメガ盛り使われていたり、種々改善予定となっています。

ゆくゆくは公開サーバに置いて本番環境で稼働し、  
開発環境が準備できない一般の方にも使っていただけるアプリを予定しています。

<br>

# 開発環境でのテスト方法

<br>

## a25-mainpanel/backend ディレクトリ

### DB から投票状況を取得する API サーバ

```
$ node ./backend/server.js
```

<br>

## a25-mainpanel/frontend ディレクトリ

### ずんダック 25 のメインパネルを表示

```
$ pnpm dev
```

### json-server からファイナルクイズデータ取得

```
$ pnpm json-server
```

<br>

## a25-quizzes/a25-quiz-select ディレクトリ

```
$ pnpm dev
```

<br>

## a25-quizzes/a25-quiz-view ディレクトリ

```
$ pnpm dev
```

### json-server からクイズデータ取得

```
$ pnpm json-server
```

# <br>

※著作権アウトなデータは除外しています。<br>

- 例：
  - 問題ジャンルの[picture, video, music]
  - 勝利者のファイナルクイズ全般

# <br>

VOICEVOX：ずんだもん
<br>
VOICEVOX：剣崎雌雄
<br>
VOICEVOX：No.7
<br><br>
立ち絵：坂本アヒル 様

#
