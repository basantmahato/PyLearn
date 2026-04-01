import React from "react";
import { Pressable, Text, View } from "react-native";

interface ErrorQuestionProps {
  id: string;
  question: string;
  marks: number;
  answer: string;
  explanation: string;
  index: number;
  showSolution: boolean;
  onToggleSolution: () => void;
}

export function ErrorQuestion({
  question,
  marks,
  answer,
  explanation,
  index,
  showSolution,
  onToggleSolution,
}: ErrorQuestionProps) {
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
        onPress={onToggleSolution}
        className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/20 active:opacity-80"
      >
        <Text className="text-primary font-bold text-center">
          {showSolution ? "Hide Solution" : "Show Solution"}
        </Text>
      </Pressable>
      {showSolution && (
        <View className="mt-3 p-3 bg-primary/5 rounded-xl">
          <Text className="text-on-surface font-bold text-sm mb-1">Answer:</Text>
          <Text className="text-on-surface text-sm mb-2">{answer}</Text>
          <Text className="text-on-surface-variant text-sm mt-2">
            <Text className="font-bold">Explanation: </Text>
            {explanation}
          </Text>
        </View>
      )}
    </View>
  );
}
