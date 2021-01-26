@test "no subcommands print usage" {
  dropDb
  run node ../dist/main.js
  [ "$status" -eq 1 ]
  echo output: "$output"
  [ "${lines[0]}" = "main.js <command>" ]
}

@test "'find' returns empty array if no user exist" {
  dropDb
  run node ../dist/main.js find
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "[]" ]
}

@test "'find' returns all users if no argument" {
  dropDb
  node ../dist/main.js add user1 user1id
  node ../dist/main.js add user2 user2id
  run node ../dist/main.js find
  [ "$status" -eq 0 ]
  echo "$output"
  [ "$output" = "[{\"_id\":\"user1id\",\"_name\":\"user1\"},{\"_id\":\"user2id\",\"_name\":\"user2\"}]" ]
}

@test "'add' creates user and 'find' returns specified user" {
  dropDb
  node ../dist/main.js add user1 user1id
  run node ../dist/main.js find user1id
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "{\"_id\":\"user1id\",\"_name\":\"user1\"}" ]
}

@test "'update' updates user name" {
  dropDb
  node ../dist/main.js add user1 user1id
  node ../dist/main.js update user1id updatedName
  run node ../dist/main.js find user1id
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "{\"_id\":\"user1id\",\"_name\":\"updatedName\"}" ]
}

@test "'delete' deletes user" {
  dropDb
  node ../dist/main.js add user1 user1id
  node ../dist/main.js add user2 user2id
  node ../dist/main.js delete user1id
  run node ../dist/main.js find
  [ "$status" -eq 0 ]
  echo output: "$output"
  [ "$output" = "[{\"_id\":\"user2id\",\"_name\":\"user2\"}]" ]
}

function dropDb() {
  node ./dbDrop.js
}
