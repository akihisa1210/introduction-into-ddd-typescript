import * as yargs from 'yargs';
import { setup } from './setup';
import { add } from './cmds/add';
import { find } from './cmds/find';
import { update } from './cmds/update';
import { deleteCmd } from './cmds/delete';

setup();

yargs
  .command({
    command: 'add <name>',
    describe: 'Add a user',
    handler: (parsed: { name: string }) => {
      add(parsed.name);
    },
  })
  .command({
    command: 'find [userId]',
    describe: 'Find a user or all users',
    handler: (parsed: { userId: string }) => {
      find(parsed.userId);
    },
  })
  .command({
    command: 'update <userId> <userName>',
    describe: 'Update the name of a user',
    handler: (parsed: { userId: string; userName: string }) => {
      update(parsed.userId, parsed.userName);
    },
  })
  .command({
    command: 'delete <userId>',
    describe: 'Delete a user by the id',
    handler: (parsed: { userId: string }) => {
      deleteCmd(parsed.userId);
    },
  })
  .demandCommand()
  .help().argv;
