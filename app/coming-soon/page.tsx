import { getMetadata } from "@/utils/getMetada";
import { ComingSoon } from "@/views/Soon";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Soon");

export default function ComingSoonPage() {
  return <ComingSoon />;
}
