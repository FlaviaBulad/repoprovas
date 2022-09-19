import { faker } from '@faker-js/faker';

const fakeName: string = faker.lorem.paragraph(1);
const fakeUrl: string = faker.internet.url();

export async function createTest() {
  return {
    name: fakeName,
    pdfUrl: fakeUrl,
    discipline: 'JavaScript',
    category: 'Projeto',
    teacher: 'Diego Pinho'
  };
}
