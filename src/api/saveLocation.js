import { post } from "./requestManager";

export default {
  async saveLocation(values) {
    try {
      const { data } = await post("/save-location", values);
      return data;
    } catch (error) {
      return error;
    }
  },

  async getLocation() {
    try {
      const { data } = await post("/get-location");
      return data;
    } catch (error) {
      return error;
    }
  },
};
