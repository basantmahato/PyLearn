import { ADS_ENABLED, getAdUnitId } from "@/lib/ads-config";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AdEventType,
  InterstitialAd,
} from "react-native-google-mobile-ads";

interface UseInterstitialAdOptions {
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: Error) => void;
  onAdShown?: () => void;
  onAdDismissed?: () => void;
  onAdFailedToShow?: (error: Error) => void;
}

export function useInterstitialAd(options: UseInterstitialAdOptions = {}) {
  const [loaded, setLoaded] = useState(false);
  const interstitialRef = useRef<InterstitialAd | null>(null);

  // Get ad unit ID only if ads are enabled
  const adUnitId = ADS_ENABLED ? getAdUnitId("interstitial", !__DEV__) : null;

  // Initialize and load the ad
  const loadAd = useCallback(() => {
    if (!adUnitId) return () => {};

    // Create new interstitial ad instance
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    interstitialRef.current = interstitial;

    // Set up event listeners
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
        options.onAdLoaded?.();
      }
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        setLoaded(false);
        options.onAdFailedToLoad?.(error);
      }
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        options.onAdShown?.();
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        options.onAdDismissed?.();
        // Auto-reload for next time
        loadAd();
      }
    );

    // Load the ad
    interstitial.load();

    // Cleanup function
    return () => {
      unsubscribeLoaded();
      unsubscribeError();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, [adUnitId, options.onAdLoaded, options.onAdFailedToLoad, options.onAdShown, options.onAdDismissed]);

  // Initial load
  useEffect(() => {
    if (!adUnitId) return;

    const cleanup = loadAd();
    return () => {
      cleanup?.();
      interstitialRef.current = null;
    };
  }, [loadAd, adUnitId]);

  // Show the ad
  const showAd = useCallback(async () => {
    if (!ADS_ENABLED || !interstitialRef.current || !loaded) {
      options.onAdFailedToShow?.(new Error("Interstitial ad not loaded"));
      return;
    }

    try {
      await interstitialRef.current.show();
    } catch (error) {
      options.onAdFailedToShow?.(error as Error);
      // Try to reload
      loadAd();
    }
  }, [loaded, loadAd, options.onAdFailedToShow]);

  return {
    loaded: ADS_ENABLED ? loaded : false,
    showAd,
    loadAd,
  };
}
