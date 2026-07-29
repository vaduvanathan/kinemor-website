import { redirect } from "next/navigation";

/** Preserves early links while the public label moves from Factory Data to Open Worlds. */
export default function FactoryDataRedirect() {
  redirect("/open-worlds");
}
