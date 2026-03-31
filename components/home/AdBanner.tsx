import { View, Text } from "react-native";

export function AdBanner() {
  return (
    <View className="mt-12 w-full bg-surface-container rounded-2xl p-6 items-center justify-center border-2 border-dashed border-outline-variant/30">
      <Text className="text-[10px] font-bold tracking-widest text-outline uppercase mb-4">Sponsored</Text>
      <View className="h-24 items-center justify-center">
         <Text className="text-on-surface-variant/40 italic font-medium">AdMob Banner Content</Text>
      </View>
    </View>
  );
}
