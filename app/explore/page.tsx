import { getMetadata } from "@/utils/getMetada";
import { Metadata } from "next";
import { ExploreView } from "@/views/Explore";

export const metadata: Metadata = getMetadata("Explorar");

export default function Explore() {
  return <ExploreView />;
}
