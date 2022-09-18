import { TestData } from '../types/testTypes';

import * as categoryRepository from '../repositories/categoryRepository';
import * as disciplineRepository from '../repositories/disciplineRepository';
import * as teacherRepository from '../repositories/teacherRepository';
import * as testRepository from '../repositories/testRepository';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository';
import * as errorTypes from '../utils/errorUtils';

async function getTeacherId(teacher: string) {
  const teacherExists = await teacherRepository.findIdByName(teacher);
  if (!teacherExists) throw errorTypes.notFoundError('teacher not found');
  const teacherId = teacherExists.id;
  return teacherId;
}

async function getDisciplineId(discipline: string) {
  const disciplineExists = await disciplineRepository.findIdByName(discipline);
  if (!disciplineExists)
    throw errorTypes.notFoundError('discipline does not exist');
  const disciplineId = disciplineExists.id;
  return disciplineId;
}

async function getCategory(category: string) {
  const categoryExists = await categoryRepository.findByName(category);
  if (!categoryExists) {
    throw errorTypes.notFoundError('Category does not exist');
  }
  const categoryId = categoryExists.id;
  return categoryId;
}

async function getTeacherDisciplinesId(
  teacherId: number,
  disciplineId: number
) {
  const isTeacherDisciplineValid = await teacherDisciplineRepository.getById(
    teacherId,
    disciplineId
  );
  if (!isTeacherDisciplineValid)
    throw errorTypes.conflictError('teacher does not teach this subject');
  const teacherDisciplineId = isTeacherDisciplineValid.id;
  return teacherDisciplineId;
}

export async function createTest(testData) {
  const teacherId = await getTeacherId(testData.teacher);
  const disciplineId = await getDisciplineId(testData.discipline);
  const categoryId = await getCategory(testData.category);
  const teachersDisciplineId = await getTeacherDisciplinesId(
    teacherId,
    disciplineId
  );

  const test = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId,
    teachersDisciplineId
  };
  await testRepository.insert(test);
}
