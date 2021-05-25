
import {useEffect} from "react"
import {useHistory,withRouter} from "react-router-dom"

const Logout = (props)=>{
    const history = useHistory()
    useEffect(()=>{
        localStorage.removeItem('idToken')
            localStorage.removeItem('isAuth')
            localStorage.removeItem('expiredIn')
            localStorage.removeItem('user')
            localStorage.removeItem('notes')
        history.replace('/')
        window.location.reload()
    },[])

    return (<></>)
}

export default withRouter(Logout)