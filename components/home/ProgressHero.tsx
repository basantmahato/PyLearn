import { UNITS } from "@/constants/chapters";
import { useProgressStore } from "@/lib/progress-store";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

export function ProgressHero() {
  const router = useRouter();
  const { getOverallProgress, getTotalChaptersCompleted, getChapterProgress } = useProgressStore();
  const progress = getOverallProgress();
  const completed = getTotalChaptersCompleted();
  const totalChapters = 11;
  
  // Find first uncompleted chapter
  const allChapters = UNITS.flatMap((u) => u.chapters);
  const firstUncompleted = allChapters.find((c) => getChapterProgress(c.id) < 100);
  const targetChapterId = firstUncompleted?.id || "1";
  
  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className="bg-primary-container rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-primary/20 mb-8">
      <View className="h-40 justify-between">
        <View>
          <Text className="text-2xl font-bold text-on-primary-container mb-2">Overall Progress</Text>
          <Text className="text-on-primary-container/80 text-sm max-w-[180px]">
            You've completed {completed} of {totalChapters} chapters.
          </Text>
        </View>
        <Pressable
          onPress={() => router.push(`/chapter/${targetChapterId}`)}
          className="bg-surface-container-lowest self-start px-6 py-3 rounded-full shadow-lg active:scale-95"
        >
          <Text className="text-primary font-bold text-sm">Continue Learning</Text>
        </Pressable>
      </View>

      {/* Circular Progress SVG */}
      <View className="absolute right-[-10px] top-1/2 -translate-y-1/2">
        <Svg width="160" height="160" viewBox="0 0 192 192">
          <Circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#000000"
            strokeWidth={strokeWidth}
            fill="transparent"
            opacity="0.1"
          />
          <Circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 96 96)"
          />
        </Svg>
        <View className="absolute inset-0 items-center justify-center">
          <Text className="text-3xl font-black text-white" style={{ color: '#ffffff' }}>{progress}%</Text>
        </View>
      </View>
    </View>
  );
}
