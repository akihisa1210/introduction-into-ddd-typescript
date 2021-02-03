# introduction-into-ddd-typescript

成瀬允宣『ドメイン駆動設計入門 ボトムアップでわかる！ドメイン駆動設計の基本』（翔泳社、2020）のサンプルコードを TypeScript で実装します。

## Build

```
npm run build
```

## Run App

```
docker-compose up -d
docker-compose exec node bash
cd src
npm i
```

## Use CLI

```
docker-compose up -d
docker-compose exec node bash

# Help
node src/dist/main.js

# Add user
node src/dist/main.js add <userName>

# View user
node src/dist/main.js find [userName]

# Update user
node src/dist/main.js update <userName> <userName>

# Delete user
node src/dist/main.js delete <userName>
```

## Test

### Unit Test

```
npm test
```

### CLI E2E Test

```
docker-compose up -d
docker-compose exec node bash
npm test:cli
```
