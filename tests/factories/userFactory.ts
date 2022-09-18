import { validateSignUp } from '../../src/services/userService';

export async function signUpBody() {
  const user = {
    email: 'test@outlook.com',
    password: '123456',
    confirm_password: '123456'
  };

  const insertedUser = await validateSignUp(user);

  return insertedUser;
}

export async function signUpInvalidConfirmPassword() {
  const user = {
    email: 'test@outlook.com',
    password: '123456',
    confirm_password: '12399'
  };

  const insertedUser = await validateSignUp(user);

  return insertedUser;
}

export function signInBody() {
  return {
    email: 'test@outlook.com',
    password: '123456'
  };
}

export function signInInvalidEmail() {
  return {
    email: 'test@hotmail.com',
    password: '123456'
  };
}

export function signInInvalidPassword() {
  return {
    email: 'test@outlook.com',
    password: '123489556'
  };
}
