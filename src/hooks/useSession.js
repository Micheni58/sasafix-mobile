import { useEffect, useState, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const available = await SecureStore.isAvailableAsync();
        if (!available) return;

        const storedToken = await SecureStore.getItemAsync("auth_token");
        const storedUser = await SecureStore.getItemAsync("auth_user");
        if (storedToken) setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            await SecureStore.deleteItemAsync("auth_user");
            setUser(null);
          }
        }
      } catch (e) {
        console.warn("Session hydrate failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (newToken, newUser) => {
    if (typeof newToken !== "string" || !newToken.trim()) {
      throw new Error("Invalid auth token: expected a non-empty string");
    }

    setToken(newToken);
    setUser(newUser ?? null);

    try {
      const available = await SecureStore.isAvailableAsync();
      if (available) {
        await SecureStore.setItemAsync("auth_token", newToken);
        await SecureStore.setItemAsync("auth_user", JSON.stringify(newUser ?? {}));
      }
    } catch (e) {
      console.warn("Session persistence failed", e);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("auth_token");
    await SecureStore.deleteItemAsync("auth_user");
    setToken(null);
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}