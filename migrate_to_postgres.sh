#!/bin/bash

# PostgreSQLへの移行スクリプト
echo "Event Matching ServiceをPostgreSQLに移行します..."

# 環境変数ファイルの確認
if [ ! -f .env ]; then
  echo ".envファイルが見つかりません。.env.exampleからコピーします..."
  cp .env.example .env
  echo ".envファイルを作成しました。必要に応じて編集してください。"
fi

# Dockerコンテナの停止
echo "既存のコンテナを停止しています..."
docker-compose down

# PostgreSQLコンテナの起動
echo "PostgreSQLコンテナを起動しています..."
docker-compose up -d postgres

# PostgreSQLが起動するまで待機
echo "PostgreSQLの起動を待機しています..."
sleep 10

# バックエンドコンテナの起動
echo "バックエンドコンテナを起動しています..."
docker-compose up -d backend

# マイグレーションの実行
echo "データベースマイグレーションを実行しています..."
sleep 5

# マイグレーションディレクトリの確認
if [ -d "backend/migrations" ]; then
  echo "既存のマイグレーションディレクトリを削除します..."
  docker-compose exec backend rm -rf migrations
fi

# マイグレーションの初期化
echo "マイグレーションを初期化しています..."
docker-compose exec backend flask db init

# マイグレーションファイルの作成
echo "マイグレーションファイルを作成しています..."
docker-compose exec backend flask db migrate -m "Initial PostgreSQL migration"

# マイグレーションの適用
echo "マイグレーションを適用しています..."
docker-compose exec backend flask db upgrade

# フロントエンドコンテナの起動
echo "フロントエンドコンテナを起動しています..."
docker-compose up -d frontend

echo "移行が完了しました！"
echo "アプリケーションは以下のURLでアクセスできます："
echo "フロントエンド: http://localhost:3000"
echo "バックエンドAPI: http://localhost:5010"
echo ""
echo "詳細な情報は POSTGRES_MIGRATION.md を参照してください。" 