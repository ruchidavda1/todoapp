#!/usr/bin/env node

/**
 * 🧪 Deployment Verification Script
 * Tests your deployed Todo API endpoints
 */

const axios = require('axios');

// Configuration
const API_BASE_URL = process.argv[2] || 'http://localhost:3000/api';
const TEST_USER = {
  email: 'test@example.com',
  password: 'testpassword123',
  firstName: 'Test',
  lastName: 'User'
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`)
};

class DeploymentTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.authToken = null;
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  async test(name, testFn) {
    this.testResults.total++;
    try {
      log.info(`Testing: ${name}`);
      await testFn();
      log.success(`${name} - PASSED`);
      this.testResults.passed++;
    } catch (error) {
      log.error(`${name} - FAILED: ${error.message}`);
      this.testResults.failed++;
    }
    console.log(''); // Empty line for readability
  }

  async healthCheck() {
    const response = await axios.get(`${this.baseUrl}/health`);
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.status || response.data.status !== 'OK') {
      throw new Error('Health check response invalid');
    }
  }

  async testSignup() {
    const response = await axios.post(`${this.baseUrl}/auth/signup`, TEST_USER);
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`Expected status 201/200, got ${response.status}`);
    }
    if (!response.data.token) {
      throw new Error('No token returned from signup');
    }
    this.authToken = response.data.token;
  }

  async testLogin() {
    const response = await axios.post(`${this.baseUrl}/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.token) {
      throw new Error('No token returned from login');
    }
    this.authToken = response.data.token;
  }

  async testGetProfile() {
    const response = await axios.get(`${this.baseUrl}/auth/profile`, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.user) {
      throw new Error('No user data returned');
    }
  }

  async testCreateTodo() {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test todo created by deployment verification',
      priority: 'medium'
    };
    
    const response = await axios.post(`${this.baseUrl}/todos`, todoData, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(`Expected status 201/200, got ${response.status}`);
    }
    if (!response.data.todo && !response.data.id) {
      throw new Error('No todo data returned');
    }
    
    this.testTodoId = response.data.todo?.id || response.data.id;
  }

  async testGetTodos() {
    const response = await axios.get(`${this.baseUrl}/todos`, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!Array.isArray(response.data.todos) && !Array.isArray(response.data)) {
      throw new Error('Todos response is not an array');
    }
  }

  async testUpdateTodo() {
    if (!this.testTodoId) {
      throw new Error('No test todo ID available');
    }
    
    const updateData = {
      title: 'Updated Test Todo',
      completed: true
    };
    
    const response = await axios.put(`${this.baseUrl}/todos/${this.testTodoId}`, updateData, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  }

  async testDeleteTodo() {
    if (!this.testTodoId) {
      throw new Error('No test todo ID available');
    }
    
    const response = await axios.delete(`${this.baseUrl}/todos/${this.testTodoId}`, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    
    if (response.status !== 200 && response.status !== 204) {
      throw new Error(`Expected status 200/204, got ${response.status}`);
    }
  }

  async cleanup() {
    // Try to delete the test user's todos and account if possible
    try {
      if (this.authToken) {
        // Delete all todos
        await axios.delete(`${this.baseUrl}/todos/completed/all`, {
          headers: { Authorization: `Bearer ${this.authToken}` }
        });
      }
    } catch (error) {
      log.warning('Cleanup failed (this is usually okay)');
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('🧪 DEPLOYMENT VERIFICATION RESULTS');
    console.log('='.repeat(50));
    
    if (this.testResults.failed === 0) {
      log.success(`All ${this.testResults.total} tests passed! 🎉`);
      log.success('Your Todo API is working correctly!');
    } else {
      log.error(`${this.testResults.failed}/${this.testResults.total} tests failed`);
      log.warning('Please check the failed tests and fix any issues');
    }
    
    console.log(`\n📊 Test Summary:`);
    console.log(`   ✅ Passed: ${this.testResults.passed}`);
    console.log(`   ❌ Failed: ${this.testResults.failed}`);
    console.log(`   📝 Total:  ${this.testResults.total}`);
    
    if (this.testResults.failed === 0) {
      console.log('\n🚀 Your API is ready for production!');
      console.log(`🔗 API URL: ${this.baseUrl}`);
    }
  }

  async runAllTests() {
    console.log('🧪 Starting Deployment Verification');
    console.log(`🔗 Testing API at: ${this.baseUrl}`);
    console.log('='.repeat(50) + '\n');

    // Core functionality tests
    await this.test('Health Check', () => this.healthCheck());
    await this.test('User Signup', () => this.testSignup());
    await this.test('User Login', () => this.testLogin());
    await this.test('Get User Profile', () => this.testGetProfile());
    await this.test('Create Todo', () => this.testCreateTodo());
    await this.test('Get Todos', () => this.testGetTodos());
    await this.test('Update Todo', () => this.testUpdateTodo());
    await this.test('Delete Todo', () => this.testDeleteTodo());

    // Cleanup
    await this.cleanup();
    
    // Print results
    this.printResults();
    
    // Exit with appropriate code
    process.exit(this.testResults.failed === 0 ? 0 : 1);
  }
}

// Main execution
async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('🧪 Todo API Deployment Verification');
    console.log('\nUsage:');
    console.log('  node verify-deployment.js [API_URL]');
    console.log('\nExamples:');
    console.log('  node verify-deployment.js');
    console.log('  node verify-deployment.js http://localhost:3000/api');
    console.log('  node verify-deployment.js https://your-app.onrender.com/api');
    console.log('\nThis script will test all major API endpoints to verify deployment.');
    process.exit(0);
  }

  const tester = new DeploymentTester(API_BASE_URL);
  
  try {
    await tester.runAllTests();
  } catch (error) {
    log.error(`Verification failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  log.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// Run the verification
main();
