import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Image
        src={icon}
        alt={`${title} icon`}
        width={32}
        height={32}
        className="mb-4 dark:invert"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-center text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
