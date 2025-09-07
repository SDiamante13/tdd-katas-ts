module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/katas'],
    reporters: [
        'default',
        [
            'tdd-guard-jest',
            {
                projectRoot: __dirname,
            },
        ],
    ],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/*.(test|spec).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    collectCoverageFrom: [
        'katas/**/*.{ts,tsx}',
        '!katas/**/*.d.ts',
        '!katas/**/*.test.{ts,tsx}',
        '!katas/**/*.spec.{ts,tsx}'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html']
};