import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SectionAccordionProps {
  sectionId: string;
  title: string;
  marks: number;
  questionCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function SectionAccordion({
  sectionId,
  title,
  marks,
  questionCount,
  isExpanded,
  onToggle,
  children,
}: SectionAccordionProps) {
  return (
    <View className="mb-4">
      <Pressable
        onPress={onToggle}
        className="bg-surface-container-low p-5 rounded-[24px] border border-outline-variant/10 shadow-sm active:scale-[0.98] transition-all"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/10 w-12 h-12 items-center justify-center rounded-xl">
              <Text className="text-primary font-black text-xl">{sectionId}</Text>
            </View>
            <View>
              <Text className="text-lg font-bold text-on-surface">{title}</Text>
              <Text className="text-xs text-on-surface-variant">
                {questionCount} Questions • {marks} Marks
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#717785"
          />
        </View>
      </Pressable>

      {isExpanded && (
        <View className="mt-3 px-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </View>
      )}
    </View>
  );
}
