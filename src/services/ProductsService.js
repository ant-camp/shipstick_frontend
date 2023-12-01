import axios from 'axios'

// Create the API client
const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

//need to test this
const productService = {
  // Fetch a single product
  getProduct: async (length, width, height, weight) => {
    try {
      const response = await api.get('/products/find_by_dimensions', {
        dimension_params: { length, width, height, weight } 
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching product:", error);
      throw error;
    }
  },

};

export default productService;