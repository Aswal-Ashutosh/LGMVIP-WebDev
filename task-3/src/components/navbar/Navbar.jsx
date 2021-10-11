import '../navbar/Navbar.css';

function Navbar(props){
    return(
        <nav>
            <h1>{props.heading}</h1>
            <h4>{props.subHeading}</h4>
        </nav>
    );
}

export default Navbar;