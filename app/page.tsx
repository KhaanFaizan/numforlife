import { HomePageRenderer } from "@/components/home/HomePageRenderer";
import { getPublishedContent } from "@/lib/cms/server";

export default async function HomePage() {
  const content = await getPublishedContent();
  return <HomePageRenderer content={content} />;
}
