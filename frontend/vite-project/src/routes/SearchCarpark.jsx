import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchCarpark.css';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function SearchCarpark() {
    const navigate = useNavigate();

    function clickHandler() {
      navigate('/list');
    }

    return (
        <div className="intro">
            <img className="icon-img" src="src/assets/ParkWhereIcon.png" alt="Icon"/>
            <h1 className="welcome-title">Welcome to ParkWhere!</h1>
            <p className="welcome-text">Simply enter your address in the search box below to search for the nearest carparks. </p>
            <p className="welcome-text">Alternatively, click here to <a href="/login">login / register</a> an account for more features.</p>
            <div className="d-flex justify-content-center h-100">
                <div className="search">
                    <input type="text" className="search-input" placeholder="Search..." name=""/>
                    <MdSearch size={30} onClick={clickHandler}>
                        <i className="fa fa-search"></i>
                    </MdSearch>
                </div>
            </div>
        </div>
    )
}

export default SearchCarpark