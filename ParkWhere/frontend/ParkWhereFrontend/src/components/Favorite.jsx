function Favorite({rowIdx, carpark, availability, carparkID}) {

    const submitHandler = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/ParkApp/favorites/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                carpark_id: carparkID,
                lot_type: 'C'
            })
        }).then((response) => {
            if(response.status === 200) {
                window.location.reload();
            }
            else {
                alert('Error, unable to remove carpark from favorites');
            }
        });
    }

    return (
        <tr>
            <th scope="row">{rowIdx}</th>
            <td>{carpark}</td>
            <td>{availability}</td>
            <td>
                <form onSubmit={submitHandler}>
                    <button className="btn btn-primary" type="submit">Remove</button>
                </form>
            </td>
        </tr>
    )
}

export default Favorite;