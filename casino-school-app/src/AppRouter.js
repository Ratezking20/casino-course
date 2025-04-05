import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import BlackjackGame from './BlackjackGame';
import Practice from './Practice';
import Forgot from './Forgot';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/blackjack" element={<BlackjackGame />} />
                <Route path="/forgot" element={<Forgot />} />
            </Routes>
        </BrowserRouter>
    );
};

