import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// Content Renderer Components
import { CodeBlock, ListBlock, ParagraphBlock } from "@/components/chapter/ContentBlocks";
import { PracticeSection } from "@/components/chapter/PracticeSection";
import { useProgressStore } from "@/lib/progress-store";

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const chapterId = id as string;
  const { updateChapterProgress, markChapterComplete, checkIn, getChapterProgress, toggleBookmark, isBookmarked } = useProgressStore();
  const progress = getChapterProgress(chapterId);
  const bookmarked = isBookmarked(chapterId);

  /**
   * Data Mapping: Maps dynamic route IDs to localized JSON assets.
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
    return registry[chapterId] || null;
  }, [chapterId]);

  // Track scroll position and update progress
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    
    setScrollY(y);
    
    if (height > 0) {
      // Calculate progress based on scroll position (capped at 100%)
      const scrollProgress = Math.min(100, Math.round((y / (height - layoutHeight)) * 100));
      const newProgress = Math.max(progress, scrollProgress);
      
      if (newProgress > progress) {
        updateChapterProgress(chapterId, newProgress);
      }
      
      // Mark complete if scrolled to near bottom
      if (scrollProgress >= 90) {
        markChapterComplete(chapterId);
        checkIn(); // Update streak
      }
    }
  }, [chapterId, progress, updateChapterProgress, markChapterComplete, checkIn]);

  // Handle content layout to get height
  const handleContentSizeChange = useCallback((w: number, h: number) => {
    setContentHeight(h);
  }, []);

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
        {/* Progress indicator */}
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => toggleBookmark(chapterId)}
            className="w-10 h-10 rounded-full bg-surface-container items-center justify-center active:scale-90"
          >
            <MaterialCommunityIcons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={20}
              color={bookmarked ? "#005ab5" : "#717785"}
            />
          </Pressable>
          <View className="flex-row items-center bg-primary/10 px-3 py-1.5 rounded-full">
            <MaterialCommunityIcons name="chart-line" size={16} color="#005ab5" />
            <Text className="ml-1.5 text-sm font-bold text-primary">{progress}%</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        contentContainerClassName="pt-12 pb-32 max-w-4xl self-center w-full px-6"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={500} // Throttle to every 500ms for performance
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
