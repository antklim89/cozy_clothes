module.exports = {
  root: '.',
  watch: false,
  folders: [
    {
      path: 'components/*',
      ignoreExports: [],
      ignoreKinds: ['types', 'named'],
    },
    {
      path: 'lib',
    },
  ],
};
