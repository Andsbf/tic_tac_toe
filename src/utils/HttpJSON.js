import { DOMAIN, API_ADDRESS } from '../env'

export const HttpJSON = {
  headers: new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'}),

  handleErrors(response){
    if (!response.ok) { throw Error(response.statusText) }
    return response.json();
  },

  GET(path, { accessToken, username }) {
    const myInit = {
      method: 'GET',
      headers: Object.assign({},this.headers, { "Authorization": ("Bearer " + accessToken) }),
    };

    const queryString = '?domain=' + DOMAIN + '&username=' + username;
    const url = API_ADDRESS + path + queryString;

    return (
        fetch(url , myInit)
          .then(this.handleErrors)
      )
  },

  POST(path, body, { accessToken }) {
    let header = this.headers;

    if (accessToken) {
      header = Object.assign({},this.headers, { "Authorization": ("Bearer " + accessToken) })
    }

    const myInit = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(body)
    };

    return (
      fetch(API_ADDRESS + path, myInit)
        .then(this.handleErrors)
    )
  },

    PUT(path, body, { accessToken }) {

    let header = this.headers;

    if (accessToken) {
      header = Object.assign({},this.headers, { "Authorization": ("Bearer " + accessToken) })
    }

    const myInit = {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(body)
    };

    return (
      fetch(API_ADDRESS + path, myInit)
        .then(this.handleErrors)
    )
  }
}
