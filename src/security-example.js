// Example file with security issues for CodeQL to detect

const express = require('express');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');

// Insecure: Using express without proper input validation
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  
  // SQL Injection vulnerability
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  
  // Simulating database call
  console.log(`Executing query: ${query}`);
  res.send(`User data for ID: ${userId}`);
});

// Insecure: Command injection vulnerability
app.get('/run-command', (req, res) => {
  const userCommand = req.query.cmd;
  
  // Command injection vulnerability
  exec(userCommand, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    res.send(`Command output: ${stdout}`);
  });
});

// Insecure: Path traversal vulnerability
app.get('/read-file', (req, res) => {
  const fileName = req.query.file;
  
  // Path traversal vulnerability
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send(`Error reading file: ${err.message}`);
      return;
    }
    res.send(data);
  });
});

// Insecure: Hardcoded credentials
const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: 'password123', // Hardcoded credential
  database: 'myapp'
};

// Insecure: Weak cryptography
function hashPassword(password) {
  // Using weak hashing algorithm
  const crypto = require('crypto');
  return crypto.createHash('md5').update(password).digest('hex');
}

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});