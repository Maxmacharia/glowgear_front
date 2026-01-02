export default function Table({ columns, data, actions }) {
  return (
    <table className="w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-2 text-left">
              {col}
            </th>
          ))}
          {actions && <th className="p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-t">
            {columns.map((col) => (
              <td key={col} className="p-2">
                {row[col]}
              </td>
            ))}
            {actions && (
              <td className="p-2 flex gap-2">
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
