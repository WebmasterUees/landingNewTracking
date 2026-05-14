import { notFound, redirect } from "next/navigation";
import { getProgramByLegacySlug } from "@/lib/programs";

export default async function LegacyGradoSlugPage({ params }: { params: { slug: string } }) {
  const program = await getProgramByLegacySlug(params.slug);
  if (!program) notFound();
  redirect(`/grado/${program.slug}`);
}
