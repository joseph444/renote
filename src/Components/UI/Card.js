export default Card = ({className:className,children:children,...rest})=>{
    const className= "shadow-lg rounded p-2" + (className || '')
    return (
        <div {...rest} className={className} >
            {children}
        </div>
    );
}

