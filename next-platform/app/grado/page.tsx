import type { Metadata } from "next";
import { ProgramLevel } from "@prisma/client";
import { ProgramListPage } from "@/components/program-list-page";

export const metadata: Metadata = {
  title: "Programas de Grado | UEES Online",
  description: "Conoce los programas de grado online de UEES y solicita informacion personalizada."
};

export default function GradoPage() {
  return <ProgramListPage level={ProgramLevel.grado} />;
}
