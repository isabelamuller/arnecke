import { getMetadata } from "@/utils/getMetada";
import { HomepageView } from "@/views/Homepage";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata();

export default function Home() {
  return <HomepageView />;
}
