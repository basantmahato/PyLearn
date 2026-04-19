import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { AVATAR_OPTIONS, useUserStore } from "@/lib/storage";

// Map avatar IDs to valid MaterialCommunityIcons names
const AVATAR_ICON_MAP: Record<string, string> = {
  fox: "paw",
  cat: "cat",
  dog: "dog",
  panda: "bear",
  penguin: "duck",
  rabbit: "rabbit",
};

interface HeaderProps {
  showSearch?: boolean;
  onSearchPress?: () => void;
}

export function Header({ showSearch = false, onSearchPress }: HeaderProps) {
  const avatar = useUserStore((state) => state.userAvatar);
  const avatarOption = AVATAR_OPTIONS.find((a) => a.id === avatar);
  const avatarIcon = avatar ? (AVATAR_ICON_MAP[avatar] || "account") : "account";

  return (
    <View className="w-full bg-surface/80 border-b border-on-background/5 z-50">
      <View className="max-w-5xl self-center w-full px-6 h-16 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <MaterialCommunityIcons name="code-braces" size={24} color="#005ab5" />
          <Text className="text-xl font-extrabold text-on-surface tracking-tight">PyLearn 12</Text>
        </View>
        <View className="flex-row items-center gap-4">
          {showSearch && (
            <Pressable 
              onPress={onSearchPress}
              className="p-2 rounded-full active:bg-surface-container-high transition-colors"
              accessibilityLabel="Search"
              accessibilityHint="Tap to search for chapters"
              accessibilityRole="button"
            >
              <MaterialCommunityIcons name="magnify" size={24} color="#717785" />
            </Pressable>
          )}
          <View 
            className="w-10 h-10 rounded-full items-center justify-center overflow-hidden border border-outline-variant/20"
            style={{
              backgroundColor: avatarOption?.backgroundColor || "#f5f3ff",
            }}
            accessibilityLabel="Profile"
            accessibilityRole="image"
          >
            <MaterialCommunityIcons
              name={avatarIcon as any}
              size={22}
              color={avatarOption?.color || "#8b5cf6"}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
