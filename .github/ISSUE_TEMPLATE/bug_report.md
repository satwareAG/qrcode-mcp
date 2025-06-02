---
name: 🐛 Bug Report
about: Create a report to help us improve the QRCode-MCP server
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: []
---

## 🐛 Bug Description

**Brief Summary**:
A clear and concise description of what the bug is.

**Expected Behavior**:
A clear description of what you expected to happen.

**Actual Behavior**:
A clear description of what actually happened.

---

## 🔄 Reproduction Steps

**Steps to reproduce the behavior**:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Minimal Reproduction Example**:
```javascript
// Provide minimal code that reproduces the issue
```

**Is the issue reproducible?**
- [ ] Always reproducible
- [ ] Sometimes reproducible
- [ ] Rarely reproducible
- [ ] Unknown

---

## 🌍 Environment Information

**System Information**:
- **OS**: [e.g. Ubuntu 22.04, Windows 11, macOS Ventura]
- **Node.js Version**: [e.g. 18.17.0]
- **NPM Version**: [e.g. 9.6.7]
- **QRCode-MCP Version**: [e.g. 1.0.0]

**Installation Method**:
- [ ] NPM (`npx @satware/qrcode-mcp`)
- [ ] Docker (`docker run satware/qrcode-mcp`)
- [ ] GitHub source
- [ ] Other (specify): 

**MCP Client**:
- [ ] TypingMind
- [ ] Claude Desktop
- [ ] Custom MCP client
- [ ] MCP Inspector
- [ ] Other: 

---

## 📊 Error Details

**Error Messages**:
```
Paste any error messages here
```

**Logs** (if available):
```
Paste relevant log output here
```

**Console Output**:
```
Paste console output here
```

**Network Requests** (if applicable):
- Request/response details
- Status codes
- Headers

---

## 🔗 MCP Protocol Information

**Tool Affected**:
- [ ] generate_qr
- [ ] batch_generate (if implemented)
- [ ] Other: 

**Request Payload** (sanitize sensitive data):
```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "generate_qr",
    "arguments": {
      // Your request parameters
    }
  }
}
```

**Response** (if any):
```json
// Response received
```

---

## 📎 Additional Context

**Screenshots**:
<!-- If applicable, add screenshots to help explain your problem -->

**Related Issues**:
<!-- Link any related issues here -->

**Additional Information**:
<!-- Add any other context about the problem here -->

**Workaround** (if found):
<!-- Describe any workaround you found -->

---

## ✅ Checklist

**Before submitting this issue, I have**:
- [ ] Searched existing issues to avoid duplicates
- [ ] Updated to the latest version
- [ ] Tested with minimal reproduction example
- [ ] Included all relevant environment information
- [ ] Removed or sanitized any sensitive data
- [ ] Added appropriate labels

**Impact Level**:
- [ ] 🔴 Critical (blocks usage completely)
- [ ] 🟡 High (significant functionality affected)
- [ ] 🟢 Medium (minor functionality affected)
- [ ] 🔵 Low (cosmetic or enhancement)

---

*This bug report is for satware AG's QRCode-MCP - the first AI-developed, enterprise-grade MCP server. For urgent issues, please contact our support team.*