module.exports = () => ({
  autoDetect: true,
  tests: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
    { pattern: '**/node_modules/**', ignore: true },
  ],
  files: [
    { pattern: '**/node_modules/**', ignore: true },
    { pattern: './dist/**', ignore: true },
    { pattern: '**/?(*.)+(spec|test).[tj]s?(x)', ignore: true },
    '**/**/*.ts',
  ],
  trace: true,
});
