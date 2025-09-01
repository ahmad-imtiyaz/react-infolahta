import api from "./api";

export const assetService = {
  // Get all assets
  getAssets: async (filters = {}) => {
    try {
      const response = await api.get("/assets", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }
  },

  // Get asset by ID
  getAssetById: async (id) => {
    try {
      const response = await api.get(`/assets/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching asset:", error);
      throw error;
    }
  },

  // Create new asset
  createAsset: async (assetData) => {
    try {
      const response = await api.post("/assets", assetData);
      return response.data;
    } catch (error) {
      console.error("Error creating asset:", error);
      throw error;
    }
  },

  // Update asset
  updateAsset: async (id, assetData) => {
    try {
      const response = await api.put(`/assets/${id}`, assetData);
      return response.data;
    } catch (error) {
      console.error("Error updating asset:", error);
      throw error;
    }
  },

  // Delete asset
  deleteAsset: async (id) => {
    try {
      const response = await api.delete(`/assets/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting asset:", error);
      throw error;
    }
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get("/assets/dashboard-stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  },
};
