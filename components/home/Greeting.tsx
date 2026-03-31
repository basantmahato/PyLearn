import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HOME_STATS } from "@/constants/home";

export function Greeting() {
  return (
    <View className="mb-10 flex-row justify-between items-end">
      <View className="space-y-1">
        <Text className="text-on-surface-variant font-medium opacity-70">Welcome back,</Text>
        <Text className="text-4xl font-extrabold tracking-tight text-on-surface">Hey, {HOME_STATS.user.name} 👋</Text>
      </View>
      <View className="bg-surface-container-lowest shadow-sm rounded-2xl px-4 py-2 flex-row items-center gap-2 border border-surface-container-high">
        <MaterialCommunityIcons name="fire" size={20} color="#f97316" />
        <Text className="font-bold text-on-surface">{HOME_STATS.streak} Day Streak</Text>
      </View>
    </View>
  );
}
