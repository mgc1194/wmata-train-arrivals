// Following the Expo Router documentation, this file is used to set up the layout of the app, 
// including the header and any common components that should be present on all screens. 
// In this case, we are using the PaperProvider from react-native-paper to provide theming and styling across the app. 


import { Stack } from "expo-router";
import { Text, PaperProvider } from "react-native-paper";
import { Image, View, StyleSheet } from "react-native";
import theme from "./theme";


const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    color: theme.colors.onPrimary,
    fontSize: 30,
    fontWeight: "600",
  },
});

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
              backgroundColor: theme.colors.primary,
            },
          headerTintColor: theme.colors.onPrimary,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => (
              <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
                <Image
                  source={require("../assets/images/logo.png")}
                  style={styles.image}
                  resizeMode="contain"
                  accessibilityLabel="WMATA logo"
                />
                <Text 
                  variant="titleLarge"
                  style={styles.headerTitle}
                  role="heading"
                  aria-level={1}
                >
                  WMATA Train Arrivals
                </Text>
              </View>
            )
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
