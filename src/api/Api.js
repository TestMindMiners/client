export const Api = {
  baseUrl: "http://localhost:3001/",

  selectShareUrl: () => Api.baseUrl + "share/",
  selectShareByIdUrl: (id) => Api.baseUrl + "share/" + id,
  createShareUrl: () => Api.baseUrl + "share/",

  selectOperationUrl: () => Api.baseUrl + "operation/",
  selectOperationByTypeUrl: (type) => Api.baseUrl + "operation/type/" + type,
  selectOperationByShareUrl:(shareId) =>Api.baseUrl + "operation/share/" + shareId,
  selectOperationByIdUrl: (id) => Api.baseUrl + "operation/" + id,
  createOperationUrl: () => Api.baseUrl + "operation/",


  GetRequest: (url) => {
    return fetch(url, {
      method: "GET",
    });
  },

  PostRequest: (url, body) => {
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(body),
    });
  },

};
