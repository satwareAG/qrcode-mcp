/**
 * Jest Configuration for qrcode-MCP
 * Enterprise-grade testing configuration with research-validated settings
 * 90%+ coverage threshold enforcement
 */

export default {
  // Test Environment Configuration
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  
  // Module Resolution
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/tools/(.*)$': '<rootDir>/src/tools/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1', // Handle .js imports in TypeScript
  },

  // Test File Discovery
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.spec.ts',
    '**/__tests__/**/*.ts',
  ],

  // Transform Configuration
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ESNext',
          target: 'ES2022',
        },
      },
    ],
  },

  // Coverage Configuration - Research-validated 90%+ thresholds
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts', // Entry point excluded
    '!src/types/**/*.ts', // Type definitions excluded
    '!src/**/*.interface.ts',
    '!src/**/*.type.ts',
  ],

  coverageDirectory: 'coverage',
  
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json-summary',
    'clover',
  ],

  // Research-validated coverage thresholds (90%+ enterprise standard)
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    // Specific thresholds for critical components
    './src/tools/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    './src/utils/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },

  // Test Execution Configuration
  testTimeout: 10000, // 10 seconds for performance tests
  maxWorkers: '50%', // Optimize for CI/CD efficiency
  
  // Setup Files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],

  // Error Handling
  errorOnDeprecated: true,
  verbose: true,
  
  // Performance and Reliability
  detectOpenHandles: true,
  detectLeaks: true,
  forceExit: true,
  
  // Test Categories Configuration
  projects: [
    // Unit Tests
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      collectCoverageFrom: [
        'src/utils/**/*.ts',
        'src/services/**/*.ts',
      ],
    },
    
    // Integration Tests
    {
      displayName: 'integration', 
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      testTimeout: 15000, // Longer timeout for integration tests
      collectCoverageFrom: [
        'src/tools/**/*.ts',
        'src/server/**/*.ts',
      ],
    },
    
    // Protocol Compliance Tests
    {
      displayName: 'protocol',
      testMatch: ['<rootDir>/tests/protocol/**/*.test.ts'],
      testTimeout: 5000,
    },
    
    // Security Tests
    {
      displayName: 'security',
      testMatch: ['<rootDir>/tests/security/**/*.test.ts'],
      testTimeout: 8000,
    },
    
    // Performance Tests
    {
      displayName: 'performance',
      testMatch: ['<rootDir>/tests/performance/**/*.test.ts'],
      testTimeout: 30000, // Extended timeout for performance benchmarks
      maxWorkers: 1, // Sequential execution for accurate performance measurement
    },
  ],

  // Reporter Configuration for CI/CD
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'coverage',
      outputName: 'junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › ',
      usePathForSuiteName: true,
    }],
  ],

  // Mock Configuration
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  
  // Global Configuration
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        module: 'ESNext',
        target: 'ES2022',
      },
    },
  },

  // Watch Mode Configuration
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
  ],

  // Ignore Patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
  ],

  // Module File Extensions
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Transform Ignore Patterns
  transformIgnorePatterns: [
    'node_modules/(?!(@modelcontextprotocol)/)',
  ],

  // Global Setup/Teardown for performance monitoring
  globalSetup: '<rootDir>/tests/global-setup.ts',
  globalTeardown: '<rootDir>/tests/global-teardown.ts',
};