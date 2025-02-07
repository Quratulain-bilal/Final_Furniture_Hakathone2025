import { client } from "./client";

export const fetchProductData = async () => {
  const query = `*[_type == "shopProduct"]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": image.asset->url,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }`;
  try {
    const result = await client.fetch(query);
    return result;
  } catch (error) {
    console.error("Error fetching products from Sanity:", error);
    throw error;
  }
};

export const fetchSingleProduct = async (slug: string) => {
  const query = `*[_type == "shopProduct" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": image.asset->url,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }`;
  try {
    const result = await client.fetch(query, { slug });
    return result;
  } catch (error) {
    console.error("Error fetching single product from Sanity:", error);
    throw error;
  }
};

export const fetchSingleProductWithReviews = async (slug: string) => {
  const query = `*[_type == "shopProduct" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": image.asset->url,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category,
    "reviews": *[_type == "review" && productId == ^._id] | order(createdAt desc) {
      _id,
      text,
      userName,
      createdAt,
      rating
    }
  }`;
  try {
    const result = await client.fetch(query, { slug });
    return result;
  } catch (error) {
    console.error(
      "Error fetching single product with reviews from Sanity:",
      error
    );
    throw error;
  }
};
