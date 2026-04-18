import { TOPICS } from "@/constants/chapters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TopicDiscoveryProps {
  onTopicPress: (topicLabel: string, keywords: string[]) => void;
  activeTopic?: string | null;
}

export function TopicDiscovery({ onTopicPress, activeTopic }: TopicDiscoveryProps) {
  return (
    <View className="mt-16 md:mt-24 mb-12">
      <View className="flex-row items-center gap-2 mb-6">
        <MaterialCommunityIcons name="creation" size={20} color="#005ab5" />
        <Text className="text-on-surface font-bold text-base md:text-lg opacity-60">
          Popular Topics
        </Text>
      </View>
      <View className="flex-row flex-wrap gap-3 md:gap-4">
        {TOPICS.map((topic, index) => {
          const isActive = activeTopic === topic.label;
          return (
            <Pressable
              key={index}
              onPress={() => onTopicPress(topic.label, topic.keywords)}
              className={`px-6 md:px-8 py-3 rounded-full active:scale-95 transition-all ${
                isActive 
                  ? "bg-primary" 
                  : "bg-surface-container-high active:bg-primary-container"
              }`}
            >
              <Text className={`text-sm md:text-base font-semibold ${
                isActive ? "text-white" : "text-on-secondary-container"
              }`}>
                {topic.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
