import { ShieldAlert, EyeOff, Database } from "lucide-react";

export function PrivacyExplainer() {
  return (
    <div className="mx-auto mt-24 w-full rounded-2xl glass-panel p-8 relative overflow-hidden border-t-2 border-t-[var(--accent-purple)]">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--accent-purple)]/5 rounded-full blur-[80px]" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-lg bg-[var(--accent-purple)]/20 text-[var(--accent-purple)]">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white">Cryptographic Guarantees</h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">Understanding protocol transparency</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        <div className="bg-black/30 rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4 text-[var(--accent-cyan)]">
            <Database className="h-4 w-4" />
            <p className="text-xs uppercase tracking-widest font-semibold">Public Ledger Data</p>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] mt-1.5 shrink-0" />
              <span>Real-time aggregate consensus tallies</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] mt-1.5 shrink-0" />
              <span>Total volume of cryptographic submissions</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] mt-1.5 shrink-0" />
              <span>Cryptographic nullifiers preventing replay attacks</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-black/30 rounded-xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4 text-[var(--accent-pink)]">
            <EyeOff className="h-4 w-4" />
            <p className="text-xs uppercase tracking-widest font-semibold">Obfuscated Data</p>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] mt-1.5 shrink-0" />
              <span>Wallet address correlation to ballot cast</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] mt-1.5 shrink-0" />
              <span>Individual selection parameters</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-pink)] mt-1.5 shrink-0" />
              <span>Metadata linking multiple interactions</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/10 border border-white/5 text-sm text-[var(--text-muted)] leading-relaxed">
        <strong className="text-white font-medium mr-2">Zero-Knowledge Architecture:</strong> 
        The smart contract executes validation logic entirely off-chain using zk-SNARK circuits. The consensus network only receives a mathematical proof of validity alongside a nullifier string.
      </div>
    </div>
  );
}
