import { DataTable } from 'react-native-paper';

export interface TrainArrival {
  line: string;
  destination_name: string;
  minutes: string;
  car_count: string;
}

interface NextTrainsTableProps {
  trains: TrainArrival[];
}

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
          <DataTable.Cell style={{ flex: 2 }}>{train.line}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 3 }}>{train.destination_name}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>{train.minutes}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1 }}>{train.car_count}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
