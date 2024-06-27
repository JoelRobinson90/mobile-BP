import api from '../../src/services/apiService';
import bankService from '../../src/services/bankService';

jest.mock('../../src/services/apiService');

describe('bankService', () => {
  describe('getProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      api.get.mockResolvedValueOnce({ data: { data: mockProducts } });

      const products = await bankService.getProducts();
      expect(products).toEqual(mockProducts);
    });

    it('should return an empty array on failure', async () => {
      api.get.mockRejectedValueOnce(new Error('API Error'));

      const products = await bankService.getProducts();
      expect(products).toEqual([]);
    });
  });

  describe('newProduct', () => {
    it('should create a new product successfully', async () => {
      const mockProduct = { id: '1', name: 'New Product' };
      api.post.mockResolvedValueOnce({ data: { message: 'Product created successfully' } });

      const result = await bankService.newProduct(mockProduct);
      expect(result).toEqual({ message: 'Product created successfully', error: false });
    });

    it('should return an error message on failure', async () => {
      const mockProduct = { id: '2', name: 'Another Product' };
      api.post.mockRejectedValueOnce(new Error('API Error'));

      const result = await bankService.newProduct(mockProduct);
      expect(result).toEqual({ message: 'Error al crear un producto', error: true });
    });
  });

  describe('editProduct', () => {
    it('should edit a product successfully', async () => {
      const mockProduct = { id: '1', name: 'Updated Product' };
      const mockId = '1';
      api.post.mockResolvedValueOnce({ data: { message: 'Product updated successfully' } });

      const result = await bankService.editProduct(mockProduct, mockId);
      expect(result).toEqual({ message: 'Product updated successfully', error: false });
    });

    it('should return an error message on failure', async () => {
      const mockProduct = { id: '2', name: 'Another Product' };
      const mockId = '2';
      api.post.mockRejectedValueOnce(new Error('API Error'));

      const result = await bankService.editProduct(mockProduct, mockId);
      expect(result).toEqual({ message: 'Error al editar un producto', error: true });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const mockId = '1';
      api.delete.mockResolvedValueOnce({ data: { message: 'Product deleted successfully' } });

      const result = await bankService.deleteProduct(mockId);
      expect(result).toEqual({ message: 'Product deleted successfully', error: false });
    });

    it('should return an error message on failure', async () => {
      const mockId = '2';
      api.delete.mockRejectedValueOnce(new Error('API Error'));

      const result = await bankService.deleteProduct(mockId);
      expect(result).toEqual({ message: 'Error al eliminar un producto', error: true });
    });
  });

  describe('verificationProduct', () => {
    it('should verify a product successfully', async () => {
      const mockId = '1';
      api.get.mockResolvedValueOnce({ data: true });

      const result = await bankService.verificationProduct(mockId);
      expect(result).toEqual(true);
    });

    it('should return false on failure', async () => {
      const mockId = '2';
      api.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await bankService.verificationProduct(mockId);
      expect(result).toEqual(false);
    });
  });
});
