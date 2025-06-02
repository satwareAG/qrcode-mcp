---
name: ⚡ Performance Issue
about: Report performance problems or regressions
title: '[PERFORMANCE] '
labels: ['performance', 'needs-triage']
assignees: []
---

## ⚡ Performance Issue

**Performance Problem**:
A clear description of the performance issue you're experiencing.

**Expected Performance**:
Describe the expected performance behavior or benchmarks.

**Actual Performance**:
Describe the current performance behavior with specific metrics if available.

---

## 📊 Performance Metrics

**Timing Measurements**:
- **QR Generation Time**: [e.g., 150ms average, 300ms 95th percentile]
- **Memory Usage**: [e.g., 75MB RSS, 45MB heap]
- **CPU Usage**: [e.g., 80% during generation]
- **Concurrent Requests**: [e.g., fails at 50 simultaneous requests]

**Benchmark Results**:
```
Paste benchmark output here if available
```

**Performance Regression**:
- [ ] This is a new performance issue
- [ ] Performance degraded compared to previous version
- [ ] Performance was never acceptable
- [ ] Intermittent performance issues

**Previous Version Performance** (if regression):
Version: [e.g., 1.0.0]
Previous metrics: [e.g., 50ms average generation time]

---

## 🔄 Reproduction Information

**Test Scenario**:
```javascript
// Provide code that reproduces the performance issue
```

**Input Data Characteristics**:
- **QR Content Length**: [e.g., 200 characters, 2KB data]
- **QR Size**: [e.g., 512x512 pixels]
- **Error Correction Level**: [e.g., High (H)]
- **Output Format**: [e.g., SVG, PNG, Base64]
- **Concurrent Requests**: [e.g., 100 simultaneous]

**Load Testing Results** (if available):
```
Paste load testing output here
```

---

## 🌍 Environment Details

**System Specifications**:
- **CPU**: [e.g., Intel i7-10700K, 8 cores]
- **RAM**: [e.g., 32GB DDR4]
- **Storage**: [e.g., NVMe SSD]
- **OS**: [e.g., Ubuntu 22.04]
- **Node.js Version**: [e.g., 20.11.0]
- **NPM Version**: [e.g., 10.2.4]

**Deployment Environment**:
- [ ] Local development
- [ ] Docker container
- [ ] Cloud instance (specify): 
- [ ] Production server
- [ ] Other: 

**Resource Constraints**:
- **Memory Limit**: [e.g., 512MB container limit]
- **CPU Limit**: [e.g., 0.5 CPU cores]
- **Network**: [e.g., bandwidth limitations]
- **Storage**: [e.g., IOPS limitations]

---

## 📈 Performance Targets

**satware QRCode-MCP Performance Standards**:
- **QR Generation**: <100ms (95th percentile) ❌/✅
- **Memory Usage**: <50MB baseline ❌/✅
- **Concurrent Requests**: 100+ simultaneous ❌/✅
- **Error Rate**: <0.1% in production ❌/✅
- **Cold Start**: <2 seconds ❌/✅

**Your Performance Requirements**:
- Target QR generation time: 
- Target memory usage: 
- Target concurrent capacity: 
- Target error rate: 

---

## 🔍 Profiling Data

**Node.js Profiling** (if available):
```
// CPU profile data or flame graph results
```

**Memory Profiling** (if available):
```
// Memory usage analysis or heap snapshots
```

**Network Analysis** (if applicable):
- Request/response sizes
- Network latency
- Connection pooling issues

**Database/Storage Performance** (if applicable):
- Query execution times
- I/O wait times
- Storage throughput

---

## 🛠️ Troubleshooting Attempted

**Steps Already Taken**:
- [ ] Restarted the application
- [ ] Checked system resource usage
- [ ] Updated to latest version
- [ ] Ran with different input data
- [ ] Tested in different environment
- [ ] Profiled the application
- [ ] Checked for memory leaks
- [ ] Other: 

**Configuration Changes Tried**:
- [ ] Modified Node.js memory limits
- [ ] Adjusted concurrent request limits
- [ ] Changed QR generation parameters
- [ ] Modified caching settings
- [ ] Other: 

---

## 📊 Impact Assessment

**Business Impact**:
- [ ] 🔴 Critical (service unusable)
- [ ] 🟡 High (significant user experience impact)
- [ ] 🟢 Medium (noticeable but manageable)
- [ ] 🔵 Low (minor user experience impact)

**User Experience Impact**:
Describe how this performance issue affects end users.

**Scale of Impact**:
- **Users Affected**: [e.g., all users, specific use cases, enterprise users]
- **Frequency**: [e.g., constant, intermittent, peak hours only]
- **Geographic**: [e.g., global, specific regions, specific deployments]

---

## 💡 Potential Solutions

**Suspected Root Cause**:
Your analysis of what might be causing the performance issue.

**Proposed Solutions**:
1. Solution 1 description
2. Solution 2 description
3. Solution 3 description

**Workarounds** (if any):
Describe any temporary workarounds you've found.

---

## 📎 Additional Information

**Performance Monitoring Data**:
<!-- Attach any monitoring dashboards, graphs, or logs -->

**Related Issues**:
<!-- Link any related performance issues -->

**Comparison Data**:
<!-- Performance data from similar tools or previous versions -->

---

## ✅ Checklist

**Before submitting this performance issue, I have**:
- [ ] Verified the issue is reproducible
- [ ] Collected performance metrics and measurements
- [ ] Tested in multiple environments if possible
- [ ] Checked for resource constraints
- [ ] Searched for existing similar issues
- [ ] Included specific reproduction steps
- [ ] Provided system and environment details

**Support for Investigation**:
- [ ] I can provide additional profiling data if needed
- [ ] I can test proposed solutions
- [ ] I can provide access to the problematic environment
- [ ] I can help with performance testing

---

*Performance is a key priority for satware AG's QRCode-MCP. We aim to maintain sub-100ms QR generation times and enterprise-grade reliability. Your performance reports help us deliver on our quality commitments.*