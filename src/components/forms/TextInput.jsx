import { View, Text, TextInput as RNTextInput } from "../../tw";
import { useState } from "react";

export default function TextInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helper,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  className = "",
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  const borderClass = error
    ? "border-error"
    : focused
    ? "border-primary"
    : "border-border";

  const ringStyle = focused && !error
    ? { borderWidth: 1, borderColor: "#056DB3" }
    : {};

  return (
    <View className={`w-full ${className}`}>
      {label ? (
        <Text className="text-[14px] font-semibold text-text-secondary mb-[6px]">
          {label}
        </Text>
      ) : null}

      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[
          "h-[52px] rounded-[10px] px-[14px] text-[15px] text-text-primary bg-surface border",
          borderClass,
        ].join(" ")}
        style={[{ minHeight: 44 }, ringStyle]}
        {...rest}
      />

      {error ? (
        <Text className="text-[12px] text-error mt-[4px]">{error}</Text>
      ) : helper ? (
        <Text className="text-[12px] text-text-muted mt-[4px]">{helper}</Text>
      ) : null}
    </View>
  );
}