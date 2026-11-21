// src/tw/index.jsx

import { useCssElement } from "react-native-css";
import { View as RNView, Text as RNText, Pressable as RNPressable, TextInput as RNTextInput, ScrollView as RNScrollView,  ActivityIndicator as RNActivityIndicator } from "react-native";

export const View = (props) => useCssElement(RNView, props, { className: "style" });
export const Text = (props) => useCssElement(RNText, props, { className: "style" });
export const Pressable = (props) => useCssElement(RNPressable, props, { className: "style" });
export const TextInput = (props) => useCssElement(RNTextInput, props, { className: "style" });
export const ScrollView = (props) => useCssElement(RNScrollView, props, { className: "style", contentContainerClassName: "contentContainerStyle" });
export const ActivityIndicator = (props) => useCssElement(RNActivityIndicator, props, { className: "style" });