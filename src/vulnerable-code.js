// Example file with security issues for Snyk Code to detect

const express = require('express');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');

// Parse JSON bodies
app.use(express.json());

// Insecure: SQL Injection vulnerability
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  
  // SQL Injection vulnerability - using string concatenation
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  // Simulating database call
  console.log(`Executing query: ${query}`);
  res.send(`User data for ID: ${userId}`);
});

// Insecure: Command injection vulnerability
app.get('/run', (req, res) => {
  const cmd = req.query.cmd;
  
  // Command injection vulnerability - direct use of user input
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    res.send(`Command output: ${stdout}`);
  });
});

// Insecure: Path traversal vulnerability
app.get('/file', (req, res) => {
  const filePath = req.query.path;
  
  // Path traversal vulnerability - direct use of user input
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(`Error reading file: ${err.message}`);
      return;
    }
    res.send(data);
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});