import React, { useState, useRef, useEffect } from "react";
import { Keyboard } from "react-native";

/**
 * Returns if the keyboard is open / closed
 * 
 * @return {bool} isOpen
 */
export function useKeyboardStatus() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef({})

    useEffect(() => {
        ref.current.keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
        ref.current.keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => setIsOpen(false));
        return () => {
            if (ref.current.keyboardShowListener)
                ref.current.keyboardShowListener.remove();
            if (ref.current.keyboardHideListener)
                ref.current.keyboardHideListener.remove();
        }
    })

    return isOpen;
}