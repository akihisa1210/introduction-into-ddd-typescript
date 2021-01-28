export type UserGetInfoCommand = {
  kind: 'userId' | 'userName';
  value: string;
};
