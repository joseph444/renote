import Navbar from "./Components/UI/Navbar";
import {Route,Switch} from "react-router-dom"
import Landing from "./Components/Pages/Landing";
import About from "./Components/Pages/About"
import Login from "./Components/Pages/Login"
import Register from "./Components/Pages/Register"
import Logout from "./Components/Pages/Logout"

function App() {
  return (
    <div className="App w-full">
        <Navbar/>
        <div className="">
          <Switch>
              <Route path='/' component={Landing} exact/>
              <Route path='/about' component={About} exact />
              <Route path='/login' component={Login} exact />
              <Route path='/Register' component={Register} exact />
              <Route path='/logout' component={Logout} exact/>
          </Switch>
        </div>
    </div>
  );
}

export default App;
