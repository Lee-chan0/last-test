import axios from 'axios';


const BASE_URL = 'http://localhost:3001/api';

// users
export async function signupFunc(userInfo) {
  const response = await axios.post(`${BASE_URL}/signup`, userInfo, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export async function loginFunc(userInfo) {
  const response = await axios.post(`${BASE_URL}/signin`, userInfo, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data;
}

export async function findUsers() {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
}

export async function findUser() {
  const response = await axios.get(`${BASE_URL}/user`, {
    headers: {
      'Authorization': `${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

// categories
export async function getCategories() {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
}

// articles
export async function getVideoArticle(articleId) {
  const response = await axios.get(`${BASE_URL}/videoArticles/${articleId}`)
  return response.data;
}

export async function getVideoArticles(limit) {
  if (!limit) {
    const response = await axios.get(`${BASE_URL}/videoArticles`);
    return response.data;
  } else {
    const response = await axios.get(`${BASE_URL}/videoArticles?limit=${limit}`);
    return response.data;
  }
}

export async function getArticles() {
  const response = await axios.get(`${BASE_URL}/articles`);
  return response.data;
}

export async function getIncludeVideoArticles() {
  const response = await axios.get(`${BASE_URL}/articles/videos`)
  return response.data;
}

export async function getArticle(articleId) {
  const response = await axios.get(`${BASE_URL}/article/${articleId}`);
  return response.data;
}

export async function createArticle(formData) {
  const response = await axios.post(`${BASE_URL}/article`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${localStorage.getItem('token')}`
    }
  })
  return response.data;
}

export async function updateArticle(formData, articleId) {
  const respoonse = await axios.patch(`${BASE_URL}/article/${articleId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${localStorage.getItem('token')}`
    }
  });
  return respoonse.data;
}

export async function deleteArticle(articleId) {
  const response = await axios.delete(`${BASE_URL}/article/${articleId}`, {
    headers: {
      'Authorization': `${localStorage.getItem("token")}`
    }
  })
  return response.data;
}

export async function getTodayArticle(limit = 5) {
  const response = await axios.get(`${BASE_URL}/articles/today?limit=${limit}`);
  return response.data;
}

export async function getTopArticles(limit = 5) {
  const response = await axios.get(`${BASE_URL}/articles/top?limit=${limit}`);
  return response.data;
}