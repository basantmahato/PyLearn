import React from "react";
import { Text, View } from "react-native";

interface MCQQuestionProps {
  id: string;
  question: string;
  options: string[];
  answer: number;
  index: number;
  showAnswer: boolean;
}

export function MCQQuestion({
  question,
  options,
  answer,
  index,
  showAnswer,
}: MCQQuestionProps) {
  return (
    <View className="mb-4 bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10">
      <Text className="text-on-surface font-bold mb-3">
        {index + 1}. {question}
      </Text>
      <View className="gap-2">
        {options.map((option, optIdx) => (
          <View
            key={optIdx}
            className={`p-3 rounded-xl border ${
              showAnswer && optIdx === answer
                ? "bg-primary/10 border-primary"
                : "bg-surface-container-high border-outline-variant/20"
            }`}
          >
            <Text
              className={`${
                showAnswer && optIdx === answer
                  ? "text-primary font-bold"
                  : "text-on-surface"
              }`}
            >
              {String.fromCharCode(65 + optIdx)}. {option}
            </Text>
          </View>
        ))}
      </View>
      {showAnswer && (
        <View className="mt-3 p-3 bg-primary/5 rounded-xl">
          <Text className="text-primary text-sm font-bold">
            Answer: {String.fromCharCode(65 + answer)}
          </Text>
        </View>
      )}
    </View>
  );
}
