import Blog from "@/components/Blog";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Instra from "@/components/Instra";
import Product from "@/components/Product";
import ProductCarousel from "@/components/ProductCorouseal";


export default function Home() {
  return (
   <>
   <Hero />
   <Gallery />
   <ProductCarousel />
   <Product />
   <Instra />
   
   <Blog />

   </>
  );
}
