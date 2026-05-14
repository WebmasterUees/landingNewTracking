import { redirect } from "next/navigation";

export default function LegacyInformacionGradoSlugPage({ params }: { params: { slug: string } }) {
  redirect(`/grado/${params.slug}`);
}
