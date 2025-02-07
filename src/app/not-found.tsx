// pages/404.js

import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200">
          Go Back Home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
