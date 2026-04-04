import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { Header } from "@/components/ui/Header";
import { UNITS } from "@/constants/chapters";
import { useProgressStore } from "@/lib/progress-store";
import { AVATAR_OPTIONS, getUserProfile } from "@/lib/storage";

const AVATAR_ICONS: Record<string, string> = {
  fox: "paw",
  cat: "cat",
  dog: "dog",
  panda: "bear",
  penguin: "duck",
  rabbit: "rabbit",
};

function StatCard({
  icon,
  label,
  value,
  color = "#005ab5",
}: {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <View className="bg-surface-container-low rounded-2xl p-4 flex-1 items-center border border-outline-variant/10">
      <View
        className="w-10 h-10 rounded-full items-center justify-center mb-2"
        style={{ backgroundColor: `${color}15` }}
      >
        <MaterialCommunityIcons name={icon as any} size={20} color={color} />
      </View>
      <Text className="text-2xl font-black text-on-surface">{value}</Text>
      <Text className="text-xs text-on-surface-variant mt-1">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { name, avatar } = getUserProfile();
  const avatarOption = AVATAR_OPTIONS.find((a) => a.id === avatar);

  const {
    getOverallProgress,
    getTotalChaptersCompleted,
    getTotalQuizzesTaken,
    getAverageQuizScore,
    getStreak,
    getLongestStreak,
    isStreakAtRisk,
    getQuizHistory,
    getBookmarkedChapters,
  } = useProgressStore();

  const progress = getOverallProgress();
  const completed = getTotalChaptersCompleted();
  const quizzesTaken = getTotalQuizzesTaken();
  const avgScore = getAverageQuizScore();
  const streak = getStreak();
  const longestStreak = getLongestStreak();
  const streakAtRisk = isStreakAtRisk();
  const recentQuizzes = getQuizHistory().slice(-5).reverse();
  const bookmarkedIds = getBookmarkedChapters();

  // Get chapter details from bookmarked IDs
  const allChapters = UNITS.flatMap((u) => u.chapters);
  const bookmarkedChapters = bookmarkedIds
    .map((id) => allChapters.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />
      <Header />

      <ScrollView
        contentContainerClassName="pb-32 px-6 pt-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-4"
            style={{
              backgroundColor: avatarOption?.backgroundColor || "#f5f3ff",
            }}
          >
            <MaterialCommunityIcons
              name={(avatar ? (AVATAR_ICONS[avatar] as any) : "account")}
              size={48}
              color={avatarOption?.color || "#8b5cf6"}
            />
          </View>
          <Text className="text-2xl font-black text-on-surface">{name || "Learner"}</Text>
          <Text className="text-on-surface-variant mt-1">Python Student</Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 mb-6">
          <StatCard
            icon="book-open-variant"
            label="Completed"
            value={`${completed}/11`}
            color="#005ab5"
          />
          <StatCard
            icon="chart-line"
            label="Progress"
            value={`${progress}%`}
            color="#10b981"
          />
        </View>

        <View className="flex-row gap-3 mb-6">
          <StatCard
            icon="help-circle"
            label="Quizzes"
            value={quizzesTaken}
            color="#f59e0b"
          />
          <StatCard
            icon="trophy"
            label="Avg Score"
            value={`${avgScore}%`}
            color="#8b5cf6"
          />
        </View>

        {/* Streak Section */}
        <View
          className={`rounded-2xl p-6 mb-6 ${
            streakAtRisk ? "bg-error/10 border border-error/20" : "bg-primary/5 border border-primary/10"
          }`}
        >
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="fire"
                size={24}
                color={streakAtRisk ? "#ba1a1a" : "#005ab5"}
              />
              <Text className="text-lg font-bold text-on-surface">
                {streakAtRisk ? "Streak at Risk!" : "Current Streak"}
              </Text>
            </View>
            <Text className="text-3xl font-black text-on-surface">{streak}</Text>
          </View>
          <Text className="text-on-surface-variant text-sm">
            {streakAtRisk
              ? "You missed yesterday! Complete a chapter or quiz today to start a new streak."
              : `Longest streak: ${longestStreak} days. Keep it up!`}
          </Text>
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-on-surface mb-4">Recent Activity</Text>
          {recentQuizzes.length === 0 ? (
            <View className="bg-surface-container-low rounded-2xl p-6 items-center">
              <MaterialCommunityIcons name="history" size={32} color="#717785" />
              <Text className="text-on-surface-variant mt-2 text-center">
                No quizzes taken yet. Start learning to see your activity!
              </Text>
            </View>
          ) : (
            recentQuizzes.map((quiz, idx) => (
              <View
                key={idx}
                className="bg-surface-container-low rounded-xl p-4 mb-3 flex-row items-center justify-between border border-outline-variant/10"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      quiz.passed ? "bg-primary/10" : "bg-error/10"
                    }`}
                  >
                    <MaterialCommunityIcons
                      name={quiz.passed ? "check" : "close"}
                      size={20}
                      color={quiz.passed ? "#005ab5" : "#ba1a1a"}
                    />
                  </View>
                  <View>
                    <Text className="font-bold text-on-surface">
                      Chapter {quiz.chapterId} - Set {quiz.setId.slice(1)}
                    </Text>
                    <Text className="text-xs text-on-surface-variant">
                      {new Date(quiz.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-bold text-on-surface">{quiz.percentage}%</Text>
                  <Text className="text-xs text-on-surface-variant">
                    {quiz.score}/{quiz.total}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
        {/* Bookmarked Chapters */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-on-surface mb-4">
            Bookmarked Chapters
          </Text>
          {bookmarkedChapters.length === 0 ? (
            <View className="bg-surface-container-low rounded-2xl p-6 items-center">
              <MaterialCommunityIcons name="bookmark-outline" size={32} color="#717785" />
              <Text className="text-on-surface-variant mt-2 text-center">
                No bookmarks yet. Save chapters while reading to access them quickly!
              </Text>
            </View>
          ) : (
            bookmarkedChapters.map((chapter) => (
              <Pressable
                key={chapter!.id}
                onPress={() => router.push(`/chapter/${chapter!.id}`)}
                className="bg-surface-container-low rounded-xl p-4 mb-3 flex-row items-center border border-outline-variant/10 active:scale-[0.98]"
              >
                <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                  <MaterialCommunityIcons name="bookmark" size={20} color="#005ab5" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-on-surface" numberOfLines={1}>
                    Chapter {chapter!.id}: {chapter!.title}
                  </Text>
                  <Text className="text-xs text-on-surface-variant">
                    Tap to continue reading
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#717785" />
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
