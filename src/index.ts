import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { generateQRCode } from "./service/qrcode.js";

// 定义响应类型
interface FetchResponse {
  ok: boolean;
  text(): Promise<string>;
}
// Create an MCP server
const server = new Server(
  {
    name: "qrcode-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

/**
 * Handler that lists available tools.
 * Exposes a single "ProxyNodes" tool that waits for a specified duration.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "qrcode",
        description: "Generate a QR code image",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "text to generate qrcode",
            },
            size: {
              type: "number",
              description: "size of qrcode, default is 256",
            },
            darkColor: {
              type: "string",
              description: "dark color of qrcode, default is #000000",
            },
            lightColor: {
              type: "string",
              description: "light color of qrcode, default is #ffffff",
            },
            errorCorrectionLevel: {
              type: "string",
              description: "error correction level of qrcode, default is M",
            },
            margin: {
              type: "number",
              description: "margin of qrcode, default is 4",
            },
          },
          required: [
            "text",
            "size",
            "darkColor",
            "lightColor",
            "errorCorrectionLevel",
            "margin",
          ],
        },
      },
    ],
  };
});

/**
 * Handler for the sleep tool.
 * Waits for the specified duration and returns a success message.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "qrcode") {
    throw new McpError(ErrorCode.MethodNotFound, "Unknown tool");
  }

  try {
    const text = request.params.arguments?.text;
    if (!text) {
      throw new McpError(ErrorCode.InvalidParams, "Text is required");
    }
    if (typeof text !== "string") {
      throw new McpError(ErrorCode.InvalidParams, "Text must be a string");
    }
    const size = (request.params.arguments?.size ?? 256) as number;
    const darkColor = (request.params.arguments?.darkColor ??
      "#000000") as string;
    const lightColor = (request.params.arguments?.lightColor ??
      "#ffffff") as string;
    const errorCorrectionLevel = (request.params.arguments
      ?.errorCorrectionLevel ?? "M") as "L" | "M" | "Q" | "H";
    const margin = (request.params.arguments?.margin ?? 4) as number;

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

    return {
      content: [
        {
          type: "image",
          data: base64Image,
          mimeType: "image/png",
        },
        // {
        //   type: "text",
        //   text: "original qrcode: \n" + qrcode,
        // },
      ],
    };
  } catch (error) {
    // throw new McpError(
    //   ErrorCode.InvalidParams,
    //   error instanceof Error ? error.message : "Unknown error"
    // );
    return {
      content: [
        {
          type: "text",
          data: "Unknown error: " + JSON.stringify(error),
        },
      ],
    };
  }
});

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
