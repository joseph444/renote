
import "./listNote.css"
import {useHistory} from "react-router-dom"
import Note from "./note";


function ListNotes(props){

    const history = useHistory()

    function deleteANote(id){
        const notes = props.notes;
        const reqNotes = notes.filter(obj=>obj.id!==id)
        

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

        const myHeaders =  new Headers();
        myHeaders.append('authorization','Bearer '+localStorage.getItem('idToken'));
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method:'DELETE',
            headers:myHeaders,
            redirect:'follow'
        }

        fetch("https://apirenote.herokuapp.com/api/note/"+id, requestOptions)
            .then(response=>response.json())
            .then(result=>{
                if(result.success){
                    localStorage.setItem('notes',JSON.stringify(reqNotes));
                    props.setNotes(reqNotes);
                }else{
                    console.log(result);
                }
            }).catch(error=>{
                console.log(error);
                alert('Please try again after sometime');
            })
    }
    

    

    return (
        <div className="note-list-groups" >
            {props.notes.map((note,index)=><Note key={index} note={note} index={index} delete={deleteANote}/>)}
        </div>
    );
}

export default ListNotes