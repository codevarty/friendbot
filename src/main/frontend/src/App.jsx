import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from "./component/context/ThemeProvider.jsx";

function App() {

    return (
        <BrowserRouter>
            <ThemeProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App
