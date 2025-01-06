import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TypographyH2 } from "@/components/typography/TypographyH2";
import { TypographyH4 } from "@/components/typography/TypographyH4";

export default function ManagementPage() {
  const unpublishedEntities = [
    { name: "Dietary Preferences", href: "/management/dietary-preferences" },
    { name: "Allergens", href: "/management/allergens" },
    { name: "Ingredients", href: "/management/ingredients" },
    { name: "Meals", href: "/management/meals" },
    { name: "Plans", href: "/management/plans" },
  ];

  const publishedEntities = [
    { name: "Plans", href: "/management/published-plans" },
  ];

  return (
    <div className={"space-y-2.5"}>
      <TypographyH2>Entity Management</TypographyH2>
      <TypographyH4>Unpublished Entities</TypographyH4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {unpublishedEntities.map((entity) => (
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
      <TypographyH4>Published Entities</TypographyH4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {publishedEntities.map((entity) => (
          <Card key={entity.name}>
            <CardHeader>
              <CardTitle>{entity.name}</CardTitle>
              <CardDescription>
                Manage published {entity.name.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={entity.href} className="hover:underline">
                Go to Published {entity.name}
              </Link>
            </CardContent>
            <CardFooter className={"text-destructive font-bold"}>
              These {entity.name.toLowerCase()} are published into production!
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
