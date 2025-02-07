"use client";

import type React from "react";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Filter, Grid, List, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/wishlist-context";
import { toast } from "react-toastify";
import { fetchProductData } from "@/sanity/lib/fetchData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Feature from "./Feature";


interface Product {
  _id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  inStock: boolean;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
}

export default function ShopPage() {
  
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
  });
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items per page

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const data = (await fetchProductData()) as Product[];
        setProducts(data || []);
        const highestPrice = Math.max(...data.map((product) => product.price));
        setMaxPrice(highestPrice);
        setFilters((prev) => ({ ...prev, priceRange: [0, highestPrice] }));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        toast.error("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filterAndSortProducts = useCallback(() => {
    return products
      .filter((product) => {
        if (
          searchQuery &&
          !product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false;
        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        )
          return false;
        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(product.category)
        )
          return false;
        if (
          filters.brands.length > 0 &&
          !filters.brands.includes(product.brand)
        )
          return false;
        if (
          filters.colors.length > 0 &&
          !filters.colors.includes(product.color)
        )
          return false;
        if (filters.sizes.length > 0 && !filters.sizes.includes(product.size))
          return false;
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "name-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [products, searchQuery, filters, sort]);

  const filteredProducts = useMemo(
    () => filterAndSortProducts(),
    [filterAndSortProducts]
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewChange = useCallback((newView: "grid" | "list") => {
    setView(newView);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      const isInWishlist = wishlistState.items.some(
        (item) => item.id === product._id
      );

      if (isInWishlist) {
        wishlistDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: product._id,
        });
        toast.info(`Removed from wishlist`);
      } else {
        wishlistDispatch({
          type: "ADD_TO_WISHLIST",
          payload: {
            id: product._id,
            name: product.title,
            price: product.price,
            image: product.image,
          },
        });
        toast.dark("Added to wishlist");
      }
    },
    [wishlistState.items, wishlistDispatch]
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="relative flex justify-center items-center w-full">
          {/* Image */}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/994d2cee0a74a300e7e875a7aa49c05fe08e475e64b98c8cab43e2bf378568d3?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d" // Path to the image in the public folder
            alt="Blog content"
            className="object-cover w-full h-[300px]" // Adjust height as needed
          />

          {/* Overlay Text */}
          <div className="absolute text-black text-5xl font-semibold">Shop</div>

          {/* Breadcrumb Links */}
          <div className="  absolute mt-24 left-1/2 transform -translate-x-1/2 text-black text-lg ">
            <span>Home</span>
            <span>&gt;</span>
            <span className="font-semibold ">Shop</span>
          </div>
        </div>

        {/* Filtration Bar */}
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 pt-8 bg-[#FAF4F4] shadow-md rounded-lg">
          <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 sm:flex-row sm:items-center sm:space-y-0">
            {/* Left Section */}
            <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Refine your product selection
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Price Range
                      </h3>
                      <Slider
                        min={0}
                        max={maxPrice}
                        step={100}
                        value={filters.priceRange}
                        onValueChange={(value) =>
                          handleFilterChange({
                            priceRange: value as [number, number],
                          })
                        }
                      />
                      <div className="mt-2 flex justify-between text-sm text-gray-500">
                        <span>$ {filters.priceRange[0]}</span>
                        <span>$ {filters.priceRange[1]}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Categories</h3>
                      {Array.from(new Set(products.map((p) => p.category))).map(
                        (category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`category-${category}`}
                              checked={filters.categories.includes(category)}
                              onCheckedChange={(checked) => {
                                const newCategories = checked
                                  ? [...filters.categories, category]
                                  : filters.categories.filter(
                                      (c) => c !== category
                                    );
                                handleFilterChange({
                                  categories: newCategories,
                                });
                              }}
                            />
                            <Label htmlFor={`category-${category}`}>
                              {category}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                    {/* Add similar sections for brands, colors, and sizes */}
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Button
                  variant={view === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="px-2 w-1/2 sm:w-auto"
                  onClick={() => handleViewChange("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="px-2 w-1/2 sm:w-auto"
                  onClick={() => handleViewChange("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* Right Section */}
            <div className="flex flex-wrap items-center justify-end space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Select defaultValue="default" onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-[140px] lg:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="container mx-auto px-4 py-8">
          <div
            className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-10`}
          >
            {currentItems.map((product) => (
              <Card
                key={product._id}
                className={`group relative overflow-hidden transition-all duration-500 hover:shadow-lg ${view === "list" ? "flex flex-row items-center" : ""} border-none shadow-sm`}
              >
                <CardHeader className={`p-0 ${view === "list" ? "w-1/3" : ""}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={500}
                      height={500}
                      priority
                      className="w-full h-full object-cover"
                    />
                    {/* Discount & Featured Badges */}
                    {product.discountPercentage > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {product.discountPercentage}% OFF
                      </div>
                    )}
                    {product.isFeaturedProduct && (
                      <div className="absolute top-2 left-12 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent
                  className={`pt-4 ${view === "list" ? "w-2/3" : ""}`}
                >
                  <Link href={`/shop/${product.slug}`}>
                    <CardTitle className="text-lg font-medium line-clamp-2 hover:text-primary transition-colors duration-300">
                      {product.title}
                    </CardTitle>
                  </Link>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {product.category}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Stock: {product.stockLevel}
                  </p>
                </CardContent>
                <CardFooter className={view === "list" ? "justify-end" : ""}>
                  <div className="flex items-center gap-2">
                    {product.discountPercentage > 0 ? (
                      <>
                        <p className="text-lg font-semibold text-red-500">
                          ${" "}
                          {(
                            (product.price *
                              (100 - product.discountPercentage)) /
                            100
                          ).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          $ {product.price.toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-semibold">
                        $ {product.price.toLocaleString()}
                      </p>
                    )}
                    {/* Heart & Eye Icons */}
                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleWishlist(product)}
                        className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlistState.items.some(
                              (item) => item.id === product._id
                            )
                              ? "fill-red-500 text-red-500"
                              : "text-gray-700"
                          }`}
                        />
                      </Button>
                      <Link href={`/shop/${product.slug}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2"
                        >
                          <Eye className="h-4 w-4 text-gray-700" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex gap-5 justify-center mt-10 max-md:mt-5 w-full">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-6 py-3 rounded-xl h-[60px] w-[60px] flex items-center justify-center cursor-pointer ${currentPage === index + 1 ? "bg-amber-100" : "bg-yellow-50"} hover:bg-yellow-200 transform transition-all duration-300`}
              >
                {index + 1}
              </div>
            ))}
            <div
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-7 py-4 font-light bg-yellow-50 rounded-xl max-md:px-5 cursor-pointer hover:bg-yellow-200 transform transition-all duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Next
            </div>
          </div>
        </section>
      </div>
      <Feature/>
    </>
  );
}
