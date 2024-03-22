import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App
