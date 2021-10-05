import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    const res = await fetch("https://reqres.in/api/users?page=1");
    setUsers((await res.json()).data);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="Navbar">
          <h1 className="Brand">LetsGrowMore</h1>
          <button onClick={getUsers}>Get Users</button>
        </nav>
      </header>
      <div className="User-container">
        {isLoading ? (
          <Backdrop open>
            <CircularProgress />
          </Backdrop>
        ) : null}

        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            avatar={user.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
