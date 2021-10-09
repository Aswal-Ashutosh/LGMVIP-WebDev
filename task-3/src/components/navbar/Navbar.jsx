import '../navbar/Navbar.css';

function Navbar(props){
    return(
        <nav>
            <h1>{props.heading}</h1>
        </nav>
    );
}

export default Navbar;