import { post } from "./requestManager";

export default {
  async saveRoutes(values) {
    try {
      const { data } = await post("/save-routes", values);
      return data;
    } catch (error) {
      return error;
    }
  },

  async getRoutes() {
    try {
      const { data } = await post("/get-routes");
      return data;
    } catch (error) {
      return error;
    }
  },
};
