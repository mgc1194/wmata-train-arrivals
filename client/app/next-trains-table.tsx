import { DataTable } from 'react-native-paper';
import { Image, ImageSourcePropType } from 'react-native';

export interface TrainArrival {
  line: string;
  destination_name: string;
  minutes: string;
  car_count: string;
}

interface NextTrainsTableProps {
  trains: TrainArrival[];
}

const LINE_IMAGES: Record<string, { source: ImageSourcePropType; label: string }> = {
  BL: { source: require("../assets/images/BL.png"), label: "Blue Line" },
  GR: { source: require("../assets/images/GR.png"), label: "Green Line" },
  RD: { source: require("../assets/images/RD.png"), label: "Red Line" },
  YL: { source: require("../assets/images/YL.png"), label: "Yellow Line" },
  OR: { source: require("../assets/images/OR.png"), label: "Orange Line" },
  SV: { source: require("../assets/images/SV.png"), label: "Silver Line" },
};

export default function NextTrainsTable({ trains }: NextTrainsTableProps) {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 2 }}>Line</DataTable.Title>
        <DataTable.Title style={{ flex: 3 }}>Destination</DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>Minutes</DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>Cars</DataTable.Title>
      </DataTable.Header>

      {trains.map((train, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell style={{ flex: 2 }}>
            <Image 
              source={LINE_IMAGES[train.line]?.source}
              style={{ width: 25, height: 25}}
              accessibilityLabel={LINE_IMAGES[train.line]?.label ?? train.line}
            />
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>{train.destination_name}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>{train.minutes}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>{train.car_count}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
