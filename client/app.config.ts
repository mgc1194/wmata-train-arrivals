import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: "WMATA Train Arrivals",
  slug: "wmata-train-arrivals",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  web: {
    output: "static",
    favicon: "./assets/images/logo.png"
  },
  plugins: [
    "expo-router"
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:5001",
  },
};

export default config;