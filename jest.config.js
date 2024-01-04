const nextJest = require('next/jest.js')
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config = {
  clearMocks: true,
  coverageProvider: "v8",
};

module.exports = createJestConfig(config);

