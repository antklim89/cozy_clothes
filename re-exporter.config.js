module.exports = {
  root: '.',
  watch: false,
  embed: {
    each: '// biome-ignore format: <generated>',
  },
  folders: [
    {
      path: 'components/*',
      ignoreExports: [],
      ignoreKinds: ['types', 'named'],
    },
  ],
};
