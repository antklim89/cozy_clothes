'use server';
import { login, logout, register } from '../services/dal';

export const loginAction = login;
export const logoutAction = logout;
export const registerAction = register;
