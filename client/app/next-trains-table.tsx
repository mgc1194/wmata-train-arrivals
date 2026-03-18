import { DataTable } from 'react-native-paper';

interface TrainArrival {
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
        <DataTable.Title>Line</DataTable.Title>
        <DataTable.Title>Cars</DataTable.Title>
        <DataTable.Title>Destination</DataTable.Title>
        <DataTable.Title>Minutes</DataTable.Title>
      </DataTable.Header>

      {trains.map((train, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell>{train.line}</DataTable.Cell>
          <DataTable.Cell>{train.car_count}</DataTable.Cell>
          <DataTable.Cell>{train.destination_name}</DataTable.Cell>
          <DataTable.Cell>{train.minutes}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
