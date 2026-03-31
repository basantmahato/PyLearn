import React from "react";
import { View, Text } from "react-native";

interface ParagraphBlockProps {
  heading?: string;
  text: string;
}

/**
 * Renders a standard paragraph block with optional heading.
 * Focused on high readability and balanced line spacing.
 */
export function ParagraphBlock({ heading, text }: ParagraphBlockProps) {
  return (
    <View className="mb-10">
      {heading && (
        <Text className="text-2xl font-extrabold text-on-surface mb-4 tracking-tight">
          {heading}
        </Text>
      )}
      <Text className="text-lg leading-8 text-on-surface-variant/90 text-justify">
        {text}
      </Text>
    </View>
  );
}

interface ListBlockProps {
  heading?: string;
  items: string[];
}

/**
 * Renders a bulleted list with consistent spacing and primary-colored indicators.
 */
export function ListBlock({ heading, items }: ListBlockProps) {
  return (
    <View className="mb-10">
      {heading && (
        <Text className="text-xl font-bold text-on-surface mb-5">
          {heading}
        </Text>
      )}
      <View className="gap-y-4">
        {items.map((item, index) => (
          <View key={index} className="flex-row gap-4 px-2">
            <View className="w-2 h-2 rounded-full bg-primary mt-3" />
            <Text className="flex-1 text-lg leading-7 text-on-surface-variant/90">
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

interface CodeBlockProps {
  heading?: string;
  code: string;
  language: string;
}

/**
 * Renders a beautifully themed code box with syntax-focused coloring and mono-spacing.
 */
export function CodeBlock({ heading, code, language }: CodeBlockProps) {
  return (
    <View className="mb-10 overflow-hidden rounded-3xl bg-[#001B3E] shadow-lg">
      <View className="px-6 py-4 border-b border-white/5 bg-white/5 flex-row justify-between items-center">
        <Text className="text-xs font-bold text-primary-fixed uppercase tracking-[0.2em]">
          {heading || "Code Snippet"}
        </Text>
        <View className="bg-primary-fixed/10 px-2 py-0.5 rounded-md">
          <Text className="text-[10px] font-bold text-primary-fixed/80 uppercase">
            {language}
          </Text>
        </View>
      </View>
      <View className="p-6">
        <Text className="text-[15px] leading-7 text-secondary-fixed-dim/90 font-mono">
          {code}
        </Text>
      </View>
    </View>
  );
}
