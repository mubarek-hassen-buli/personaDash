import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-lg bg-slate-800">
      <Icon className="w-8 h-8 mb-4" />
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
