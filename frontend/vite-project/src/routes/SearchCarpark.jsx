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
        <div class="intro">
            <img class="icon-img" src="src/assets/ParkWhereIcon.png" alt="Icon"/>
            <h1 class="welcome-title">Welcome to ParkWhere!</h1>
            <p class="welcome-text">Simply enter your address in the search box below to search for the nearest carparks. </p>
            <p class="welcome-text">Alternatively, click here to <a href="/login">login / register</a> an account for more features.</p>
            <div class="d-flex justify-content-center h-100">
                <div class="search">
                    <input type="text" class="search-input" placeholder="Search..." name=""/>
                    <MdSearch size={30} onClick={clickHandler}>
                        <i class="fa fa-search"></i>
                    </MdSearch>
                </div>
            </div>
        </div>
    )
}

export default SearchCarpark