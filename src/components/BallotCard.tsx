import { Fingerprint, Loader2, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import type { PollOption, VoteStatus, WalletStatus } from "../hooks/useVotingPoll";

export function BallotCard({
  options,
  selected,
  onSelect,
  onCast,
  status,
  error,
  wallet,
  pollOpen,
  myNullifier,
}: {
  options: PollOption[];
  selected: number | null;
  onSelect: (id: number) => void;
  onCast: () => void;
  status: VoteStatus;
  error: string | null;
  wallet: WalletStatus;
  pollOpen: boolean;
  myNullifier: string | null;
}) {
  const busy = status === "generating-proof" || status === "submitting";
  const disabled = busy || wallet !== "connected" || !pollOpen;

  return (
    <div className="relative w-full max-w-md rounded-2xl glass-panel p-8 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-cyan)]/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none" />
      
      <div className="mb-8 flex items-start justify-between relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent-pink)]" />
            <p className="text-xs uppercase tracking-widest text-[var(--accent-pink)] font-semibold">Active Proposal</p>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mt-1">
            Network Resource Allocation
          </h2>
        </div>
      </div>

      <fieldset className="space-y-3 relative z-10" disabled={disabled}>
        <legend className="sr-only">Choose one option</legend>
        {options.map((opt) => {
          const active = selected === opt.id;
          return (
            <label
              key={opt.id}
              className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                active
                  ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  : "border-[var(--border-glass)] bg-white/5 hover:border-[var(--accent-cyan)]/50 hover:bg-white/10"
              } ${disabled ? "cursor-not-allowed opacity-50 grayscale-[50%]" : ""}`}
            >
              <div className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${active ? "border-[var(--accent-cyan)]" : "border-[var(--text-muted)] group-hover:border-[var(--accent-cyan)]/50"}`}>
                {active && <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent-cyan)]" />}
              </div>
              <input
                type="radio"
                name="ballot-option"
                className="hidden"
                checked={active}
                onChange={() => onSelect(opt.id)}
              />
              <span className={`text-[16px] font-medium ${active ? "text-white" : "text-[var(--text-muted)] group-hover:text-white"}`}>{opt.label}</span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-8 rounded-xl bg-black/40 p-4 border border-white/5">
        <div className="flex items-start gap-3 text-xs text-[var(--text-muted)] leading-relaxed">
          <Lock className="h-4 w-4 shrink-0 text-[var(--accent-purple)] mt-0.5" />
          <p>
            End-to-end encryption active. Your selection is verified via zero-knowledge proofs on-device. The network can only verify validity, never your choice.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {status === "confirmed" && myNullifier && (
        <div className="mt-4 rounded-xl border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 p-4 text-sm text-white">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-[var(--accent-cyan)]" />
            <p className="font-semibold text-[var(--accent-cyan)]">Cryptographic Proof Confirmed</p>
          </div>
          <p className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-2">
            <Fingerprint className="h-4 w-4" />
            <a href={myNullifier} target="_blank" rel="noreferrer" className="font-mono hover:text-[var(--accent-cyan)] transition-colors truncate">
              View Receipt
            </a>
          </p>
        </div>
      )}

      <button
        onClick={onCast}
        disabled={disabled || status === "confirmed"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold uppercase tracking-widest text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity" />
        
        <span className="relative z-10 flex items-center gap-2">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "generating-proof"
            ? "Synthesizing Proof..."
            : status === "submitting"
              ? "Broadcasting to Ledger..."
              : status === "confirmed"
                ? "Consensus Reached"
                : wallet !== "connected"
                  ? "Authentication Required"
                  : !pollOpen
                    ? "Session Terminated"
                    : "Execute Transaction"}
        </span>
      </button>
    </div>
  );
}
