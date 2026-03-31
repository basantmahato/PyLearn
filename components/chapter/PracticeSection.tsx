import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * Interface definition for Practice items matches the JSON structure perfectly.
 */
interface PracticeItemProps {
  q: string;
  type: string;
  difficulty: string;
  hints: string[];
  solution: {
    explanation?: string;
    example?: string;
    code?: string;
  };
}

/**
 * An interactive practice card component with state-driven visibility for solutions.
 * Optimized for an engaging self-study experience.
 */
export function PracticeCard({ q, type, difficulty, solution }: PracticeItemProps) {
  const [showSolution, setShowSolution] = useState(false);

  // Dynamic status color mapping
  const difficultyColor = 
    difficulty === "hard" ? "text-error" : 
    difficulty === "medium" ? "text-tertiary" : 
    "text-primary-container";

  return (
    <View className="mb-8 bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
      <View className="flex-row justify-between items-center mb-6">
        <View className="bg-primary/10 px-4 py-1.5 rounded-full">
          <Text className="text-xs font-bold text-primary uppercase tracking-widest">{type}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className={`w-2 h-2 rounded-full ${difficultyColor.replace("text-", "bg-")}`} />
          <Text className={`text-xs font-extrabold uppercase tracking-tight ${difficultyColor}`}>
            {difficulty}
          </Text>
        </View>
      </View>

      <Text className="text-xl font-bold text-on-surface mb-8 leading-[1.4] tracking-tight">
        {q}
      </Text>

      {showSolution ? (
        <View className="bg-surface-container-high/40 rounded-2xl p-6 border border-primary-fixed/20 animate-fade-in">
          <View className="flex-row items-center gap-2 mb-4">
            <MaterialCommunityIcons name={"lightbulb-on" as any} size={18} color="#005ab5" />
            <Text className="text-xs font-extrabold text-primary uppercase tracking-[0.2em]">Solution Guide</Text>
          </View>
          
          {solution.explanation && (
            <Text className="text-lg leading-7 text-on-surface-variant font-medium mb-5 italic">
              {solution.explanation}
            </Text>
          )}

          {solution.code && (
            <View className="bg-[#001B3E] p-6 rounded-2xl shadow-inner">
              <Text className="text-[14px] leading-6 text-secondary-fixed-dim/90 font-mono">
                {solution.code}
              </Text>
            </View>
          )}

          {solution.example && !solution.code && (
            <View className="bg-surface-container-high p-5 rounded-xl border border-outline-variant/30">
              <Text className="text-[14px] leading-6 text-on-surface-variant font-mono">
                {solution.example}
              </Text>
            </View>
          )}

          <Pressable 
            onPress={() => setShowSolution(false)}
            className="mt-8 self-center flex-row items-center gap-2 active:opacity-70"
          >
            <Text className="text-sm font-bold text-outline uppercase tracking-widest">Hide Solution</Text>
            <MaterialCommunityIcons name="chevron-up" size={20} color="#717785" />
          </Pressable>
        </View>
      ) : (
        <Pressable 
          onPress={() => setShowSolution(true)}
          className="bg-primary py-5 rounded-2xl items-center justify-center shadow-lg active:scale-[0.98] transition-all"
        >
          <Text className="text-white font-bold text-lg">Reveal Solution</Text>
        </Pressable>
      )}
    </View>
  );
}

/**
 * Section container for the chapter's practice laboratory.
 */
export function PracticeSection({ practice }: { practice: PracticeItemProps[] }) {
  if (!practice || practice.length === 0) return null;

  return (
    <View className="mt-20 mb-32">
      <View className="flex-row items-center gap-4 mb-10">
        <View className="h-12 w-2 bg-primary-container rounded-full" />
        <View>
           <Text className="text-3xl font-extrabold tracking-tighter text-on-surface">
            Practice Lab
          </Text>
          <Text className="text-sm font-bold text-outline/60 uppercase tracking-[0.3em]">
            Hands-on Exercise
          </Text>
        </View>
      </View>
      {practice.map((item, index) => (
        <PracticeCard key={index} {...item} />
      ))}
    </View>
  );
}
