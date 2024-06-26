import { Button, styled } from '@mui/material';
import { APP_TITLE, LOGIN_COOKIE } from '../constants/fieldValues';
import { deleteCookie } from '../utilities/cookies';
import { useNavigate } from 'react-router-dom';

const FooterWrapper = styled('div')({
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const PageHeader = () => {
    const navigate = useNavigate();

    const logout = () => {
        deleteCookie(LOGIN_COOKIE);
        navigate('/login');
    };

    return (
        <FooterWrapper>
            <Button
                variant="contained"
                color="error"
                onClick={logout}
                style={{ width: '100%', margin: 40 }}
            >
                Logout
            </Button>
        </FooterWrapper>
    );
};

export default PageHeader;
