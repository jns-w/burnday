import { Tabs } from "expo-router";
import { Clock, Settings } from "lucide-react-native";
import { View } from "react-native";

import { HapticTab } from "@/components/haptics/HapticTab";
import TabBar from "@/components/ui/TabBar";

// noinspection JSUnusedGlobalSymbols
export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: "transparent",
            bottom: 0,
            position: "absolute",
          },
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Clock color={color} />,
            tabBarLabel: "Timer",
            title: "Timer",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color }) => <Settings color={color} />,
            tabBarLabel: "Settings",
            title: "Settings",
          }}
        />
      </Tabs>
    </View>
  );
}
