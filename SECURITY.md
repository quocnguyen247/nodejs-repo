# Security Findings

## Detected Vulnerabilities

Snyk Code analysis has detected the following security issues:

### High Severity Issues

1. **Command Injection**
   - Files: `src/security-example.js` (line 25), `src/vulnerable-code.js` (line 28)
   - Issue: Unsanitized input from HTTP parameters flows into `child_process.exec`
   - Fix: Use parameterized commands or validate input strictly

2. **Path Traversal**
   - Files: `src/security-example.js` (line 39), `src/vulnerable-code.js` (line 42)
   - Issue: Unsanitized input used as file paths in `fs.readFile`
   - Fix: Validate and sanitize file paths, use `path.resolve` with a base directory

3. **Cross-site Scripting (XSS)**
   - Files: `index.js` (line 46), `src/security-example.js` (line 17), `src/vulnerable-code.js` (line 20)
   - Issue: Unsanitized input sent directly to browser via `res.send`
   - Fix: Use content security policy and escape user input with libraries like `xss` or `DOMPurify`

## Remediation Examples

### Command Injection Fix

```javascript
// VULNERABLE:
exec(cmd, (error, stdout, stderr) => { ... });

// FIXED:
const { execFile } = require('child_process');
const allowedCommands = ['ls', 'echo', 'date'];
const command = allowedCommands.includes(cmd.split(' ')[0]) ? cmd.split(' ')[0] : 'echo';
const args = cmd.split(' ').slice(1).filter(arg => !arg.includes(';') && !arg.includes('|'));
execFile(command, args, (error, stdout, stderr) => { ... });
```

### Path Traversal Fix

```javascript
// VULNERABLE:
fs.readFile(filePath, 'utf8', (err, data) => { ... });

// FIXED:
const path = require('path');
const safeDir = path.resolve(__dirname, 'safe-files');
const safePath = path.normalize(path.join(safeDir, path.basename(filePath)));
if (!safePath.startsWith(safeDir)) {
  return res.status(403).send('Access denied');
}
fs.readFile(safePath, 'utf8', (err, data) => { ... });
```

### XSS Fix

```javascript
// VULNERABLE:
res.send(`User data for ID: ${userId}`);

// FIXED:
const escapeHtml = require('escape-html');
res.send(`User data for ID: ${escapeHtml(userId)}`);
```