import { BankProductProps } from '@/interfaces';

export const searchProducts = (data: BankProductProps[], query: string) => {
  return data.filter((item) => {
    return Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase()),
    );
  });
};
