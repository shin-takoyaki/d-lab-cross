# イベントマッチングサービスバックエンド

これは Flask で構築されたイベントマッチングサービスのバックエンドです。

## 機能

- ユーザー認証（登録、ログイン）
- イベント管理（作成、読み取り、更新、削除）
- イベント一覧のページネーション（1 ページ 20 アイテム）

## セットアップ

1. 仮想環境を作成する：
   python -m venv venv

2. 仮想環境を有効化する：

- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

3. 依存関係をインストールする：
   pip install -r requirements.txt

4. データベースをセットアップする：
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade

5. アプリケーションを実行する：
   python run.py

## API エンドポイント

### 認証

- `POST /api/auth/register` - 新規ユーザーを登録する
- `POST /api/auth/login` - ユーザーをログインさせる

### イベント

- `GET /api/events` - すべてのイベントを取得する（ページネーション、1 ページ 20 件）
- `GET /api/events/<event_id>` - 特定のイベントを取得する
- `POST /api/events` - 新規イベントを作成する（認証が必要）
- `PUT /api/events/<event_id>` - イベントを更新する（認証が必要）
- `DELETE /api/events/<event_id>` - イベントを削除する（認証が必要）

## 環境変数

ルートディレクトリに以下の変数を含む`.env`ファイルを作成してください：
SECRET_KEY=your_secret_key_here
DATABASE_URI=sqlite:///event_matching.db
JWT_SECRET_KEY=your_jwt_secret_key_here
