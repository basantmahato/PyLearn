import { ADS_ENABLED, getAdUnitId } from "@/lib/ads-config";
import { Text, View } from "react-native";

// Only import if native module is available (requires custom dev build)
let BannerAd: any;
let BannerAdSize: any;

try {
  const ads = require("react-native-google-mobile-ads");
  BannerAd = ads.BannerAd;
  BannerAdSize = ads.BannerAdSize;
} catch {
  // Module not available in Expo Go
}

export function AdBanner() {
  // Ads disabled via feature flag
  if (!ADS_ENABLED) {
    return null;
  }

  // Automatically use test ads in development, production ads in release
  const adUnitId = getAdUnitId("banner", !__DEV__);

  if (!BannerAd) {
    return (
      <View className="mt-12 w-full bg-surface-container rounded-2xl p-4 border-2 border-dashed border-outline-variant/30">
        <Text className="text-on-surface-variant text-center text-sm">
          Ads require custom build: npx expo run:android
        </Text>
      </View>
    );
  }

  return (
    <View className="mt-12 w-full bg-surface-container rounded-2xl overflow-hidden border-2 border-dashed border-outline-variant/30">
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
