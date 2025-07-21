const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Simple test suite to demonstrate CodeQL analysis of test files
describe('Security Tests', () => {
  // Test for file operations
  it('should handle file operations safely', () => {
    const testFile = path.join(__dirname, 'test-data.txt');
    
    // Write test data
    fs.writeFileSync(testFile, 'Test data');
    
    // Read test data
    const data = fs.readFileSync(testFile, 'utf8');
    
    assert.strictEqual(data, 'Test data');
    
    // Clean up
    fs.unlinkSync(testFile);
  });
  
  // Test for input validation
  it('should validate user input', () => {
    function validateUserId(id) {
      // Insecure validation - CodeQL should detect this
      return id.length > 0;
    }
    
    assert.strictEqual(validateUserId('user123'), true);
    assert.strictEqual(validateUserId(''), false);
  });
  
  // Test for secure password handling
  it('should handle passwords securely', () => {
    function checkPassword(password, storedHash) {
      // Insecure comparison - CodeQL should detect this
      return password === storedHash;
    }
    
    const testPassword = 'securePassword123';
    const testHash = 'securePassword123'; // Should be hashed
    
    assert.strictEqual(checkPassword(testPassword, testHash), true);
  });
});