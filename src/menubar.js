function Menubar(props){
    return(
        <div>
            <h1>{props.mytitle}-{props.location}</h1>
        <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Events</li>
            <li>Contact</li>
        </ul>
        </div>
    )
}

export default Menubar;