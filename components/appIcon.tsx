import { motion } from "framer-motion";

interface AppIconProps {
  name: string;
  icon: React.ElementType;
  onClick?: () => void;
}

export function AppIcon({ name, icon: Icon, onClick }: AppIconProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center w-30 h-30 bg-neutral-800 rounded-2xl shadow-md hover:bg-neutral-700 transition"
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{name}</span>
    </motion.button>
  );
}
