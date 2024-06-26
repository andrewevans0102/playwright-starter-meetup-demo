import { styled } from '@mui/material';
import { APP_TITLE, LOGIN_COOKIE } from '../constants/fieldValues';
import { useState, useEffect } from 'react';
import { retrieveCookie } from '../utilities/cookies';

const HeaderWrapper = styled('div')({
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const NameDisplay = styled('p')({
    margin: 0,
    paddingBottom: 40,
    color: 'pink',
    fontSize: 24,
});

const KitchenImage = styled('img')({
    borderRadius: 40,
});

const PageHeader = () => {
    const [userName, setUserName] = useState<string | null | undefined>('');

    useEffect(() => {
        if (userName === '') {
            setUserName(retrieveCookie(LOGIN_COOKIE));
        }
    }, []);

    return (
        <HeaderWrapper>
            <KitchenImage
                src={`${window.location.href
                    .replace('orders', '')
                    .replace('login', '')}/KITCHEN.jpg`}
                alt="Kitchen"
            />
            <h1>{APP_TITLE}</h1>
            {window.location.href.includes('orders') ? (
                <NameDisplay>{`Hello ${userName}`}</NameDisplay>
            ) : (
                ''
            )}
        </HeaderWrapper>
    );
};

export default PageHeader;
