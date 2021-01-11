import * as yargs from 'yargs';
import { setup } from './setup';
import { add } from './cmds/add';

setup();

yargs
  .command({
    command: 'add <name>',
    describe: 'Add a user',
    handler: (parsed: { name: string }) => {
      add(parsed.name);
    },
  })
  .demandCommand()
  .help().argv;
