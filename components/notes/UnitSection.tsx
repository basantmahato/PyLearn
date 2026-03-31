import React from "react";
import { View, Text } from "react-native";
import { ChapterCard } from "./ChapterCard";
import { Chapter } from "@/constants/chapters";

interface UnitSectionProps {
  id: string;
  title: string;
  chapters: Chapter[];
  columns: number;
}

export function UnitSection({ title, chapters, columns }: UnitSectionProps) {
  if (chapters.length === 0) return null;

  return (
    <View className="gap-y-6 md:gap-y-8">
      <View className="flex-row items-center gap-3">
        <View className="h-8 md:h-10 w-1.5 bg-primary rounded-full" />
        <Text className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
          {title}
        </Text>
      </View>

      <View className="flex-row flex-wrap gap-4 md:gap-6">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} unitColumns={columns} />
        ))}
      </View>
    </View>
  );
}
