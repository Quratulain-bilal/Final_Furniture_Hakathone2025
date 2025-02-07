/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.sanity.io",
      "img.freepik.com",
      "themes.muffingroup.com",
      "cdn.builder.io", // Add the new domain here
         'rosewood.pk',
      'media.istockphoto.com',
      'm.media-amazon.com',  // Added amazon.com image domain
      'cdn.sanity.io',       // Added Sanity.io CDN domain
      'via.placeholder.com', // Added placeholder image domain
    ],
  },
};

export default nextConfig;
