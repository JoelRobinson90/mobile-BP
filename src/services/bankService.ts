import { BankProductProps, InfoApiProps } from '@/interfaces';
import api from '@/services/apiService';

const PRODUCTS = 'products';
const VERIFICATION = 'verification';

const bankService = {
  getProducts: async (): Promise<BankProductProps[]> => {
    try {
      const path = PRODUCTS;
      const res = await api.get(path);
      return res.data.data;
    } catch {
      return [];
    }
  },
  newProduct: async (body: BankProductProps): Promise<InfoApiProps> => {
    try {
      const path = PRODUCTS;
      const res = await api.post(path, { ...body });
      return { message: res.data.message, error: false };
    } catch {
      return { message: 'Error al crear un producto', error: true };
    }
  },
  editProduct: async (body: BankProductProps, id: string): Promise<InfoApiProps> => {
    try {
      const path = `${PRODUCTS}/${id}`;
      const res = await api.post(path, { ...body }, 'PUT');
      return { message: res.data.message, error: false };
    } catch {
      return { message: 'Error al editar un producto', error: true };
    }
  },
  deleteProduct: async (id: string): Promise<InfoApiProps> => {
    try {
      const path = `${PRODUCTS}/${id}`;
      const res = await api.delete(path);
      return { message: res.data.message, error: false };
    } catch {
      return { message: 'Error al eliminar un producto', error: true };
    }
  },
  verificationProduct: async (id: string): Promise<boolean> => {
    try {
      const path = `${PRODUCTS}/${VERIFICATION}/${id}`;
      const res = await api.get(path);
      return res.data;
    } catch {
      return false;
    }
  },
};

export default bankService;
