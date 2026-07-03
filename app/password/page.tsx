import { getMetadata } from "@/utils/getMetada";
import { PasswordView } from "@/views/Password";
import { Metadata } from "next";

export const metadata: Metadata = getMetadata("Password");

export default function Password() {
  return <PasswordView />;
}
