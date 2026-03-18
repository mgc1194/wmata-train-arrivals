// Unfortunately, react-native-paer does not have a dropdown component, 
// so we are using the react-native-element-dropdown package instead. 
// I have follow the documentation to set up a basic dropdown component 
// that allows the user to search and select a station.
// https://www.npmjs.com/package/react-native-element-dropdown
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon, Text, useTheme } from "react-native-paper";

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
  stationId: string;
  setStationId: (id: string) => void;
}

export default function StationsDropdown({
  stations,
  stationId,
  setStationId,
}: StationsDropdownProps) {
  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel="Station selector"
    >
      <Icon source="train" size={70} color={theme.colors.primary}/>
      <View style={{ height: 70, flex: 1 }}>
        <Text variant="labelMedium" style={{ color: theme.colors.primary }}>Select a station</Text>
        <Dropdown
        mode="auto"
        style={[styles.dropdown, { borderColor: theme.colors.primary }]}
        data={stations}
        // There is an accessibility issue with the search input in the dropdown that requires the user 
        // to tap twice to focus the input. This is a known issue with the react-native-element-dropdown 
        // package and there is no current workaround. Alternatively, we could implement our own dropdown 
        // component using a Modal and a TextInput for search, that is not scoped for this project.
        search 
        searchPlaceholder="Search for a station..."
        labelField="label"
        valueField="value"
        placeholder="Stations"
        value={stationId}
        onChange={e => setStationId(e.value)}
        accessibilityLabel="Stations dropdown"
      />
      </View>
    </View>
  );
}
