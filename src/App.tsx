import { styled } from '@mui/material';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Login from './pages/Login';
import Orders from './pages/Orders';
import './App.css';

const MainWrapper = styled('main')({
    margin: 20,
});

export default function App() {
    return (
        <MainWrapper>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="orders" element={<Orders />} />

                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </MainWrapper>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
