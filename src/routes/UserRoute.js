import React from 'react';
import { Route, Routes } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import Home from "../container/Home/Home";
import Shop from "../container/Shop/Shop";
import ShopDetails from "../container/ShopDetails/ShopDetails";
import Auth from '../container/Auth/Auth';
import Chat from '../container/Chat/Chat';
import Examples2 from '../container/Examples/Examples2';
import Examples3 from '../container/Examples/Examples3';

function UserRoute(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ShopDetails />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/fact" element={<Examples3 />} />
            </Routes>
            <Footer />
        </>
    );
}

export default UserRoute;