export default function SalesAnalysis() {
  return (
    <div className="space-y-6">
      {/* ===================== SECTION 1: METRICS ===================== */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* FILTER */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold mb-2">Category / Item</h3>
          <input
            type="text"
            placeholder="Search item..."
            className="border p-2 w-full mb-2"
          />
          <select className="border p-2 w-full">
            <option>All Items</option>
            <option>LED Headlights</option>
            <option>Indicators</option>
            <option>Brake Lights</option>
          </select>
        </div>

        {/* REVENUE */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold">Revenue</h3>
          <p className="text-2xl font-bold mt-2">KES 420,000</p>
          <p className="text-sm text-gray-500">Last month: KES 380,000</p>
          <p className="text-sm text-green-600 font-semibold mt-1">
            +10.5%
          </p>
        </div>

        {/* PROFIT */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold">Profit</h3>
          <p className="text-2xl font-bold mt-2 text-red-600">
            KES -12,500
          </p>
          <p className="text-sm text-gray-500">Last month: KES 45,000</p>
          <p className="text-sm text-red-600 font-semibold mt-1">
            -127%
          </p>
        </div>

        {/* BUYERS */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm font-semibold">Total Buyers</h3>
          <p className="text-2xl font-bold mt-2">186</p>
          <p className="text-sm text-gray-500">Last month: 160</p>
          <p className="text-sm text-green-600 font-semibold mt-1">
            +16.2%
          </p>
        </div>
      </section>

      {/* ===================== SECTION 2: PERFORMANCE ===================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* COMPOUND BAR CHART */}
        <div className="bg-white p-4 rounded shadow h-80">
          <h3 className="font-semibold mb-2">
            Revenue & Profit by Buyers
          </h3>

          <div className="h-full flex items-center justify-center border border-dashed text-gray-400 text-sm">
            Horizontal Compound Bar Chart Placeholder
            <br />
            (Revenue + Profit stacked, Buyers on Y-axis)
          </div>
        </div>

        {/* ITEM BAR CHART */}
        <div className="bg-white p-4 rounded shadow h-80">
          <h3 className="font-semibold mb-2">
            Revenue & Profit by Items Sold
          </h3>

          <div className="h-full flex items-center justify-center border border-dashed text-gray-400 text-sm">
            Horizontal Bar Chart Placeholder
            <br />
            (Items on Y-axis)
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: TRENDS ===================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MONTHLY TREND */}
        <div className="bg-white p-4 rounded shadow h-80">
          <h3 className="font-semibold mb-2">
            Monthly Revenue & Profit Trend
          </h3>

          <div className="h-full flex items-center justify-center border border-dashed text-gray-400 text-sm">
            Horizontal Bar Chart Placeholder
            <br />
            (Months on Y-axis)
          </div>
        </div>

        {/* TOP 5 REVENUE */}
        <div className="bg-white p-4 rounded shadow h-80">
          <h3 className="font-semibold mb-2">
            Top 5 High Revenue Days
          </h3>

          <div className="h-full flex items-center justify-center border border-dashed text-gray-400 text-sm">
            Horizontal Bar Chart Placeholder
            <br />
            (Hover to show day – future)
          </div>
        </div>
      </section>
    </div>
  );
}
