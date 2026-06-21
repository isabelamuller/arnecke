import { getMetadata } from "@/utils/getMetada";
import { CroquisView } from "@/views/Croquis";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Local");

export default function Croquis() {
  return <CroquisView />;
}
