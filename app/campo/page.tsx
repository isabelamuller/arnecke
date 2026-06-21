import { getMetadata } from "@/utils/getMetada";
import { CampoView } from "@/views/Campo";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Campo");

export default function Research() {
  return <CampoView />;
}
