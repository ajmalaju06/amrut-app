let BASE_URL = "http://192.168.0.188:3000/api";
const makeRequest = (config) => {
  const url = `${BASE_URL}${config.url}`;
  let requestConfig = {};
  requestConfig = {
    method: config.method,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const { params } = config;
  if (params) {
    if (
      config.method === "POST" ||
      config.method === "PUT" ||
      config.method === "PATCH" ||
      config.method === "DELETE"
    ) {
      requestConfig.body = JSON.stringify(params);
    }
  }
  return withTimeout(
    5000,
    fetch(url, requestConfig)
      .then((response) => {
        return { status: response.status, data: response.json() };
      })
      .catch((err) => {
        console.error(err);
      })
  );
};
function withTimeout(msecs, promise) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"));
    }, msecs);
  });
  return Promise.race([timeout, promise]);
}
export const get = (url, params) => {
  return makeRequest({
    url,
    params,
    method: "GET",
  });
};
export const post = (url, params) => {
  return makeRequest({
    url,
    params,
    method: "POST",
  });
};
export const put = (url, params) => {
  return makeRequest({ url, params, method: "PUT" });
};
export const remove = (url, params) => {
  return makeRequest({ url, params, method: "DELETE" });
};
export const patch = (url, params) => {
  return makeRequest({ url, params, method: "PATCH" });
};
