import axios from 'axios';

// const BASE_URL = 'http://localhost:3001/api';
const BASE_URL = 'https://astrab.shop/api';

// axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 모든 요청에 credentials(쿠키 등) 포함
});

// users
export async function signupFunc(userInfo) {
  const response = await axiosInstance.post('/signup', userInfo, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function loginFunc(userInfo) {
  const response = await axiosInstance.post('/signin', userInfo, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function findUsers() {
  const response = await axiosInstance.get('/users');
  return response.data;
}

export async function findUser() {
  try {
    const response = await axiosInstance.get('/user', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (e) {
    return { hasToken: false };
  }
}

export async function verifyToken() {
  try {
    const response = await axiosInstance.get('/verify/token', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (e) {
    return { hasToken: false };
  }
}

// categories
export async function getCategories() {
  const response = await axiosInstance.get('/categories');
  return response.data;
}

// articles
export async function getTotalArticles() {
  const response = await axiosInstance.get('/total/articles');
  return response.data;
}

export async function getViewMoreArticles({ pageParam }) {
  const response = await axiosInstance.get(`/articles/pageNation?pageParam=${pageParam}&limit=10`);
  return response.data;
}

export async function getVideoArticle(articleId) {
  const response = await axiosInstance.get(`/videoArticles/${articleId}`);
  return response.data;
}

export async function getVideoArticles(limit) {
  if (!limit) {
    const response = await axiosInstance.get('/videoArticles');
    return response.data;
  } else {
    const response = await axiosInstance.get(`/videoArticles?limit=${limit}`);
    return response.data;
  }
}

export async function getCategoryByArticles(pageParam, id) {
  const response = await axiosInstance.get(`/articles/category-list/${id}?pageParam=${pageParam}&limit=5`);
  return response.data;
}

export async function getPageVideos({ pageParam }) {
  const response = await axiosInstance.get(`/articles/page-videos?pageParam=${pageParam}&limit=9`);
  return response.data;
}

export async function getArticles() {
  const response = await axiosInstance.get('/articles');
  return response.data;
}

export async function getIncludeVideoPagination({ pageParam }) {
  const response = await axiosInstance.get(`/articles/includeVideo/pagination?page=${pageParam}&limit=10`);
  return response.data;
}

export async function getIncludeVideoArticles() {
  const response = await axiosInstance.get('/articles/videos');
  return response.data;
}

export async function getArticle(articleId) {
  const response = await axiosInstance.get(`/article/${articleId}`);
  return response.data;
}

export async function createArticle(formData) {
  try {
    const response = await axiosInstance.post('/article', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function updateArticle(formData, articleId) {
  try {
    const response = await axiosInstance.patch(`/article/${articleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function deleteArticle(articleId) {
  try {
    const response = await axiosInstance.delete(`/article/${articleId}`, {
      headers: {
        'Authorization': `${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getTodayArticle(limit = 5) {
  const response = await axiosInstance.get(`/articles/today?limit=${limit}`);
  return response.data;
}

export async function getTopArticles(limit = 5) {
  const response = await axiosInstance.get(`/articles/top?limit=${limit}`);
  return response.data;
}

export async function updateArticleStar(values) {
  try {
    const response = await axiosInstance.patch('/important/article', values, {
      headers: {
        'Authorization': `${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getImportantArticles() {
  const response = await axiosInstance.get('/important/articles', {
    headers: {
      'Authorization': `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}

export async function getMyArticles() {
  const response = await axiosInstance.get('/myArticles', {
    headers: {
      'Authorization': `${localStorage.getItem('token')}`,
    },
  });
  return response.data;
}
