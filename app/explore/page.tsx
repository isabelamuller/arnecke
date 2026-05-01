import { getMetadata } from "@/utils/getMetada";
import { Metadata } from "next";
import { ExploreView } from "@/views/Explore";

export const metadata: Metadata = getMetadata("Explore");

export default function Explore() {
  return <ExploreView />;
}
