import { Button, TextField, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { createCookie, retrieveCookie } from '../utilities/cookies';
import { LOGIN_COOKIE } from '../constants/fieldValues';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const LoginWrapper = styled('div')({
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
});

const NameInput = styled(TextField)({
    backgroundColor: 'white',
});

const LoginPage = () => {
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const handleClick = () => {
        createCookie(LOGIN_COOKIE, userName, 1);
        navigate('/orders');
    };

    useEffect(() => {
        const loginCookie = retrieveCookie(LOGIN_COOKIE);
        if (loginCookie !== null) {
            navigate('/orders');
        }
    }, []);

    return (
        <>
            <PageHeader />
            <LoginWrapper>
                <NameInput
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    label="USERNAME"
                />
                <Button variant="contained" onClick={handleClick}>
                    Login
                </Button>
            </LoginWrapper>
        </>
    );
};

export default LoginPage;
