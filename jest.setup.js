import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock SpeechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    getVoices: jest.fn(() => []),
    pending: false,
    speaking: false,
    paused: false,
  },
})

// Mock Performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    ...window.performance,
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByName: jest.fn(() => []),
    getEntriesByType: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
  },
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock WebGL context for MediaPipe
HTMLCanvasElement.prototype.getContext = jest.fn((contextType) => {
  if (contextType === 'webgl' || contextType === 'experimental-webgl') {
    return {
      createShader: jest.fn(),
      shaderSource: jest.fn(),
      compileShader: jest.fn(),
      createProgram: jest.fn(),
      attachShader: jest.fn(),
      linkProgram: jest.fn(),
      useProgram: jest.fn(),
      getUniformLocation: jest.fn(),
      uniformMatrix4fv: jest.fn(),
      enableVertexAttribArray: jest.fn(),
      vertexAttribPointer: jest.fn(),
      drawArrays: jest.fn(),
      drawElements: jest.fn(),
      createBuffer: jest.fn(),
      bindBuffer: jest.fn(),
      bufferData: jest.fn(),
      createTexture: jest.fn(),
      bindTexture: jest.fn(),
      texImage2D: jest.fn(),
      texParameteri: jest.fn(),
      activeTexture: jest.fn(),
      getExtension: jest.fn(),
      viewport: jest.fn(),
      clear: jest.fn(),
      clearColor: jest.fn(),
    }
  }
  return null
})

// Mock MediaDevices
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: jest.fn(() => []),
      getVideoTracks: jest.fn(() => []),
      getAudioTracks: jest.fn(() => []),
    }),
  },
  writable: true,
})

// Mock Service Worker
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: jest.fn().mockResolvedValue({
      scope: '/',
      update: jest.fn(),
      unregister: jest.fn(),
    }),
    ready: Promise.resolve({
      active: null,
      controller: null,
      ready: Promise.resolve(),
      waiting: null,
    }),
  },
  writable: true,
})

// Global test utilities
global.testUtils = {
  // Wait for component to finish rendering
  waitForComponent: (ms = 0) => new Promise(resolve => setTimeout(resolve, ms)),

  // Create mock props
  createMockProps: (overrides = {}) => ({
    ...overrides,
  }),

  // Mock fetch response
  mockFetchResponse: (data, status = 200) => {
    return Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    })
  },

  // Mock error response
  mockFetchError: (error = 'Network error') => {
    return Promise.reject(new Error(error))
  },
}