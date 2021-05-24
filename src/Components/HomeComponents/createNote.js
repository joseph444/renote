import Card from "../UI/Card"
import Center from "../UI/Center"
import "./createNote.css"
import {useState,useRef} from "react"
import {useHistory} from "react-router-dom"

function CreateNote(props){
    const [toggleForm,setToggleForm] = useState(false)
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})
    const titleRef = useRef()
    const bodyRef = useRef()
    const history = useHistory()

    function toggleFormHandler(){
        setErrors({})
        setToggleForm(!toggleForm);
    }

    function formHandler(event){
        setLoading(true)
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


        setErrors({})
        event.preventDefault();
        const title = titleRef.current.value.trim()
        const body = bodyRef.current.value.trim()
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
                created_at:new Date().toISOString()
            };
            console.log(data);

            const myHeaders =  new Headers();
            myHeaders.append('authorization','Bearer '+localStorage.getItem('idToken'));
            myHeaders.append("Content-Type", "application/json");

            const requestContent = {
                method:'POST',
                body:JSON.stringify(data),
                headers:myHeaders,
                redirect:'follow'
            }

            fetch("https://apirenote.herokuapp.com/api/note/",requestContent)
                .then(response=>response.json())
                .then(data=>{
                    setLoading(false)
                    if(data.success){
                        titleRef.current.value=""
                        bodyRef.current.value=""
                        alert('Your Note is Added')
                        setToggleForm(false)
                        
                        props.createNote([newNote,...props.notes])
                        localStorage.setItem('notes',JSON.stringify([newNote,...props.notes]));
                        
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

    function discardData(event){
        event.preventDefault()
        if(window.confirm("Are you sure?")){
            titleRef.current.value=""
            bodyRef.current.value=""
            setErrors({})
            setToggleForm(false)
            setLoading(false)
        }

    }
    


    return (
        <div className="w-full p-5">
            <Center>
                <Card className="text-4xl p-4 lg:w-1/2  w-full">
                    <div className="flex" onClick={toggleFormHandler}>
                        <div className="text-3xl mx-4">
                            <i className="material-icons text-indigo-600">{(props.loading&&toggleForm)?"close":"add"}</i>
                        </div>
                        <div className="text-4xl text-indigo-600">Add A Note</div>
                    </div>
                    {(props.loading&&toggleForm)&&<form className="form" onSubmit={formHandler}>
                        {loading&&<div className="text-center">Loading...</div>}
                        <div className="form-control my-1">
                            <label>Title</label>
                            {errors.title&&<div className="text-sm text-red-400">title {errors.title}</div>}
                            <input className="form-element" disabled={loading} ref={titleRef}/>
                            
                        </div>
                        <div className="form-control my-1">
                            <label>Body</label>
                            {errors.body&&<div className="text-sm text-red-400">body {errors.body}</div>}
                            <textarea className="form-textarea" disabled={loading} rows="7" ref={bodyRef}></textarea>
                        </div>
                        <div className="">
                            <button className="btn btn-primary " disabled={loading}> Add</button>
                            <button disabled={loading} className="btn bg-red-400 text-white hover:bg-red-500 mx-2" type="reset" onClick={discardData}>Discard</button>
                        </div>
                    </form>}
                </Card>
            </Center>
        </div>
    );
}

export default CreateNote