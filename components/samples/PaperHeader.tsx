import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface PaperHeaderProps {
  title: string;
  subtitle: string;
  duration: string;
  totalMarks: number;
  difficulty: string;
  onBack: () => void;
}

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  Easy: { bg: "#e8f5e9", text: "#2e7d32" },
  Medium: { bg: "#fff3e0", text: "#ef6c00" },
  Hard: { bg: "#ffebee", text: "#c62828" },
};

const DEFAULT_COLORS = { bg: "#e3f2fd", text: "#1565c0" };

export function PaperHeader({
  title,
  subtitle,
  duration,
  totalMarks,
  difficulty,
  onBack,
}: PaperHeaderProps) {
  const colors = DIFFICULTY_COLORS[difficulty] || DEFAULT_COLORS;

  return (
    <View className="px-6 py-4">
      {/* Back Button */}
      <Pressable
        onPress={onBack}
        className="flex-row items-center gap-2 mb-4 self-start"
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#717785" />
        <Text className="text-on-surface-variant font-medium">Back to Papers</Text>
      </Pressable>

      {/* Paper Info Card */}
      <View className="bg-primary/5 p-6 rounded-[32px] border border-primary/10">
        <View className="flex-row items-center gap-3 mb-3">
          <View className="bg-primary/10 p-2 rounded-xl">
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color="#005ab5"
            />
          </View>
          <Text className="text-xs font-black text-primary uppercase tracking-[0.3em]">
            Sample Paper
          </Text>
          <View
            className="px-3 py-1 rounded-full ml-auto"
            style={{ backgroundColor: colors.bg }}
          >
            <Text className="text-xs font-bold" style={{ color: colors.text }}>
              {difficulty}
            </Text>
          </View>
        </View>

        <Text className="text-2xl font-black text-on-surface tracking-tighter mb-2">
          {title}
        </Text>
        <Text className="text-on-surface-variant text-base mb-4">{subtitle}</Text>

        <View className="flex-row gap-6">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="clock-outline" size={18} color="#717785" />
            <Text className="text-on-surface-variant">{duration}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="trophy-outline" size={18} color="#717785" />
            <Text className="text-on-surface-variant">{totalMarks} Marks</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
