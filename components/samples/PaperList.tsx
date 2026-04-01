import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { PaperCard } from "./PaperCard";

interface Paper {
  paperId: string;
  title: string;
  subtitle: string;
  duration: string;
  totalMarks: number;
  difficulty: string;
}

interface PaperListProps {
  papers: Paper[];
  onPaperPress: (paperId: string) => void;
  searchQuery?: string;
  difficultyFilter?: "All" | "Easy" | "Medium" | "Hard";
}

export function PaperList({
  papers,
  onPaperPress,
  searchQuery = "",
  difficultyFilter = "All",
}: PaperListProps) {
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === "All" || paper.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  if (filteredPapers.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <MaterialCommunityIcons name="file-search-outline" size={64} color="#e0e0e0" />
        <Text className="text-on-surface-variant text-lg mt-4">No papers found</Text>
        <Text className="text-on-surface-variant/60 text-sm mt-1">
          Try adjusting your search or filters
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerClassName="flex-row flex-wrap gap-4 pb-8"
      showsVerticalScrollIndicator={false}
    >
      {filteredPapers.map((paper) => (
        <View key={paper.paperId} className="w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
          <PaperCard
            paperId={paper.paperId}
            title={paper.title}
            subtitle={paper.subtitle}
            duration={paper.duration}
            totalMarks={paper.totalMarks}
            difficulty={paper.difficulty}
            onPress={() => onPaperPress(paper.paperId)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
