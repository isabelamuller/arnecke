import { getMetadata } from "@/utils/getMetada";
import { ThermalFabricPage } from "@/views/Termico";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Heat map");

export default function HeatMap() {
  return <ThermalFabricPage />;
}
