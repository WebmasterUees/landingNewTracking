import { redirect } from "next/navigation";

export default function LegacyInformacionPostgradoSlugPage({ params }: { params: { slug: string } }) {
  redirect(`/postgrado/${params.slug}`);
}
