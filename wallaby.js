module.exports = () => ({
  autoDetect: true,
  tests: ['./**/**/*spec.*', { pattern: '**/node_modules/**', ignore: true }],
  files: [
    { pattern: '**/node_modules/**', ignore: true },
    { pattern: './dist/**', ignore: true },
    { pattern: './**/**/*spec.*', ignore: true },
    '**/**/*.ts',
  ],
  trace: true,
});
