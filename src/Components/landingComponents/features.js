import './features.css'
const Features = (props) => {
    const FeatureList = [
        {
            header:'List View',
            content:'Manage all of your notes from a single dashboard.',
        },
        {
            header:'Timeline',
            content:'sort all of your todos according to date.',
        },
        {
            header:'Simplicity',
            content:'It\'s simple to add and simple to remove.',
        },
        {
            header:'Privacy',
            content:'We respect your privacy, so noone except you can check your notes',
        },
        {
            header:'Fast',
            content:'Due to the use of distributed technology the content delivery is super fast',
        },
        {
            header:'profile management',
            content:'you can can change basic details of your profile',
        },
    ]

    return (
        <div className="feature-container">
            <div className="feature-head">
                <div className="highlighted-text">
                    Everything you need
                </div>
                <div className="bold-header">
                    Simplest Note Taking Platform
                </div>
                <div className="gray-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat et tortor non blandit. Nam vitae tortor vitae neque venenatis pulvinar. Donec facilisis aliquam velit.
                </div>
            </div>
            <div className="feature-list">
                {FeatureList.map(feature=>{
                    return (
                        <div className="feature-list-item">
                            <div className="text-center px-4">
                                <i className="material-icons text-green-400 text-2xl">check</i>
                            </div>
                            <div className="">
                                <div className="feature-list-header">{feature.header}</div>
                                <div className="feature-list-content">{feature.content}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Features