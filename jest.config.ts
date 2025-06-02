/**
 * Jest Configuration for QRCode-MCP Testing Framework
 * Enterprise-grade test configuration with research-validated settings
 * Supports unit, integration, protocol, security, and performance testing
 */

import type { Config } from 'jest';

const config: Config = {
  // Basic TypeScript Configuration
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Test Discovery
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  
  // TypeScript Transformation
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  
  // Module Resolution
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  moduleFileExtensions: [
    'ts',
    'tsx', 
    'js',
    'jsx',
    'json'
  ],
  
  // Coverage Configuration (Research-validated 90%+ thresholds)
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts', // Entry point excluded
    '!src/**/*.test.ts',
    '!src/**/__tests__/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',           // Console output
    'lcov',           // For CI/CD integration
    'html',           // Human-readable reports
    'json-summary',   // For automation
    'clover'          // For some CI systems
  ],
  
  // Research-validated coverage thresholds (Enterprise-grade 90%+)
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    // Stricter thresholds for core modules
    './src/utils/qr-generator.ts': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    './src/server.ts': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  
  // Test Setup and Environment
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // Performance and Timeout Configuration
  testTimeout: 10000, // 10 seconds for performance tests
  slowTestThreshold: 2000, // Warn if tests take longer than 2s
  
  // Parallel Execution (Optimize based on CI environment)
  maxWorkers: '50%', // Use half available CPU cores
  
  // Test Result Processing
  verbose: true,
  detectOpenHandles: true,
  forceExit: false,
  
  // Mock Configuration
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  
  // Global Variables
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        module: 'ESNext',
        target: 'ES2022'
      }
    }
  },
  
  // Test Categories Configuration
  projects: [
    // Unit Tests
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      testTimeout: 5000,
      collectCoverage: true
    },
    
    // Integration Tests  
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      testTimeout: 15000,
      // May need longer timeout for MCP Inspector integration
      setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
    },
    
    // Protocol Tests
    {
      displayName: 'protocol',
      testMatch: ['<rootDir>/tests/protocol/**/*.test.ts'],
      testTimeout: 8000
    },
    
    // Security Tests
    {
      displayName: 'security',
      testMatch: ['<rootDir>/tests/security/**/*.test.ts'],
      testTimeout: 10000
    },
    
    // Performance Tests
    {
      displayName: 'performance',
      testMatch: ['<rootDir>/tests/performance/**/*.test.ts'],
      testTimeout: 30000, // Longer timeout for performance benchmarks
      collectCoverage: false, // Don't collect coverage for perf tests
      // Performance tests may need special environment
      setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
    }
  ],
  
  // Reporter Configuration for CI/CD
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './coverage',
        outputName: 'junit.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: true,
        suiteNameTemplate: '{filename}'
      }
    ]
  ],
  
  // Watch Mode Configuration (for development)
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  
  // Error Handling
  errorOnDeprecated: true,
  bail: 0, // Don't stop on first failure for comprehensive testing
  
  // Cache Configuration
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  
  // Test Environment Options
  testEnvironmentOptions: {
    // Node.js specific options
    NODE_ENV: 'test'
  },
  
  // Custom Jest Extensions
  extensionsToTreatAsEsm: ['.ts'],
  
  // Snapshot Configuration
  updateSnapshot: false, // Prevent accidental snapshot updates
  
  // Performance Monitoring
  logHeapUsage: true,
  
  // Custom Test Patterns for Different Scenarios
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/'
  ],
  
  // Transform Ignore Patterns
  transformIgnorePatterns: [
    'node_modules/(?!(@modelcontextprotocol)/)'
  ],
  
  // Module Path Ignore Patterns
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/'
  ]
};

export default config;