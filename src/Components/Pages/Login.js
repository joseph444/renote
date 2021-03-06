import {useRef,useState,useEffect} from 'react'
import "./Register.css"
import backgroundImage from "../../assets/2.jpg"
import {useHistory,withRouter} from "react-router-dom"
import Loading from './Loading'
const Login = (props)=>{

    const history  = useHistory()

    
    const emailRef = useRef();
    const passwordRef = useRef();


    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})
    const formSubmission = (event)=>{
        setLoading(true)
        event.preventDefault();
        const data = {
            
            email: emailRef.current.value,
            password: passwordRef.current.value,
            
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data)
        const requestOptions = {
            method:'POST',
            headers:myHeaders,
            body:raw,
            redirect:'follow'
        }
        
        fetch("https://apirenote.herokuapp.com/api/auth/login",requestOptions)
            .then(response=>response.json())
            .then(result=>{
                const expiresIn = new Date().getTime() + 1000*60*60
                setLoading(false)
                if(result.success){
                    const idToken = result.body.token
                    localStorage.setItem('idToken',idToken);
                    localStorage.setItem('isAuth',true)
                    localStorage.setItem('expiredIn',expiresIn)
                    history.replace('/home')
                    window.location.reload()
                    
                }else{
                    console.log(result);
                    if(result.type==='validation'){
                        setErrors(result.errorMsg)
                        console.log(errors);
                    }else{
                        alert(result.errorMsg)
                    }
                    
                }
            })
            .catch(error=>{
                setLoading(false)
                console.log(error);
                alert("please try again after sometime")
            })
        
        
        
    }







    return (
        <div className="base-container">
            <div className="flex w-full">
                <div className="form-display-container">
                    <div className="flex flex-col h-full justify-center">
                        <div className="sm:px-12 px-2">
                            <div className="bold-text my-8">
                                    Login to your account
                            </div>
                            {loading?<Loading/>:<form className="form sm:mx-5" onSubmit={formSubmission}>
                                
                                <div className="form-control">
                                    <label>Email Adress</label>
                                    <input type="email" ref={emailRef}  name="email" className="form-element" disabled={loading} />
                                    {errors.email&&<div className="text-sm text-red-500 uppercase">email {errors.email}</div>}
                                </div>
                                <div className="form-control">
                                    <label>Passwords</label>
                                    <input type="password" ref={passwordRef} name="password" className="form-element" disabled={loading} />
                                    {errors.password&&<div className="text-sm text-red-500 uppercase">password {errors.password}</div>}
                                </div>
                                
                                <div className="extras">
                                    <button disabled={loading} className="btn btn-primary w-full">Login</button>
                                </div>

                            </form>}


                        </div>
                    </div>
                </div>
                <div className="image-display-container ">
                    <img src={backgroundImage} className="w-full h-full" alt="background image"/>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login)