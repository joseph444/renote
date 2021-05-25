import {useHistory} from "react-router-dom"
import {useEffect,useState} from "react"
import CreateNote from "../HomeComponents/createNote"
import Loading from "./Loading";
import ListNotes from "../HomeComponents/listNotes";

function Home(props){
    const [notes,setNotes] = useState([]);
    const [loading,setLoading] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        const expiredIn = localStorage.getItem('expiredIn')
        const now = new Date().getTime()

        if(expiredIn && now>expiredIn){
            localStorage.removeItem('idToken')
            localStorage.removeItem('isAuth')
            localStorage.removeItem('expiredIn')
            localStorage.removeItem('user')
            alert("Session Expired!")
            history.replace('/')
            window.location.reload()
        }

        const notes = localStorage.getItem('notes')
        if(!notes){
            const myHeaders = new Headers()
        myHeaders.append('authorization','Bearer '+localStorage.getItem('idToken'))
        
        const requestOptions = {
            method:'GET',
            headers:myHeaders,
            redirect:'follow'
        }

        fetch("https://apirenote.herokuapp.com/api/note/", requestOptions)
            .then(response=>response.json())
            .then(result=>{
                if(result.success){
                    //console.log(JSON.stringify(result));
                    setNotes(result.body);
                    localStorage.setItem('notes',JSON.stringify(result.body));
                    setLoading(false)
                }else{
                    if(result.type==='invalid auth'){
                        localStorage.removeItem('idToken')
                        localStorage.removeItem('isAuth')
                        localStorage.removeItem('expiredIn')
                        localStorage.removeItem('user')
                        alert("Session Expired!")
                        history.replace('/')
                        window.location.reload()
                    }else{
                        setLoading(false)
                        console.log(result);
                        alert("Sorry Some Problem Occured!")
                    }
                }
            })
            .catch(error=>{console.log(error); alert("Some problem occured"); setLoading(false)})

        }else{
            console.log(notes);
            setNotes(JSON.parse(notes));
            setLoading(false)
        }
    },[])

    return (
        <>
            <CreateNote loading={!loading} notes={notes} createNote={setNotes}/>
            <div className="relative p-2">
            {loading?<Loading/>:<ListNotes notes={notes} setNotes={setNotes} updateNotes={setNotes}/>}
            </div>
            
        </>
    );
}

export default Home;