# ビルドステージ
FROM node:latest as build
WORKDIR /app

# package.jsonとpackage-lock.jsonのコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションコードのコピー
COPY . .

# アプリケーションのビルド
RUN npm run build

# 実行ステージ
FROM nginx:alpine

# 日本語フォントのインストール
RUN apk add --no-cache font-noto-cjk && \
    mkdir -p /usr/share/fonts/noto && \
    ln -s /usr/share/fonts/noto-cjk/* /usr/share/fonts/noto/ && \
    fc-cache -fv

# ビルドステージからビルドされたファイルをコピー
COPY --from=build /app/build /usr/share/nginx/html

# Nginxの設定をコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# タイムゾーンを日本に設定
ENV TZ=Asia/Tokyo

# ポートの公開
EXPOSE 80

# Nginxの起動
CMD ["nginx", "-g", "daemon off;"] 