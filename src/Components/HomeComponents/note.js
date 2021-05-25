import Card from "../UI/Card"
import {useState,useRef} from "react"
import {useHistory} from "react-router-dom"

function Note(props){

    const history = useHistory()

    const titleRef = useRef()
    const bodyRef = useRef()

    const [toggleEdit,setToggleEdit] = useState(false)
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})

    let title = props.note.title;
    let body = props.note.body
    const created_at = new Date(props.note.created_at).toUTCString().split(' ')
    created_at.splice(4,2)


    function deleteHandler(){
        //console.log("working",props.note.id);
        if(window.confirm("This action is irreverisble. Are you sure?"))
        props.delete(props.note.id)
    }
    function handleEdit(){
        setToggleEdit(!toggleEdit)
    }
    function handleUpdate(event){
        event.preventDefault();
        
        setLoading(true)
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

        setErrors({})
        event.preventDefault();
        title = titleRef.current.value.trim()
        body = bodyRef.current.value.trim()
        const error = {}
        var flag = false
        if(title===''){
            error['title'] = 'can\'t be empty'
            flag=true
        }
        if(body===''){
            flag=true
            error['body'] = 'can\'t be empty'
        }
        if(flag){
            setLoading(false)
            setErrors(error);
            
        }else{

            const data = {
                title,body
            }
            const newNote = {
                ...data,
            };
            //console.log(data);

            const myHeaders =  new Headers();
            myHeaders.append('authorization','Bearer '+localStorage.getItem('idToken'));
            myHeaders.append("Content-Type", "application/json");

            const requestContent = {
                method:'PUT',
                body:JSON.stringify(data),
                headers:myHeaders,
                redirect:'follow'
            }

            fetch("https://apirenote.herokuapp.com/api/note/"+props.note.id,requestContent)
                .then(response=>response.json())
                .then(data=>{
                    setLoading(false)
                    if(data.success){
                        titleRef.current.value=""
                        bodyRef.current.value=""
                        //alert('Your Note is Added')
                        newNote.id = props.note.id
                        newNote.created_at = props.note.created_at
                        
                        //console.log(newNote);
                        const notes = JSON.parse(localStorage.getItem('notes'))
                        console.log(JSON.parse(localStorage.getItem('notes')));
                        notes.map((note,index)=>{
                            if(note.id===props.note.id){
                                notes[index].title = newNote.title
                                notes[index].body  = newNote.body
                            }
                        })

                        props.updateNotes(notes)
                        localStorage.setItem('notes',JSON.stringify(notes));
                        console.log(JSON.parse(localStorage.getItem('notes')));
                        setToggleEdit(false)
                        
                    }else{
                        if(data.type===404){
                            setErrors(data.errorMsg)
                            
                        }else{
                            alert('Session expired');
                            history.push('/')
                            window.location.reload()
                        }
                    }
                }).catch(error=>{
                    setLoading(false)
                    alert('Something went wrong please try later!')
                    console.log(error);
                })
        }

    }

    
   
    return (
        <div className="note-list-item ">
            <Card className=" w-80 max-h-80 bg-gray-200 overflow-y-auto h-auto relative">
                <div className="float-right flex flex-wrap">
                    
                    <i className="material-icons mx-2 text-gray-400 cursor-pointer" onClick={handleEdit} >{toggleEdit?"close":"edit"}</i>
                    <i className="material-icons text-red-600 cursor-pointer" onClick={deleteHandler}>delete_forever</i>
                </div>
                {toggleEdit?<>
                    <form className="form" onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label>Title</label>
                            {errors.title&&<div className="text-sm text-red-400">body {errors.title}</div>}
                            <input className="form-element" value={title} disabled={loading} ref={titleRef} onChange={()=>{}}/>
                        </div>
                        <div className="form-control my-1">
                            <label>Body</label>
                            {errors.body&&<div className="text-sm text-red-400">body {errors.body}</div>}
                            <textarea className="form-textarea" disabled={loading} rows="4" ref={bodyRef} defaultValue={body} onChange={()=>{}}></textarea>
                        </div>
                        <div className="">
                            <button className="btn btn-primary " disabled={loading}> Update</button>
                           
                        </div>
                    </form>
                </>:<div className="p-2 ">
                    <div className="text-xl font-extrabold">{title}</div>
                    <div className="text-sm py-2">Created_at:{created_at.join(" ")}</div>
                    <div className="text-xl ">{body}</div>
                    
                </div>}
            </Card>
        </div>
    );
}

export default Note