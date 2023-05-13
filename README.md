# 開発環境構築

## 必要なもの

・VSCode (その他でも可だが、本ページでは VSCode 基準で手順を記載します)
・Node.js 16

## アプリ立上

### dev 動作時

```
yarn
yarn dev
```

### production build 時

```
yarn
yarn build
yarn start
```

### docker container

```
yarn
yarn build
docker-compose build
docker-compose up -d
```

## VSCode 設定

### ESLint/Prettier を設定

1.拡張機能のインストール
[ESLint(ESLint 拡張機能)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
[Prettier - Code formatter(Prettier 拡張機能)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

# Appendix:アプリ作成

https://nextjs-ja-translation-docs.vercel.app/docs/getting-started の手順に従ったセットアップ

## next.js with typescript 立上

```
$ yarn create next-app --typescript
What is your project named? > next-tmp
Would you like to use ESLint with this project? > Yes
Would you like to use `src/` directory with this project? > Yes
Would you like to use experimental `app/` directory with this project? > No
```

## パッケージ追加

```
$ yarn add -D prettier eslint-config-prettier // コード整形,統一化
$ yarn add react-hook-form // フォームバリデーション
$ yarn add react-datepicker @types/react-datepicker // カレンダーUI
$ yarn add react-icons // アイコン(パスワードの目, DLアイコン等)
```

## tailwind.css 導入

参考：https://zenn.dev/shimakaze_soft/articles/0ce52691b6fc3e

```
$ yarn add -D tailwindcss postcss autoprefixer postcss-nested
$ yarn tailwindcss init -p // tailwind.config.js, postcss.config.js 最小構成を生成
$ yarn add -D eslint-plugin-tailwindcss
$ yarn add -D prettier-plugin-tailwindcss // クラス自動並替
$ yarn add tailwind-override // tailwind クラスが重複した場合は後ろに適用したものを優先する
```

$ yarn add -D lint-staged husky // コミット前に自動で linter, prettier を通す
後の手続きはリンク先参照。 https://fwywd.com/tech/husky-setup
ファイル編集は commit log の確認にお任せするとして、ここには叩いたコマンドのみ記載
$ yarn husky install
$ yarn husky add .husky/pre-commit "yarn lint-staged"

## その他 開発環境整備用

```
$ yarn add -D lint-staged husky // コミット前に自動でlinter, prettierを通す
後の手続きはリンク先参照。 https://fwywd.com/tech/husky-setup
ファイル編集はcommit logの確認にお任せするとして、ここには叩いたコマンドのみ記載
$ yarn husky install
$ yarn husky add .husky/pre-commit "yarn lint-staged"
```