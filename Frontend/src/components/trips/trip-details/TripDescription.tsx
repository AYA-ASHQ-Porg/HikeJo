
import { Separator } from "@/components/ui/separator";
import { Info, Phone } from "lucide-react";

interface TripDescriptionProps {
  description: string;
  companyName: string;
  companyPhoneNumber: string;
}

const TripDescription = ({ description, companyName, companyPhoneNumber }: TripDescriptionProps) => {
  return (
    <>
      <Separator />
      
      <div>
        <div className="flex items-center mb-2">
          <Info className="mr-2 text-primary" size={20} />
          <h3 className="font-semibold">Description</h3>
        </div>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <Phone className="mr-2 text-primary" size={20} />
          <h3 className="font-semibold">Contact</h3>
        </div>
        <p className="text-muted-foreground">
          {companyName} - {companyPhoneNumber}
        </p>
      </div>
    </>
  );
};

export default TripDescription;
