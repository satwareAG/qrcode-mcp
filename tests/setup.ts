/**
 * Global Test Setup
 * Enterprise-grade test configuration for qrcode-MCP
 * Research-validated testing framework setup
 */

// Extend Jest matchers for enhanced testing capabilities
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinPerformanceThreshold(maxMs: number): R;
      toBeValidQRCode(): R;
      toComplyWithMCPProtocol(): R;
    }
  }
}

// Custom Jest matchers for QR code and MCP testing
expect.extend({
  /**
   * Performance validation matcher - Sub-100ms research target
   */
  toBeWithinPerformanceThreshold(received: number, maxMs: number) {
    const pass = received <= maxMs;
    return {
      message: () =>
        pass
          ? `Expected ${received}ms to exceed ${maxMs}ms threshold`
          : `Expected ${received}ms to be within ${maxMs}ms performance threshold`,
      pass,
    };
  },

  /**
   * QR Code validation matcher for output verification
   */
  toBeValidQRCode(received: string) {
    // Basic QR code validation - will be enhanced in implementation
    const isValidBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(received);
    const isSVG = received.includes('<svg') && received.includes('</svg>');
    const pass = isValidBase64 || isSVG;
    
    return {
      message: () =>
        pass
          ? `Expected ${received} to be invalid QR code format`
          : `Expected ${received} to be valid QR code (SVG or base64 image)`,
      pass,
    };
  },

  /**
   * MCP Protocol compliance matcher
   */
  toComplyWithMCPProtocol(received: any) {
    // Basic MCP message structure validation
    const hasValidStructure = 
      typeof received === 'object' &&
      received !== null &&
      'jsonrpc' in received &&
      received.jsonrpc === '2.0';
    
    return {
      message: () =>
        hasValidStructure
          ? `Expected message to violate MCP protocol`
          : `Expected message to comply with MCP protocol (JSON-RPC 2.0)`,
      pass: hasValidStructure,
    };
  },
});

// Global test configuration
beforeAll(async () => {
  // Setup global test environment
  process.env.NODE_ENV = 'test';
  process.env.MCP_TEST_MODE = 'true';
  
  // Performance monitoring setup
  global.startTime = Date.now();
});

afterAll(async () => {
  // Cleanup after all tests
  const totalTime = Date.now() - global.startTime;
  console.log(`\n📊 Total test execution time: ${totalTime}ms`);
});

// Test timeout configuration for performance testing
jest.setTimeout(10000); // 10 seconds max per test

// Mock console methods in test environment to reduce noise
if (process.env.NODE_ENV === 'test') {
  global.console = {
    ...console,
    // Keep error and warn for debugging
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
  };
}

export {};