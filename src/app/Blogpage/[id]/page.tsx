// pages/Blogpage/[id]/page.tsx
"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Comment from "../../../components/Comment"

// Define the BlogPost type directly in this file
interface BlogPost {
  id: string;
  author: string;
  date: string;
  category: string;
  title: string;
  content: string; // Full content of the blog post
  imageUrl: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState<BlogPost | null>(null); // Use the BlogPost type

  // Sample blog posts data (you can replace this with a fetch call)
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      title: "Going all-in with millennial design",
      content:
        "This blog post explores the millennial design trend, focusing on how it integrates modern aesthetics with functionality. Millennial design emphasizes clean lines, minimalism, and the use of natural materials. In this post, we will delve into various aspects of millennial design, including color palettes, furniture choices, and how to create a harmonious living space that reflects this trend. Whether you're redecorating your home or just looking for inspiration, this post will provide valuable insights and tips.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4afabaa3dd6fda83227fb086cb291079c2a734262400f70b0fb72d5dfbbc124a?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "2",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
      title: "Exploring new ways of decorating",
      content:
        "In this post, we explore innovative decorating techniques that incorporate handmade elements. From DIY projects to sourcing unique handmade items, this guide will help you add a personal touch to your home decor. We will discuss the importance of supporting local artisans and how handmade items can bring character and warmth to your living space. Join us as we uncover creative ways to enhance your home with handmade decor.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d0019ed79f1b2027e1802a99b8ba2ec5e7bbdb80682b49273af5f504752c96a5?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "3",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Design",
      title: "The Future of Sustainable Design",
      content:
        "Sustainable design is not just a trend; it's a necessity. This post discusses the principles of sustainable design and how they can be applied in various fields, from architecture to product design. We will explore innovative materials, energy-efficient practices, and the importance of creating designs that are both functional and environmentally friendly.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3632bab0a2543d9df160a31963ae66a4659c5402c353e5d1c837d39fc64d9a1a?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "4",
      author: "Admin",
      date: "15 Oct 2022",
      category: "Art",
      title: "The Impact of Art on Interior Design",
      content:
        "Art plays a crucial role in interior design, influencing the mood and atmosphere of a space. In this post, we will explore how to choose the right art pieces for your home, the importance of color and composition, and how to create a cohesive look that reflects your personal style.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/668611e17e140f17dac0dffb5d00b221c0c8ced4e84fb89fcc8a2b4e994b1c12?placeholderIfAbsent=true&apiKey =b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "5",
      author: "Admin",
      date: "16 Oct 2022",
      category: "Lifestyle",
      title: "Creating a Cozy Home Environment",
      content:
        "A cozy home is essential for relaxation and comfort. This post shares tips on how to create a warm and inviting atmosphere in your living space. From choosing the right lighting to incorporating soft textures, we will guide you through the process of making your home a sanctuary.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7e1b1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1c1e1?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
  ];

  useEffect(() => {
    if (id) {
      const foundPost = blogPosts.find((post) => post.id === id);
      setPost(foundPost || null); // Set to null if not found
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="flex flex-col items-center p-5">
      {" "}
      {/* Centering the content */}
      <h2 className="text-3xl font-bold mb-2 text-center">{post.title}</h2>{" "}
      {/* Heading above the image */}
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-3/4 h-auto rounded-lg mb-4" // Adjusted width and kept height auto
      />
      <div className="text-gray-500 mt-2 text-center">
        <span>👤 {post.author}</span> | <span>📅 {post.date}</span> |{" "}
        <span>📂 {post.category}</span>
      </div>
      <p className="mt-4 text-lg leading-relaxed text-center">{post.content}</p>{" "}
      {/* Increased font size and line height for better readability */}
      <Comment />
    </div>
    
  );
};

export default BlogPostPage;
