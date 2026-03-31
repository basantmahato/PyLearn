import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { HOME_STATS } from "@/constants/home";

interface HeaderProps {
  showSearch?: boolean;
  onSearchPress?: () => void;
}

export function Header({ showSearch = false, onSearchPress }: HeaderProps) {
  return (
    <View className="w-full bg-surface/80 border-b border-on-background/5 z-50">
      <View className="max-w-5xl self-center w-full px-6 h-16 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <MaterialCommunityIcons name={"terminal" as any} size={24} color="#005ab5" />
          <Text className="text-xl font-extrabold text-on-surface tracking-tight">PyLearn 12</Text>
        </View>
        <View className="flex-row items-center gap-4">
          {showSearch && (
            <Pressable 
              onPress={onSearchPress}
              className="p-2 rounded-full active:bg-surface-container-high transition-colors"
            >
              <MaterialCommunityIcons name={"magnify" as any} size={24} color="#717785" />
            </Pressable>
          )}
          <View className="w-10 h-10 rounded-full bg-surface-container-high items-center justify-center overflow-hidden border border-outline-variant/20">
            <Image
              source={HOME_STATS.user.profilePhoto}
              className="w-full h-full"
              contentFit="cover"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
