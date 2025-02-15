# skygallery
はじめまして。

外部APIから取得した空の写真をコレクションできるwebアプリを作製しました。<br/>
きっかけとしては私自身空の写真を眺めるのがとても好きで、自分が好きな空の写真を一つのアプリで管理できたら嬉しいなと思い開発を始めました。<br/>
本READMEではアプリの技術スタックと機能紹介を記載します。<br/>

---
※2025/2/14時点

---

## 使用技術一覧
### フロントエンド
<img src="https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=plastic">
<img src="https://img.shields.io/badge/-Javascript-F7DF1E.svg?logo=javascript&style=plastic">

### バックエンド
<img src="https://img.shields.io/badge/-Go-76E1FE.svg?logo=go&style=plastic">

### DB
<img src="https://img.shields.io/badge/-Postgresql-336791.svg?logo=postgresql&style=plastic">
<img src="https://img.shields.io/badge/-Redis-D82C20.svg?logo=redis&style=plastic">

### CICD関連
<img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=plastic">

##　アプリ主要ページ紹介

### ログイン、新規登録
ユーザー名とパスワードを入れてユーザー登録を行います。<br>
なお、パスワードはバックエンド側でハッシュ化してDBに保存しています。<br>
<image src="https://github.com/user-attachments/assets/8f2d3143-4f6b-4ba3-a41b-ff2449359209" width="600px" /><br>
新規登録画面<br>
<image src="https://github.com/user-attachments/assets/efc8882a-7803-4c51-b80b-9329d306cb71" width="600px" /><br>

### いいね登録
外部から取得した空の写真からお気に入りのものを選んでいいねを押してマイページに保存することができます。<br>
一般的なアプリと同様にいいねを一度クリックするといいねした空の写真が登録され、もう一度クリックするといいねが解除されます。<br>
<image src="https://github.com/user-attachments/assets/2468430e-faf0-426e-b5af-3f8a235de794" width="600px" /><br>

### いいねした写真の閲覧&いいねの解除
「いいね機能」を使用して「いいね」した写真を確認することができます。<br>
<image src="https://github.com/user-attachments/assets/1093ca77-fc96-4458-b467-4311a65701c4" width="600px" /><br>


「いいね」した写真をクリックすると「いいね」を解除することもできます。<br>
<image src="https://github.com/user-attachments/assets/8eaf9c31-fa5f-4ee9-9e67-7fcf35ed31d3" width="600px" /><br>

### レスポンシブ対応

| 通常画面 | ハンバーガーメニュー&写真の表示数変更 |
|:-:|:-:|
|<image src="https://github.com/user-attachments/assets/beb00186-890b-49dd-ae76-1c8c34ddcac4" width="250px" />|<image src="https://github.com/user-attachments/assets/a2f6b89b-45b8-42a2-a788-42c427926b10" width="250px" />|

### その他
ログイン後30分以内にアクセスがないとセッションタイムアウトする仕様になっています。<br>
<image src="https://github.com/user-attachments/assets/8c72d0ac-e67f-465a-a99c-fa6097c6d5e9" width="600px" /><br>

## 環境

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| React                 | 19.0.0     |
| Go                    | 1.23       |
| Gin                   | 1.10.0     |
| PostgreSQL            | 17.2       |
| Redis                 | 7.4.2      |
| React                 | 18.2.0     |
| Docker                | 27.4.0     |
