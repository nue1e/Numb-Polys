const sharp = require('sharp');

const MAX_TEXTURE_SIZE = 4096;

// The { limitInputPixels: false } flag tells Sharp to bypass the safety lock
sharp('public/assets/grid_1111.png', { limitInputPixels: false })
  .resize({
    width: MAX_TEXTURE_SIZE,
    height: MAX_TEXTURE_SIZE,
    fit: 'inside'
  })
  .webp({ quality: 80 })
  .toFile('public/assets/grid-webgl-safe.webp')
  .then(info => {
    console.log('Successfully resized for WebGL!', info);
  })
  .catch(err => console.error('Error shrinking grid:', err));