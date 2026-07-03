import { getMetadata } from "@/utils/getMetada";
import { CroquisView } from "@/views/Croquis";
import { ThermalFabricPage } from "@/views/Termico";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Heat map");

export default function Croquis() {
  return <ThermalFabricPage />;
}
