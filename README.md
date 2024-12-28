# Next.js CMS Application

- 最小限の機能を持つヘッドレスCMSアプリケーション
- **このアプリはClaudeのMCPを使い作成しました**
  - MCPでGitHubに接続し、リポジトリ作成から行っています

## 機能要件

### 認証機能 (実装済み)
- NextAuth.jsを使用した認証システム
  - メールアドレスとパスワードによるログイン
  - セッション管理
  - 保護されたルートへのアクセス制御
  - ログアウト機能

### 今後実装予定の機能
- コンテンツ管理
  - 記事の作成、編集、削除
  - カテゴリー管理
  - タグ管理
- ユーザー管理
  - ユーザーの追加、編集、削除
  - ロール管理（管理者、編集者、投稿者）
- メディアライブラリ
  - 画像のアップロード、管理
  - 画像の最適化
- APIエンドポイント
  - RESTful API
  - コンテンツの取得、更新

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- NextAuth.js - 認証システム
- Prisma (ORM)
- PostgreSQL - メインデータベース
- Tailwind CSS - スタイリング
- Zod - バリデーション
- React Hook Form - フォーム管理

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
npx prisma generate
npx prisma migrate dev
```

5. 開発サーバーの起動
```bash
npm run dev
```

## プロジェクト構造

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── LogoutButton.tsx
│   └── ui/
├── lib/
│   ├── auth.ts
│   └── prisma.ts
└── prisma/
    └── schema.prisma
```

## ライセンス

MIT
