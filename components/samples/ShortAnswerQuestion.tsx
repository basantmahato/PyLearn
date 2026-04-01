import React from "react";
import { Pressable, Text, View } from "react-native";

interface ShortAnswerQuestionProps {
  id: string;
  question: string;
  marks: number;
  keywords: string[];
  index: number;
  showAnswer: boolean;
  onToggleAnswer: () => void;
}

export function ShortAnswerQuestion({
  question,
  marks,
  keywords,
  index,
  showAnswer,
  onToggleAnswer,
}: ShortAnswerQuestionProps) {
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
        onPress={onToggleAnswer}
        className="bg-surface-container-high p-3 rounded-xl border border-outline-variant/20 active:opacity-80"
      >
        <Text className="text-primary font-bold text-center">
          {showAnswer ? "Hide Answer Guide" : "Show Answer Guide"}
        </Text>
      </Pressable>
      {showAnswer && (
        <View className="mt-3 p-3 bg-primary/5 rounded-xl">
          <Text className="text-on-surface-variant text-sm mb-2">Key points to include:</Text>
          <View className="flex-row flex-wrap gap-2">
            {keywords.map((keyword, idx) => (
              <View key={idx} className="bg-primary/10 px-3 py-1 rounded-full">
                <Text className="text-primary text-xs font-medium">{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
