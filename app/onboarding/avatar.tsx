import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AVATAR_OPTIONS, setOnboardingComplete, setUserAvatar, type AvatarOption } from '@/lib/storage';

const AVATAR_ICONS: Record<string, string> = {
  fox: 'firefox',
  cat: 'cat',
  dog: 'dog',
  panda: 'panda',
  penguin: 'penguin',
  rabbit: 'rabbit',
};

export default function OnboardingAvatarScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const handleAvatarSelect = async (avatar: AvatarOption) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedAvatar(avatar.id);
  };

  const handleFinish = async () => {
    if (!selectedAvatar) return;

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setUserAvatar(selectedAvatar);
    setOnboardingComplete();
    router.replace('/(tabs)');
  };

  const renderAvatar = (avatar: AvatarOption) => {
    const isSelected = selectedAvatar === avatar.id;
    const iconName = AVATAR_ICONS[avatar.id] || 'account';

    return (
      <Pressable
        key={avatar.id}
        onPress={() => handleAvatarSelect(avatar)}
        className={`mb-4 h-36 w-[48%] items-center justify-center rounded-3xl border-4 ${
          isSelected ? 'border-primary' : 'border-transparent'
        }`}
        style={{ backgroundColor: avatar.backgroundColor }}
      >
        <MaterialCommunityIcons
          name={iconName as any}
          size={56}
          color={avatar.color}
        />
        {isSelected && (
          <View className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full bg-primary">
            <MaterialCommunityIcons name="check" size={16} color="white" />
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 pt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-primary">Step 2 of 2</Text>
          <View className="flex-row gap-1">
            <View className="h-2 w-8 rounded-full bg-primary" />
            <View className="h-2 w-8 rounded-full bg-primary" />
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-8">
        {/* Icon */}
        <View className="mb-8 h-20 w-20 items-center justify-center rounded-3xl bg-surface-container">
          <MaterialCommunityIcons name="emoticon-happy-outline" size={48} color="#005ab5" />
        </View>

        {/* Title */}
        <Text className="mb-3 text-3xl font-extrabold tracking-tight text-on-surface">
          Choose your{'\n'}avatar
        </Text>
        <Text className="mb-6 text-base text-on-surface-variant">
          Pick a character that represents you
        </Text>

        {/* Avatar Grid */}
        <View className="flex-row flex-wrap justify-between">
          {AVATAR_OPTIONS.map(renderAvatar)}
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <Pressable
          onPress={handleFinish}
          disabled={!selectedAvatar}
          className={`rounded-2xl py-4 ${
            selectedAvatar ? 'bg-primary' : 'bg-surface-container-high'
          }`}
        >
          <Text
            className={`text-center text-lg font-semibold ${
              selectedAvatar ? 'text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
