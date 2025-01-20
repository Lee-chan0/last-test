import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";


function App({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}

export default App;