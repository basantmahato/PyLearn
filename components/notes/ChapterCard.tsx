import { Chapter } from "@/constants/chapters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
    <Link href={`/chapter/${chapter.id}` as any} asChild>
      <Pressable
        className={`${widthClasses} ${
          useSolidButton ? "bg-primary" : "bg-surface-container-lowest"
        } rounded-[32px] p-6 md:p-8 shadow-sm active:scale-[0.97] transition-all border border-outline-variant/10`}
      >
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-lg md:text-xl font-bold leading-tight flex-1 ${
              useSolidButton ? "text-white" : "text-on-surface"
            }`}
            style={useSolidButton ? { color: '#ffffff' } : {}}
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
    </Link>
  );
}
