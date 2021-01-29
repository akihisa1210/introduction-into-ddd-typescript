load '../node_modules/bats-support/load'
load '../node_modules/bats-assert/load'

@test "no subcommands print usage" {
  run node ../dist/main.js

  [ "$status" -eq 1 ]

  assert_equal "${lines[0]}" "main.js <command>"
}

@test "'find' returns empty array if no user exist" {
  run node ../dist/main.js find

  [ "$status" -eq 0 ]

  assert_equal "$output" "[]"
}

@test "'find' returns all users if no argument" {
  USER1_ID=$(node ../dist/main.js add user1 | jq ._id)
  USER2_ID=$(node ../dist/main.js add user2 | jq ._id)
  run node ../dist/main.js find

  [ "$status" -eq 0 ]

  assert_equal "$output" "[{\"_id\":${USER1_ID},\"_name\":\"user1\"},{\"_id\":${USER2_ID},\"_name\":\"user2\"}]"
}

@test "'add' creates user and 'find' returns specified user" {
  USER1_ID=$(node ../dist/main.js add user1 | jq ._id)
  run node ../dist/main.js find user1

  [ "$status" -eq 0 ]

  assert_equal "$output" "{\"_id\":${USER1_ID},\"_name\":\"user1\"}"
}

@test "'update' updates user name" {
  USER1_ID=$(node ../dist/main.js add user1 | jq ._id)
  node ../dist/main.js update user1 user1updated
  run node ../dist/main.js find user1updated

  [ "$status" -eq 0 ]

  echo output: "$output"

  assert_equal "$output" "{\"_id\":${USER1_ID},\"_name\":\"user1updated\"}"
}

@test "'delete' deletes user" {
  node ../dist/main.js add user1
  USER2_ID=$(node ../dist/main.js add user2 | jq ._id)
  node ../dist/main.js delete user1
  run node ../dist/main.js find

  [ "$status" -eq 0 ]

  echo output: "$output"

  assert_equal "$output" "[{\"_id\":${USER2_ID},\"_name\":\"user2\"}]"
}

function teardown() {
  node ./dbDrop.js
}
