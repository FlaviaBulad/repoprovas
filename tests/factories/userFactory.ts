import { faker } from '@faker-js/faker';

const userEmail: string = faker.internet.email();
const userPassword: string = faker.internet.password(4);
const randomPassword: string = faker.internet.password(10);

export async function signUpBody() {
  return {
    email: userEmail,
    password: userPassword,
    confirm_password: userPassword
  };
}

export async function signUpInvalidConfirmPassword() {
  return {
    email: userEmail,
    password: userPassword,
    confirm_password: randomPassword
  };
}

export async function signInBody() {
  return {
    email: userEmail,
    password: userPassword
  };
}

export async function signInInvalidPassword() {
  return {
    email: userEmail,
    password: randomPassword
  };
}
