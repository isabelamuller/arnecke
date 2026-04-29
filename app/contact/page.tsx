import { getMetadata } from "@/utils/getMetada";
import { ContactView } from "@/views/Contact";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Contact us");

export default function ContactPage() {
  return <ContactView />;
}
