
import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

const presetConfig = createCjsPreset();

export default {
  ...presetConfig,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
} satisfies Config;
