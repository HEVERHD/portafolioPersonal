import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { roleMetadata } from "@/lib/site";
import { getRole, ROLE_IDS } from "@/roles";

// One static page per role (/vtex, /react-native, /frontend); any other address is a 404
export const dynamicParams = false;
export const generateStaticParams = () => ROLE_IDS.map((role) => ({ role }));

type Props = { params: Promise<{ role: string }> };

export async function generateMetadata({ params }: Props) {
  const role = getRole((await params).role);
  return role ? roleMetadata("es", role) : {};
}

export default async function RolePage({ params }: Props) {
  const role = getRole((await params).role);
  if (!role) notFound();
  return <HomePage lang="es" role={role.id} />;
}
