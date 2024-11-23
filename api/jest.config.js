export default {
    preset: 'ts-jest/presets/default-esm',
    moduleNameMapper: {
      '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
      '^@entities/(.*)$': '<rootDir>/src/entities/$1',
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@factories/(.*)$': '<rootDir>/src/factories/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1',
    },
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
};