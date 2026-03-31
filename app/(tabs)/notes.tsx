import React, { useState, useMemo } from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { UNITS } from "@/constants/chapters";
import { Header } from "@/components/ui/Header";
import { SearchHero } from "@/components/notes/SearchHero";
import { UnitSection } from "@/components/notes/UnitSection";
import { TopicDiscovery } from "@/components/notes/TopicDiscovery";

export default function NotesScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Functional search logic: Filtering units and chapters in real-time
  const filteredUnits = useMemo(() => {
    if (!searchQuery.trim()) return UNITS;

    const query = searchQuery.toLowerCase();

    return UNITS.map((unit) => {
      // Check if unit title itself matches the search query
      const isUnitMatch = unit.title.toLowerCase().includes(query);

      // Filter chapters that match title (or description/icon if needed)
      const matchingChapters = unit.chapters.filter((chapter) =>
        chapter.title.toLowerCase().includes(query)
      );

      // If the unit title matches, we show the entire unit. 
      // Otherwise, we only show the matching chapters within that unit.
      return {
        ...unit,
        chapters: isUnitMatch ? unit.chapters : matchingChapters,
      };
    }).filter((unit) => unit.chapters.length > 0);
  }, [searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      {/* Shared Header Component with Search Toggle */}
      <Header 
        showSearch={true} 
        onSearchPress={() => {/* Optional: focus search input if needed */}} 
      />

      <ScrollView contentContainerClassName="pb-32" showsVerticalScrollIndicator={false}>
        <View className="max-w-5xl self-center w-full px-6 pt-8 md:pt-12">
          
          {/* Page Hero with Search State Integration */}
          <SearchHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Dynamically Filtered Unit Content */}
          <View className="gap-y-12 md:gap-y-20">
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit) => (
                <UnitSection
                  key={unit.id}
                  id={unit.id}
                  title={unit.title}
                  chapters={unit.chapters}
                  columns={unit.columns}
                />
              ))
            ) : (
              <View className="items-center justify-center py-20 opacity-40">
                <MaterialCommunityIcons name={"text-search" as any} size={64} color="#717785" />
                <Text className="text-xl font-bold mt-4 text-on-surface">No results found</Text>
                <Text className="text-on-surface-variant text-center mt-2 px-10">
                  Try searching for another syllabus chapter or computational concept.
                </Text>
              </View>
            )}
          </View>

          {/* Discovery Section: Pillars for popular exploration */}
          <TopicDiscovery onTopicPress={setSearchQuery} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
