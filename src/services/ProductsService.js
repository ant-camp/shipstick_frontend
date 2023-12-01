import axios from 'axios'

// Create the API client
const api = axios.create({
  baseURL: 'http://localhost:3001/',
});

const productService = {
  // Fetch a single product
  getProduct: async (length, width, height, weight) => {
    try {
      const response = await api.get('/products/find_by_dimensions', {
        params: {
          length, 
          width, 
          height, 
          weight
        }
      });

      return response.data;
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 404) {
        // If the error is 404
        console.error("Error fetching product:", error.response.data.error);
        return { error: error.response.data.error };
      } else {
        // Other Errors
        console.error("Error fetching product:", error.message || "An error occurred");
        throw error;
      }
    }
  },
};

export default productService;