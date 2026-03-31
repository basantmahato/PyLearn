import React, { useState } from "react";
import { ScrollView, View, Text, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { UNITS } from "@/constants/chapters";
import { Header } from "@/components/ui/Header";

// Mock data integration for the dashboard (Actual data is in data/quiz)
const DIFFICULTY_COLORS: Record<number, string> = {
  1: "#005ab5", 2: "#006adc", 3: "#007eea", // Easy
  4: "#b35e00", 5: "#ca6a00", 6: "#e17600", // Medium
  7: "#ba1a1a", 8: "#d32f2f", 9: "#f44336", // Hard
  10: "#111c2d", // Expert
};

export default function QuizScreen() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const handleSetPress = (chapterId: string, setNum: number) => {
    // Navigate to Quiz Player with specific chapter and set
    router.push(`/quiz/${chapterId}_s${setNum}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />
      
      <Header />

      <ScrollView 
        contentContainerClassName="pb-32 px-6 pt-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Quiz Title & Subtitle */}
        <View className="mb-12">
          <Text className="text-4xl font-black text-on-surface tracking-tighter">
            Smart Quiz
          </Text>
          <Text className="text-on-surface-variant text-base mt-2">
            Select a syllabus module and test your Python mastery.
          </Text>
        </View>

        {/* Unit-based Quiz Hub */}
        {UNITS.map((unit) => (
          <View key={unit.id} className="mb-12">
            <View className="flex-row items-center gap-3 mb-6">
              <View className="h-0.5 flex-1 bg-outline-variant/20" />
              <Text className="text-xs font-black text-outline uppercase tracking-[0.3em]">
                {unit.title}
              </Text>
              <View className="h-0.5 w-8 bg-outline-variant/20" />
            </View>

            <View className="flex-row flex-wrap gap-4">
              {unit.chapters.map((chapter) => (
                <View 
                  key={chapter.id} 
                  className={`w-full ${unit.columns === 3 ? "md:w-[31.5%]" : "md:w-[48%]"} mb-2`}
                >
                  <Pressable 
                    onPress={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
                    className={`bg-surface-container-low p-6 rounded-[32px] border border-outline-variant/10 shadow-sm active:scale-[0.98] transition-all`}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-lg font-bold text-on-surface flex-1" numberOfLines={1}>
                        {chapter.title}
                      </Text>
                      <MaterialCommunityIcons 
                        name={selectedChapter === chapter.id ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color="#717785" 
                      />
                    </View>
                    
                    <Text className="text-xs text-on-surface-variant opacity-60">
                      Module {chapter.id} • 10 Performance Sets
                    </Text>
                    
                    {/* Expandable Set Selection */}
                    {selectedChapter === chapter.id && (
                      <View className="flex-row flex-wrap gap-2 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((setNum) => (
                          <Pressable
                            key={setNum}
                            onPress={() => handleSetPress(chapter.id, setNum)}
                            className="w-[48%] py-3 items-center justify-center rounded-2xl bg-surface-container-high border border-outline-variant/10 active:bg-primary/5"
                          >
                            <Text 
                              className="text-[10px] font-black uppercase tracking-widest" 
                              style={{ color: DIFFICULTY_COLORS[setNum] }}
                            >
                              SET {setNum}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Global Stats or Streak Section Placeholder */}
        <View className="bg-primary/5 p-8 rounded-[40px] border border-primary/10 items-center">
           <MaterialCommunityIcons name="trophy-outline" size={32} color="#005ab5" />
           <Text className="text-xl font-bold text-on-surface mt-4">Daily Challenge</Text>
           <Text className="text-on-surface-variant text-center mt-2">
             Complete one set from every unit to maintain your 12-day streak!
           </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
