import axios from "axios";

export const BASE_URL = 'http://localhost:5007/api/';

export const fetchAll = async (endpoint, id=null) => {
  let url = BASE_URL + endpoint;
  if (id !== null) {
    url += `${id}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const fetchById = async (endpoint, id) => {
  const response = await axios.get(BASE_URL + endpoint + '/' + id);
  return response.data;
};

export const fetchByMail = async (endpoint, email) => {
    const response = await axios.get(BASE_URL + endpoint + '/email/' + email + '/');
    return response.data;
  };

export const create = async (endpoint, data) => {
  const response = await axios.post(BASE_URL + endpoint + '/', data);
  return response.data;
};

export const update = async (endpoint, id, data) => {
  const response = await axios.put(BASE_URL + endpoint + '/' + id + '/', data);
  return response.data;
};

export const remove = async (endpoint, id) => {
  const response = await axios.delete(BASE_URL + endpoint + '/' + id + '/');
  return response.data;
};