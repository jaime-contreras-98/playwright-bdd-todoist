import 'dotenv/config';

export const LOGIN_CREDENTIALS : {email: string, password: string, fakeEmail: string, fakePassword: string} = {
    email: process.env.USER_EMAIL.toString(),
    password: process.env.USER_PASSWORD.toString(),
    fakeEmail: process.env.FAKE_USER_EMAIL.toString(),
    fakePassword: process.env.FAKE_USER_PASSWORD.toString(),
};