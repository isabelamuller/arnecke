import { getMetadata } from "@/utils/getMetada";
import { ResearchView } from "@/views/Research";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Research");

export default function Research() {
  return <ResearchView />;
}
