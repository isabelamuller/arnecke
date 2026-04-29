import { CroquisView } from "@/components/Article";
import { getMetadata } from "@/utils/getMetada";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Croquis");

export default function Croquis() {
  return <CroquisView />;
}
