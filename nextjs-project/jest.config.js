import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1',
      '^@/pages/(.*)$': '<rootDir>/pages/$1',
      '^@/services/(.*)$': '<rootDir>/src/services/$1',
      '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
      '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customJestConfig);