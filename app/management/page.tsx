import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ManagementPage() {
  const entities = [
    { name: "Dietary Preferences", href: "/management/dietary-preferences" },
    { name: "Allergens", href: "/management/allergens" },
    { name: "Ingredients", href: "/management/ingredients" },
    { name: "Meals", href: "/management/meals" },
    { name: "Plans", href: "/management/plans" },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Entity Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map((entity) => (
          <Card key={entity.name}>
            <CardHeader>
              <CardTitle>{entity.name}</CardTitle>
              <CardDescription>
                Manage {entity.name.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={entity.href} className="hover:underline">
                Go to {entity.name}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
