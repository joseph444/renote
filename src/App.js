import Navbar from "./Components/UI/Navbar";
import {Route,Switch} from "react-router-dom"
import {useEffect,useState} from 'react'
import Landing from "./Components/Pages/Landing";
import About from "./Components/Pages/About"
import Login from "./Components/Pages/Login"
import Register from "./Components/Pages/Register"
import Logout from "./Components/Pages/Logout"
import GuestRoute from "./Components/UI/GuestRoute"
import ProtectedRoute from "./Components/UI/ProtectedRoutes"

function App() {


  const [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{
        setIsAuthenticated(localStorage.getItem('isAuth') || false)
    });


  return (
    <div className="App w-full">
        <Navbar/>
        <div className="">
          <Switch>
              <Route path='/' component={Landing} exact/>
              <Route path='/about' component={About} exact />
              <GuestRoute isAuthenticated={isAuthenticated} path='/login' component={Login} exact />
              <GuestRoute isAuthenticated={isAuthenticated} path='/register' component={Register} exact/>
              <ProtectedRoute isAuthenticated={isAuthenticated} path='/logout' component={Logout} exact/>
          </Switch>
        </div>
    </div>
  );
}

export default App;
