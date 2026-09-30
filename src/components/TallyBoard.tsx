import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Activity } from "lucide-react";
import type { PollOption } from "../hooks/useVotingPoll";

export function TallyBoard({
  options,
  tally,
  totalVotes,
  pollOpen,
}: {
  options: PollOption[];
  tally: number[];
  totalVotes: number;
  pollOpen: boolean;
}) {
  const data = options.map((opt, i) => ({
    name: opt.label,
    short: opt.label.split(" ").slice(0, 2).join(" "),
    votes: tally[i],
  }));

  const COLORS = ['var(--accent-cyan)', 'var(--accent-purple)', 'var(--accent-pink)'];

  return (
    <div className="w-full max-w-[500px] flex-1 rounded-2xl glass-panel p-8 flex flex-col relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--accent-purple)]/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="mb-8 flex items-center justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-[var(--accent-cyan)]" />
            <p className="text-xs uppercase tracking-widest text-[var(--accent-cyan)] font-semibold">
              {pollOpen ? "Live Telemetry" : "Final State"}
            </p>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mt-1">
            {totalVotes} <span className="text-[var(--text-muted)] font-light">Transactions</span>
          </h2>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
          <span className="font-mono text-[10px] text-[var(--accent-cyan)] uppercase tracking-wider">Aura Network</span>
        </div>
      </div>

      <div className="h-64 relative z-10 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: -20, right: 20, top: 0, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <XAxis type="number" allowDecimals={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="short"
              width={140}
              tick={{ fill: "rgba(255,255,255,0.9)", fontSize: 13, fontFamily: 'Outfit', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.02)'}}
              contentStyle={{ background: 'var(--bg-deep)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: 'var(--accent-cyan)' }}
            />
            <Bar dataKey="votes" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto pt-8 relative z-10">
        <div className="grid grid-cols-3 gap-4 font-mono">
          {data.map((d, i) => (
            <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5">
              <p className="text-3xl font-bold text-white mb-1" style={{ color: COLORS[i % COLORS.length] }}>{d.votes}</p>
              <p className="text-[11px] leading-tight text-[var(--text-muted)] truncate" title={d.name}>{d.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
