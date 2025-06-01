<div align="center">
    <img src="logo/qrcode_mcp.png" alt="QRCode MCP Logo" width="80">
    <h1>🔗 QRCode-MCP</h1>
    <p>
        <strong>Universal QR Code Generation for AI Assistants</strong><br>
        <em>Model Context Protocol (MCP) Server by satware AG</em>
    </p>
    <p>
        <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
        <img src="https://img.shields.io/badge/MCP-compatible-purple.svg" alt="MCP Compatible">
        <img src="https://img.shields.io/badge/satware%20AG-enterprise-orange.svg" alt="satware AG">
    </p>
</div>

# 🌟 Overview

QRCode-MCP is an enterprise-grade Model Context Protocol server designed for seamless QR code generation across AI assistant platforms. Built by **satware AG**, this tool provides high-performance, customizable QR code generation optimized for integration with Claude, TypingMind, and other MCP-compatible systems.

## ✨ Features

- 🎨 **Advanced Customization** - Full control over colors, sizes, and error correction
- ⚡ **High Performance** - Sub-100ms generation for optimal user experience
- 🔗 **MCP Native** - Built specifically for Model Context Protocol integration
- 🏢 **Enterprise Ready** - Production-tested and optimized for reliability
- 🌐 **Universal Compatibility** - Works with Claude Desktop, TypingMind, and custom MCP clients

## 📦 Installation

### Quick Install via Smithery

For Claude Desktop automatic installation via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli install satwareAG/qrcode-mcp --client claude
```

### Manual Installation

1. **Clone the Repository**
```bash
git clone https://github.com/satwareAG/qrcode-mcp.git
cd qrcode-mcp
```

2. **Install Dependencies**
```bash
pnpm install
# or: npm install
```

3. **Build the Project**
```bash
pnpm run build
# or: npm run build
```

## 🔧 Configuration

### Claude Desktop Setup

Add to your Claude Desktop MCP settings (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "qrcode-mcp": {
      "command": "node",
      "args": ["path/to/qrcode-mcp/build/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### TypingMind Integration

Add to your TypingMind MCP configuration:

```json
{
  "mcpServers": {
    "qrcode": {
      "command": "node",
      "args": ["path/to/qrcode-mcp/build/index.js"],
      "description": "Enterprise QR code generation by satware AG"
    }
  }
}
```

## 🚀 Usage

### Available Tools

#### `qrcode` - Generate QR Code Images

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | ✅ Yes | - | The text content to encode in the QR code |
| `size` | number | ❌ No | 256 | QR code size in pixels (64-2048) |
| `darkColor` | string | ❌ No | #000000 | Color of the dark modules (hex format) |
| `lightColor` | string | ❌ No | #ffffff | Color of the light modules (hex format) |
| `errorCorrectionLevel` | string | ❌ No | M | Error correction: L, M, Q, or H |
| `margin` | number | ❌ No | 4 | Margin size around the QR code |

### Example Usage

```typescript
// Basic QR code
qrcode("https://satware.ai")

// Custom styled QR code
qrcode("Contact: support@satware.ai", {
  size: 512,
  darkColor: "#1a365d",
  lightColor: "#f7fafc", 
  errorCorrectionLevel: "H",
  margin: 6
})
```

## 🏗️ Development

### Development Setup

```bash
# Install dependencies
pnpm install

# Build for production
pnpm run build

# Development with auto-rebuild
pnpm run watch

# Test with MCP inspector
pnpm run go
```

### Project Structure

```
qrcode-mcp/
├── src/
│   ├── index.ts          # MCP server entry point
│   └── service/
│       └── qrcode.ts     # QR generation logic
├── build/                # Compiled JavaScript output
├── logo/                 # Project branding assets
└── package.json          # Project configuration
```

## 📚 Documentation

For comprehensive documentation, integration guides, and examples:

- **Repository**: [https://github.com/satwareAG/qrcode-mcp](https://github.com/satwareAG/qrcode-mcp)
- **Issues & Support**: [https://github.com/satwareAG/qrcode-mcp/issues](https://github.com/satwareAG/qrcode-mcp/issues)
- **satware AG**: [https://satware.ai](https://satware.ai)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code style and standards
- Development workflow
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

## 🏢 About satware AG

**satware AG** is a leading European AI technology company specializing in advanced reasoning-capable AGI systems and enterprise AI solutions. Based in Worms, Germany, we develop cutting-edge tools and platforms that enhance human-AI collaboration.

### Development Team

- **Technical Architecture**: Jane Alesi (Lead AGI Architect)
- **Core Development**: John Alesi (Senior TypeScript Developer)  
- **Systems Integration**: Leon Alesi (DevOps & CI/CD Specialist)
- **Project Leadership**: Michael Wegener (AI Engineering Lead)

### Contact & Support

- **Website**: [https://satware.ai](https://satware.ai)
- **Email**: [support@satware.ai](mailto:support@satware.ai)
- **Platform**: [https://chat.satware.ai](https://chat.satware.ai)

---

<div align="center">
    <p><em>Built with ❤️ by satware AG | Empowering the future of AI-human collaboration</em></p>
</div>