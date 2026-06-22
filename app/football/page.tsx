import { getMetadata } from "@/utils/getMetada";
import { FootballView } from "@/views/Football";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Futebol");

export default function Football() {
  return <FootballView />;
}
