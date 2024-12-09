import { redirect } from "next/navigation";

export default function Home() {
  const GUID = "1c2d778c-8b39-4670-9f7b-a430422d90f3";
  return redirect(`/${GUID}`);
}
