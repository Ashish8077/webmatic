import { Metadata } from "next";
import { MediaPage } from "@/features/media/pages";
// Triggering TS Server update
export const metadata: Metadata = {
  title: "Media Library | CMS Admin",
  description: "Manage your media assets",
};

export default function Page() {
  return <MediaPage />;
}
