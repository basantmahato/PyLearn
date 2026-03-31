import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Chapter } from "@/constants/chapters";

interface ChapterCardProps {
  chapter: Chapter;
  unitColumns: number;
}

export function ChapterCard({ chapter, unitColumns }: ChapterCardProps) {
  const isWide = chapter.variant === "wide";
  const isAccent = chapter.variant === "accent";
  const useSolidButton = isWide || isAccent;

  const widthClasses = isWide
    ? "w-full"
    : unitColumns === 3
    ? "w-full md:w-[48%] lg:w-[31.5%]"
    : "w-full md:w-[48%]";

  return (
    <Pressable
      className={`${widthClasses} ${
        useSolidButton ? "bg-primary" : "bg-surface-container-lowest"
      } rounded-3xl p-5 md:p-6 shadow-sm active:scale-[0.98] transition-all`}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className={`text-lg md:text-xl font-bold leading-tight flex-1 ${
            useSolidButton ? "text-white" : "text-on-surface"
          }`}
        >
          {chapter.title}
        </Text>
        <MaterialCommunityIcons
          name={isWide ? ("star" as any) : ("chevron-right" as any)}
          size={24}
          color={isAccent || isWide ? "#ffffff" : "#717785"}
        />
      </View>
    </Pressable>
  );
}
