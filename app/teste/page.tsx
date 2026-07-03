import { getMetadata } from "@/utils/getMetada";
import { PitchNavigationPage } from "@/views/Teste";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Teste");

export default function Teste() {
  return <PitchNavigationPage />;
}
