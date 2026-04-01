import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { CodeQuestion } from "@/components/samples/CodeQuestion";
import { ErrorQuestion } from "@/components/samples/ErrorQuestion";
import { MCQQuestion } from "@/components/samples/MCQQuestion";
import { SectionAccordion } from "@/components/samples/SectionAccordion";
import { ShortAnswerQuestion } from "@/components/samples/ShortAnswerQuestion";
import { getPaperById } from "@/data/samples";

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string }> = {
  Easy: { bg: "#e8f5e9", text: "#2e7d32" },
  Medium: { bg: "#fff3e0", text: "#ef6c00" },
  Hard: { bg: "#ffebee", text: "#c62828" },
};

export default function PaperDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const paper = getPaperById(id as string);

  const [expandedSection, setExpandedSection] = useState<string | null>("A");
  const [showingAnswers, setShowingAnswers] = useState<Set<string>>(new Set());

  if (!paper) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <StatusBar style="dark" />
        <MaterialCommunityIcons name="file-search-outline" size={64} color="#717785" />
        <Text className="text-xl font-bold text-on-surface mt-4">Paper Not Found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const toggleAnswer = (questionId: string) => {
    setShowingAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const renderQuestions = (section: any) => {
    return section.questions.map((q: any, index: number) => {
      switch (section.sectionId) {
        case "A":
          return (
            <MCQQuestion
              key={q.id}
              id={q.id}
              question={q.question}
              options={q.options}
              answer={q.answer}
              index={index}
              showAnswer={showingAnswers.has(q.id)}
            />
          );
        case "B":
          return (
            <ShortAnswerQuestion
              key={q.id}
              id={q.id}
              question={q.question}
              marks={q.marks}
              keywords={q.keywords}
              index={index}
              showAnswer={showingAnswers.has(q.id)}
              onToggleAnswer={() => toggleAnswer(q.id)}
            />
          );
        case "C":
          return (
            <CodeQuestion
              key={q.id}
              id={q.id}
              question={q.question}
              marks={q.marks}
              hints={q.hints}
              index={index}
              showHints={showingAnswers.has(q.id)}
              onToggleHints={() => toggleAnswer(q.id)}
            />
          );
        case "D":
          return (
            <ErrorQuestion
              key={q.id}
              id={q.id}
              question={q.question}
              marks={q.marks}
              answer={q.answer}
              explanation={q.explanation}
              index={index}
              showSolution={showingAnswers.has(q.id)}
              onToggleSolution={() => toggleAnswer(q.id)}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <StatusBar style="dark" />

      {/* Precision Navigation Header */}
      <View
        className="px-6 pb-4 flex-row items-center border-b border-outline-variant/10 bg-background/95 z-50 shadow-sm"
        style={{ paddingTop: Math.max(insets.top, 16) }}
      >
        <Pressable
          onPress={() => router.back()}
          className="w-11 h-11 items-center justify-center rounded-full bg-surface-container active:scale-90 transition-all"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#1d1e20" />
        </Pressable>
        <View className="ml-4 flex-1">
          <Text className="text-sm font-bold text-outline-fixed uppercase tracking-[0.2em]" numberOfLines={1}>
            SP{id} • PyLearn Sample
          </Text>
          <Text className="text-base font-bold text-on-surface" numberOfLines={1}>
            {paper?.title || "Sample Paper"}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* Paper Info Card */}
        <View className="px-6 py-4">
          <View className="bg-primary/5 p-6 rounded-[32px] border border-primary/10">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="bg-primary/10 p-2 rounded-xl">
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={24}
                  color="#005ab5"
                />
              </View>
              <Text className="text-xs font-black text-primary uppercase tracking-[0.3em]">
                Sample Paper
              </Text>
              <View
                className="px-3 py-1 rounded-full ml-auto"
                style={{ backgroundColor: DIFFICULTY_COLORS[paper.difficulty]?.bg || "#e3f2fd" }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: DIFFICULTY_COLORS[paper.difficulty]?.text || "#1565c0" }}
                >
                  {paper.difficulty}
                </Text>
              </View>
            </View>

            <Text className="text-2xl font-black text-on-surface tracking-tighter mb-2">
              {paper.title}
            </Text>
            <Text className="text-on-surface-variant text-base mb-4">{paper.subtitle}</Text>

            <View className="flex-row gap-6">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="clock-outline" size={18} color="#717785" />
                <Text className="text-on-surface-variant">{paper.duration}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="trophy-outline" size={18} color="#717785" />
                <Text className="text-on-surface-variant">{paper.totalMarks} Marks</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View className="px-6 mb-6">
          <View className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10">
            <Text className="text-on-surface font-bold mb-3">Instructions:</Text>
            <View className="gap-2">
              <Text className="text-on-surface-variant text-sm">• All questions are compulsory</Text>
              <Text className="text-on-surface-variant text-sm">• Section A: Choose the correct option</Text>
              <Text className="text-on-surface-variant text-sm">• Section B: Write short answers</Text>
              <Text className="text-on-surface-variant text-sm">• Section C: Write complete Python programs</Text>
              <Text className="text-on-surface-variant text-sm">• Section D: Find errors and predict outputs</Text>
            </View>
          </View>
        </View>

        {/* Sections */}
        <View className="px-6">
          {paper.sections.map((section: any) => (
            <SectionAccordion
              key={section.sectionId}
              sectionId={section.sectionId}
              title={section.title}
              marks={section.marks}
              questionCount={section.questions.length}
              isExpanded={expandedSection === section.sectionId}
              onToggle={() => toggleSection(section.sectionId)}
            >
              {renderQuestions(section)}
            </SectionAccordion>
          ))}
        </View>

        {/* Footer */}
        <View
          className="mx-6 bg-surface-container-high p-6 rounded-[32px] border border-outline-variant/10 items-center mt-8"
          style={{ marginBottom: insets.bottom + 20 }}
        >
          <MaterialCommunityIcons name="school-outline" size={32} color="#005ab5" />
          <Text className="text-xl font-bold text-on-surface mt-4">Practice Makes Perfect</Text>
          <Text className="text-on-surface-variant text-center mt-2">
            Review all sections and practice writing code by hand to prepare for your exam.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
