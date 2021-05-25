import {useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import Card from "../UI/Card"
import Cards from "../UI/Card"
import Center from "../UI/Center"
import Loading from "./Loading"

function Profile (props){

    const history = useHistory()

    const [erros,setErrors] = useState({})
    const [user,setUser] = useState({})
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(user){
            setUser(JSON.parse(user))
            setLoading(false)
        }else{
            const expiredIn = localStorage.getItem('expiredIn')
        const now = new Date().getTime()

            if(expiredIn && now>expiredIn){
                localStorage.removeItem('idToken')
                localStorage.removeItem('isAuth')
                localStorage.removeItem('expiredIn')
                localStorage.removeItem('user')
                localStorage.removeItem('notes')
                alert("Session Expired!")
                history.replace('/')
                window.location.reload()
            }
        
            var myHeaders = new Headers();
            myHeaders.append('authorization','Bearer '+localStorage.getItem('idToken'))

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
            
            fetch("https://apirenote.herokuapp.com/api/user/",requestOptions)
              .then(response=>response.json())
              .then(result=>{
                  console.log(result);
                if(result.success){
                    setUser(result.body)
                    setLoading(false)
                }else{
                    history.replace('/')
                    window.location.reload()
                }
                })
                .catch(error=>{
                    console.log(error);
                    history.replace('/')
                    window.location.reload()
                })
        }
    },[]);

    if(loading){
        return (
            <div className="w-full h-full">
                <Loading />
            </div>
        );
    }else{
        return (
            <div className="py-4">
                <Center>
                    <Card className=" w-96 p-5 bg-gray-100">
                        <div className="text-2xl font-bold text-indigo-600">
                            User Profile
                        </div>
                        <div className="border-t border-gray-200 ">
                            <dl className="">
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-lg font-medium text-gray-500">
                                        Username
                                    </dt>
                                    <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.username}
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-lg font-medium text-gray-500">
                                        First Name
                                    </dt>
                                    <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.firstName}
                                    </dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-lg font-medium text-gray-500">
                                        Last Name
                                    </dt>
                                    <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.lastName}
                                    </dd>
                                </div>
                            </dl>

                        </div>
                    </Card>
                </Center>
            </div>
        );
    }

}


export default Profile