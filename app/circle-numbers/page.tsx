import { getMetadata } from "@/utils/getMetada";
import { CircleNumbersView } from "@/views/CircleNumbers";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Circle Numbers");

export default function CircleNumbers() {
  return <CircleNumbersView />;
}
