module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Change here if browser-like behavior is unnecessary
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$',
    '/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$',
  ],
}
