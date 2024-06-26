import { ENVValues } from './types';

const retrieveENV = (): ENVValues => {
    if (process.env.BASE === undefined || process.env.USERNAME === undefined) {
        throw new Error('environment values not defined');
    } else {
        return {
            BASE: process.env.BASE,
            USERNAME: process.env.USERNAME,
        };
    }
};

export { retrieveENV };
