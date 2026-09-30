import { WalletStatus } from "../hooks/useVotingPoll";
import { Loader2, Zap } from "lucide-react";

export function WalletButton({
  status,
  userAddress,
  onConnect,
  onDisconnect,
}: {
  status: WalletStatus;
  userAddress?: string | null;
  onConnect: () => void;
  onDisconnect?: () => void;
}) {
  if (status === "connected") {
    const displayAddr = userAddress 
      ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`
      : "Connected";
    return (
      <div 
        className="flex cursor-pointer select-none items-center gap-3 rounded-xl glass-panel px-5 py-2.5 text-sm text-white hover:bg-white/5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)] border-[var(--accent-cyan)]/30"
        onClick={onDisconnect}
        title="Disconnect wallet"
      >
        <div className="h-2 w-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
        <span className="font-mono font-medium tracking-wide">{displayAddr}</span>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={status === "connecting"}
      className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-70 shadow-[0_0_20px_rgba(138,43,226,0.3)]"
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      {status === "connecting" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin relative z-10" />
          <span className="relative z-10">Authenticating...</span>
        </>
      ) : (
        <>
          <Zap className="h-4 w-4 relative z-10" />
          <span className="relative z-10">Connect Protocol</span>
        </>
      )}
    </button>
  );
}
