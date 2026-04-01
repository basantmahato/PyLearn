import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PaperList } from "@/components/samples/PaperList";
import { Header } from "@/components/ui/Header";
import { SAMPLE_PAPERS } from "@/data/samples";

const DIFFICULTY_FILTERS = ["All", "Easy", "Medium", "Hard"] as const;

export default function SampleScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<typeof DIFFICULTY_FILTERS[number]>("All");

  const handlePaperPress = (paperId: string) => {
    router.push(`/sample/${paperId}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      {/* Shared Header Component */}
      <Header showSearch={false} />

      <ScrollView contentContainerClassName="pb-32" showsVerticalScrollIndicator={false}>
        <View className="max-w-5xl self-center w-full px-6 pt-8 md:pt-12">
        {/* Title */}
        <View className="mb-8">
          <Text className="text-4xl font-black text-on-surface tracking-tighter">
            Sample Papers
          </Text>
          <Text className="text-on-surface-variant text-base mt-2">
            Practice with 20 comprehensive Python assessments
          </Text>
        </View>

        {/* Stats Card */}
        <View className="bg-primary/5 p-6 rounded-[32px] border border-primary/10 mb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="bg-primary/10 p-3 rounded-xl">
                <MaterialCommunityIcons name="file-document-multiple" size={24} color="#005ab5" />
              </View>
              <View>
                <Text className="text-2xl font-black text-on-surface">{SAMPLE_PAPERS.length}</Text>
                <Text className="text-sm text-on-surface-variant">Total Papers</Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <View className="bg-green-100 px-3 py-2 rounded-xl">
                <Text className="text-xs font-bold text-green-700">
                  {SAMPLE_PAPERS.filter(p => p.difficulty === "Easy").length} Easy
                </Text>
              </View>
              <View className="bg-orange-100 px-3 py-2 rounded-xl">
                <Text className="text-xs font-bold text-orange-700">
                  {SAMPLE_PAPERS.filter(p => p.difficulty === "Medium").length} Med
                </Text>
              </View>
              <View className="bg-red-100 px-3 py-2 rounded-xl">
                <Text className="text-xs font-bold text-red-700">
                  {SAMPLE_PAPERS.filter(p => p.difficulty === "Hard").length} Hard
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search */}
        <View className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10 mb-4">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="magnify" size={20} color="#717785" />
            <TextInput
              className="flex-1 text-on-surface text-base"
              placeholder="Search papers..."
              placeholderTextColor="#717785"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <MaterialCommunityIcons name="close" size={20} color="#717785" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Difficulty Filter */}
        <View className="flex-row gap-2 mb-6">
          {DIFFICULTY_FILTERS.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setDifficultyFilter(filter)}
              className={`px-4 py-2 rounded-full border ${
                difficultyFilter === filter
                  ? "bg-primary border-primary"
                  : "bg-surface-container-low border-outline-variant/20"
              }`}
            >
              <Text
                className={`font-medium ${
                  difficultyFilter === filter ? "text-white" : "text-on-surface-variant"
                }`}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Paper List */}
        <PaperList
          papers={SAMPLE_PAPERS}
          onPaperPress={handlePaperPress}
          searchQuery={searchQuery}
          difficultyFilter={difficultyFilter}
        />

        {/* Footer */}
        <View className="bg-surface-container-high p-6 rounded-[32px] border border-outline-variant/10 items-center mt-8">
          <MaterialCommunityIcons name="school-outline" size={32} color="#005ab5" />
          <Text className="text-xl font-bold text-on-surface mt-4">Practice Makes Perfect</Text>
          <Text className="text-on-surface-variant text-center mt-2">
            Complete papers to track your progress and prepare for exams
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
