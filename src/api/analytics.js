import dayjs from "dayjs";

export function aggregateByMonth(records, dateKey, valueFn) {
  const map = {};

  records.forEach(r => {
    const month = dayjs(r[dateKey]).format("YYYY-MM");
    map[month] = (map[month] || 0) + valueFn(r);
  });

  return map;
}

export function getMonthComparison(current, previous) {
  const diff = current - previous;
  const percent = previous === 0 ? 0 : (diff / previous) * 100;
  return { current, previous, diff, percent };
}

export function computeRevenueAndProfit({ receipts, invoices }) {
  const paidInvoices = invoices.filter(i => i.paid === true);

  const all = [...receipts, ...paidInvoices];

  let revenue = 0;
  let cost = 0;

  all.forEach(tx => {
    revenue += tx.cogs;
    cost += tx.cost_price;
  });

  return {
    revenue,
    profit: revenue - cost
  };
}
