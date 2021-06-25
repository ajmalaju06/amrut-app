import { post } from "./requestManager";

export default {
  async saveCustomer(values) {
    try {
      const { data } = await post("/save-customer", values);
      return data;
    } catch (error) {
      return error;
    }
  },
};
