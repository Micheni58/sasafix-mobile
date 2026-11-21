import { View, Text, ScrollView } from "../../tw";
import { useState } from "react";
import { router } from "expo-router";
import Button from "../../components/ui/Button";
import TextInput from "../../components/forms/TextInput";
import { useSession } from "../../hooks/useSession";
import apiClient from "../../api/apiClient";

export default function LoginScreen() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post("/users/login", {
        email: normalizedEmail,
        password,
      });

      const data = res.data?.data ?? res.data ?? {};
      const token = data.access_token ?? data.accessToken ?? data.token;
      const user = data.user ?? data.profile ?? null;

      if (typeof token !== "string" || !token.trim()) {
        throw new Error("Login succeeded but no valid authentication token was returned");
      }

      await signIn(token, user);

      const role = user?.role ?? data.role;
      if (role === "service_provider") {
        router.replace("/(client)/client");
      } else if (role === "admin") {
        router.replace("/(client)/client");
      } else {
        router.replace("/(client)/client");
      }
    } catch (e) {
      setError(e?.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-canvas"
      contentContainerClassName="p-4 justify-center min-h-full"
    >
      <Text className="text-[28px] font-bold text-text-primary mb-1">
        Welcome back
      </Text>
      <Text className="text-[15px] text-text-secondary mb-8">
        Sign in to your SasaFix account
      </Text>

      {error ? (
        <View className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-3 mb-4">
          <Text className="text-[13px] text-[#991B1B]">{error}</Text>
        </View>
      ) : null}

      <View className="gap-4">
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          editable={!loading}
        />
      </View>

      <View className="mt-6">
        <Button title="Sign In" onPress={handleLogin} loading={loading} />
      </View>

      <Text className="text-center text-[14px] text-text-secondary mt-6">
        Don't have an account?{" "}
        <Text
          className="text-primary font-semibold"
          onPress={() => !loading && router.push("/(auth)/signup")}
        >
          Sign up
        </Text>
      </Text>
    </ScrollView>
  );
}