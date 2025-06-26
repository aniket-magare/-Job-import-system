'use client';

import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';

// type Log = {
//   fileName: string;
//   totalFetched: number;
//   newJobs: number;
//   updatedJobs: number;
//   failedJobs: number;
//   timestamp: string;
// };
type Log = {
  source: string;
  fetched: number;
  inserted: number;
  updated: number;
  failed: number;
  timestamp: string;
};


export default function ImportLogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  //  fetch('http://localhost:5000/api/imort-log') //  Matches your backend route
  fetch('http://localhost:5000/api/import-logs')

      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error('Error fetching logs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Import Logs</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
  <tr>
    <th>Feed URL</th>
    <th>Total</th>
    <th>Inserted</th>
    <th>Updated</th>
    <th>Failed</th>
    <th>Imported At</th>
  </tr>
</thead>
<tbody>
  {logs.map((log, idx) => (
    <tr key={idx}>
      <td>{log.source}</td>
      <td>{log.fetched}</td>
      <td>{log.inserted}</td>
      <td>{log.updated}</td>
      <td>{log.failed}</td>
      <td>{new Date(log.timestamp).toLocaleString()}</td>
    </tr>
  ))}
</tbody>

        </Table>
      )}
    </div>
  );
}
