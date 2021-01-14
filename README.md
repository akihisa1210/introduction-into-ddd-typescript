# introduction-into-ddd-typescript

成瀬允宣『ドメイン駆動設計入門 ボトムアップでわかる！ドメイン駆動設計の基本』（翔泳社、2020）のサンプルコードを TypeScript で実装します。

## Run App on Docker

```
docker-compose up -d
docker-compose exec node bash
cd src
npm i
```

## CLI

```
docker-compose up -d
docker-compose exec node bash
cd src
npx ts-node cli-user.ts

# Add user
npx ts-node cli-user.ts add <userName>

# View user
npx ts-node cli-user.ts find [userId]

# Update user
npx ts-node cli-user.ts update <userId> <userName>

# Delete user
npx ts-node cli-user.ts delete <userId>
```
