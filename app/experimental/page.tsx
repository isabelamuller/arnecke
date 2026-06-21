import { getMetadata } from "@/utils/getMetada";
import { ExperimentalView } from "@/views/Experimental";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Experimental");

export default function Experimental() {
  return <ExperimentalView />;
}
