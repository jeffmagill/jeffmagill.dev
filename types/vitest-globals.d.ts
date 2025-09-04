/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

// Provide vitest globals for the TypeScript language server in test files.
declare module NodeJS {
	interface Global {
		fetch?: typeof fetch;
	}
}
