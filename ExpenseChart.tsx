'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ExpenseChartProps {
  data: ExpenseItem[];
  total: number;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: ExpenseItem }[] }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-xl shadow-modal px-4 py-3 text-sm">
      <div className="font-semibold text-foreground">{item.name}</div>
      <div className="text-primary font-bold font-tabular mt-0.5">${item.value.toLocaleString()}</div>
      <div className="text-muted-foreground text-xs">{item.payload.percentage}% of total</div>
    </div>
  );
}

export default function ExpenseChart({ data, total }: ExpenseChartProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-full sm:w-64 h-64 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="amount"
              nameKey="category"
            >
              {data.map((entry) => (
                <Cell key={entry.id} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-foreground font-tabular">${total.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">per person</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 w-full space-y-2.5">
        {data.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-foreground flex-1">{item.category}</span>
            <span className="text-sm font-bold text-foreground font-tabular">${item.amount.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground w-10 text-right font-tabular">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}