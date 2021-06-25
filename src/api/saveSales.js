import { post } from "./requestManager";

export default {
  async saveSales(values) {
    try {
      const { data } = await post("/save-sales", values);
      return data;
    } catch (error) {
      return error;
    }
  },
};
