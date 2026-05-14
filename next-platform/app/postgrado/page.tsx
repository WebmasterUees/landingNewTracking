import type { Metadata } from "next";
import { ProgramLevel } from "@prisma/client";
import { ProgramListPage } from "@/components/program-list-page";

export const metadata: Metadata = {
  title: "Programas de Postgrado | UEES Online",
  description: "Conoce los programas de postgrado online de UEES y solicita informacion personalizada."
};

export default function PostgradoPage() {
  return <ProgramListPage level={ProgramLevel.postgrado} />;
}
