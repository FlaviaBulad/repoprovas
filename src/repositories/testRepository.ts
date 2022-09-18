import { prisma } from '../config/database/prisma';

export async function insert(testData) {
  await prisma.tests.create({ data: testData });
}

export async function getByDiscipline() {
  return prisma.terms.findMany({
    select: {
      id: false,
      number: true,
      disciplines: {
        select: {
          name: true,
          id: false,
          termId: false,
          teacherDiscipline: {
            select: {
              teacher: {
                select: {
                  name: true
                }
              },
              tests: {
                distinct: ['categoryId'],
                select: {
                  category: {
                    select: {
                      name: true,
                      tests: {
                        select: {
                          name: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}
