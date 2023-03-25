function CarparkBasic({ name, address, distance, availability, totalslot }) {
    return (
        <>
            <div className="col-6 d-flex align-items-center">
                <div>
                    <p className="fs-3 m-1">{name}</p>
                    <p className="carpark_item">{address}</p>
                </div>
            </div>
            <div className="col-3 d-flex align-items-center">
                {/* <p className="fs-3">{distance} km</p> */}
            </div>
            <div className="col-3 d-flex align-items-center">
                <p><span className="fs-3">{availability}</span>/{totalslot}</p>
            </div>
        </>

    )
}

export default CarparkBasic;