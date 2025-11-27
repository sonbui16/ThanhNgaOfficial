import { useRef, useState, useCallback } from 'react';
import { Animated } from 'react-native';

export function useFadeControls(autoHideDelay = 5000) {
  const opacity = useRef(new Animated.Value(1)).current;
  const [isVisible, setIsVisible] = useState(true);
  const hideTimer = useRef(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => {
      fadeOutControls();
    }, autoHideDelay);
  }, [autoHideDelay, clearHideTimer]);

  const fadeOutControls = useCallback((delay = 0) => {
    clearHideTimer();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      delay,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsVisible(false);
      }
    });
  }, [opacity, clearHideTimer]);

  const fadeInControls = useCallback(() => {
    setIsVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      scheduleHide();
    });
  }, [opacity, scheduleHide]);

  const toggleControls = useCallback(() => {
    opacity.stopAnimation(currentValue => {
      if (currentValue > 0.5) {
        fadeOutControls();
      } else {
        fadeInControls();
      }
    });
  }, [opacity, fadeInControls, fadeOutControls]);

  const onUserInteraction = useCallback(() => {
    if (isVisible) {
      // Nếu đang hiện -> reset timer
      scheduleHide();
    } else {
      // Nếu đang ẩn -> hiện lại
      fadeInControls();
    }
  }, [isVisible, scheduleHide, fadeInControls]);

  return {
    opacity,
    isVisible,
    fadeInControls,
    fadeOutControls,
    toggleControls,
    onUserInteraction,
  };
}
