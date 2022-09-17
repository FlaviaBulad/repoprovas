import * as userRepository from '../repositories/userRepository';
import * as bcryptUtils from '../utils/bcryptUtils';
import * as errorTypes from '../utils/errorUtils';
import { UserData, CreateUserData } from '../types/userTypes';

export async function getUserEmail(email: string) {
  const userEmail = await userRepository.findByEmail(email);
  return userEmail;
}

async function validateEmail(email: string) {
  const emailExists = getUserEmail(email);
  if (emailExists) {
    throw errorTypes.conflictError('Email already registered');
  }
  return emailExists;
}

async function validatePassword(password: string, confirm_password: string) {
  if (password !== confirm_password)
    throw errorTypes.unprocessableEntity(
      'The password confirmation does not match'
    );
}

export async function signUp(userData: CreateUserData) {
  const data: CreateUserData = userData;
  await validateEmail(data.email);
  await validatePassword(data.password, data.confirm_password);
  const hashedPassword: string = await bcryptUtils.hashPassword(data.password);

  const signUpData = {
    email: data.email,
    password: hashedPassword
  };
  await userRepository.insert(signUpData);
}
