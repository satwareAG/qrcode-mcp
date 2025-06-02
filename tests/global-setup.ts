/**
 * Global Test Setup
 * Enterprise-grade test environment initialization
 * Performance monitoring and validation infrastructure
 */

export default async function globalSetup(): Promise<void> {
  console.log('\n🚀 Initializing qrcode-MCP test environment...');
  
  // Performance monitoring initialization
  global.__TEST_START_TIME__ = Date.now();
  
  // Environment configuration for testing
  process.env.NODE_ENV = 'test';
  process.env.MCP_TEST_MODE = 'true';
  process.env.LOG_LEVEL = 'error'; // Reduce noise during testing
  
  // Memory baseline for performance testing
  const initialMemory = process.memoryUsage();
  global.__INITIAL_MEMORY__ = initialMemory.heapUsed;
  
  // Test environment validation
  console.log('📊 Test environment metrics:');
  console.log(`   Node.js version: ${process.version}`);
  console.log(`   Platform: ${process.platform}`);
  console.log(`   Memory baseline: ${(initialMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   CPU architecture: ${process.arch}`);
  
  // Research-validated performance baseline logging
  console.log('\n🎯 Performance targets:');
  console.log('   QR generation: <100ms (95th percentile)');
  console.log('   Memory usage: <50MB baseline');
  console.log('   Concurrent requests: 100+ simultaneous');
  console.log('   Cold start: <2 seconds');
  console.log('   Test coverage: 90%+ threshold');
  
  // Mock external dependencies for testing
  setupMockEnvironment();
  
  // Initialize performance tracking
  initializePerformanceTracking();
  
  console.log('✅ Test environment setup complete\n');
}

/**
 * Setup mock environment for isolated testing
 */
function setupMockEnvironment(): void {
  // Mock console methods to reduce test output noise while preserving error/warn
  if (!process.env.JEST_VERBOSE) {
    const originalConsole = global.console;
    global.console = {
      ...originalConsole,
      log: jest.fn(), // Mock info logs
      info: jest.fn(), // Mock info messages  
      debug: jest.fn(), // Mock debug messages
      // Preserve error and warn for debugging
      error: originalConsole.error,
      warn: originalConsole.warn,
    };
  }
  
  // Mock MCP Inspector if not available
  jest.mock('@modelcontextprotocol/inspector', () => ({
    Inspector: jest.fn().mockImplementation(() => ({
      inspect: jest.fn().mockResolvedValue({ status: 'ok' }),
      validate: jest.fn().mockResolvedValue(true),
    })),
  }), { virtual: true });
  
  // Mock QRCode library for predictable testing
  jest.mock('qrcode', () => ({
    toSVG: jest.fn(),
    toDataURL: jest.fn(),
    toString: jest.fn(),
  }), { virtual: true });
}

/**
 * Initialize performance tracking infrastructure
 */
function initializePerformanceTracking(): void {
  // Global performance metrics collection
  global.__PERFORMANCE_METRICS__ = {
    qr_generation: [],
    memory_usage: [],
    test_duration: [],
    error_count: 0,
  };
  
  // Track test execution performance
  global.__TEST_PERFORMANCE_TRACKER__ = {
    startTest: (testName: string) => {
      const startTime = performance.now();
      global.__TEST_PERFORMANCE_TRACKER__._activeTests = 
        global.__TEST_PERFORMANCE_TRACKER__._activeTests || new Map();
      global.__TEST_PERFORMANCE_TRACKER__._activeTests.set(testName, startTime);
    },
    
    endTest: (testName: string) => {
      const endTime = performance.now();
      const activeTests = global.__TEST_PERFORMANCE_TRACKER__._activeTests;
      if (activeTests && activeTests.has(testName)) {
        const startTime = activeTests.get(testName);
        const duration = endTime - startTime;
        global.__PERFORMANCE_METRICS__.test_duration.push({
          test: testName,
          duration: duration,
          timestamp: Date.now(),
        });
        activeTests.delete(testName);
        
        // Log slow tests (>5 seconds) for optimization
        if (duration > 5000) {
          console.warn(`⚠️  Slow test detected: ${testName} took ${duration.toFixed(2)}ms`);
        }
      }
    },
    
    recordQRGeneration: (duration: number, size: number, textLength: number) => {
      global.__PERFORMANCE_METRICS__.qr_generation.push({
        duration,
        size,
        textLength,
        timestamp: Date.now(),
      });
    },
    
    recordMemoryUsage: () => {
      const currentMemory = process.memoryUsage();
      global.__PERFORMANCE_METRICS__.memory_usage.push({
        heapUsed: currentMemory.heapUsed,
        heapTotal: currentMemory.heapTotal,
        external: currentMemory.external,
        timestamp: Date.now(),
      });
    },
  };
  
  // Setup periodic memory monitoring during tests
  const memoryMonitorInterval = setInterval(() => {
    global.__TEST_PERFORMANCE_TRACKER__.recordMemoryUsage();
  }, 5000); // Every 5 seconds
  
  // Store interval reference for cleanup
  global.__MEMORY_MONITOR_INTERVAL__ = memoryMonitorInterval;
}

// Declare global types for TypeScript
declare global {
  var __TEST_START_TIME__: number;
  var __INITIAL_MEMORY__: number;
  var __PERFORMANCE_METRICS__: {
    qr_generation: Array<{
      duration: number;
      size: number;
      textLength: number;
      timestamp: number;
    }>;
    memory_usage: Array<{
      heapUsed: number;
      heapTotal: number;
      external: number;
      timestamp: number;
    }>;
    test_duration: Array<{
      test: string;
      duration: number;
      timestamp: number;
    }>;
    error_count: number;
  };
  var __TEST_PERFORMANCE_TRACKER__: {
    _activeTests?: Map<string, number>;
    startTest: (testName: string) => void;
    endTest: (testName: string) => void;
    recordQRGeneration: (duration: number, size: number, textLength: number) => void;
    recordMemoryUsage: () => void;
  };
  var __MEMORY_MONITOR_INTERVAL__: NodeJS.Timeout;
}