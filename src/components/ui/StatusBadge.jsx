import { Pressable, Text, View, ActivityIndicator } from "../../tw";
import { useState } from "react";

const variantStyles = {
  primary: {
    container: "bg-primary",
    containerPressed: "bg-primary-pressed",
    label: "text-white",
  },
  secondary: {
    container: "bg-transparent border-[1.5px] border-primary",
    containerPressed: "bg-[#E8F3FB]",
    label: "text-primary",
  },
  ghost: {
    container: "bg-transparent",
    containerPressed: "bg-[#F3F4F6]",
    label: "text-primary",
  },
  destructive: {
    container: "bg-error",
    containerPressed: "bg-[#B91C1C]",
    label: "text-white",
  },
};

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
  className = "",
}) {
  const [pressed, setPressed] = useState(false);
  const styles = variantStyles[variant] || variantStyles.primary;
  const isInactive = disabled || loading;

  return (
    <Pressable
      onPress={isInactive ? undefined : onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={isInactive}
      className={[
        "h-[52px] rounded-xl items-center justify-center px-6",
        fullWidth ? "w-full" : "self-start",
        pressed && !isInactive ? styles.containerPressed : styles.container,
        isInactive ? "opacity-50" : "",
        className,
      ].join(" ")}
      style={{ minHeight: 44 }} // touch target guarantee
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" || variant === "destructive" ? "#FFFFFF" : "#056DB3"} />
      ) : (
        <Text className={`text-[15px] font-semibold ${styles.label}`}>{title}</Text>
      )}
    </Pressable>
  );
}