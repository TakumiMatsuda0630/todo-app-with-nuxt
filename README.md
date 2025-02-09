# Todo リスト 管理アプリ
本アプリケーションは、リポジトリオーナーの勉強用に開発したTodoアプリケーションです。  
本アプリケーションは以下のライブラリを用いて開発しています。  
* Nuxt: 3.15.4

本アプリケーションは、Nuxtを用いたアプリケーション開発を試すことを目的に実装しています。  
そのため、必要最低限の機能のみ備えています。

## 注意事項
本アプリケーションでは、Todoリストの永続先としてローカルストレージを使用しています。  
そのため、Todoリストを作成後にブラウザのウィンドウを閉じると作成したTodoリストは削除されます。

## Setup

Make sure to install dependencies:

```bash
# npm
npm ci
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

