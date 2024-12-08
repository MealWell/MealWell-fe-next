import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH4 } from "@/components/typography/TypographyH4";
import { TypographyList } from "@/components/typography/TypographyList";
import { SegmentType } from "@/components/milestone1/CustomerSegments";

const CustomerSegment = ({ segment }: { segment: SegmentType }) => {
  return (
    <Card className="w-full">
      <CardHeader className="w-full flex items-center">
        <segment.icon className="text-7xl" />
      </CardHeader>
      <CardContent className="space-y-2">
        <TypographyH4>{segment.segment}</TypographyH4>
        <TypographyList className="ml-0">
          {segment.descrieri.map((descriere) => (
            <li key={descriere}>{descriere}</li>
          ))}
        </TypographyList>
      </CardContent>
    </Card>
  );
};

export default CustomerSegment;
