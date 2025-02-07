// ImageComponent.tsx
import React from "react";

const ImageComponent: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center w-full">
      {/* Image */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/994d2cee0a74a300e7e875a7aa49c05fe08e475e64b98c8cab43e2bf378568d3?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d" // Path to the image in the public folder
        alt="Blog content"
        className="object-cover w-full h-[300px]" // Adjust height as needed
      />

      {/* Overlay Text */}
      <div className="absolute text-black text-5xl font-semibold">
        Blog
      </div>

      {/* Breadcrumb Links */}
      <div className="  absolute mt-24 left-1/2 transform -translate-x-1/2 text-black text-lg ">
        <span>Home</span>
        <span>&gt;</span>
        <span className="font-semibold ">Blog</span>
      </div>
    </div>
  );
};

export default ImageComponent;
