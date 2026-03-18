// Unfortunately, react-native-paer does not have a dropdown component, 
// so we are using the react-native-element-dropdown package instead. 
// I have follow the documentation to set up a basic dropdown component 
// that allows the user to search and select a station.
// https://www.npmjs.com/package/react-native-element-dropdown
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    marginTop: 16,
    minWidth: "80%",
  },
  dropdown: {
    width: "80%",
    maxWidth: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});

interface StationsDropdownProps {
  stations: { label: string; value: string }[];
  stationId: string | '';
  setStationId: (id: string) => void;
}

export default function StationsDropdown({
  stations,
  stationId,
  setStationId,
}: StationsDropdownProps) {
  const theme = useTheme();
  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={styles.container}>
      <Icon source="train" size={50} color={theme.colors.primary} />
      <Dropdown
        style={[styles.dropdown, { borderColor: theme.colors.primary }]}
        data={stations}
        search
        searchPlaceholder="Search..."
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select a Station' : '...'}
        value={stationId}
        onChange={e => setStationId(e.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
}

