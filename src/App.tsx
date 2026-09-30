import { Hexagon, ExternalLink, Sparkles } from "lucide-react";
import { WalletButton } from "./components/WalletButton";
import { BallotCard } from "./components/BallotCard";
import { TallyBoard } from "./components/TallyBoard";
import { useVotingPoll } from "./hooks/useVotingPoll";
import { PrivacyExplainer } from "./components/PrivacyExplainer";

const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS ?? "abc9f04d0ff71bec8e4347f63f0259c2bf68bbd49fd1fb8a18739081e22aab71";

function App() {
  const {
    options,
    tally,
    totalVotes,
    pollOpen,
    wallet,
    userAddress,
    status,
    error,
    myNullifier,
    selected,
    setSelected,
    connectWallet,
    disconnectWallet,
    castVote,
  } = useVotingPoll();

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-white selection:bg-[var(--accent-purple)]/30 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-purple)]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-cyan)]/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] p-[1px]">
            <div className="absolute inset-0 bg-[var(--bg-deep)] rounded-xl m-[1px]" />
            <Hexagon className="relative h-5 w-5 text-white" />
          </div>
          <span className="font-display text-2xl font-semibold tracking-wide">Aura<span className="text-[var(--text-muted)] font-light">Vote</span></span>
        </div>
        <WalletButton status={wallet} userAddress={userAddress} onConnect={connectWallet} onDisconnect={disconnectWallet} />
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-sm mb-6 border-[var(--border-glass)] text-[var(--accent-cyan)]">
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen Cryptographic Voting</span>
          </div>
          <h1 className="font-display text-5xl leading-tight text-white sm:text-7xl font-bold tracking-tight">
            Absolute <span className="gradient-text">Privacy.</span>
            <br />
            Provable <span className="gradient-text">Consensus.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--text-muted)] font-light">
            Participate in the decentralized governance process. Your identity is cryptographically shielded, and your vote is mathematically proven on the ledger.
          </p>
        </div>

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-stretch lg:justify-between relative z-10">
          <BallotCard
            options={options}
            selected={selected}
            onSelect={setSelected}
            onCast={castVote}
            status={status}
            error={error}
            wallet={wallet}
            pollOpen={pollOpen}
            myNullifier={myNullifier}
          />
          <TallyBoard
            options={options}
            tally={tally}
            totalVotes={totalVotes}
            pollOpen={pollOpen}
          />
        </div>

        <PrivacyExplainer />
      </main>

      <footer className="border-t border-[var(--border-glass)] bg-[var(--bg-deep)]/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-white">Smart Contract Address</p>
            <p className="font-mono text-xs">{CONTRACT_ADDRESS}</p>
          </div>
          <a
            href="https://docs.midnight.network"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel hover:bg-white/5 transition-colors text-white"
          >
            Developer Docs <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
