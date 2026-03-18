// Theme developed based on Material Design 3 guidelines:
// https://oss.callstack.com/react-native-paper/docs/guides/theming/
// primary color is set to match the official WMATA blue, 
// and other colors are chosen by prompting Claude to suggest complementary colors.
import { MD3LightTheme } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#003256",
    onPrimary: "#ffffff",
    primaryContainer: "#d1e4ff",
    onPrimaryContainer: "#001d36",
    secondary: "#526070",
    onSecondary: "#ffffff",
    secondaryContainer: "#d5e4f7",
    onSecondaryContainer: "#0e1d2a",
    background: "#fafcff",
    onBackground: "#001d36",
    surface: "#fafcff",
    onSurface: "#001d36",
    surfaceVariant: "#dfe3eb",
    onSurfaceVariant: "#43474f",
  },
};

export default theme;