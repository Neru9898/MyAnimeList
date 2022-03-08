import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Home from "./Page/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
