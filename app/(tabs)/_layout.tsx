import { Tabs } from "expo-router";
import { Music, BookOpen, Zap, User } from "lucide-react-native";
import React from "react";
import colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.dark.primary,
        tabBarInactiveTintColor: colors.dark.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.dark.backgroundSecondary,
          borderTopColor: colors.dark.cardBorder,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: colors.dark.backgroundSecondary,
        },
        headerTintColor: colors.dark.text,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Diapasón",
          tabBarIcon: ({ color }) => <Music size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scales"
        options={{
          title: "Escalas",
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="techniques"
        options={{
          title: "Técnicas",
          tabBarIcon: ({ color }) => <Zap size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Progreso",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
