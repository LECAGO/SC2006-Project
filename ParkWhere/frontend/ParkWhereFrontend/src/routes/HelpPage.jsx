import "./HelpPage.css"

function HelpPage() {
    return (
        <div className="content">
            <br></br>
            <div className="howtouse" style={{ textAlign: "center", paddingTop: '30px', borderRight: 'solid 2px' }}>
                <h1>How to use ParkWhere?</h1>
                <div className="m-5" style={{ textAlign: "left", listStylePosition: "outside", paddingLeft: "1.5em" }}>
                    <ul>
                        <li>Enter the location you want to search in the homepage. 
                            You will get a list of carpark sorted by the nearest distance.</li>
                        <li>Login/Register to access more features.</li>
                        <li>Once logged in, to add your favorite carparks, go to the favorite page and search for the carpark.
                            It will shown by a star in the carpark list and will be prioritized when available.</li>
                        <li>Once logged in, to add carparks to your blacklist, go to the blacklist page and search for the carpark.
                            It will not be shown in the carpark list.</li>
                    </ul>
                </div>
            </div>
            <div className="faq" style={{ textAlign: "center", paddingTop: '30px', borderRight: 'solid 2px' }}>
                <h1>Frequently Asked Questions</h1>
                <br></br>
                <div className="m-5" style={{ textAlign: "left", listStylePosition: "outside", paddingLeft: "1.5em" }}>
                    <ul>
                        <li> 
                            <strong> Is the data real time? </strong>
                            We use data from public APIs. 
                            As such, we do not know how up-to-date the data is. 
                            However, the APIs are said to update once about every 5 minutes.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HelpPage;