import {useHistory} from "react-router-dom"
import './cta.css'
const Cta = (props)=>{
    const history = useHistory()
   
    function GotoSignUp(){
        history.push('/register')
    }
    return (
        <div className="cta-container">
            <div className="mx-auto container h-full flex justify-center">
                <div className="flex flex-col h-full justify-center sm:w-1/2">
                    <div className="flex flex-row w-full justify-center">
                        <div className="text-center grid grid-cols-1">
                            <div className="bold-cta-text">
                                Oraganise your activity.
                            </div>
                            <div className="bold-cta-text">
                                Start using Renote today
                            </div>
                            <div className="gray-cta-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat et tortor non blandit. Nam vitae tortor vitae neque venenatis pulvinar. Donec facilisis aliquam velit.
                            </div>
                            <div className="mb-2">
                                <button className="btn btn-light" onClick={GotoSignUp}>Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cta