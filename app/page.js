import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CategoryCarousel from "@/components/CategoryCarousel";
import Flagship from "@/components/Flagship";
import BestSellers from "@/components/BestSellers";
import FoundersReserve from "@/components/FoundersReserve";
import NewArrivals from "@/components/NewArrivals";
import FromTheField from "@/components/FromTheField";
import BuiltBetter from "@/components/BuiltBetter";
import Community from "@/components/Community";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryCarousel />
      <Flagship />
      <BestSellers />
      <FoundersReserve />
      <NewArrivals />
      <FromTheField />
      <BuiltBetter />
      <Community />
    </>
  );
}
