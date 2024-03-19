import * as bcrypt from 'bcryptjs';

const _DEFAULTHASHTYPE = 10;

export const getHashPassword = async (
  password: string,
  roundsOfHashing: number = _DEFAULTHASHTYPE,
) => await bcrypt.hash(password, roundsOfHashing);

export const hashIsEqual = async (password: string, hashedPassword: string) =>
  await bcrypt.compare(password, hashedPassword);
