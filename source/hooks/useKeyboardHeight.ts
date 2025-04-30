import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onKeyboardDidShow = (event: KeyboardEvent) => {
      setKeyboardHeight(event.endCoordinates.height);
    };

    const onKeyboardDidHide = () => {
      setKeyboardHeight(0);
    };

    const showListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const hideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboardHeight;
}
