import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramLevel } from "@prisma/client";
import { ProgramDetailPage } from "@/components/program-detail-page";
import { getProgramBySlug, getProgramsByLevel } from "@/lib/programs";

type Params = { slug: string };

export async function generateStaticParams() {
  const programs = await getProgramsByLevel(ProgramLevel.grado);
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const program = await getProgramBySlug(ProgramLevel.grado, params.slug);
  if (!program) return {};
  return {
    title: `${program.headingTitle || program.name} | UEES Online`,
    description: program.metaDescription || program.description || undefined
  };
}

export default async function GradoProgramPage({ params }: { params: Params }) {
  const program = await getProgramBySlug(ProgramLevel.grado, params.slug);
  if (!program || !program.isActive) notFound();
  return <ProgramDetailPage program={program} />;
}
