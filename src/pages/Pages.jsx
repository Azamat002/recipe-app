import Home from "./Home";
import Cuisine from './Cuisine';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import Searched from "./Searched";
import Recipe from "./Recipe";
import {AnimatePresence} from "framer-motion";

function Pages() {
    const location = useLocation();
    return (

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cuisine/*" element={<Cuisine/>}/>
                <Route path="/searched/:search" element={<Searched/>}/>
                <Route path="/recipe/:name" element={<Recipe/>}/>
            </Routes>
    );
}

export default Pages;
