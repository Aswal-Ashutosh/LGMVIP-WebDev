import AdminLoginForm from "../components/admin_login_form/AdminLoginForm";
import Navbar from '../components/navbar/Navbar'
import '../pages/HomePage.css';

function HomePage() {
    return (
        <div id='HomePage'>
            <Navbar/>
            <div id='HomePageContent'>
                <AdminLoginForm/>
            </div>
        </div>
    );
}

export default HomePage;
