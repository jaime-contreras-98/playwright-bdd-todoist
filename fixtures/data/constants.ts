import 'dotenv/config';
const crypto = require('crypto');

export const LOGIN_CREDENTIALS: { email: string, password: string, fakeEmail: string, fakePassword: string } = {
    email: process.env.USER_EMAIL.toString(),
    password: process.env.USER_PASSWORD.toString(),
    fakeEmail: process.env.FAKE_USER_EMAIL.toString(),
    fakePassword: process.env.FAKE_USER_PASSWORD.toString(),
};

export const LOGIN_INFO: { cookie: string, token: string } = {
    cookie: 'Cookie',
    token: 'Token'
};

export const TASKS: { name: string, descr: string, newName: string, newDescr: string } = {
    name: "Task Name: " + crypto.randomUUID(),
    descr: "Task Description: " + crypto.randomUUID(),
    newName: "Modified Task Name: " + crypto.randomUUID(),
    newDescr: "Modified Task Description: " + crypto.randomUUID()
};

export const SUBTASKS: { name: string, descr: string } = {
    name: "Sub-Task Name: " + crypto.randomUUID(),
    descr: "Sub-Task Description: " + crypto.randomUUID()
};