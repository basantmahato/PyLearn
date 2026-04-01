import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// Content Renderer Components
import { CodeBlock, ListBlock, ParagraphBlock } from "@/components/chapter/ContentBlocks";
import { PracticeSection } from "@/components/chapter/PracticeSection";

// Data Source Mapping (Simulating dynamic local content)
import ch1Data from "@/data/notes/ch1/notes.json";
import ch10Data from "@/data/notes/ch10/notes.json";
import ch11Data from "@/data/notes/ch11/notes.json";
import ch2Data from "@/data/notes/ch2/notes.json";
import ch3Data from "@/data/notes/ch3/notes.json";
import ch4Data from "@/data/notes/ch4/notes.json";
import ch5Data from "@/data/notes/ch5/notes.json";
import ch6Data from "@/data/notes/ch6/notes.json";
import ch7Data from "@/data/notes/ch7/notes.json";
import ch8Data from "@/data/notes/ch8/notes.json";
import ch9Data from "@/data/notes/ch9/notes.json";

/**
 * Chapter Detail Screen: The primary learning interface.
 * Dynamically renders rich JSON content for a specific syllabus chapter.
 */
export default function ChapterDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  /**
   * Data Mapping: Maps dynamic route IDs to localized JSON assets.
   * In a production scale, this could be a dynamic import or centralized service.
   */
  const data = useMemo(() => {
    const registry: Record<string, any> = {
      "1": ch1Data,
      "2": ch2Data,
      "3": ch3Data,
      "4": ch4Data,
      "5": ch5Data,
      "6": ch6Data,
      "7": ch7Data,
      "8": ch8Data,
      "9": ch9Data,
      "10": ch10Data,
      "11": ch11Data,
    };
    return registry[id as string] || null;
  }, [id]);

  // Error State: Graceful fallback for missing content
  if (!data) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center p-10">
         <MaterialCommunityIcons name={"alert-circle-outline" as any} size={64} color="#717785" />
        <Text className="text-xl font-bold text-on-surface mt-6 text-center">Chapter Content Not Found</Text>
        <Text className="text-on-surface-variant text-center mt-2 mb-8">
          The requested educational module is currently unavailable or being updated.
        </Text>
        <Pressable 
          onPress={() => router.back()} 
          className="bg-primary px-8 py-3 rounded-2xl shadow-md active:scale-95"
        >
          <Text className="text-white font-bold text-base">Return to Dashboard</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

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
            CH{data.order} • PyLearn Revision
          </Text>
          <Text className="text-base font-bold text-on-surface" numberOfLines={1}>
            {data.title}
          </Text>
        </View>
      </View>

      <ScrollView 
        contentContainerClassName="pt-12 pb-32 max-w-4xl self-center w-full px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Chapter Introduction Hero */}
        <View className="mb-16">
          <View className="bg-primary/10 px-4 py-2 rounded-xl mb-6 self-start">
             <Text className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Module {data.order || 1}</Text>
          </View>
          <Text className="text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tighter leading-[1.05]">
            {data.title}
          </Text>
          <View className="h-1.5 w-24 bg-primary-container rounded-full mt-8" />
        </View>

        {/* Modular Content Orchestrator */}
        <View>
          {data.content.map((block: any) => {
            switch (block.type) {
              case "paragraph":
                return <ParagraphBlock key={block.id} heading={block.heading} text={block.text} />;
              case "bullet_list":
                return <ListBlock key={block.id} heading={block.heading} items={block.items} />;
              case "code":
                return <CodeBlock key={block.id} heading={block.heading} code={block.code} language={block.language} />;
              default:
                return null;
            }
          })}
        </View>

        {/* Interactive Practice Laboratory */}
        <PracticeSection practice={data.practice} />

        {/* Summary Footer: Quick Memory Recall */}
        <View className="bg-surface-container-low rounded-[40px] p-10 border border-outline-variant/20 shadow-inner">
           <View className="flex-row items-center gap-3 mb-6">
            <MaterialCommunityIcons name="notebook-outline" size={28} color="#005ab5" />
            <Text className="text-2xl font-black text-on-surface tracking-tight uppercase">Flash Summary</Text>
          </View>
          <Text className="text-lg leading-7 text-on-surface-variant font-medium text-justify">
            {data.summary.detailed_summary}
          </Text>
          
          <View className="mt-10 border-t border-outline-variant/10 pt-8">
            <Text className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Core Exam Focus</Text>
            <View className="flex-row flex-wrap gap-2">
              {data.summary.exam_focus.map((item: string, idx: number) => (
                <View key={idx} className="bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                  <Text className="text-primary font-bold text-xs">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
