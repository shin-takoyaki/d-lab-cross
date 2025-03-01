# PostgreSQLへの移行手順

このドキュメントでは、Event Matching ServiceのデータベースをSQLiteからPostgreSQLに移行する手順を説明します。

## 前提条件

- Dockerとdocker-composeがインストールされていること
- プロジェクトのルートディレクトリにいること

## 手順

### 1. 環境変数の設定

`.env`ファイルを作成し、必要な環境変数を設定します。`.env.example`ファイルをコピーして使用できます：

```bash
cp .env.example .env
```

必要に応じて、`.env`ファイル内の値（特にパスワードなど）を変更してください。

### 2. PostgreSQLコンテナの起動

```bash
docker-compose up -d postgres
```

これにより、PostgreSQLデータベースのコンテナが起動します。

### 3. データベースマイグレーションの実行

バックエンドコンテナを起動し、マイグレーションを実行します：

```bash
# バックエンドコンテナを起動
docker-compose up -d backend

# マイグレーションの初期化（初回のみ）
docker-compose exec backend flask db init

# マイグレーションファイルの作成
docker-compose exec backend flask db migrate -m "Initial migration"

# マイグレーションの適用
docker-compose exec backend flask db upgrade
```

### 4. アプリケーションの起動

すべてのサービスを起動します：

```bash
docker-compose up -d
```

## トラブルシューティング

### データベース接続エラー

接続エラーが発生した場合は、以下を確認してください：

1. PostgreSQLコンテナが実行中であること：
   ```bash
   docker-compose ps postgres
   ```

2. 環境変数が正しく設定されていること：
   ```bash
   docker-compose exec backend env | grep DATABASE_URI
   ```

3. バックエンドログでエラーメッセージを確認：
   ```bash
   docker-compose logs -f backend
   ```

### マイグレーションエラー

マイグレーションエラーが発生した場合：

1. マイグレーションディレクトリを削除して再初期化：
   ```bash
   docker-compose exec backend rm -rf migrations
   docker-compose exec backend flask db init
   docker-compose exec backend flask db migrate -m "Fresh migration"
   docker-compose exec backend flask db upgrade
   ```

## データの移行（オプション）

既存のSQLiteデータベースからデータを移行する必要がある場合は、以下の手順を実行します：

1. SQLiteデータベースからデータをエクスポート（CSVなど）
2. PostgreSQLにデータをインポート

詳細な手順については、プロジェクト管理者にお問い合わせください。 