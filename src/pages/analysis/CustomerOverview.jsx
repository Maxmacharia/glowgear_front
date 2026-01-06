import { useState, useEffect } from "react";

export default function CustomerOverview() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    // Placeholder – replace with API call
    const mockClients = [
      { id: 1, name: "John Traders" },
      { id: 2, name: "Embu Auto Supplies" },
    ];
    setClients(mockClients);
    setSelectedClient(mockClients[0]);
  }, []);

  if (!selectedClient) return null;

  return (
    <div className="p-6 space-y-8">
      {/* SECTION 1 */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Client Filter */}
        <div className="bg-white p-4 rounded shadow">
          <label className="text-sm font-semibold">Select Client</label>
          <select
            className="mt-2 w-full border p-2"
            value={selectedClient.id}
            onChange={(e) =>
              setSelectedClient(
                clients.find(c => c.id === Number(e.target.value))
              )
            }
          >
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Profile Picture */}
        <div className="bg-white p-4 rounded shadow flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-sm">
            Profile
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Client Details</h3>
          <p>Name: {selectedClient.name}</p>
          <p>Debut: --</p>
          <p>Last Purchase: --</p>
        </div>

        {/* Revenue */}
        <div className="bg-green-50 p-4 rounded shadow">
          <h3 className="font-semibold text-green-700">Revenue</h3>
          <p className="text-xl font-bold">KES 120,000</p>
          <p className="text-sm text-green-600">+12%</p>
        </div>

        {/* Profit */}
        <div className="bg-blue-50 p-4 rounded shadow">
          <h3 className="font-semibold text-blue-700">Profit</h3>
          <p className="text-xl font-bold">KES -5,000</p>
          <p className="text-sm text-red-600">-8%</p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartPlaceholder title="Items Purchased Over Time (Monthly)" />
        <ChartPlaceholder title="Sales Overview Over Time" />
      </section>

      {/* SECTION 3 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartPlaceholder title="Top 3 Items Purchased" />
        <ChartPlaceholder title="Receipts vs Invoices Revenue Over Time" />
      </section>
    </div>
  );
}

function ChartPlaceholder({ title }) {
  return (
    <div className="bg-white p-4 rounded shadow h-64 flex flex-col">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex-1 flex items-center justify-center text-gray-400 border border-dashed">
        Chart Placeholder
      </div>
    </div>
  );
}
