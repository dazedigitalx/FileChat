export function getRandomImageURL() {
    const images = [
      'images/imageLoader.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  