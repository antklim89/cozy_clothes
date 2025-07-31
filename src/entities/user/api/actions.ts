'use server';
import { checkAuthentication } from '../services';


export async function checkAuthenticationAction() {
  return checkAuthentication();
}
