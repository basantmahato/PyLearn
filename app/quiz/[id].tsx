import React, { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";

// Import all quiz data
import ch1Data from "@/data/quiz/ch1.json";
import ch2Data from "@/data/quiz/ch2.json";
import ch3Data from "@/data/quiz/ch3.json";
import ch4Data from "@/data/quiz/ch4.json";
import ch5Data from "@/data/quiz/ch5.json";
import ch6Data from "@/data/quiz/ch6.json";
import ch7Data from "@/data/quiz/ch7.json";
import ch8Data from "@/data/quiz/ch8.json";
import ch9Data from "@/data/quiz/ch9.json";
import ch10Data from "@/data/quiz/ch10.json";
import ch11Data from "@/data/quiz/ch11.json";

const QUIZ_REGISTRY: Record<string, any> = {
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

const { width } = Dimensions.get("window");

export default function QuizPlayerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Parse ID: "chapterId_setId" e.g. "1_s1"
  const [chapterId, setId] = (id as string).split("_");
  
  const quizData = useMemo(() => {
    const chapter = QUIZ_REGISTRY[chapterId];
    if (!chapter) return null;
    return chapter.sets.find((s: any) => s.setId === setId);
  }, [chapterId, setId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!quizData) {
    return (
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-xl font-bold text-on-surface">Quiz Not Found</Text>
        <Pressable onPress={() => router.back()} className="mt-4 bg-primary px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const currentQuestion = quizData.questions[currentIndex];
  const totalQuestions = quizData.questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleOptionPress = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentQuestion.answer;
    if (correct) setScore(score + 1);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 70;

    return (
      <SafeAreaView className="flex-1 bg-background p-6 items-center justify-center">
        <StatusBar style="dark" />
        <Animated.View entering={FadeInDown.duration(600)} className="items-center w-full">
          <View className={`w-32 h-32 rounded-full items-center justify-center mb-8 ${isPassed ? 'bg-primary/10' : 'bg-error/10'}`}>
            <MaterialCommunityIcons 
              name={isPassed ? "trophy" : "alert-circle"} 
              size={64} 
              color={isPassed ? "#005ab5" : "#ba1a1a"} 
            />
          </View>
          
          <Text className="text-4xl font-black text-on-surface tracking-tighter text-center">
            {isPassed ? "Great Job!" : "Keep Learning"}
          </Text>
          
          <View className="bg-surface-container-low w-full rounded-3xl p-8 mt-8 border border-outline-variant/10">
            <View className="flex-row justify-between mb-4">
              <Text className="text-on-surface-variant font-medium">Score</Text>
              <Text className="text-on-surface font-bold">{score} / {totalQuestions}</Text>
            </View>
            <View className="flex-row justify-between mb-6">
              <Text className="text-on-surface-variant font-medium">Accuracy</Text>
              <Text className="text-on-surface font-bold">{percentage}%</Text>
            </View>
            <View className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
               <View className={`h-full rounded-full ${isPassed ? 'bg-primary' : 'bg-error'}`} style={{ width: `${percentage}%` }} />
            </View>
          </View>

          <View className="flex-row gap-4 mt-12 w-full">
            <Pressable 
              onPress={handleRetry}
              className="flex-1 bg-surface-container-high py-5 rounded-2xl border border-outline-variant/20 active:opacity-80"
            >
              <Text className="text-on-surface font-bold text-center">Retry</Text>
            </Pressable>
            <Pressable 
              onPress={() => router.replace("/(tabs)/quiz")}
              className="flex-1 bg-primary py-5 rounded-2xl active:opacity-80 shadow-sm"
            >
              <Text className="text-white font-bold text-center">Finish</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />
      
      {/* Header & Progress */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <MaterialCommunityIcons name="close" size={24} color="#111c2d" />
        </Pressable>
        <View className="flex-1 h-2 bg-surface-container-highest mx-4 rounded-full overflow-hidden">
           <Animated.View 
             layout={Layout.springify()}
             className="h-full bg-primary rounded-full" 
             style={{ width: `${progress}%` }} 
           />
        </View>
        <Text className="text-xs font-bold text-on-surface-variant w-10 text-right">
          {currentIndex + 1}/{totalQuestions}
        </Text>
      </View>

      <ScrollView contentContainerClassName="px-6 py-8 flex-grow">
        {/* Question Area */}
        <Animated.View key={currentIndex} entering={FadeIn.duration(400)}>
          <Text className="text-2xl font-bold text-on-surface leading-8 mb-10">
            {currentQuestion.question}
          </Text>

          {/* Options Grid */}
          <View className="gap-4">
            {currentQuestion.options.map((option: string, index: number) => {
              const isSelected = selectedOption === index;
              const isCorrect = isAnswered && index === currentQuestion.answer;
              const isWrong = isAnswered && isSelected && index !== currentQuestion.answer;

              return (
                <Pressable
                  key={index}
                  onPress={() => handleOptionPress(index)}
                  disabled={isAnswered}
                  className={`p-5 rounded-2xl border-2 transition-all min-h-[72px] justify-center
                    ${isSelected ? "border-primary bg-primary/5" : "border-outline-variant/20 bg-surface-container-low"}
                    ${isCorrect ? "border-primary bg-primary/10" : ""}
                    ${isWrong ? "border-error bg-error/5" : ""}
                  `}
                >
                  <View className="flex-row items-center">
                    <View className={`w-8 h-8 rounded-full items-center justify-center mr-4 border
                      ${isSelected ? "bg-primary border-primary" : "border-outline-variant/40"}
                      ${isCorrect ? "bg-primary border-primary" : ""}
                      ${isWrong ? "bg-error border-error" : ""}
                    `}>
                      {isAnswered && (isCorrect || isWrong) ? (
                        <MaterialCommunityIcons 
                          name={isCorrect ? "check" : "close"} 
                          size={16} 
                          color="white" 
                        />
                      ) : (
                        <Text className={`text-sm font-bold ${isSelected ? "text-white" : "text-on-surface-variant"}`}>
                          {String.fromCharCode(65 + index)}
                        </Text>
                      )}
                    </View>
                    <Text className={`text-base flex-1 ${isSelected ? "font-bold text-on-surface" : "text-on-surface"}`}>
                      {option}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Pedagogy Explanation */}
          {isAnswered && (
            <Animated.View 
              entering={FadeInDown.duration(400)}
              className="mt-8 p-6 rounded-2xl bg-surface-container-high border-l-4 border-primary"
            >
              <Text className="text-xs font-black text-primary uppercase tracking-widest mb-1">
                Insight
              </Text>
              <Text className="text-on-surface-variant leading-5">
                {currentQuestion.explanation}
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Action Footer */}
      <View className="px-6 pb-8 pt-4 border-t border-outline-variant/10">
        {!isAnswered ? (
          <Pressable
            disabled={selectedOption === null}
            onPress={handleCheck}
            className={`w-full py-5 rounded-2xl items-center justify-center shadow-sm
              ${selectedOption === null ? "bg-surface-container-highest opacity-50" : "bg-primary"}
            `}
          >
            <Text className={`font-bold text-lg ${selectedOption === null ? "text-on-surface-variant" : "text-white"}`}>
              Check Answer
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleNext}
            className="w-full py-5 rounded-2xl bg-inverse-surface items-center justify-center shadow-lg"
          >
            <Text className="text-white font-black text-lg">
              {currentIndex < totalQuestions - 1 ? "Next Question" : "View Results"}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
