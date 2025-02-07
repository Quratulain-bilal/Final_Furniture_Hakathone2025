"use client";

import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    position: "Founder & CEO",
    image:
      "https://img.freepik.com/free-photo/proud-young-executive-ready-start_1139-303.jpg?uid=R181271131&ga=GA1.1.682219552.1730314102&semt=ais_hybrid_sidr",
    bio: "John has over 15 years of experience in the furniture industry, focusing on sustainable design and craftsmanship.",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Head of Design",
    image: "https://img.freepik.com/free-photo/businessman-with-crossed-arms_23-2147996582.jpg?uid=R181271131&ga=GA1.1.682219552.1730314102&semt=ais_hybrid_sidr",
    bio: "Jane leads our design team, blending modern aesthetics with traditional craftsmanship.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    position: "Sustainability Manager",
    image: "https://img.freepik.com/premium-photo/happy-businessman_21730-2450.jpg?uid=R181271131&ga=GA1.1.682219552.1730314102&semt=ais_hybrid_sidr",
    bio: "Alice ensures that our materials and processes are environmentally friendly and sustainable.",
  },
  {
    id: 4,
    name: "Bob Brown",
    position: "Customer Experience Specialist",
    image: "https://img.freepik.com/free-photo/young-businessman-happy-expression_1194-1649.jpg?uid=R181271131&ga=GA1.1.682219552.1730314102&semt=ais_hybrid_sidr",
    bio: "Bob is dedicated to providing exceptional service and ensuring customer satisfaction.",
  },
];

const TeamMember: React.FC<{ member: (typeof teamMembers)[0] }> = ({
  member,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <Image
        src={member.image}
        alt={member.name}
        width={350} // Increased width
        height={350} // Increased height
        className="w-36 h-36 rounded-full mx-auto mb-4" // Adjusted class for larger size
      />
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-gray-500">{member.position}</p>
      <p className="text-gray-600 mt-2">{member.bio}</p>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Full-screen background image section */}
      <div className="relative h-screen">
        <Image
          src="https://img.freepik.com/premium-photo/wooden-kitchen-inteiror-green-sofa_780608-30422.jpg?w=900"
          alt="Furniture Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-25">
          <h1 className="text-7xl font-bold text-white mb-4">
            Welcome to Our Furniture Store
          </h1>
          <p className="text-lg text-white mb-8">
            Crafting quality furniture for your home and office.
          </p>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition">
              Shop Now
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-4 mt-8">Our Mission</h2>
      <p className="text-lg mb-6">
        Our mission is to provide beautifully designed, sustainable furniture
        that meets the needs of modern living. We are committed to using
        eco-friendly materials and innovative design techniques to create pieces
        that are both functional and aesthetically pleasing.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
      <ul className="list-disc list-inside mb-6">
        <li>
          Quality: We prioritize craftsmanship and quality in every piece we
          create.
        </li>
        <li>
          Sustainability: We are dedicated to environmentally responsible
          practices.
        </li>
        <li>
          Innovation: We embrace technology and design to enhance our products.
        </li>
        <li>
          Customer Focus: Our customers are at the heart of everything we do.
        </li>
        <li>
          Community: We support local artisans and communities in our sourcing
          and production.
        </li>
      </ul>

      {/* Images Section with Headings */}
      <h2 className="text-3xl font-semibold mb-4">Explore Our Spaces</h2>
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <Image
            src="https://img.freepik.com/free-photo/3d-rendering-luxury-modern-bedroom-suite-hotel-with-tv-cabinet_105762-2278.jpg?t=st=1738728456~exp=1738732056~hmac=60937781ec15fc6879fc652e0ab0794ec49a203c8e59a29571a03192628eb497&w=900"
            alt="Luxury Modern Bedroom"
            width={900}
            height={600}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="absolute top-2 left-2 text-3xl font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Bedroom
          </h3>
        </div>
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <Image
            src="https://img.freepik.com/premium-photo/grey-business-interior-with-pc-computer-table-shelf-with-documents_780608-9792.jpg?w=740"
            alt="Office Interior"
            width={740}
            height={500}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="absolute top-2 left-2 text-3xl font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Office
          </h3>
        </div>
        <div className="relative w-full md:w-1/3">
          <Image
            src="https://img.freepik.com/premium-photo/interior-living-room_252025-1546.jpg?w=1060"
            alt="Living Room Interior"
            width={1060}
            height={700}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="absolute top-2 left-2 text-3xl font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Drawing Room
          </h3>
        </div>
      </div>

      {/* Additional Image Section with Text Next to It */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
          <Image
            src="https://themes.muffingroup.com/be/furniturestore/wp-content/uploads/2022/06/furniturestore-home-pic4.webp"
            alt="Furniture Store"
            width={900}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-4">
          <p>SEARCH FOR</p>
          <h2 className="text-9xl text-yellow-500 font-semibold mb-2">
            Get Ready for Spring
          </h2>
          <p className="text-lg mb-4 mt-8">
            As the seasons change its the perfect time to refresh your home
            with our latest spring collection. Discover vibrant colors
            innovative designs and sustainable materials that will bring a
            breath of fresh air into your living spaces.
          </p>
          <button className="bg-yellow-500 text-white px-20 py-5 rounded-md hover:bg-yellow-600 transition">
            Trends
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <TeamMember key={member.id} member={member} />
        ))}
      </div>
      {/* Contact Us Section */}
      <h2 className="text-3xl font-semibold mb-4 mt-8">Contact Us</h2>
      <p className="text-lg mb-4">
        We would love to hear from you! If you have any questions, comments, or
        inquiries, please feel free to reach out to us.
      </p>
      <p className="text-lg mb-4">
        You can contact us via email at: "mailto:info@example.com"
      </p>
    </div>
  );
};

export default AboutPage;
