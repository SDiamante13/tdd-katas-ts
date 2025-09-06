module.exports = {
    reporters: [
        'default',
        [
            'tdd-guard-jest',
            {
                projectRoot: __dirname,
            },
        ],
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/*.(test|spec).+(ts|tsx|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
};