import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,Routes,Route} from 'react-router-dom'; // the first letter of component should be capital
import AddMovie from "./addmovie";
import Menubar from "./menubar";
import Home from './home';
import MyEvents from './events';
import MyBookings from './bookings';
import Contact from './contact';

function App(){
  return(
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">MyShow</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/movies">Movies</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/events">Events</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/bookings">Bookings</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/contact">Contact Us</Link>
      </li>

    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
<Routes>
  <Route path="/" element={<Home></Home>}/>
  <Route path="/movies" element={<AddMovie title="Movies"/>}/>
  <Route path="/events" element={<MyEvents></MyEvents>}/>
  <Route path="/bookings" element={<MyBookings></MyBookings>}/>
  <Route path="/contact" element={<Contact></Contact>}/>
</Routes>
</div>
  );
}
export default App;