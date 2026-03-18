import { useEffect, useState  } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Constants from "expo-constants";
import StationsDropdown from "./stations-dropdown";

const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:5001";

export default function Index() {
  const [stationId, setStationId] = useState('');
  const [stations, setStations] = useState([]);

  useEffect(() => {
  fetch(`${API_URL}/api/stations`)
    .then(res => res.json())
    .then(setStations);
}, []);

  return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <StationsDropdown 
          stations={stations}
          stationId={stationId}
          setStationId={setStationId}
        />
        <Text>{"Selected station ID: " + stationId}</Text>
      
      </View>      
  );
}
