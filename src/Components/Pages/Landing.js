import Banner from "../landingComponents/banner"
import Cta from "../landingComponents/cta"
import Features from "../landingComponents/features"
import Footer from "../landingComponents/footer"

const Landing = (props)=>{
    return (
        <>
        <Banner/>
        <Features/>
        <Cta/>
        <Footer/>
        </>
    );
}

export default Landing;