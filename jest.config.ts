export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest', // process `*.tsx` files with `ts-jest`
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    // Replicate as .env
                    VITE_PROJECT_KEY: 'test',
                    VITE_CLIENT_ID: 'test',
                    VITE_CLIENT_SECRET: 'test',
                    VITE_API_URL: 'test',
                    VITE_AUTH_URL: 'test',
                    VITE_SCOPES: 'test',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  rootDir: './',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!jest.config.ts', '!vite.config.ts', '!**/*.d.ts'],
  coverageReporters: ['text', 'text-summary'],
};
