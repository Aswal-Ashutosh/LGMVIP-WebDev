import AdminLoginForm from "../../components/admin_login_form/AdminLoginForm";
import '../home_page/HomePage.css';

function HomePage() {
    return (
        <div id='HomePage'>
            <div id='HomePageContent'>
                <AdminLoginForm/>
            </div>
        </div>
    );
}

export default HomePage;
