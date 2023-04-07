function CarparkBasic({currentLocation, distance, address, availability, totalslot}) {
    return (
        <>
            <div className="col-6 d-flex align-items-center">
                <div>
                    <p className="fs-4 m-1">{address}</p>
                    <a className="m-2" href={`https://www.google.com.sg/maps/place/${address}`} target="_blank">Google Maps</a>
                    <a className="m-2" href={`https://www.google.com/maps?saddr=${currentLocation}&daddr=${address}`} target="_blank"> Navigate</a>
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