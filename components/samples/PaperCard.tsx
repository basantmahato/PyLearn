import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface PaperCardProps {
  paperId: string;
  title: string;
  subtitle: string;
  duration: string;
  totalMarks: number;
  difficulty: string;
  onPress: () => void;
}

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  Easy: { bg: "#e8f5e9", text: "#2e7d32", icon: "#4caf50" },
  Medium: { bg: "#fff3e0", text: "#ef6c00", icon: "#ff9800" },
  Hard: { bg: "#ffebee", text: "#c62828", icon: "#f44336" },
};

const DEFAULT_COLORS = { bg: "#e3f2fd", text: "#1565c0", icon: "#2196f3" };

export function PaperCard({
  title,
  subtitle,
  duration,
  totalMarks,
  difficulty,
  onPress,
}: PaperCardProps) {
  const colors = DIFFICULTY_COLORS[difficulty] || DEFAULT_COLORS;

  return (
    <Pressable
      onPress={onPress}
      className="bg-surface-container-low p-5 rounded-[24px] border border-outline-variant/10 shadow-sm active:scale-[0.98] transition-all"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={{ backgroundColor: colors.bg }}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color={colors.icon}
          />
        </View>
        <View
          className="px-3 py-1 rounded-full"
          style={{ backgroundColor: colors.bg }}
        >
          <Text
            className="text-xs font-bold"
            style={{ color: colors.text }}
          >
            {difficulty}
          </Text>
        </View>
      </View>

      <Text className="text-lg font-bold text-on-surface mb-1" numberOfLines={2}>
        {title}
      </Text>
      <Text className="text-sm text-on-surface-variant mb-4" numberOfLines={1}>
        {subtitle}
      </Text>

      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <MaterialCommunityIcons name="clock-outline" size={14} color="#717785" />
          <Text className="text-xs text-on-surface-variant">{duration}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <MaterialCommunityIcons name="trophy-outline" size={14} color="#717785" />
          <Text className="text-xs text-on-surface-variant">{totalMarks} Marks</Text>
        </View>
      </View>
    </Pressable>
  );
}
