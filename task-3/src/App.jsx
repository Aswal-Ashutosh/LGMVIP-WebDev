import HomePage from "./pages/home_page/HomePage";
import AdminPanel from "./pages/admin_panel/AdminPanel";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/adminPanel" component={AdminPanel}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
