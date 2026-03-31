import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { Header } from "@/components/ui/Header";
import { Greeting } from "@/components/home/Greeting";
import { ProgressHero } from "@/components/home/ProgressHero";
import { BentoCard } from "@/components/home/BentoCard";
import { AdBanner } from "@/components/home/AdBanner";
import { BENTO_CARDS } from "@/constants/home";

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
            <BentoCard key={index} {...card} />
          ))}
        </View>

        {/* Ad Placeholder */}
        <AdBanner />
      </ScrollView>
    </SafeAreaView>
  );
}
