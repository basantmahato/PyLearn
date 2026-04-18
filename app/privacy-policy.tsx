import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-outline-variant/10">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111c2d" />
        </Pressable>
        <Text className="text-xl font-bold text-on-surface ml-2">Privacy Policy</Text>
      </View>

      <ScrollView contentContainerClassName="p-6" showsVerticalScrollIndicator={false}>
        <Text className="text-sm text-on-surface-variant mb-6">
          Last updated: April 18, 2026
        </Text>

        <Section title="Introduction">
          PyLearn ("we", "our", or "us") is committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your information
          when you use our educational app.
        </Section>

        <Section title="Information We Collect">
          <Bullet text="Profile Information: Your name and chosen avatar for personalization." />
          <Bullet text="Progress Data: Chapter completion status, quiz scores, and learning streaks." />
          <Bullet text="App Usage: Anonymous analytics to improve the learning experience." />
          <Bullet text="Device Info: Basic device information for app optimization." />
        </Section>

        <Section title="How We Use Your Information">
          <Bullet text="Track your learning progress and quiz performance." />
          <Bullet text="Personalize your experience with your profile." />
          <Bullet text="Maintain your learning streak and achievements." />
          <Bullet text="Improve app features and content quality." />
        </Section>

        <Section title="Data Storage">
          All your learning data is stored locally on your device using secure storage.
          We do not upload your personal learning data to external servers. Your
          progress remains private to your device.
        </Section>

        <Section title="Third-Party Services">
          We may use third-party services for analytics and crash reporting. These
          services collect anonymous usage data only and do not identify you
          personally.
        </Section>

        <Section title="Data Security">
          We implement appropriate security measures to protect your information.
          However, no method of electronic storage is 100% secure. We strive to use
          commercially acceptable means to protect your personal data.
        </Section>

        <Section title="Children's Privacy">
          PyLearn is designed for students of all ages. We do not knowingly collect
          personal information from children under 13. If you are a parent or guardian
          and believe your child has provided us with personal information, please
          contact us.
        </Section>

        <Section title="Changes to This Policy">
          We may update our Privacy Policy from time to time. We will notify you of
          any changes by posting the new Privacy Policy on this page and updating
          the "Last updated" date.
        </Section>

        <Section title="Contact Us">
          If you have any questions or suggestions about our Privacy Policy, please
          contact us at support@pylearn.app.
        </Section>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-on-surface mb-3">{title}</Text>
      <Text className="text-base text-on-surface-variant leading-6">{children}</Text>
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View className="flex-row mb-2">
      <Text className="text-on-surface-variant mr-2">•</Text>
      <Text className="text-base text-on-surface-variant leading-6 flex-1">{text}</Text>
    </View>
  );
}
