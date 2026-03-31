import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TOPICS } from "@/constants/chapters";

interface TopicDiscoveryProps {
  onTopicPress: (topic: string) => void;
}

export function TopicDiscovery({ onTopicPress }: TopicDiscoveryProps) {
  return (
    <View className="mt-16 md:mt-24 mb-12">
      <View className="flex-row items-center gap-2 mb-6">
        <MaterialCommunityIcons name={"sparkles" as any} size={20} color="#005ab5" />
        <Text className="text-on-surface font-bold text-base md:text-lg opacity-60">
          Popular Topics
        </Text>
      </View>
      <View className="flex-row flex-wrap gap-3 md:gap-4">
        {TOPICS.map((topic, index) => (
          <Pressable
            key={index}
            onPress={() => onTopicPress(topic)}
            className="bg-surface-container-high px-6 md:px-8 py-3 rounded-full active:bg-primary-container active:scale-95 transition-all"
          >
            <Text className="text-sm md:text-base font-semibold text-on-secondary-container">
              {topic}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
