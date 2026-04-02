import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AvatarOption = {
  id: string;
  icon: string;
  color: string;
  backgroundColor: string;
};

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "fox", icon: "fox", color: "#f97316", backgroundColor: "#fff7ed" },
  { id: "cat", icon: "cat", color: "#8b5cf6", backgroundColor: "#f5f3ff" },
  { id: "dog", icon: "dog", color: "#3b82f6", backgroundColor: "#eff6ff" },
  { id: "panda", icon: "panda", color: "#10b981", backgroundColor: "#ecfdf5" },
  {
    id: "penguin",
    icon: "penguin",
    color: "#06b6d4",
    backgroundColor: "#ecfeff",
  },
  {
    id: "rabbit",
    icon: "rabbit",
    color: "#f43f5e",
    backgroundColor: "#fff1f2",
  },
];

type UserProfileStore = {
  onboardingComplete: boolean;
  userName: string | null;
  userAvatar: string | null;

  setOnboardingComplete: () => void;
  setUserName: (name: string) => void;
  setUserAvatar: (avatarId: string) => void;
  resetOnboarding: () => void;
};

// SecureStore adapter for Zustand persist middleware
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch {
      // Silent fail
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch {
      // Silent fail
    }
  },
};

export const useUserStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      onboardingComplete: false,
      userName: null,
      userAvatar: null,

      setOnboardingComplete: () => set({ onboardingComplete: true }),
      setUserName: (name) => set({ userName: name }),
      setUserAvatar: (avatarId) => set({ userAvatar: avatarId }),
      resetOnboarding: () =>
        set({ onboardingComplete: false, userName: null, userAvatar: null }),
    }),
    {
      name: "pylearn-user-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        onboardingComplete: state.onboardingComplete,
        userName: state.userName,
        userAvatar: state.userAvatar,
      }),
    },
  ),
);

// Helper functions for non-hook usage (in _layout.tsx and storage.ts consumers)
export function isOnboardingComplete(): boolean {
  return useUserStore.getState().onboardingComplete;
}

export function setOnboardingComplete(): void {
  useUserStore.getState().setOnboardingComplete();
}

export function getUserName(): string | null {
  return useUserStore.getState().userName;
}

export function setUserName(name: string): void {
  useUserStore.getState().setUserName(name);
}

export function getUserAvatar(): string | null {
  return useUserStore.getState().userAvatar;
}

export function setUserAvatar(avatarId: string): void {
  useUserStore.getState().setUserAvatar(avatarId);
}

export function getUserProfile(): {
  name: string | null;
  avatar: string | null;
} {
  const state = useUserStore.getState();
  return { name: state.userName, avatar: state.userAvatar };
}

export function resetOnboarding(): void {
  useUserStore.getState().resetOnboarding();
}
