import { useEffect, useState  } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import Constants from "expo-constants";
import StationsDropdown from "./stations-dropdown";
import NextTrainsTable, {TrainArrival} from "./next-trains-table";
import theme from "./theme";

const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:5001";

interface Station {
  name: string;
  code: string[];
}

interface StationOptions {
  itemAccessibilityLabelField: string;
  label: string;
  value: string;
}

export default function Index() {
  const [stations, setStations] = useState<StationOptions[]>([]);
  const [stationId, setStationId] = useState<string | undefined>(undefined);
  const [currentStation, setCurrentStation] = useState<Station | undefined>(undefined);
  const [trainArrivals, setTrainArrivals] = useState<Record<string, TrainArrival[]>>({});
  const [error, setError] = useState<string | null>(null);

  // We are handleing multiple fetch requests in this component, we want to have a consistent 
  // error handling strategy across all of them. It takes a promise that resolves to a Response 
  // object and an error message to use if the fetch fails. It returns a promise that resolves 
  // to the parsed JSON data if the fetch is successful, or sets the error state if it fails.
  const handleFetch = (promise: Promise<Response>, errorMsg: string) => 
    promise
      .then(response => {
        if (!response.ok) throw new Error(`${errorMsg}: ${response.status}`);
        return response.json();
      })
      .catch(err => {
        setError(err.message === 'Failed to fetch' ? errorMsg : err.message);
        throw err;
      }
    );
  // This handler is used to clear any existing errors when the user selects a new station. 
  // This way, if there was an error fetching data for the previous station, it won't be displayed 
  // when the user selects a new station and we start fetching data for it. The error state will 
  // only be updated if there is an error during the fetch for the new station.
  const handleStationChange = (id: string) => {
    setError(null);
    setStationId(id);
    handleFetch(fetch(`${API_URL}/api/stations/${id}`), "Failed to fetch station details")
        .then(setCurrentStation)
        .catch(() => {})
  };

  useEffect(() => {
    handleFetch(fetch(`${API_URL}/api/stations`), "Failed to fetch stations")
      .then(setStations)
      .catch(() => {})
  }, []);

  useEffect(() => {
    if (currentStation) {
      const  fetchArrivals = () => {
        handleFetch(fetch(`${API_URL}/api/arrivals/${currentStation.code.join(',')}`), "Failed to fetch train arrivals")
          .then(setTrainArrivals)
          .catch(() => {})
      };
      // Update every 20 seconds to keep the data fresh. 
      // The WMATA API updates every 10-20 seconds, so this should be sufficient to provide near real-time updates 
      // without overwhelming the API with requests.
      fetchArrivals();
      const interval = setInterval(fetchArrivals, 20000);
      return () => clearInterval(interval)
    }
  }, [currentStation]);

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
          setStationId={handleStationChange}
        />
        {error && (
          <Text variant="bodySmall" style={{ color: theme.colors.error, marginTop: 8 }}>
            {error}
          </Text>
        )}
        {!stationId ? (
          <Text variant="bodyMedium" style={{ marginTop: 16 }}>
            Please select a station to see the next train arrivals.
          </Text>
        ) : (
          <ScrollView style={{ flex: 1, width: '90%', marginTop: 16 }}>
            <Text variant="titleMedium" style={{ marginTop: 16, alignSelf: "flex-start", marginLeft: 16 }}>
              {"Next trains arriving to " + currentStation?.name}
            </Text>
            {Object.entries(trainArrivals).map(
              ([group, trains]) => (
                <View key={group} style={{ marginTop: 16 }}>
                  <NextTrainsTable trains={trains} />
                </View>
              )
            )}
          </ScrollView>
        )}
      </View>      
  );
}
