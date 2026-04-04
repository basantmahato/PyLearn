import { useProgressStore } from "@/lib/progress-store";
import { getUserName } from "@/lib/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export function Greeting() {
  const [userName, setUserName] = useState<string>("Learner");
  const { getStreak, checkIn } = useProgressStore();
  const streak = getStreak();

  useEffect(() => {
    const storedName = getUserName();
    if (storedName) {
      setUserName(storedName);
    }
    // Check in for streak when greeting loads
    checkIn();
  }, [checkIn]);

  return (
    <View className="mb-10 flex-row justify-between items-end">
      <View className="space-y-1">
        <Text className="text-on-surface-variant font-medium opacity-70">Welcome back,</Text>
        <Text className="text-4xl font-extrabold tracking-tight text-on-surface">Hey, {userName}</Text>
      </View>
      <View className="bg-surface-container-lowest shadow-sm rounded-2xl px-4 py-2 flex-row items-center gap-2 border border-surface-container-high">
        <MaterialCommunityIcons name="fire" size={20} color="#f97316" />
        <Text className="font-bold text-on-surface">{streak} Day Streak</Text>
      </View>
    </View>
  );
}
