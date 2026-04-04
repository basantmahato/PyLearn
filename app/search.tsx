import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Header } from "@/components/ui/Header";
import { UNITS } from "@/constants/chapters";

// Build searchable index from chapters
const buildSearchIndex = () => {
  const chapters: Array<{
    id: string;
    title: string;
    unitTitle: string;
    type: "chapter";
  }> = [];

  UNITS.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapters.push({
        id: chapter.id,
        title: chapter.title,
        unitTitle: unit.title,
        type: "chapter",
      });
    });
  });

  return chapters;
};

const searchIndex = buildSearchIndex();

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.unitTitle.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  const handleResultPress = (chapterId: string) => {
    router.push(`/chapter/${chapterId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />
      <Header />

      <View className="px-6 pt-6">
        {/* Search Input */}
        <View className="flex-row items-center bg-surface-container-low rounded-2xl px-4 py-3 border border-outline-variant/10">
          <MaterialCommunityIcons name="magnify" size={24} color="#717785" />
          <TextInput
            className="flex-1 ml-3 text-base text-on-surface"
            placeholder="Search chapters..."
            placeholderTextColor="#717785"
            value={query}
            onChangeText={setQuery}
            autoFocus
            accessibilityLabel="Search chapters"
            accessibilityHint="Type to search for chapters by name"
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery("")}
              className="p-1"
              accessibilityLabel="Clear search"
            >
              <MaterialCommunityIcons name="close" size={20} color="#717785" />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerClassName="px-6 pt-6 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* Results or Empty State */}
        {query.trim() === "" ? (
          <View className="items-center py-20">
            <MaterialCommunityIcons
              name="text-search"
              size={64}
              color="#e5e5e5"
            />
            <Text className="text-on-surface-variant mt-4 text-center">
              Search for chapters by name or topic
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View className="items-center py-20">
            <MaterialCommunityIcons name="magnify" size={64} color="#e5e5e5" />
            <Text className="text-on-surface-variant mt-4 text-center">
              No results found for "{query}"
            </Text>
            <Text className="text-sm text-on-surface-variant/60 mt-2 text-center">
              Try searching with different keywords
            </Text>
          </View>
        ) : (
          <View>
            <Text className="text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
              {results.length} Result{results.length !== 1 ? "s" : ""}
            </Text>

            {results.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handleResultPress(item.id)}
                className="bg-surface-container-low rounded-2xl p-4 mb-3 border border-outline-variant/10 active:bg-surface-container-high"
                accessibilityLabel={`Open ${item.title}`}
                accessibilityRole="button"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-sm text-primary font-bold mb-1">
                      {item.unitTitle}
                    </Text>
                    <Text className="text-base font-bold text-on-surface">
                      {item.title}
                    </Text>
                    <Text className="text-xs text-on-surface-variant mt-1">
                      Chapter {item.id}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#717785"
                  />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
