import Card from "../UI/Card"


function Note(props){

    function deleteHandler(){
        //console.log("working",props.note.id);
        props.delete(props.note.id)
    }

    const title = props.note.title;
    const body = props.note.body
    const created_at = new Date(props.note.created_at).toUTCString().split(' ')
    created_at.splice(4,2)
   
    return (
        <div className="note-list-item ">
            <Card className=" w-80 max-h-80 bg-gray-200 overflow-y-auto h-auto relative">
                <div className="float-right flex flex-wrap">
                    
                    <i className="material-icons mx-2 text-gray-400 cursor-pointer">edit</i>
                    <i className="material-icons text-red-600 cursor-pointer" onClick={deleteHandler}>delete_forever</i>
                </div>
                <div className="p-2 ">
                    <div className="text-xl font-extrabold">{title}</div>
                    <div className="text-sm py-2">Created_at:{created_at.join(" ")}</div>
                    <div className="text-xl ">{body}</div>
                    
                </div>
            </Card>
        </div>
    );
}

export default Note