import { post } from "./requestManager";

export default {
  async saveEmployee(values) {
    try {
      const { data } = await post("/save-employee", values);
      return data;
    } catch (error) {
      return error;
    }
  },
  async getEmployee() {
    try {
      const { data } = await post("/get-employee");
      return data;
    } catch (error) {
      return error;
    }
  },
};
