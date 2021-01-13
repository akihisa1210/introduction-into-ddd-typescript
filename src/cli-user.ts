import * as yargs from 'yargs';
import { setup } from './setup';
import { add } from './cmds/add';
import { find } from './cmds/find';
import { update } from './cmds/update';

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
  .demandCommand()
  .help().argv;
