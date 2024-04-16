import { CategoryType } from '../dto/get-protocal.dto';

export const formateCategory = (category: CategoryType) =>
  category === 'defualt' ? { type: 'default' } : { type: { not: 'default' } };
