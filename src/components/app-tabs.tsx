import { TabTriggerSlotProps } from "expo-router/ui";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";
import { ThemedText } from "./themed-text";

export default function AppTabs() {
  const rawTheme = useColorScheme();
  const theme = rawTheme === "dark" ? "dark" : "light";

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index/index">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & { icon: string };

export function TabButton({ children, isFocused, icon, ...props }: TabButtonProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <SymbolView name={icon as any} tintColor={isFocused ? "#0A84FF" : colors.textSecondary} size={24} />
      <ThemedText
        type="small"
        themeColor={isFocused ? "text" : "textSecondary"}
        style={{ marginTop: 2, fontSize: 10, fontWeight: isFocused ? "600" : "400" }}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}

// Removed CustomTabList as it's no longer needed with the new structure

const styles = StyleSheet.create({
  tabListContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    maxWidth: 350,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  triggersContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: 60,
  },
  pressed: {
    opacity: 0.7,
  },
});
