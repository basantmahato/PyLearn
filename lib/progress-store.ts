import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Types
export type QuizResult = {
  chapterId: string;
  setId: string;
  score: number;
  total: number;
  percentage: number;
  date: string; // ISO date
  passed: boolean;
};

type StreakData = {
  current: number;
  longest: number;
  lastActiveDate: string | null; // ISO date
};

type ProgressStore = {
  // Chapter progress (0-100 percentage per chapter)
  chapterProgress: Record<string, number>;
  // Completed chapters (100% progress)
  completedChapters: string[];

  // Quiz history
  quizHistory: QuizResult[];

  // Streak tracking
  streak: StreakData;
  dailyActivity: Record<string, boolean>; // date -> was active

  // Bookmarks
  bookmarkedChapters: string[];

  // Actions
  updateChapterProgress: (chapterId: string, progress: number) => void;
  markChapterComplete: (chapterId: string) => void;
  isChapterCompleted: (chapterId: string) => boolean;
  getChapterProgress: (chapterId: string) => number;

  saveQuizResult: (result: QuizResult) => void;
  getQuizHistory: () => QuizResult[];
  getBestQuizScore: (chapterId: string, setId: string) => number | null;
  hasPassedQuiz: (chapterId: string, setId: string) => boolean;

  checkIn: () => void;
  getStreak: () => number;
  getLongestStreak: () => number;
  isStreakAtRisk: () => boolean;

  toggleBookmark: (chapterId: string) => void;
  isBookmarked: (chapterId: string) => boolean;
  getBookmarkedChapters: () => string[];

  getOverallProgress: () => number;
  getTotalChaptersCompleted: () => number;
  getTotalQuizzesTaken: () => number;
  getAverageQuizScore: () => number;

  resetAllProgress: () => void;
};

// SecureStore adapter
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

// Helper functions for date operations
const getToday = (): string => {
  return new Date().toISOString().split("T")[0];
};

const getYesterday = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
};

const isSameDay = (date1: string, date2: string): boolean => {
  return date1 === date2;
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      // Initial state
      chapterProgress: {},
      completedChapters: [] as string[],
      quizHistory: [] as QuizResult[],
      streak: {
        current: 0,
        longest: 0,
        lastActiveDate: null,
      },
      dailyActivity: {},
      bookmarkedChapters: [] as string[],

      // Chapter progress actions
      updateChapterProgress: (chapterId: string, progress: number) => {
        const clampedProgress = Math.min(100, Math.max(0, progress));
        set((state) => ({
          chapterProgress: {
            ...state.chapterProgress,
            [chapterId]: clampedProgress,
          },
        }));

        // Auto-mark as completed if 100%
        if (clampedProgress >= 100) {
          get().markChapterComplete(chapterId);
        }
      },

      markChapterComplete: (chapterId: string) => {
        set((state) => {
          if (state.completedChapters.includes(chapterId)) {
            return state;
          }
          return {
            completedChapters: [...state.completedChapters, chapterId],
            chapterProgress: {
              ...state.chapterProgress,
              [chapterId]: 100,
            },
          };
        });
      },

      isChapterCompleted: (chapterId: string) => {
        return get().completedChapters.includes(chapterId);
      },

      getChapterProgress: (chapterId: string) => {
        return get().chapterProgress[chapterId] || 0;
      },

      // Quiz actions
      saveQuizResult: (result: QuizResult) => {
        set((state) => ({
          quizHistory: [...state.quizHistory, result],
        }));
        // Check in for streak when completing a quiz
        get().checkIn();
      },

      getQuizHistory: () => {
        return get().quizHistory;
      },

      getBestQuizScore: (chapterId: string, setId: string) => {
        const results = get().quizHistory.filter(
          (r) => r.chapterId === chapterId && r.setId === setId
        );
        if (results.length === 0) return null;
        return Math.max(...results.map((r) => r.percentage));
      },

      hasPassedQuiz: (chapterId: string, setId: string) => {
        return get().quizHistory.some(
          (r) =>
            r.chapterId === chapterId && r.setId === setId && r.passed
        );
      },

      // Streak actions
      checkIn: () => {
        const today = getToday();
        const { streak, dailyActivity } = get();

        // Already checked in today
        if (dailyActivity[today]) {
          return;
        }

        const yesterday = getYesterday();
        let newStreak = 1;

        if (streak.lastActiveDate && isSameDay(streak.lastActiveDate, yesterday)) {
          // Consecutive day
          newStreak = streak.current + 1;
        }

        const newLongest = Math.max(streak.longest, newStreak);

        set((state) => ({
          streak: {
            current: newStreak,
            longest: newLongest,
            lastActiveDate: today,
          },
          dailyActivity: {
            ...state.dailyActivity,
            [today]: true,
          },
        }));
      },

      getStreak: () => get().streak.current,

      getLongestStreak: () => get().streak.longest,

      isStreakAtRisk: () => {
        const { streak } = get();
        if (streak.current === 0) return false;

        const today = getToday();
        const yesterday = getYesterday();

        // If active today, not at risk
        if (streak.lastActiveDate === today) return false;

        // If active yesterday, not at risk
        if (streak.lastActiveDate === yesterday) return false;

        // Streak broken
        return true;
      },

      // Bookmark actions
      toggleBookmark: (chapterId: string) => {
        set((state) => {
          const isBookmarked = state.bookmarkedChapters.includes(chapterId);
          if (isBookmarked) {
            return {
              bookmarkedChapters: state.bookmarkedChapters.filter(
                (id) => id !== chapterId
              ),
            };
          }
          return {
            bookmarkedChapters: [...state.bookmarkedChapters, chapterId],
          };
        });
      },

      isBookmarked: (chapterId: string) => {
        return get().bookmarkedChapters.includes(chapterId);
      },

      getBookmarkedChapters: () => get().bookmarkedChapters,

      // Stats
      getOverallProgress: () => {
        const totalChapters = 11; // Total CBSE Python chapters
        const completed = get().completedChapters.length;
        return Math.round((completed / totalChapters) * 100);
      },

      getTotalChaptersCompleted: () => {
        return get().completedChapters.length;
      },

      getTotalQuizzesTaken: () => {
        return get().quizHistory.length;
      },

      getAverageQuizScore: () => {
        const history = get().quizHistory;
        if (history.length === 0) return 0;
        const sum = history.reduce((acc, r) => acc + r.percentage, 0);
        return Math.round(sum / history.length);
      },

      // Reset
      resetAllProgress: () => {
        set({
          chapterProgress: {},
          completedChapters: [],
          quizHistory: [],
          streak: {
            current: 0,
            longest: 0,
            lastActiveDate: null,
          },
          dailyActivity: {},
          bookmarkedChapters: [],
        });
      },
    }),
    {
      name: "pylearn-progress-storage",
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        // Rehydration complete - no-op for production
      },
    }
  )
);

// Export helper functions for non-hook usage
export function updateChapterProgress(chapterId: string, progress: number): void {
  useProgressStore.getState().updateChapterProgress(chapterId, progress);
}

export function markChapterComplete(chapterId: string): void {
  useProgressStore.getState().markChapterComplete(chapterId);
}

export function saveQuizResult(result: QuizResult): void {
  useProgressStore.getState().saveQuizResult(result);
}

export function checkIn(): void {
  useProgressStore.getState().checkIn();
}

export function toggleBookmark(chapterId: string): void {
  useProgressStore.getState().toggleBookmark(chapterId);
}

export function getOverallProgress(): number {
  return useProgressStore.getState().getOverallProgress();
}
