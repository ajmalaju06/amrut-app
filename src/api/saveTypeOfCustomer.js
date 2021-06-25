import { post } from "./requestManager";

export default {
  async saveTypeOfCustomer(values) {
    try {
      const { data } = await post("/save-cutomer-type", values);
      return data;
    } catch (error) {
      return error;
    }
  },
  async getTypeOfCustomer() {
    try {
      const { data } = await post("/get-cutomer-type");
      return data;
    } catch (error) {
      return error;
    }
  },
};
