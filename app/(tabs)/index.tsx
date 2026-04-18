import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BentoCard } from "@/components/home/BentoCard";
import { Greeting } from "@/components/home/Greeting";
import { ProgressHero } from "@/components/home/ProgressHero";
import { Header } from "@/components/ui/Header";
import { BENTO_CARDS } from "@/constants/home";
import { useProgressStore } from "@/lib/progress-store";

function DynamicBentoCard({ card }: { card: typeof BENTO_CARDS[0] }) {
  const overallProgress = useProgressStore((s) => s.getOverallProgress());
  const averageQuizScore = useProgressStore((s) => s.getAverageQuizScore());
  const totalQuizzesTaken = useProgressStore((s) => s.getTotalQuizzesTaken());
  const samplePapersProgress = useProgressStore((s) => s.getSamplePapersProgress());
  const overallAppProgress = useProgressStore((s) => s.getOverallAppProgress());

  let progress = card.progress;
  let tag = card.tag;

  if (card.title === "Notes") {
    progress = overallProgress;
    tag = `${progress}% Read`;
  } else if (card.title === "Quiz") {
    progress = totalQuizzesTaken > 0 ? averageQuizScore : 0;
    tag = `${progress}% Score`;
  } else if (card.title === "Sample Papers") {
    progress = samplePapersProgress;
    tag = `${progress}% Done`;
  } else if (card.title === "Profile") {
    progress = overallAppProgress;
    tag = `${progress}% Done`;
  }

  return <BentoCard {...card} progress={progress} tag={tag} />;
}

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      {/* Header Content */}
      <Header />

      <ScrollView
        contentContainerClassName="pb-32 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting & Streak */}
        <Greeting />

        {/* Hero Progress Section */}
        <ProgressHero />

        {/* Action Bento Grid */}
        <View className="flex-row flex-wrap gap-4">
          {BENTO_CARDS.map((card, index) => (
            <DynamicBentoCard key={index} card={card} />
          ))}
        </View>

        {/* Extra padding at bottom */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
