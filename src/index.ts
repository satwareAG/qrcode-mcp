/**
 * QRCode-MCP Server | Model Context Protocol Implementation
 * 
 * Enterprise QR Code Generation Server for AI Assistants
 * Built by satware AG (https://satware.ai)
 * 
 * This server provides high-performance QR code generation capabilities
 * through the Model Context Protocol, optimized for integration with
 * Claude, TypingMind, and other MCP-compatible AI systems.
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { generateQRCode } from "./service/qrcode.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Initialize QRCode-MCP server instance
 * 
 * Configures the MCP server with proper identification
 * and version information for AI assistant integration
 */
const server = new McpServer({
  name: "qrcode-mcp",
  version: "1.0.0",
});

/**
 * QR Code Generation Tool
 * 
 * Provides comprehensive QR code generation with customizable styling options.
 * Supports various error correction levels, custom colors, and sizing options
 * optimized for different use cases and display requirements.
 */
server.tool(
  "qrcode",
  "Generate a QR code image with customizable styling options",
  {
    text: z
      .string()
      .min(1)
      .max(2000)
      .describe("The text content to encode in the QR code"),
    size: z
      .number()
      .int()
      .min(64)
      .max(2048)
      .describe("QR code size in pixels (64-2048)")
      .default(256),
    darkColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .describe("Dark module color in hex format (e.g., #000000)")
      .default("#000000"),
    lightColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .describe("Light module color in hex format (e.g., #ffffff)")
      .default("#ffffff"),
    errorCorrectionLevel: z
      .enum(["L", "M", "Q", "H"])
      .describe("Error correction level: L(~7%), M(~15%), Q(~25%), H(~30%)")
      .default("M"),
    margin: z
      .number()
      .int()
      .min(0)
      .max(10)
      .describe("Margin size around QR code (0-10 modules)")
      .default(4),
  },
  async ({
    text,
    size,
    darkColor,
    lightColor,
    errorCorrectionLevel,
    margin,
  }) => {
    try {
      // Generate QR code with specified parameters
      const qrcode = await generateQRCode(text, {
        width: size,
        color: {
          dark: darkColor,
          light: lightColor,
        },
        errorCorrectionLevel,
        margin,
      });

      // Extract base64 image data from data URL
      const base64Image = qrcode.split(",")[1];

      // Return MCP-compatible response with image content
      return Promise.resolve({
        content: [{ 
          type: "image", 
          data: base64Image, 
          mimeType: "image/png" 
        }],
      });
    } catch (error) {
      // Handle QR generation errors gracefully
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new McpError(
        ErrorCode.InternalError,
        `QR code generation failed: ${errorMessage}`
      );
    }
  }
);

/**
 * Server Startup and Connection Management
 * 
 * Initializes the stdio transport and establishes connection
 * for Model Context Protocol communication with AI assistants.
 */
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    // Use stderr for logging to avoid interfering with MCP protocol on stdout
    console.error("QRCode-MCP server v1.0.0 started successfully");
    console.error("Ready for QR code generation requests via stdio transport");
    console.error("Built by satware AG | https://satware.ai");
  } catch (error) {
    console.error("Failed to start QRCode-MCP server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error("QRCode-MCP server shutting down gracefully...");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error("QRCode-MCP server received SIGTERM, shutting down...");
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error("QRCode-MCP server startup error:", error);
  process.exit(1);
});