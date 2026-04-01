import React from "react";
import { Pressable, Text, View } from "react-native";

interface CodeQuestionProps {
  id: string;
  question: string;
  marks: number;
  hints: string[];
  index: number;
  showHints: boolean;
  onToggleHints: () => void;
}

export function CodeQuestion({
  question,
  marks,
  hints,
  index,
  showHints,
  onToggleHints,
}: CodeQuestionProps) {
  return (
    <View className="mb-4 bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
      <View className="flex-row items-start justify-between mb-3">
        <Text className="text-on-surface font-bold flex-1">
          {index + 1}. {question}
        </Text>
        <Text className="text-on-surface-variant text-xs bg-surface-container-high px-2 py-1 rounded-full ml-2">
          {marks} marks
        </Text>
      </View>
      <Pressable
        onPress={onToggleHints}
        className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/20 active:opacity-80"
      >
        <Text className="text-primary font-bold text-center">
          {showHints ? "Hide Hints" : "Show Hints"}
        </Text>
      </Pressable>
      {showHints && (
        <View className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
          <Text className="text-amber-700 text-sm mb-2 font-bold">Hints:</Text>
          {hints.map((hint, idx) => (
            <Text key={idx} className="text-amber-600 text-sm mb-1">
              • {hint}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
