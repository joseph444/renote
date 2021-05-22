import {Link,useLocation} from "react-router-dom"
function MobileNav(props){
    const location = useLocation();
    return (
        <div className="mobileNav">
                <div className="mobileNavContainer">
                    {props.navlinks.map((links,index)=>{
                        return (
                            <Link key={index} to={links.path} className={location.pathname===links.path?'mobile-link active':'mobile-link'}>{links.name}</Link>
                        );
                    })}
                </div>
        </div>
    );
}

export default MobileNav