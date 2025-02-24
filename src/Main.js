import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyled from "./components/GlobalStyle/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from "./Contexts/ThemeContext";
import HomePage from "./pages/HomePage/HomePage";
import EditorPage from "./pages/EditorPage/EditorPage";
import CreateArticlePage from "./pages/CreateArticlePage/CreateArticle";
import NewsListPage from "./pages/NewsListPage/NewsListPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EntireArticlePage from "./pages/EntireArticlePage/EntireArticlePage";
import VideoEditorPage from "./pages/VideoEditorPage/VideoEditorPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import UpdateArticlePage from "./pages/UpdateArticlePage/UpdateArticlePage";
import IntroducePage from './pages/CompanyPage/IntroducePage/IntroducePage';
import { useEffect } from "react";
import AdminRoute from "./pages/AdminRoute/AdminRoute";
import { NewestContextProvider } from "./Contexts/NewestArticleContext";

export const queryClient = new QueryClient();

const lightTheme = {
  blue: {
    blue100: '#F0F3FA',
    blue500: '#3376FD',
    blue700: '#0D50D7'
  },
  gray: {
    gray0: '#FFFFFF',
    gray100: '#FAFAFA',
    gray400: '#CCCCCC',
    gray600: '#666666',
    gray900: '#1A1A1A'
  },
}

const darkTheme = {
  blue: {
    blue100: '#A6A6A6',
    blue500: '#3376FD',
    blue700: '#000000'
  },
  gray: {
    gray0: '#FFFFFF',
    gray100: '#FAFAFA',
    gray400: '#CCCCCC',
    gray600: '#666666',
    gray900: '#1A1A1A'
  },
}

function Main() {
  const { darkmode } = useTheme();

  useEffect(() => {
    if (darkmode) {
      document.body.style.backgroundColor = `#1a1a1a`;
    } else {
      document.body.style.backgroundColor = `#ffffff`;
    }
  }, [darkmode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkmode ? darkTheme : lightTheme} >
        <NewestContextProvider>
          <App>
            <ToastContainer
              closeButton={false}
              autoClose={3000}
              hideProgressBar={true}
              pauseOnHover={false}
            />
            <GlobalStyled />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="truescope-company-introduce" element={<IntroducePage />} />
                <Route path="news-list">
                  <Route path="video/video-articles" element={<VideoPage />} />
                  <Route path="category/:categoriesId" element={<NewsListPage />} />
                  <Route path="article/:articleId" element={<ArticlePage />} />
                  <Route path="articles/entireArticle" element={<EntireArticlePage />} />
                </Route>
                <Route path="truescope-administrator">
                  <Route path="cms/administrator/login" element={<LoginPage />} />
                  <Route path="editor-page" element={<AdminRoute><EditorPage /></AdminRoute>} />
                  <Route path="video-editor" element={<AdminRoute><VideoEditorPage /></AdminRoute>} />
                  <Route path="create-article" element={<AdminRoute><CreateArticlePage /></AdminRoute>} />
                  <Route path="update-article" element={<AdminRoute><UpdateArticlePage /></AdminRoute>} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </App>
        </NewestContextProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default Main;