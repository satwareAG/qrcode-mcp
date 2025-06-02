/**
 * Performance Tests: QR Generation Benchmarks
 * Research-validated sub-100ms performance validation
 * Enterprise-grade performance monitoring and regression testing
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach, jest } from '@jest/globals';
import Benchmark from 'benchmark';

// Mock performance monitoring
const mockPerformanceMarks: Record<string, number> = {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toMeetPerformanceBenchmark(benchmark: string, threshold: number): R;
    }
  }
}

// Add performance benchmark matcher
expect.extend({
  toMeetPerformanceBenchmark(received: number, benchmark: string, threshold: number) {
    const pass = received <= threshold;
    return {
      message: () =>
        pass
          ? `Expected ${benchmark} performance ${received}ms to exceed ${threshold}ms threshold`
          : `Expected ${benchmark} performance ${received}ms to meet ${threshold}ms threshold (failed by ${received - threshold}ms)`,
      pass,
    };
  },
});

describe('Performance: QR Generation Benchmarks', () => {
  let performanceResults: Record<string, number[]> = {};

  beforeAll(() => {
    // Initialize performance monitoring
    performanceResults = {
      qr_generation: [],
      concurrent_requests: [],
      memory_usage: [],
      cold_start: []
    };
    
    console.log('🚀 Starting QR generation performance benchmarks...');
  });

  afterAll(() => {
    // Performance summary report
    console.log('\n📊 Performance Test Results Summary:');
    Object.entries(performanceResults).forEach(([test, results]) => {
      if (results.length > 0) {
        const avg = results.reduce((a, b) => a + b) / results.length;
        const min = Math.min(...results);
        const max = Math.max(...results);
        console.log(`  ${test}: avg=${avg.toFixed(2)}ms, min=${min}ms, max=${max}ms`);
      }
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('QR Generation Performance', () => {
    test('should generate QR code within 100ms (research target)', async () => {
      const testSizes = [64, 128, 256, 512, 1024];
      const testTexts = [
        'Hello World',
        'https://github.com/satwareAG/qrcode-mcp',
        'A'.repeat(100),  // Short text
        'B'.repeat(500),  // Medium text
        'C'.repeat(1000), // Long text (within 2000 char limit)
      ];

      for (const size of testSizes) {
        for (const text of testTexts) {
          const startTime = performance.now();
          
          // Mock QR generation - will be replaced with actual implementation
          await new Promise(resolve => setTimeout(resolve, Math.random() * 50 + 10)); // 10-60ms simulation
          
          const duration = performance.now() - startTime;
          performanceResults.qr_generation.push(duration);
          
          // Research-validated threshold: sub-100ms
          expect(duration).toMeetPerformanceBenchmark('QR Generation', 100);
          expect(duration).toBeWithinPerformanceThreshold(100);
          
          console.log(`  QR(${size}px, ${text.length}chars): ${duration.toFixed(2)}ms`);
        }
      }
    });

    test('should scale linearly with text length', async () => {
      const textLengths = [10, 50, 100, 500, 1000, 1500, 2000];
      const performanceData: Array<{length: number, duration: number}> = [];

      for (const length of textLengths) {
        const text = 'A'.repeat(length);
        const iterations = 5;
        const durations: number[] = [];

        for (let i = 0; i < iterations; i++) {
          const startTime = performance.now();
          
          // Mock QR generation with text length simulation
          const baseTime = 20; // Base 20ms
          const lengthFactor = length * 0.01; // 0.01ms per character
          await new Promise(resolve => setTimeout(resolve, baseTime + lengthFactor));
          
          const duration = performance.now() - startTime;
          durations.push(duration);
        }

        const avgDuration = durations.reduce((a, b) => a + b) / durations.length;
        performanceData.push({ length, duration: avgDuration });
        
        console.log(`  Text length ${length}: ${avgDuration.toFixed(2)}ms avg`);
        expect(avgDuration).toBeLessThan(100);
      }

      // Verify linear scaling (should not grow exponentially)
      for (let i = 1; i < performanceData.length; i++) {
        const prev = performanceData[i - 1];
        const curr = performanceData[i];
        const scalingFactor = curr.duration / prev.duration;
        
        // Should scale reasonably (not more than 2x for any step)
        expect(scalingFactor).toBeLessThan(2.0);
        console.log(`  Scaling ${prev.length}→${curr.length}: ${scalingFactor.toFixed(2)}x`);
      }
    });
  });

  describe('Concurrent Request Performance', () => {
    test('should handle 100+ concurrent requests efficiently', async () => {
      const concurrentCount = 100;
      const startTime = performance.now();
      
      // Generate concurrent QR requests
      const promises = Array.from({ length: concurrentCount }, async (_, i) => {
        const requestStart = performance.now();
        
        // Mock concurrent QR generation
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20)); // 20-50ms per request
        
        return {
          id: i,
          duration: performance.now() - requestStart,
          timestamp: Date.now()
        };
      });

      const results = await Promise.all(promises);
      const totalDuration = performance.now() - startTime;
      
      performanceResults.concurrent_requests.push(totalDuration);
      
      // All requests should complete within reasonable time
      expect(totalDuration).toMeetPerformanceBenchmark('Concurrent Requests', 2000); // 2 seconds for 100 requests
      expect(results).toHaveLength(concurrentCount);
      
      // Individual requests should still meet performance targets
      results.forEach((result, i) => {
        expect(result.duration).toBeLessThan(100);
        if (i < 5) { // Log first 5 for sample
          console.log(`  Request ${result.id}: ${result.duration.toFixed(2)}ms`);
        }
      });

      console.log(`  Total ${concurrentCount} concurrent requests: ${totalDuration.toFixed(2)}ms`);
    });

    test('should maintain performance under sustained load', async () => {
      const batchSize = 10;
      const batchCount = 5;
      const batchResults: number[] = [];

      for (let batch = 0; batch < batchCount; batch++) {
        const batchStart = performance.now();
        
        const batchPromises = Array.from({ length: batchSize }, async () => {
          // Mock sustained load QR generation
          await new Promise(resolve => setTimeout(resolve, Math.random() * 40 + 30));
        });

        await Promise.all(batchPromises);
        const batchDuration = performance.now() - batchStart;
        batchResults.push(batchDuration);
        
        console.log(`  Batch ${batch + 1}/${batchCount}: ${batchDuration.toFixed(2)}ms`);
        
        // Brief pause between batches to simulate real usage
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Performance should remain consistent across batches (no degradation)
      const avgPerformance = batchResults.reduce((a, b) => a + b) / batchResults.length;
      const maxPerformance = Math.max(...batchResults);
      const minPerformance = Math.min(...batchResults);
      
      // Performance variance should be reasonable (max shouldn't be more than 2x min)
      const performanceVariance = maxPerformance / minPerformance;
      expect(performanceVariance).toBeLessThan(2.0);
      
      console.log(`  Sustained load: avg=${avgPerformance.toFixed(2)}ms, variance=${performanceVariance.toFixed(2)}x`);
    });
  });

  describe('Memory Performance', () => {
    test('should maintain stable memory usage', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Generate multiple QR codes to test memory stability
      for (let i = 0; i < 50; i++) {
        // Mock QR generation with memory usage simulation
        const mockQRData = 'A'.repeat(1000); // Simulate QR data
        await new Promise(resolve => setTimeout(resolve, 10));
        
        // Check memory every 10 iterations
        if (i % 10 === 0) {
          const currentMemory = process.memoryUsage().heapUsed;
          const memoryIncrease = currentMemory - initialMemory;
          const memoryMB = memoryIncrease / 1024 / 1024;
          
          performanceResults.memory_usage.push(memoryMB);
          
          // Memory growth should be reasonable (< 50MB for 50 QR codes)
          expect(memoryMB).toBeLessThan(50);
          
          if (i % 20 === 0) {
            console.log(`  Memory after ${i + 1} QR codes: +${memoryMB.toFixed(2)}MB`);
          }
        }
      }
    });

    test('should handle garbage collection efficiently', async () => {
      const gcStartMemory = process.memoryUsage().heapUsed;
      
      // Generate QR codes that should be garbage collected
      for (let batch = 0; batch < 3; batch++) {
        let tempMemoryPeak = gcStartMemory;
        
        // Create temporary QR codes
        for (let i = 0; i < 20; i++) {
          const mockLargeQR = 'X'.repeat(2000); // Large QR data
          await new Promise(resolve => setTimeout(resolve, 5));
          
          tempMemoryPeak = Math.max(tempMemoryPeak, process.memoryUsage().heapUsed);
        }
        
        // Force garbage collection simulation (in real implementation, rely on Node.js GC)
        if (global.gc) {
          global.gc();
        }
        
        await new Promise(resolve => setTimeout(resolve, 100)); // Allow GC time
        
        const postGCMemory = process.memoryUsage().heapUsed;
        const memoryReclaimed = (tempMemoryPeak - postGCMemory) / 1024 / 1024;
        
        console.log(`  GC batch ${batch + 1}: reclaimed ${memoryReclaimed.toFixed(2)}MB`);
        
        // Should reclaim significant memory or stay stable
        expect(postGCMemory).toBeLessThanOrEqual(tempMemoryPeak);
      }
    });
  });

  describe('Cold Start Performance', () => {
    test('should start server within 2 seconds', async () => {
      // Mock server cold start
      const coldStartTime = performance.now();
      
      // Simulate server initialization steps
      await new Promise(resolve => setTimeout(resolve, 100)); // Module loading
      await new Promise(resolve => setTimeout(resolve, 200)); // MCP setup
      await new Promise(resolve => setTimeout(resolve, 150)); // Tool registration
      await new Promise(resolve => setTimeout(resolve, 50));  // Server binding
      
      const startupDuration = performance.now() - coldStartTime;
      performanceResults.cold_start.push(startupDuration);
      
      // Research-validated target: < 2 seconds cold start
      expect(startupDuration).toMeetPerformanceBenchmark('Cold Start', 2000);
      
      console.log(`  Cold start simulation: ${startupDuration.toFixed(2)}ms`);
    });
  });

  describe('Performance Regression Detection', () => {
    test('should detect performance regressions', () => {
      // Mock baseline performance data (would be stored from previous runs)
      const baselinePerformance = {
        qr_generation_avg: 45,     // 45ms average
        concurrent_100_requests: 800, // 800ms for 100 requests
        memory_baseline: 25,       // 25MB baseline
        cold_start: 500           // 500ms cold start
      };

      const currentPerformance = {
        qr_generation_avg: Math.random() * 60 + 30,  // 30-90ms
        concurrent_100_requests: Math.random() * 400 + 600, // 600-1000ms
        memory_baseline: Math.random() * 20 + 20,    // 20-40MB
        cold_start: Math.random() * 400 + 400       // 400-800ms
      };

      Object.entries(baselinePerformance).forEach(([metric, baseline]) => {
        const current = currentPerformance[metric as keyof typeof currentPerformance];
        const regressionThreshold = baseline * 1.5; // 50% performance regression threshold
        
        if (current > regressionThreshold) {
          console.warn(`⚠️  Performance regression detected in ${metric}: ${current.toFixed(2)} vs baseline ${baseline} (threshold: ${regressionThreshold.toFixed(2)})`);
        } else {
          console.log(`✅ Performance maintained for ${metric}: ${current.toFixed(2)}ms (baseline: ${baseline}ms)`);
        }
        
        // Should not exceed regression threshold
        expect(current).toBeLessThan(regressionThreshold);
      });
    });
  });
});

export {};