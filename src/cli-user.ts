import * as yargs from 'yargs';
import { setup } from './setup';
import { add } from './cmds/add';
import { find } from './cmds/find';

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
    command: 'find <userId>',
    describe: 'Find a user by the id of the user',
    handler: (parsed: { userId: string }) => {
      find(parsed.userId);
    },
  })
  .demandCommand()
  .help().argv;
