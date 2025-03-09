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
import { text } from "stream/consumers";

// 定义响应类型
interface FetchResponse {
  ok: boolean;
  text(): Promise<string>;
}
// Create an MCP server
const server = new McpServer({
  name: "qrcode-mcp",
  version: "1.0.0",
});

/**
 * Handler that lists available tools.
 * Exposes a single "ProxyNodes" tool that waits for a specified duration.
 */
server.tool(
  "qrcode",
  "Generate a QR code image",
  {
    text: z.string().describe("The input string to generate qrcode"),
    size: z
      .number()
      .describe("The size of qrcode, default is 256")
      .default(256),
    darkColor: z
      .string()
      .describe("The dark color of qrcode, default is #000000")
      .default("#000000"),
    lightColor: z
      .string()
      .describe("The light color of qrcode, default is #ffffff")
      .default("#ffffff"),
    errorCorrectionLevel: z
      .enum(["L", "M", "Q", "H"])
      .describe("The error correction level of qrcode, default is M")
      .default("M"),
    margin: z
      .number()
      .describe("The margin of qrcode, default is 4")
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
    const qrcode = await generateQRCode(text, {
      width: size,
      color: {
        dark: darkColor,
        light: lightColor,
      },
      errorCorrectionLevel,
      margin,
    });

    const base64Image = qrcode.split(",")[1];

    return Promise.resolve({
      content: [{ type: "image", data: base64Image, mimeType: "image/png" }],
    });
  }
);

/**
 * Start the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ProxyNodes MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
});
