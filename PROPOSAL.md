# Product Proposal

## What is the product, and who uses it?
**Aura Vote** (or Midnight Ballot) is a completely anonymous, decentralized polling dApp. It is designed for DAOs, community groups, and Web3 organizations that require provably fair consensus without compromising individual voter privacy. Users are eligible community members who need a cryptographic guarantee that their vote counts, while remaining completely hidden from retaliation or social pressure.

## Why Midnight specifically?
A traditional transparent blockchain (like Ethereum or Cardano) exposes every state transition and wallet address to the public. If this voting dApp were built on a transparent chain, anyone could easily track who voted, what option they selected, and how large their holdings are. This fundamentally destroys ballot secrecy.

Midnight is uniquely suited for this because it allows us to shield the voter's identity and their specific choice entirely inside a zero-knowledge circuit. The network only verifies that the vote was valid and increments the public tally, ensuring complete privacy without sacrificing trustless verification.

## Data Model
| Data Point       | Type           | Disclosed To |
|------------------|----------------|--------------|
| **Total Votes Cast** | Public ledger  | Everyone     |
| **Poll Options & Tally** | Public ledger  | Everyone     |
| **Spent Nullifiers** | Public ledger  | Everyone (used strictly to prevent double-voting) |
| **Eligibility Merkle Root** | Public ledger  | Everyone |
| **Voter Identity / Wallet** | Private witness| No one       |
| **Voter's Selection** | Private witness| No one       |
| **Merkle Inclusion Proof** | Private witness| No one       |

## Mainnet Feasibility
Yes, it is highly feasible to reach Mainnet by Level 6. The core cryptographic primitives required for a robust anonymous ballot—such as Merkle proofs for eligibility, nullifiers for preventing double-voting, and concealed tally increments—are already perfectly suited to the current capabilities of Compact and the Midnight Network. Moving to Mainnet would primarily require building an administrative frontend to easily deploy custom smart contracts for new polls.
