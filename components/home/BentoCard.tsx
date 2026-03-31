import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface BentoCardProps {
  title: string;
  subtitle: string;
  progress: number;
  icon: string;
  color: string;
  tag: string;
}

export function BentoCard({ title, subtitle, progress, icon, color, tag }: BentoCardProps) {
  const iconColor = color === 'primary' ? '#005ab5' : color === 'tertiary' ? '#8f4a00' : color === 'secondary' ? '#465f8a' : '#0472e2';
  const bgColor = color === 'primary' ? 'bg-primary/10' : color === 'tertiary' ? 'bg-tertiary/10' : color === 'secondary' ? 'bg-secondary/10' : 'bg-primary-container/10';

  return (
    <Pressable className="bg-surface-container-low rounded-3xl p-5 w-[47%] hover:bg-surface-container active:scale-95">
      <View className="flex-row justify-between items-start mb-4">
        <View className="w-12 h-12 rounded-2xl bg-surface-container-high items-center justify-center">
          <MaterialCommunityIcons name={icon as any} size={24} color={iconColor} />
        </View>
        <View className={`${bgColor} px-2 py-1 rounded-lg`}>
          <Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface">{tag}</Text>
        </View>
      </View>
      <Text className="font-bold text-lg mb-1">{title}</Text>
      <Text className="text-xs text-on-surface-variant" numberOfLines={1}>{subtitle}</Text>
      <View className="mt-4 h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <View className="h-full bg-primary rounded-full" style={{ width: `${progress}%`, backgroundColor: iconColor }} />
      </View>
    </Pressable>
  );
}
