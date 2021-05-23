
import {useEffect} from "react"
import {useHistory} from "react-router-dom"

const Logout = (props)=>{
    const history = useHistory()
    useEffect(()=>{
        localStorage.removeItem('idToken')
        localStorage.removeItem('user')
        history.replace('/')
        window.location.reload()
    },[])

    return (<></>)
}

export default Logout