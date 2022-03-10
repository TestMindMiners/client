export const Api = {
  baseUrl: "https://mindminerstestserver.herokuapp.com/",

  selectShareUrl: () => Api.baseUrl + "share/",
  selectShareByIdUrl: (id) => Api.baseUrl + "share/" + id,
  createShareUrl: () => Api.baseUrl + "share/",

  selectOperationUrl: (year) => Api.baseUrl + "operation/all/"+year,
  selectOperationByTypeUrl: (type) => Api.baseUrl + "operation/type/" + type,
  selectOperationByShareUrl:(shareId,year) =>Api.baseUrl + "operation/share/" + shareId +"/"+ year,
  selectOperationByIdUrl: (id) => Api.baseUrl + "operation/" + id,
  selectOperationYearsUrl: ()=> Api.baseUrl + "operation/dates/years",
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
