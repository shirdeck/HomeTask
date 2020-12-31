import React from 'react'

const lazyImage = ({ image }) => (
    <div>
      <LazyLoadImage
        alt={image.alt}
        height={image.height}
        src={image.src} // use normal <img> attributes as props
        width={image.width} />
    </div>
  );
   
  export default lazyImage;