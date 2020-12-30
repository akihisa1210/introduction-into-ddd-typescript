import { Program } from './Program';
import { InMemoryUserRepository } from './InMemoryUserRepository';

const inMemoryUserRepository = new InMemoryUserRepository();
const program = new Program(inMemoryUserRepository);
program.createUser('test user');
