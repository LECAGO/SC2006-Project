import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchCarpark.css';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ParseSearch from '../components/ParseSearch'
import Loading from '../components/Loading'

function SearchCarpark() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [inputSearch, setInputSearch] = useState('');
    const [errorSearch, setErrorSearch] = useState('');

    async function submitHandler(event) {
        event.preventDefault();
        setIsLoading(true);
        const [coor, label, error] = await ParseSearch(inputSearch)
        if (!error) {
            navigate({
                pathname: '/list',
                search: '?coordinates=' + coor + '&label=' + label,
            })
        } else {
            setErrorSearch(error);
        }
    }

    if(isLoading) return <Loading />;

    return (
        <div className="intro">
            <img className="icon-img" src="src/assets/ParkWhereIcon.png" alt="Icon" />
            <h1 className="welcome-title">Welcome to ParkWhere!</h1>
            <p className="welcome-text">Simply enter your address in the search box below to search for the nearest carparks. </p>
            <p className="welcome-text">Alternatively, click here to <a href="/login">login / register</a> an account for more features.</p>

            {errorSearch.length !== 0 &&
                <div className="error"> {errorSearch} </div>
            }
            <div className="d-flex justify-content-center h-100">
                <form method='post' className="search" onSubmit={submitHandler}>
                    <input type="text" className="search-input" placeholder="Search..." onChange={(event) => setInputSearch(event.target.value)} />
                    <MdSearch size={30} onClick={submitHandler}>
                        <i className="fa fa-search"></i>
                    </MdSearch>
                </form>
            </div>
        </div>
    )
}

export default SearchCarpark