@test "no subcommands print usage" {
  dropDb
  run npx ts-node -r tsconfig-paths/register ../src/cli-user.ts
  [ "$status" -eq 1 ]
  echo output: "$output"
  [ "${lines[0]}" = "cli-user.ts <command>" ]
}

@test "'find' returns empty array if no user exist" {
  dropDb
  run npx ts-node -r tsconfig-paths/register ../src/cli-user.ts find
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "[]" ]
}

@test "'find' returns all users if no argument" {
  dropDb
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts add user1 user1id
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts add user2 user2id
  run npx ts-node -r tsconfig-paths/register ../src/cli-user.ts find
  [ "$status" -eq 0 ]
  echo "$output"
  [ "$output" = "[{\"_id\":\"user1id\",\"_name\":\"user1\"},{\"_id\":\"user2id\",\"_name\":\"user2\"}]" ]
}

@test "'add' creates user and 'find' returns specified user" {
  dropDb
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts add user1 user1id
  run npx ts-node -r tsconfig-paths/register ../src/cli-user.ts find user1id
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "{\"_id\":\"user1id\",\"_name\":\"user1\"}" ]
}

@test "'update' updates user name" {
  dropDb
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts add user1 user1id
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts update user1id updatedName
  run npx ts-node -r tsconfig-paths/register ../src/cli-user.ts find user1id
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "{\"_id\":\"user1id\",\"_name\":\"updatedName\"}" ]
}

@test "'delete' deletes user" {
  dropDb
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts add user1 user1id
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts add user2 user2id
  npx ts-node -r tsconfig-paths/register ../src/cli-user.ts delete user1id
  run npx ts-node -r tsconfig-paths/register ../src/cli-user.ts find
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "[{\"_id\":\"user2id\",\"_name\":\"user2\"}]" ]
}

function dropDb() {
  npx ts-node ../src/utils/dbDrop.ts
}
