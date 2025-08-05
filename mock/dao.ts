/**
 * DAO相关模拟数据
 */

/**
 * DAO基本信息接口
 */
export interface DAOInfo {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  memberCount: number;
  treasuryValue: bigint;
  proposalCount: number;
  createdAt: number;
  governanceToken: {
    name: string;
    symbol: string;
    totalSupply: bigint;
    address: `0x${string}`;
  };
}

/**
 * 模拟DAO数据
 */
export const mockDao: DAOInfo = {
  id: "1",
  name: "Community DAO",
  description:
    "一个致力于推动区块链技术发展和社区建设的去中心化自治组织。我们通过民主决策和透明治理，为成员创造价值并推动生态系统的发展。",
  logoUrl: "https://via.placeholder.com/120x120/3B82F6/FFFFFF?text=DAO",
  website: "https://community-dao.org",
  twitter: "https://twitter.com/communitydao",
  discord: "https://discord.gg/communitydao",
  memberCount: 1250,
  treasuryValue: BigInt("500000000000000000000"), // 500 ETH
  proposalCount: 42,
  createdAt: Math.floor(Date.now() / 1000) - 86400 * 180, // 180天前创建
  governanceToken: {
    name: "Community Token",
    symbol: "COMM",
    totalSupply: BigInt("10000000000000000000000000"), // 10M tokens
    address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  },
};

/**
 * DAO统计信息接口
 */
export interface DAOStats {
  totalMembers: number;
  activeProposals: number;
  totalProposals: number;
  treasuryValue: bigint;
  averageVotingParticipation: number;
  successfulProposals: number;
}

/**
 * 模拟DAO统计数据
 */
export const mockDAOStats: DAOStats = {
  totalMembers: 1250,
  activeProposals: 3,
  totalProposals: 42,
  treasuryValue: BigInt("500000000000000000000"), // 500 ETH
  averageVotingParticipation: 68.5, // 68.5%
  successfulProposals: 28,
};

/**
 * DAO成员接口
 */
export interface DAOMember {
  id: string;
  address: `0x${string}`;
  name?: string;
  avatar?: string;
  joinedAt: number;
  votingPower: bigint;
  proposalsCreated: number;
  votesParticipated: number;
  role: "member" | "moderator" | "admin";
}

/**
 * 模拟DAO成员数据
 */
export const mockDAOMembers: DAOMember[] = [
  {
    id: "1",
    address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    name: "Alice",
    avatar: "https://via.placeholder.com/40x40/10B981/FFFFFF?text=A",
    joinedAt: Math.floor(Date.now() / 1000) - 86400 * 150,
    votingPower: BigInt("50000000000000000000000"), // 50k tokens
    proposalsCreated: 8,
    votesParticipated: 35,
    role: "admin",
  },
  {
    id: "2",
    address: "0x2345678901234567890123456789012345678901" as `0x${string}`,
    name: "Bob",
    avatar: "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=B",
    joinedAt: Math.floor(Date.now() / 1000) - 86400 * 120,
    votingPower: BigInt("30000000000000000000000"), // 30k tokens
    proposalsCreated: 5,
    votesParticipated: 28,
    role: "moderator",
  },
  {
    id: "3",
    address: "0x3456789012345678901234567890123456789012" as `0x${string}`,
    name: "Carol",
    avatar: "https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=C",
    joinedAt: Math.floor(Date.now() / 1000) - 86400 * 90,
    votingPower: BigInt("20000000000000000000000"), // 20k tokens
    proposalsCreated: 3,
    votesParticipated: 22,
    role: "member",
  },
  {
    id: "4",
    address: "0x4567890123456789012345678901234567890123" as `0x${string}`,
    name: "David",
    avatar: "https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=D",
    joinedAt: Math.floor(Date.now() / 1000) - 86400 * 60,
    votingPower: BigInt("15000000000000000000000"), // 15k tokens
    proposalsCreated: 2,
    votesParticipated: 18,
    role: "member",
  },
  {
    id: "5",
    address: "0x5678901234567890123456789012345678901234" as `0x${string}`,
    name: "Eve",
    avatar: "https://via.placeholder.com/40x40/EF4444/FFFFFF?text=E",
    joinedAt: Math.floor(Date.now() / 1000) - 86400 * 30,
    votingPower: BigInt("10000000000000000000000"), // 10k tokens
    proposalsCreated: 1,
    votesParticipated: 12,
    role: "member",
  },
];

/**
 * DAO工具函数
 */

// 获取DAO信息
export const getDAOInfo = (): DAOInfo => {
  return mockDao;
};

// 获取DAO统计信息
export const getDAOStats = (): DAOStats => {
  return mockDAOStats;
};

// 获取DAO成员列表
export const getDAOMembers = (): DAOMember[] => {
  return mockDAOMembers;
};

// 根据地址获取DAO成员
export const getDAOMemberByAddress = (address: `0x${string}`): DAOMember | undefined => {
  return mockDAOMembers.find((member) => member.address.toLowerCase() === address.toLowerCase());
};

// 获取顶级成员（按投票权重排序）
export const getTopMembers = (limit: number = 10): DAOMember[] => {
  return [...mockDAOMembers].sort((a, b) => Number(b.votingPower - a.votingPower)).slice(0, limit);
};

// 计算成员投票参与率
export const calculateParticipationRate = (member: DAOMember): number => {
  if (mockDAOStats.totalProposals === 0) return 0;
  return (member.votesParticipated / mockDAOStats.totalProposals) * 100;
};

// 格式化投票权重
export const formatVotingPower = (power: bigint): string => {
  const powerNumber = Number(power) / 1e18;
  if (powerNumber >= 1000000) {
    return `${(powerNumber / 1000000).toFixed(1)}M`;
  } else if (powerNumber >= 1000) {
    return `${(powerNumber / 1000).toFixed(1)}K`;
  }
  return powerNumber.toFixed(0);
};

// 格式化财库价值
export const formatTreasuryValue = (value: bigint): string => {
  const ethValue = Number(value) / 1e18;
  return `${ethValue.toFixed(2)} ETH`;
};
