import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { setUserName } from '@/lib/storage';

export default function OnboardingNameScreen() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

  const isValidName = name.trim().length >= 2;

  const handleContinue = async () => {
    if (!isValidName) {
      setError('Please enter at least 2 characters');
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setUserName(name.trim());
    router.push('/onboarding/avatar');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-6 pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-primary">Step 1 of 2</Text>
            <View className="flex-row gap-1">
              <View className="h-2 w-8 rounded-full bg-primary" />
              <View className="h-2 w-8 rounded-full bg-surface-container-high" />
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 pt-12">
          {/* Icon */}
          <View className="mb-8 h-20 w-20 items-center justify-center rounded-3xl bg-surface-container">
            <MaterialCommunityIcons name="account-circle" size={48} color="#005ab5" />
          </View>

          {/* Title */}
          <Text className="mb-3 text-3xl font-extrabold tracking-tight text-on-surface">
            What should we{'\n'}call you?
          </Text>
          <Text className="mb-8 text-base text-on-surface-variant">
            This is how you'll appear in the app
          </Text>

          {/* Input */}
          <View className="mb-4">
            <View className="flex-row items-center gap-3 rounded-2xl bg-surface-container px-4 py-4">
              <MaterialCommunityIcons name="account" size={24} color="#717785" />
              <TextInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError('');
                }}
                placeholder="Enter your name"
                placeholderTextColor="#717785"
                className="flex-1 text-lg font-medium text-on-surface"
                autoFocus
                maxLength={30}
                autoCapitalize="words"
              />
              {name.length > 0 && (
                <Pressable onPress={() => setName('')}>
                  <MaterialCommunityIcons name="close-circle" size={20} color="#717785" />
                </Pressable>
              )}
            </View>
            {error ? (
              <Text className="mt-2 text-sm text-error">{error}</Text>
            ) : null}
          </View>

          <Text className="text-sm text-on-surface-variant">
            {name.length}/30 characters
          </Text>
        </View>

        {/* Footer */}
        <View className="px-6 pt-4" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <Pressable
            onPress={handleContinue}
            disabled={!isValidName}
            className={`rounded-2xl py-4 ${
              isValidName ? 'bg-primary' : 'bg-surface-container-high'
            }`}
          >
            <Text
              className={`text-center text-lg font-semibold ${
                isValidName ? 'text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
