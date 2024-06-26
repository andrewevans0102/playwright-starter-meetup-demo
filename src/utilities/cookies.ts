const createCookie = (name: string, value: string, days: number) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    let cookieString = name + '=' + (value || '') + expires + '; path=/';
    document.cookie = cookieString;
};

const retrieveCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const specificPart = parts.pop();
        if (specificPart !== undefined) {
            return specificPart.split(';').shift();
        }
    }

    return null;
};

const deleteCookie = (name: string) => {
    document.cookie = name + '=; Max-Age=-99999999;';
};

export { createCookie, retrieveCookie, deleteCookie };
