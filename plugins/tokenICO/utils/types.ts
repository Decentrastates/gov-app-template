import { type Address } from "viem";

export interface ICOProject {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  website?: string;
  whitepaper?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  totalSupply: bigint;
  tokenPrice: bigint; // 以wei为单位
  softCap: bigint;
  hardCap: bigint;
  raisedAmount: bigint;
  startTime: number; // Unix时间戳
  endTime: number; // Unix时间戳
  minPurchase: bigint;
  maxPurchase: bigint;
  tokenAddress?: Address;
  contractAddress?: Address;
  creator: Address;
  status: ICOStatus;
  category: ICOCategory;
  features: string[];
  roadmap: RoadmapItem[];
  team: TeamMember[];
  tokenomics: TokenomicsItem[];
}

export enum ICOStatus {
  UPCOMING = "upcoming",
  ACTIVE = "active",
  ENDED = "ended",
  SUCCESSFUL = "successful",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum ICOCategory {
  DEFI = "defi",
  GAMING = "gaming",
  NFT = "nft",
  INFRASTRUCTURE = "infrastructure",
  SOCIAL = "social",
  METAVERSE = "metaverse",
  AI = "ai",
  OTHER = "other",
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: string;
  year: number;
  completed: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export interface TokenomicsItem {
  id: string;
  category: string;
  percentage: number;
  amount: bigint;
  description: string;
  color: string;
}

export interface PurchaseTransaction {
  id: string;
  icoId: string;
  userAddress: string;
  ethAmount: bigint; // USDT amount (stored as ETH equivalent)
  tokenAmount: bigint; // Token amount
  timestamp: number;
  txHash?: string;
  status: TransactionStatus;
  gasUsed?: bigint;
  gasFee?: bigint;
}

export enum TransactionStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  FAILED = "failed",
}

export interface ICOStats {
  totalProjects: number;
  activeProjects: number;
  totalRaised: bigint;
  totalParticipants: number;
}

export interface UserParticipation {
  icoId: string;
  totalInvested: bigint;
  tokensPurchased: bigint;
  transactions: PurchaseTransaction[];
}
