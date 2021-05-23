import {useState,useLayoutEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import MobileNav from './mobileNav'


function Navbar(){

    const [NavLinks,setNavLinks] = useState([])

    useLayoutEffect(()=>{
        const token = localStorage.getItem('idToken')

            var navLinks = NavLinks;
            if(token){
                var myHeaders = new Headers();
                myHeaders.append('Authorization',`Bearer ${token}`)
    
                var requestOptions = {
                    method:'GET',
                    headers:myHeaders,
                    redirect:'follow'
                }
    
                fetch("https://apirenote.herokuapp.com/api/user/", requestOptions)
                    .then(response=>response.json())
                    .then(result=>{
                        if(result.success){
                            localStorage.setItem('user',JSON.stringify(result.body))
                            console.log(result);
                           
                            setNavLinks([
                                {path:'/home',name:'Home'},{path:'/about',name:'About'},
                                {path:'/search',name:'Search'},{path:'/logout',name:'Logout'}
                            ])
                        }
                    }).catch(error=>{
                        setNavLinks([
                            {path:'/',name:'Home'},
                            {path:'/about',name:'About'},
                            {path:'/login',name:'Login'},
                            {path:'/register',name:'Register'},
                        ])
                        localStorage.removeItem('idToken')
                    })
            }else{
                setNavLinks([
                    {path:'/',name:'Home'},
                    {path:'/about',name:'About'},
                    {path:'/login',name:'Login'},
                    {path:'/register',name:'Register'},
                ])
            }
    },[])

    const location = useLocation()
    const [isOpen,setIsOpen] = useState(false);

    function toggleMobileNav(){
       
        setIsOpen(!isOpen)
       
    }

    function isPath(pathname){
        return location.pathname === pathname
    }


    return(
        
         <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-wrapper">
                    <div className="brand-name">
                        <Link to="/" className="bold-font">ReNote</Link>
                    </div>
                    <button className="nav-toggle" onClick={toggleMobileNav}>
                            <i className="material-icons text-4xl">{isOpen?"close":"menu"}</i>
                    </button>
                    <ul className="navbar-nav">
                        {NavLinks.map((links,index)=>{
                            return (
                                <li key={index} className={isPath(links.path)?'nav active':'nav'}>
                                    <Link to={links.path} className="nav-link">{links.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            {isOpen && <MobileNav navlinks={NavLinks}/>}
         </nav>
    
        
    );

}

export default Navbar