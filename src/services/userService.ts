import * as userRepository from '../repositories/userRepository';
import * as encryptUtils from '../utils/encryptUtils';
import { generateToken } from '../utils/tokenUtils';
import * as errorTypes from '../utils/errorUtils';
import { UserData, CreateUserData } from '../types/userTypes';

export async function getUserById(id: number) {
  const user = await userRepository.findById(id);

  return user;
}

export async function getUserEmail(email: string) {
  const userEmail = await userRepository.findByEmail(email);
  return userEmail;
}

async function validatePassword(password: string, confirm_password: string) {
  if (password !== confirm_password)
    throw errorTypes.unprocessableEntity(
      'The password confirmation does not match'
    );
}

async function validateSignUp(userData: CreateUserData) {
  const { email, password, confirm_password } = userData;
  const userExists = await getUserEmail(email);
  if (!userExists) {
    await validatePassword(password, confirm_password);
    const hashedPassword: string = await encryptUtils.hashPassword(password);

    const signUpData = {
      email,
      password: hashedPassword
    };
    return signUpData;
  } else {
    throw errorTypes.conflictError('Email is already registered');
  }
}

export async function signUp(userData: CreateUserData) {
  const signUp = await validateSignUp(userData);
  delete userData.confirm_password;
  await userRepository.insert(signUp);
}

async function validateSignIn(userData: UserData) {
  const userExists = await getUserEmail(userData.email);
  if (!userExists) {
    throw errorTypes.notFoundError('Email not registered');
  }
  await encryptUtils.syncHashedPassword(userData);
}

export async function signIn(userData: UserData) {
  await validateSignIn(userData);
  const token = await generateToken(userData);
  return token;
}
