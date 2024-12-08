import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyP } from "@/components/typography/TypographyP";
import { MemberInfo } from "@/components/milestone1/Members";

const Member = ({ member }: { member: MemberInfo }) => {
  const fallback = member.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="w-full">
      <CardHeader className="w-full flex items-center">
        <Avatar className={"size-32"}>
          <AvatarImage
            className="object-cover"
            src={member.img}
            alt={member.name}
          />
          <AvatarFallback>
            <span className="text-3xl">{fallback}</span>
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="space-y-2">
        <TypographyH4>{member.name}</TypographyH4>
        <TypographyP className="text-muted-foreground mt-0 mb-0">
          {member.role}
        </TypographyP>
        <TypographyP>{member.description}</TypographyP>
      </CardContent>
    </Card>
  );
};

export default Member;
