
const Center = (props)=>{

    return (
        <div className="flex flex-col justify-center h-full">
                <div className="flex flex-row justify-center">
                    {props.children}
                </div>
        </div>
    );
}

export default Center