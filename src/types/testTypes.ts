import { Tests } from '@prisma/client';

export type TestData = Omit<Tests, 'id'>;
