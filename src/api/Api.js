export const Api = {
  baseUrl: "http://localhost:3001/",

  // Share urls

  selectUrl: () => Api.baseUrl + "share/",
  selectByIdUrl: (id) => Api.baseUrl + "share/" + id,
  createUrl: () => Api.baseUrl + "share/",

  // Operation url

  selectUrl: () => Api.baseUrl + "operation/",
  selectByTypeUrl: (type) => Api.baseUrl + "operation/type/" + type,
  selectByIdUrl: (id) => Api.baseUrl + "operation/" + id,
  createUrl: () => Api.baseUrl + "operation/",

  PostRequest: (url, body) => {
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(body),
    });
  },

  GetRequest: (url) => {
    return fetch(url, {
      method: "GET",
    });
  },
};
