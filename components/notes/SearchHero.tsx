import React from "react";
import { View, Text, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SearchHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchHero({ searchQuery, setSearchQuery }: SearchHeroProps) {
  return (
    <View className="mb-12 md:mb-16">
      <Text className="text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-6 md:mb-8">
        Chapter Notes
      </Text>
      <View className="relative max-w-2xl">
        <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
          <MaterialCommunityIcons name={"magnify" as any} size={24} color="#717785" />
        </View>
        <TextInput
          className="w-full bg-surface-container-high border-none rounded-3xl py-4 md:py-6 pl-12 pr-6 text-on-surface text-base md:text-lg"
          placeholder="Search syllabus, concepts, or chapters..."
          placeholderTextColor="#414753"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );
}
