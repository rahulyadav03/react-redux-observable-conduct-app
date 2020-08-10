import axios from "axios";

export function fetchPost(url, data) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      authorization: `Token ${localStorage.getItem("token")}`
    },
    crossdomain: true
  };

  return axios
    .post(url, data, config)
    .then(response => {
      if (response.status === 200) return response.data;
      else return [];
    })
    .catch(error => {
      return [];
    });
}

//for login only
export function fetchLogin(url, data) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
    },
    crossdomain: true
  };

  return axios
    .post(url, data, config)
    .then(response => {
      if (response.status === 200) return response.data;
      else return [];
    })
    .catch(error => {
      return error.response.data;
    });
}

export function fetchPut(url, data) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT",
      authorization: `Token ${localStorage.getItem("token")}`
    },
    crossdomain: true
  };

  return axios
    .put(url, data, config)
    .then(response => {
      if (response.status === 200) return response.data;
      else return [];
    })
    .catch(error => {
      return error.response.data;
    });
}

export function fetchGet(url) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      authorization: `Token ${localStorage.getItem("token")}`
    },
    crossdomain: true
  };

  return axios
    .get(url, config)
    .then(response => {
      if (response.status === 200) return response.data;
      else return [];
    })
    .catch(error => {
      return error.response.data;
    });
}

export function fetchGetAll(url) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
    },
    crossdomain: true
  };

  return axios
    .get(url, config)
    .then(response => {
      if (response.status === 200) return response.data;
      else return [];
    })
    .catch(error => {
      return error.response.data;
    });
}

export function deleteAPI(url) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE",
      authorization: `Token ${localStorage.getItem("token")}`
    },
    crossdomain: true
  };

  return axios
    .delete(url, config)
    .then(response => {
      if (response.status === 200) return response.data;
      else return [];
    })
    .catch(error => {
      return error.response.data;
    });
}
