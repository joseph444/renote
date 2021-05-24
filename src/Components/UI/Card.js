import "./cards.css";
const Card = ({className:className,children:children,...rest})=>{
    const ClassName= "word shadow-lg rounded p-2" + (className || '')
    return (
        <div {...rest} className={ClassName} >
            {children}
        </div>
    );
}

export default Card

