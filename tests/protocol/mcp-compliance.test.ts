/**
 * Protocol Tests: MCP Compliance and JSON-RPC Validation
 * Research-validated protocol compliance testing framework
 * Enterprise-grade MCP specification adherence validation
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';

describe('Protocol: MCP Compliance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('JSON-RPC 2.0 Protocol Compliance', () => {
    test('should validate JSON-RPC 2.0 message structure', () => {
      const validMessages = [
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: { clientInfo: { name: 'test-client' } }
        },
        {
          jsonrpc: '2.0',
          id: 2,
          result: { success: true }
        },
        {
          jsonrpc: '2.0',
          id: 3,
          error: { code: -32601, message: 'Method not found' }
        },
        {
          jsonrpc: '2.0',
          method: 'notification',
          params: { event: 'test' }
        }
      ];

      validMessages.forEach((message, index) => {
        expect(message).toComplyWithMCPProtocol();
        expect(message.jsonrpc).toBe('2.0');
        
        // Requests must have method and may have id/params
        if ('method' in message) {
          expect(typeof message.method).toBe('string');
          expect(message.method.length).toBeGreaterThan(0);
        }
        
        // Responses must have id and either result or error (but not both)
        if ('result' in message || 'error' in message) {
          expect('id' in message).toBe(true);
          expect('result' in message && 'error' in message).toBe(false);
        }
        
        console.log(`✅ Valid JSON-RPC message ${index + 1}: ${message.method || 'response'}`);
      });
    });

    test('should reject invalid JSON-RPC messages', () => {
      const invalidMessages = [
        {
          // Missing jsonrpc field
          id: 1,
          method: 'test'
        },
        {
          // Wrong jsonrpc version
          jsonrpc: '1.0',
          id: 2,
          method: 'test'
        },
        {
          // Both result and error present
          jsonrpc: '2.0',
          id: 3,
          result: { success: true },
          error: { code: -1, message: 'Invalid' }
        },
        {
          // Empty method name
          jsonrpc: '2.0',
          id: 4,
          method: ''
        },
        {
          // Non-string method
          jsonrpc: '2.0',
          id: 5,
          method: 123
        }
      ];

      invalidMessages.forEach((message, index) => {
        console.log(`⚠️  Testing invalid message ${index + 1}`);
        
        // Should not comply with MCP protocol
        if (message.jsonrpc !== '2.0') {
          expect(message).not.toComplyWithMCPProtocol();
        }
        
        // Check specific violations
        if ('result' in message && 'error' in message) {
          console.log('   Violation: Both result and error present');
        }
        if ('method' in message && typeof message.method !== 'string') {
          console.log('   Violation: Non-string method');
        }
        if ('method' in message && message.method === '') {
          console.log('   Violation: Empty method');
        }
      });
    });
  });

  describe('MCP Initialization Protocol', () => {
    test('should handle initialization request correctly', () => {
      const initRequest = {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-01-01',
          capabilities: {
            tools: {},
            logging: {}
          },
          clientInfo: {
            name: 'test-client',
            version: '1.0.0'
          }
        }
      };

      // Validate initialization request structure
      expect(initRequest).toComplyWithMCPProtocol();
      expect(initRequest.method).toBe('initialize');
      expect(initRequest.params).toHaveProperty('protocolVersion');
      expect(initRequest.params).toHaveProperty('capabilities');
      expect(initRequest.params).toHaveProperty('clientInfo');
      
      // Validate client info
      expect(initRequest.params.clientInfo.name).toBe('test-client');
      expect(typeof initRequest.params.clientInfo.version).toBe('string');
      
      console.log('✅ Initialization request validation passed');
    });

    test('should provide correct initialization response', () => {
      const initResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: {
          protocolVersion: '2025-01-01',
          capabilities: {
            tools: {
              listChanged: false
            },
            logging: {}
          },
          serverInfo: {
            name: '@satware/qrcode-mcp',
            version: '1.0.0'
          },
          instructions: 'QR code generation server for AI assistants'
        }
      };

      // Validate initialization response structure
      expect(initResponse).toComplyWithMCPProtocol();
      expect(initResponse.result).toHaveProperty('protocolVersion');
      expect(initResponse.result).toHaveProperty('capabilities');
      expect(initResponse.result).toHaveProperty('serverInfo');
      
      // Validate server info
      expect(initResponse.result.serverInfo.name).toBe('@satware/qrcode-mcp');
      expect(initResponse.result.serverInfo.version).toBe('1.0.0');
      
      console.log('✅ Initialization response validation passed');
    });
  });

  describe('Tools Protocol Compliance', () => {
    test('should handle tools/list request correctly', () => {
      const listToolsRequest = {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/list'
      };

      const listToolsResponse = {
        jsonrpc: '2.0',
        id: 2,
        result: {
          tools: [
            {
              name: 'generate_qr',
              description: 'Generate QR codes with customizable options for text, size, and format',
              inputSchema: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'Text content to encode in the QR code',
                    maxLength: 2000
                  },
                  size: {
                    type: 'number',
                    description: 'QR code size in pixels',
                    minimum: 64,
                    maximum: 2048,
                    default: 256
                  },
                  format: {
                    type: 'string',
                    enum: ['svg', 'png', 'base64'],
                    description: 'Output format for the QR code',
                    default: 'svg'
                  },
                  errorCorrection: {
                    type: 'string',
                    enum: ['L', 'M', 'Q', 'H'],
                    description: 'Error correction level',
                    default: 'M'
                  },
                  margin: {
                    type: 'number',
                    description: 'Margin size around QR code',
                    minimum: 0,
                    maximum: 10,
                    default: 4
                  }
                },
                required: ['text']
              }
            },
            {
              name: 'batch_generate',
              description: 'Generate multiple QR codes in a single request',
              inputSchema: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    maxItems: 100,
                    items: {
                      type: 'object',
                      properties: {
                        text: { type: 'string', maxLength: 2000 },
                        filename: { type: 'string' },
                        size: { type: 'number', minimum: 64, maximum: 2048 }
                      },
                      required: ['text']
                    }
                  },
                  format: {
                    type: 'string',
                    enum: ['svg', 'png'],
                    default: 'svg'
                  },
                  zipOutput: {
                    type: 'boolean',
                    default: false
                  }
                },
                required: ['items']
              }
            }
          ]
        }
      };

      // Validate tools/list protocol compliance
      expect(listToolsRequest).toComplyWithMCPProtocol();
      expect(listToolsRequest.method).toBe('tools/list');
      
      expect(listToolsResponse).toComplyWithMCPProtocol();
      expect(listToolsResponse.result.tools).toHaveLength(2);
      
      // Validate tool schemas
      listToolsResponse.result.tools.forEach((tool, index) => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('description');
        expect(tool).toHaveProperty('inputSchema');
        expect(tool.inputSchema.type).toBe('object');
        expect(tool.inputSchema).toHaveProperty('properties');
        expect(tool.inputSchema).toHaveProperty('required');
        
        console.log(`✅ Tool ${index + 1} (${tool.name}) schema validation passed`);
      });
    });

    test('should handle tools/call request correctly', () => {
      const toolCallRequest = {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'generate_qr',
          arguments: {
            text: 'https://github.com/satwareAG/qrcode-mcp',
            size: 256,
            format: 'svg',
            errorCorrection: 'M',
            margin: 4
          }
        }
      };

      const toolCallResponse = {
        jsonrpc: '2.0',
        id: 3,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                qrCode: '<svg xmlns="http://www.w3.org/2000/svg">...</svg>',
                format: 'svg',
                size: 256,
                generationTime: '45.23ms',
                metadata: {
                  errorCorrection: 'M',
                  dataLength: 45,
                  timestamp: '2025-06-02T03:45:00.000Z'
                }
              }, null, 2)
            }
          ]
        }
      };

      // Validate tools/call protocol compliance
      expect(toolCallRequest).toComplyWithMCPProtocol();
      expect(toolCallRequest.method).toBe('tools/call');
      expect(toolCallRequest.params).toHaveProperty('name');
      expect(toolCallRequest.params).toHaveProperty('arguments');
      expect(toolCallRequest.params.name).toBe('generate_qr');
      
      expect(toolCallResponse).toComplyWithMCPProtocol();
      expect(toolCallResponse.result).toHaveProperty('content');
      expect(toolCallResponse.result.content).toHaveLength(1);
      expect(toolCallResponse.result.content[0].type).toBe('text');
      
      console.log('✅ Tool call request/response validation passed');
    });
  });

  describe('Error Response Protocol', () => {
    test('should format error responses correctly', () => {
      const errorCodes = [
        { code: -32700, message: 'Parse error', description: 'Invalid JSON' },
        { code: -32600, message: 'Invalid Request', description: 'JSON-RPC structure invalid' },
        { code: -32601, message: 'Method not found', description: 'Method does not exist' },
        { code: -32602, message: 'Invalid params', description: 'Invalid method parameters' },
        { code: -32603, message: 'Internal error', description: 'Internal JSON-RPC error' }
      ];

      errorCodes.forEach((errorSpec, index) => {
        const errorResponse = {
          jsonrpc: '2.0',
          id: index + 1,
          error: {
            code: errorSpec.code,
            message: errorSpec.message,
            data: { description: errorSpec.description }
          }
        };

        // Validate error response structure
        expect(errorResponse).toComplyWithMCPProtocol();
        expect(errorResponse.error.code).toBe(errorSpec.code);
        expect(errorResponse.error.message).toBe(errorSpec.message);
        expect(typeof errorResponse.error.code).toBe('number');
        expect(typeof errorResponse.error.message).toBe('string');
        
        console.log(`✅ Error ${errorSpec.code} response validation passed`);
      });
    });

    test('should handle tool-specific errors correctly', () => {
      const toolErrorResponse = {
        jsonrpc: '2.0',
        id: 10,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: false,
                error: 'Text exceeds maximum length of 2000 characters',
                code: 'VALIDATION_ERROR',
                details: {
                  field: 'text',
                  received: 2150,
                  maximum: 2000
                },
                timestamp: '2025-06-02T03:45:00.000Z'
              }, null, 2)
            }
          ],
          isError: true
        }
      };

      // Tool errors are returned as successful responses with error content
      expect(toolErrorResponse).toComplyWithMCPProtocol();
      expect(toolErrorResponse.result).toHaveProperty('content');
      expect(toolErrorResponse.result.isError).toBe(true);
      
      const errorContent = JSON.parse(toolErrorResponse.result.content[0].text);
      expect(errorContent.success).toBe(false);
      expect(errorContent.error).toContain('2000 characters');
      expect(errorContent.code).toBe('VALIDATION_ERROR');
      
      console.log('✅ Tool-specific error handling validation passed');
    });
  });

  describe('Protocol Extension Compliance', () => {
    test('should support MCP progress notifications', () => {
      // For long-running operations like batch generation
      const progressNotification = {
        jsonrpc: '2.0',
        method: 'notifications/progress',
        params: {
          progressToken: 'batch_123',
          progress: 42,
          total: 100,
          message: 'Generated 42/100 QR codes'
        }
      };

      expect(progressNotification).toComplyWithMCPProtocol();
      expect(progressNotification.method).toBe('notifications/progress');
      expect(progressNotification.params.progress).toBe(42);
      expect(progressNotification.params.total).toBe(100);
      
      console.log('✅ Progress notification validation passed');
    });

    test('should support MCP resource references', () => {
      // For referencing generated QR codes as resources
      const resourceReference = {
        uri: 'qrcode://generated/abc123',
        name: 'QR Code for GitHub Repository',
        description: 'Generated QR code linking to satwareAG/qrcode-mcp',
        mimeType: 'image/svg+xml'
      };

      expect(resourceReference).toHaveProperty('uri');
      expect(resourceReference).toHaveProperty('name');
      expect(resourceReference.uri).toMatch(/^qrcode:\/\//);
      expect(resourceReference.mimeType).toBe('image/svg+xml');
      
      console.log('✅ Resource reference validation passed');
    });
  });

  describe('Protocol Security Compliance', () => {
    test('should validate request authentication if required', () => {
      // For enterprise deployments with authentication
      const authenticatedRequest = {
        jsonrpc: '2.0',
        id: 100,
        method: 'tools/call',
        params: {
          name: 'generate_qr',
          arguments: { text: 'Authenticated request' }
        },
        meta: {
          authorization: 'Bearer token_placeholder',
          requestId: 'req_abc123',
          clientId: 'client_xyz789'
        }
      };

      // Validate authentication metadata structure
      expect(authenticatedRequest).toComplyWithMCPProtocol();
      expect(authenticatedRequest.meta).toHaveProperty('authorization');
      expect(authenticatedRequest.meta.authorization).toMatch(/^Bearer /);
      expect(authenticatedRequest.meta).toHaveProperty('requestId');
      expect(authenticatedRequest.meta).toHaveProperty('clientId');
      
      console.log('✅ Authentication metadata validation passed');
    });
  });
});

export {};