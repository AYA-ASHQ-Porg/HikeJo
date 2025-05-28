import { Badge } from "@/components/ui/badge";

interface TripImageSectionProps {
  imageUrl?: string;
  title: string;
  difficultyLevel: string;
  price: number;
}

const TripImageSection = ({
  imageUrl,
  title,
  difficultyLevel,
  price,
}: TripImageSectionProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "hard":
        return "bg-orange-500";
      case "expert":
        return "bg-red-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <>
      {imageUrl && (
        <div className="rounded-md overflow-hidden h-60 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <Badge
          className={`${getDifficultyColor(difficultyLevel)} text-white`}
          variant="outline"
        >
          {difficultyLevel || "easy"} Difficulty
        </Badge>
        <p className="font-semibold text-primary">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "JOD",
          }).format(price)}
        </p>
      </div>
    </>
  );
};

export default TripImageSection;
