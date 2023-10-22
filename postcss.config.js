module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers:
        process.env.NODE_ENV === 'production'
          ? ['>0.2%', 'not dead', 'not op_mini all']
          : ['last 20 versions'],
    },
  },
};
