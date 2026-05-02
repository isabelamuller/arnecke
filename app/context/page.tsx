import { getMetadata } from "@/utils/getMetada";
import { ContextView } from "@/views/Context";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Context");

export default function Context() {
  return <ContextView />;
}
