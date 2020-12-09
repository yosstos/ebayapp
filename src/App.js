import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./components/About";
import Weather from "./components/Weather";
import Images from "./components/Images";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/">
            <Redirect to="/about" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
