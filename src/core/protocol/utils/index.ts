import { CategoryType } from '../dto/get-protocol.dto';

export const formateCategory = (category: CategoryType) =>
  category === 'defualt' ? { type: 'default' } : { type: { not: 'default' } };
