FROM python:3.9-slim

WORKDIR /app

# 依存関係のインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install gunicorn  # gunicornをインストール

# マイグレーションディレクトリを先にコピー
COPY migrations ./migrations/

# アプリケーションコードのコピー
COPY . .

# 環境変数の設定
ENV FLASK_APP=run.py
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1
# 日本語ロケールの設定
ENV LANG=ja_JP.UTF-8
ENV LC_ALL=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# 日本語ロケールのインストール
RUN apt-get update && apt-get install -y locales && \
    sed -i -e 's/# ja_JP.UTF-8 UTF-8/ja_JP.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen ja_JP.UTF-8 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 非rootユーザーの作成と権限設定
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /app

USER appuser

# ポートの公開
EXPOSE 5000

# マイグレーションの実行とアプリケーションの起動
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"] 