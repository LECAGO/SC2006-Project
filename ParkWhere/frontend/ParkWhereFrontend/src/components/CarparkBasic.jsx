function CarparkBasic({distance, address, availability, totalslot }) {
    return (
        <>
            <div className="col-6 d-flex align-items-center">
                <div>
                    <p className="fs-4 m-1">{address}</p>
                    <a href={`https://www.google.com.sg/maps/place/${address}`} target="_blank">Google Maps</a>
                </div>
            </div>
            <div className="col-3 d-flex align-items-center">
                <p className="fs-3">{distance} km</p>
            </div>
            <div className="col-3 d-flex align-items-center">
                <p><span className="fs-3">{availability}</span>/{totalslot}</p>
            </div>
        </>
    )
}

export default CarparkBasic;