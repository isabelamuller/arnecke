import { Metadata } from "next";
import { CommunityView } from "@/views/Community";
import { getMetadata } from "@/utils/getMetada";

export const metadata: Metadata = getMetadata("Comunidade");

export default function CommunityPage() {
  return <CommunityView />;
}
