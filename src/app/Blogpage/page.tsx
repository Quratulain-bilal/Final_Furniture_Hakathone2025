import Link from "next/link";
import Feature from "../../components/Feature";
import Image from "../../app/Blogpage/Image"

const BlogComponent: React.FC = () => {
  const blogPosts = [
    {
      id: "1",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      title: "Going all-in with millennial design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4afabaa3dd6fda83227fb086cb291079c2a734262400f70b0fb72d5dfbbc124a?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "2",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
      title: "Exploring new ways of decorating",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d0019ed79f1b2027e1802a99b8ba2ec5e7bbdb80682b49273af5f504752c96a5?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "3",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      title: "Handmade pieces that took time to make",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/3632bab0a2543d9df160a31963ae66a4659c5402c353e5d1c837d39fc64d9a1a?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
  ];

  const recentPosts = [
    {
      id: "4",
      title: "The Art of Minimalism",
      date: "01 Sep 2022",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/668611e17e140f17dac0dffb5d00b221c0c8ced4e84fb89fcc8a2b4e994b1c12?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    {
      id: "5",
      title: "Crafting with Nature",
      date: "05 Sep 2022",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/02de55699f1424026e14442ba8e31815c0fe4817435257f16a8a82076f77a359?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d",
    },
    // Add more recent posts as needed
  ];

  return (
    <>
    <Image />
      <div className="flex flex-col lg:flex-row gap-10 px-9 mt-11 w-full max-md:px-5 max-md:mt-10">
        <div className="lg:w-2/3 w-full">
          <h2 className="self-start text-2xl font-medium text-black mb-4">
            Blog Posts
          </h2>
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col w-full mt-8 border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                loading="lazy"
                src={post.imageUrl}
                className="object-cover w-full h-96 rounded-lg mb-4"
                alt={post.title}
              />
              <div className="flex gap-9 text-base text-neutral-400 mb-2">
                <div className="flex gap-2 whitespace-nowrap">
                  <span>👤</span>
                  <div>{post.author}</div>
                </div>
                <div className="flex gap-3">
                  <span>📅</span>
                  <div>{post.date}</div>
                </div>
                <div className="flex gap-2 whitespace-nowrap">
                  <span>📂</span>
                  <div>{post.category}</div>
                </div>
              </div>
              <h3 className="mt-2 text-2xl font-semibold text-black">
                {post.title}
              </h3>
              <p className="mt-2 text-base leading-6 text-neutral-600">
                {post.excerpt}
              </p>
              <Link
                href={`/Blogpage/${post.id}`}
                className="mt-4 text-base text-blue-600 hover:underline cursor-pointer"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>

        {/* Right Column: Categories and Recent Posts */}
        <div className="lg:w-1/3 w-full">
          {/* Search bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full p-3 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </span>
            </div>
          </div>

          {/* Categories */}
          <h2 className="self-start text-2xl font-medium text-black mb-4">
            Categories
          </h2>
          {/* Add your categories here */}

          {/* Recent Posts */}
          <h2 className="self-start text-2xl font-medium text-black mt-11 mb-4">
            Recent Posts
          </h2>
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-3 mt-8">
              <img
                loading="lazy"
                src={post.imageUrl}
                className="object-cover shrink-0 w-20 rounded-xl aspect-square"
                alt={post.title}
              />
              <div className="flex flex-col">
                <Link
                  href={`/Blogpage/${post.id}`}
                  className="text-sm text-black hover:underline"
                >
                  {post.title}
                </Link>
                <div className="mt-1 text-xs text-neutral-400">{post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Features */}
      <Feature />
    </>
  );
};

export default BlogComponent;