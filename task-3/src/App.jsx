import AdminLoginForm from "./components/admin_login_form/AdminLoginForm";
import Navbar from './components/navbar/Navbar'
import './app.css';

function App() {
    return (
        <div id='App'>
            <Navbar/>
            <div id='AppContent'>
                <AdminLoginForm/>
            </div>
        </div>
    );
}

export default App;
