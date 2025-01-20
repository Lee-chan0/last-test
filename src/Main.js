import App from "./components/App";
import GlobalStyled from "./components/GlobalStyle/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HomePage from "./pages/HomePage/HomePage";
import EditorPage from "./pages/EditorPage/EditorPage";
import CreateArticlePage from "./pages/CreateArticlePage/CreateArticle";

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
    <ThemeProvider theme={StandardByColor}>
      <App>
        <GlobalStyled />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="truescope-administrator">
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="editor-page" element={<EditorPage />} />
              <Route path="create-article" element={<CreateArticlePage />} />
            </Route>
            <Route path="*" />
          </Routes>
        </BrowserRouter>
      </App>
    </ThemeProvider>
  )
}

export default Main;