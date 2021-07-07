import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParticleBackground from "./ParticlesBackground";
import Navbar from "./components/dashboard/Navbar";
import Sidebar from "./components/dashboard/Sidebar";
import Dashboard from "./views/Home";
import Users from "./views/Users";
import Signin from "./components/login/Signin";
import Signup from "./components/login/Signup";
import Entries from "./views/Entries";
import Tags from "./views/Tags";

export const AuthContext = createContext();

const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  //Guardamos el token en local storage
  const [token, setToken] = useState();
  useEffect(() => {
    try {
      const newToken = localStorage.getItem("devschooltoken");
      if (newToken) {
        setToken(newToken);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: setToken }}>
      <div>
        <ParticleBackground />
        <div>
          <Router>
            <Switch>
              <Route path="/" exact component={Signin} />
              <Route path="/signup" exact component={Signup} />
              <div className="container-dashboard">
                <Navbar />
                <Sidebar />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/users" exact component={Users} />
                <Route path="/entries" exact component={Entries} />
                <Route path="/tags" exact component={Tags} />
              </div>
            </Switch>
          </Router>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
