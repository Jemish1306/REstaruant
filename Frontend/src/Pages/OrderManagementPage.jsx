import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParcelTable = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API="http://127.0.0.1:3229/api/percel";

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get(API);
        setParcels(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Customer Phone</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Total Bill</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map(parcel => (
            <tr key={parcel._id}>
              <td className="py-2 px-4 border-b">{parcel.customerName}</td>
              <td className="py-2 px-4 border-b">{parcel.customerPhone}</td>
              <td className="py-2 px-4 border-b">{new Date(parcel.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{parcel.time}</td>
              <td className="py-2 px-4 border-b">{parcel.status}</td>
              <td className="py-2 px-4 border-b">{parcel.totalBill}</td>
              <td className="py-2 px-4 border-b">{new Date(parcel.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
