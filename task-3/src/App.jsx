import HomePage from "./pages/home_page/HomePage";
import AdminPanel from "./pages/admin_panel/AdminPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
