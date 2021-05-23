import './banner.css';
const Banner = (props) =>{
    return (
        <div className="banner">
            <div className="relative h-full">
                <div className="flex flex-col justify-center h-full">
                    <div className="banner-text">
                            Platform to jot down <div className="alter-banner-text">
                                your thoughts
                            </div>
                            <div className="small-banner-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat et tortor non blandit. Nam vitae tortor vitae neque venenatis pulvinar. Donec facilisis aliquam velit.
                            </div>

                            <div className="btn-banner">
                                <button className="btn btn-primary ">Get Started</button>
                                <button className="btn btn-white mx-2">About Re-note</button>

                            </div>
                    </div>
                </div>
            </div>
            <div className="imaged-banner"></div>
            
        </div>
    );
}

export default Banner