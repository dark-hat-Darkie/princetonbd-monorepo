// .mjs because this package is "type": "commonjs"; ESLint flat configs
// are ES modules and a bare .js here would be parsed as CommonJS.
import { config } from '@repo/eslint-config/base';

export default config;
