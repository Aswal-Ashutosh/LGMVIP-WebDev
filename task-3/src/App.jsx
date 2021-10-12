import HomePage from "./pages/home_page/HomePage";
import AdminPanel from "./pages/admin_panel/AdminPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ClassPanel from "./pages/class_panel/ClassPanel";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/adminPanel">
            <AdminPanel/>
          </Route>
          <Route exact path="/class">
            <ClassPanel/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
