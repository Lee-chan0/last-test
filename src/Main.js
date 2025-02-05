import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyled from "./components/GlobalStyle/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export const queryClient = new QueryClient();

function Main() {
  const StandardByColor = {
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
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={StandardByColor}>
        <App>
          <GlobalStyled />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="news-list">
                <Route path="video/video-articles" element={<VideoPage />} />
                <Route path="category/:categoriesId" element={<NewsListPage />} />
                <Route path="article/:articleId" element={<ArticlePage />} />
                <Route path="articles/entireArticle" element={<EntireArticlePage />} />
              </Route>
              <Route path="truescope-administrator">
                <Route path="cms/administrator/login" element={<LoginPage />} />
                <Route path="editor-page" element={<EditorPage />} />
                <Route path="video-editor" element={<VideoEditorPage />} />
                <Route path="create-article" element={<CreateArticlePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </App>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default Main;