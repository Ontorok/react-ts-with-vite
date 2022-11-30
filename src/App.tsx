import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import { Fragment } from "react";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Counter from "./components/Counter";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <ShoppingCartProvider>
          <Navbar />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/counter" element={<Counter />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
