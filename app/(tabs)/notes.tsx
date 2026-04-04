import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SearchHero } from "@/components/notes/SearchHero";
import { TopicDiscovery } from "@/components/notes/TopicDiscovery";
import { UnitSection } from "@/components/notes/UnitSection";
import { Header } from "@/components/ui/Header";
import { TOPICS, UNITS } from "@/constants/chapters";

export default function NotesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Get keywords for active topic
  const activeTopicKeywords = useMemo(() => {
    if (!activeTopic) return [];
    const topic = TOPICS.find(t => t.label === activeTopic);
    return topic?.keywords || [];
  }, [activeTopic]);

  // Combined search and topic filtering
  const filteredUnits = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const hasSearch = query.length > 0;
    const hasTopic = activeTopicKeywords.length > 0;

    if (!hasSearch && !hasTopic) return UNITS;

    return UNITS.map((unit) => {
      // Check if unit title matches
      const unitMatchesSearch = hasSearch && unit.title.toLowerCase().includes(query);
      const unitMatchesTopic = hasTopic && activeTopicKeywords.some(kw => 
        unit.title.toLowerCase().includes(kw.toLowerCase())
      );

      // Filter chapters
      const matchingChapters = unit.chapters.filter((chapter) => {
        const chapterTitle = chapter.title.toLowerCase();
        
        // Search filter
        const matchesSearch = !hasSearch || chapterTitle.includes(query);
        
        // Topic filter - check if chapter title matches any keyword
        const matchesTopic = !hasTopic || activeTopicKeywords.some(kw => 
          chapterTitle.includes(kw.toLowerCase())
        );

        return matchesSearch && matchesTopic;
      });

      // If unit matches, show all chapters (unless topic filtering)
      const chaptersToShow = (unitMatchesSearch && !hasTopic) 
        ? unit.chapters 
        : matchingChapters;

      return {
        ...unit,
        chapters: chaptersToShow,
      };
    }).filter((unit) => unit.chapters.length > 0);
  }, [searchQuery, activeTopicKeywords]);

  const handleTopicPress = useCallback((label: string, keywords: string[]) => {
    // Toggle topic - if already active, clear it
    if (activeTopic === label) {
      setActiveTopic(null);
      setSearchQuery("");
    } else {
      setActiveTopic(label);
      setSearchQuery(label);
    }
  }, [activeTopic]);

  const clearFilters = () => {
    setActiveTopic(null);
    setSearchQuery("");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      {/* Shared Header Component */}
      <Header showSearch={false} />

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
          <TopicDiscovery 
            onTopicPress={handleTopicPress} 
            activeTopic={activeTopic}
          />
          
          {/* Active Filter Indicator */}
          {activeTopic && (
            <View className="flex-row items-center gap-2 mb-4">
              <Text className="text-sm text-on-surface-variant">
                Filtering by: <Text className="font-bold text-primary">{activeTopic}</Text>
              </Text>
              <Pressable onPress={clearFilters} className="p-1">
                <MaterialCommunityIcons name="close-circle" size={18} color="#717785" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
