# Next.js CMS Application

最小限の機能を持つヘッドレスCMSアプリケーション。

## 機能要件

### 認証機能
- NextAuth.jsを使用した認証システム
  - メールアドレスとパスワードによるログイン
  - セッション管理
  - 保護されたルートへのアクセス制御

### 今後実装予定の機能
- コンテンツ管理
- ユーザー管理
- メディアライブラリ
- APIエンドポイント

## 技術スタック

- Next.js (App Router)
- TypeScript
- NextAuth.js
- Prisma (ORM)
- PostgreSQL
- Tailwind CSS

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/miuradaiki/next-cms-app.git
cd next-cms-app
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
```bash
# .env.local
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="postgresql://..."
```

4. データベースのセットアップ
```bash
npx prisma migrate dev
```

5. 開発サーバーの起動
```bash
npm run dev
```

## ライセンス

MIT