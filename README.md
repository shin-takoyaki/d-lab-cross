# イベントマッチングサービス

Python（Flask）と React で構築されたイベントマッチング用のフルスタックウェブアプリケーション。

## 機能

- **ユーザー認証**: 登録とログイン機能
- **イベント管理**: イベントの作成、読み取り、更新、削除
- **ページネーション**: 一度に 20 アイテムずつイベントを閲覧
- **モダンな UI**: ニューモーフィズムとダークモードデザイン

## 技術スタック

### バックエンド

- **Python**: プログラミング言語
- **Flask**: ウェブフレームワーク
- **SQLAlchemy**: データベース操作用の ORM
- **JWT**: JSON Web Tokens による認証
- **SQLite**: データベース（PostgreSQL、MySQL などに簡単に変更可能）

### フロントエンド

- **React**: ユーザーインターフェースを構築するための JavaScript ライブラリ
- **React Router**: ナビゲーション用
- **Styled Components**: スタイリング用
- **Axios**: API リクエスト用

## Dockerを使った簡単セットアップ

### 前提条件
- Docker と Docker Compose がインストールされていること

### セットアップ手順

1. リポジトリをクローンする:
   ```
   git clone <リポジトリURL>
   cd event-matching-service
   ```

2. 環境変数ファイルを作成する:
   ```
   cp .env.example backend/.env
   ```
   
3. Docker Composeでアプリケーションを起動する:
   ```
   docker-compose up -d
   ```

4. アプリケーションにアクセスする:
   - フロントエンド: http://localhost:3000
   - バックエンドAPI: http://localhost:5000

### Dockerコンテナの管理

- コンテナの状態確認:
  ```
  docker-compose ps
  ```

- ログの確認:
  ```
  docker-compose logs -f
  ```

- コンテナの停止:
  ```
  docker-compose down
  ```

- コンテナとボリュームの削除（データベースも削除されます）:
  ```
  docker-compose down -v
  ```

## 手動セットアップ（Docker不使用）

### バックエンド

1. バックエンドディレクトリに移動：
   ```
   cd backend
   ```

2. 環境変数ファイルを作成：
   ```
   cp .env.example .env
   ```

3. 仮想環境を作成：
   ```
   python -m venv venv
   ```

4. 仮想環境を有効化：
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

5. 依存関係をインストール：
   ```
   pip install -r requirements.txt
   ```

6. データベースをセットアップ：
   ```
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

7. アプリケーションを実行：
   ```
   python run.py
   ```

### フロントエンド

1. フロントエンドディレクトリに移動：
   ```
   cd frontend
   ```

2. 依存関係をインストール：
   ```
   npm install
   ```

3. 開発サーバーを起動：
   ```
   npm start
   ```

## 使用方法

1. 新しいアカウントを登録するか、既存の認証情報でログイン
2. ホームページでイベントを閲覧
3. イベントをクリックして詳細を表示
4. 新しいイベントを作成（認証が必要）
5. 自分のイベントを編集または削除

## アクセス方法

- バックエンド API: http://localhost:5000
- フロントエンド: http://localhost:3000

## 主な API エンドポイント

- POST /api/auth/login - ログイン
- POST /api/auth/register - ユーザー登録
- GET /api/events - イベント一覧取得
- POST /api/events - イベント作成
- GET /api/events/<id> - イベント詳細取得
- PUT /api/events/<id> - イベント更新
- DELETE /api/events/<id> - イベント削除

## 開発時の注意点

### CORS設定
開発環境では、バックエンドとフロントエンドが異なるポートで動作するため、
バックエンドの CORS 設定が必要です。

requirements.txt に以下を追加：
