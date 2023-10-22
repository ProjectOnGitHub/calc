const images = require.context('Images', true, /\.((png)|(jpe?g)|(gif)|(svg))$/);
const imagesMap = {};

images.keys().forEach((key) => {
  imagesMap[key] = images(key);
});
export default imagesMap;
