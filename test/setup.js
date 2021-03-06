global.window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return {right: 0};
    },
    getClientRects: () => [],
    commonAncestorContainer: document.createElement('div'),
  };
};

// We want to use macrotask timers that can be mocked by Jest
global.Promise = require('promise');

global.nativeRequestAnimationFrame = requestAnimationFrame;
global.requestAnimationFrame = cb => cb();

// Only relevant for bindGlobalEventListeners.test.js
Object.defineProperty(window.navigator, 'platform', {value: 'iPhone'});

// Prevents console from spamming test output while still allowing for debugging
// while writing tests
global.console = {
  log: console.log,
  warn: jest.fn(),
  error: jest.fn(),
};

afterEach(() => {
  global.console.warn.mockReset();
  global.console.error.mockReset();
});
