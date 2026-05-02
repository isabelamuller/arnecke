import { getMetadata } from "@/utils/getMetada";
import { CroquisView } from "@/views/Croquis";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Croquis");

export default function Croquis() {
  return <CroquisView />;
}
