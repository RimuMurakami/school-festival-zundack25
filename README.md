# 学祭用クイズアプリ　〜ずんダック２５〜

![panel](https://github.com/RimuMurakami/school-festival-zundack25/assets/118171336/92c737db-6943-46c4-bd94-c6a2344a1653)
![zundack3](https://github.com/RimuMurakami/school-festival-zundack25/assets/118171336/d8aa32ea-09ad-4ca3-954a-bd75bc2753ac)
![zundack2](https://github.com/RimuMurakami/school-festival-zundack25/assets/118171336/d9568bfb-59ed-4308-9b88-91b006e8fbee)

## 説明

某有名 TV 番組のパネルクイズを模した学祭用のクイズアプリです。  
以下、主な機能

- 早押し回答（Joytokey 等を使用し、３つのコントローラを使用）
- ファイナルパネルクイズ（獲得パネル枚数が最も多かった人が挑戦）
- 文章題（６ジャンル）、画像題、イントロ題、映像題といったバラエティに富んだ問題形式
- クイズの進行スピードを調整する「ダブルチャンス」
- クイズを盛り上げる「アタックチャンス」
- 外部 API と連携した投票表示（DB 操作の backend は未アップロード）
- ずんだもんが可愛い

## 所感

このクイズアプリは私が初めての React で作成したアプリです。  
よって、ディレクトリ設計が甘かったり、useState がメガ盛り使われていたり、その他本番に間に合わせるための力技が種々あり、諸々改善予定となっています。

ユーザ側から問題追加機能等を実装し、ゆくゆくは公開サーバに置いて本番環境で稼働予定。  
開発環境が準備できない一般の方にも使っていただけるアプリを予定しています。

# <br>

※入場無料の学祭で実施したので、その際に使用した著作権アウトなデータは除外しています。<br>

- 例：
  - 問題ジャンルの[picture, video, music]
  - 勝利者のファイナルクイズ全般

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

VOICEVOX：ずんだもん
<br>
VOICEVOX：剣崎雌雄
<br>
VOICEVOX：No.7
<br><br>
立ち絵：坂本アヒル 様

#
