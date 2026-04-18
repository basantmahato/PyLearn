// AdMob Configuration
// Using Google test IDs for development - REPLACE with production IDs before release
// https://developers.google.com/admob/ios/test-ads
// https://developers.google.com/admob/android/test-ads

// Feature flag to enable/disable ads globally
export const ADS_ENABLED = false;

export const ADS_CONFIG = {
  // Test App ID (already in app.json, listed here for reference)
  androidAppId: "ca-app-pub-3940256099942544~3347511713",

  // Test Ad Unit IDs (Android only)
  testIds: {
    // Banner ads
    banner: {
      android: "ca-app-pub-3940256099942544/6300978111",
    },
    // Interstitial ads (full screen)
    interstitial: {
      android: "ca-app-pub-3940256099942544/1033173712",
    },
    // Rewarded ads (user watches for reward)
    rewarded: {
      android: "ca-app-pub-3940256099942544/5224354917",
    },
    // Rewarded interstitial (auto-rewarded without opt-in)
    rewardedInterstitial: {
      android: "ca-app-pub-3940256099942544/5354046379",
    },
    // App open ads
    appOpen: {
      android: "ca-app-pub-3940256099942544/9257395921",
    },
  },

  // Production Ad Unit IDs - Android only (TODO: Replace with your actual AdMob IDs)
  productionIds: {
    banner: {
      android: "ca-app-pub-3538300430043825/2660004309",
    },
    interstitial: {
      android: "ca-app-pub-3538300430043825/4566412106",
    },
    rewarded: {
      android: "ca-app-pub-3538300430043825/2125119005",
    },
    rewardedInterstitial: {
      android: "ca-app-pub-3538300430043825/2786426579",
    },
    appOpen: {
      android: "ca-app-pub-3538300430043825/4566412106",
    },
  },
} as const;

// Helper to get ad unit ID based on environment
export function getAdUnitId(
  type: "banner" | "interstitial" | "rewarded" | "rewardedInterstitial" | "appOpen",
  isProduction = false
): string {
  if (isProduction) {
    return ADS_CONFIG.productionIds[type].android;
  }
  return ADS_CONFIG.testIds[type].android;
}

// Check if using test ads (for debugging)
export function isTestAd(adUnitId: string): boolean {
  return adUnitId.includes("3940256099942544");
}
