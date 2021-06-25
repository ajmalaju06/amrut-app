import { post } from "./requestManager";

export default {
  async loginUser(values) {
    try {
      const { data } = await post("/login", values);
      return data;
    } catch (error) {
      return error;
    }
  },
};
