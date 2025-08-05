/**
 * 用户相关模拟数据
 */

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string;
  address: `0x${string}`;
  name?: string;
  avatar?: string;
  email?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  joinedAt: number;
  lastActiveAt: number;
  isVerified: boolean;
  reputation: number;
}

/**
 * 用户余额接口
 */
export interface UserBalance {
  address: `0x${string}`;
  eth: bigint;
  tokens: {
    symbol: string;
    name: string;
    balance: bigint;
    decimals: number;
    address: `0x${string}`;
  }[];
}

/**
 * 用户活动接口
 */
export interface UserActivity {
  id: string;
  userId: string;
  type: "proposal_created" | "vote_cast" | "token_purchased" | "comment_posted" | "delegation_changed";
  title: string;
  description: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

/**
 * 模拟当前用户信息
 */
export const mockCurrentUser: UserInfo = {
  id: "current-user",
  address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  name: "Alice Chen",
  avatar: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=AC",
  email: "alice@example.com",
  bio: "区块链爱好者，DeFi投资者，DAO治理参与者",
  website: "https://alice-chen.com",
  twitter: "https://twitter.com/alicechen",
  discord: "alice#1234",
  joinedAt: Math.floor(Date.now() / 1000) - 86400 * 120, // 120天前加入
  lastActiveAt: Math.floor(Date.now() / 1000) - 3600, // 1小时前活跃
  isVerified: true,
  reputation: 850,
};

/**
 * 模拟用户余额
 */
export const mockUserBalance: UserBalance = {
  address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  eth: BigInt("5000000000000000000"), // 5 ETH
  tokens: [
    {
      symbol: "COMM",
      name: "Community Token",
      balance: BigInt("50000000000000000000000"), // 50k tokens
      decimals: 18,
      address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    },
    {
      symbol: "DPX",
      name: "DeFi Protocol X",
      balance: BigInt("1000000000000000000000"), // 1k tokens
      decimals: 18,
      address: "0x2345678901234567890123456789012345678901" as `0x${string}`,
    },
    {
      symbol: "GFU",
      name: "GameFi Universe",
      balance: BigInt("500000000000000000000"), // 500 tokens
      decimals: 18,
      address: "0x3456789012345678901234567890123456789012" as `0x${string}`,
    },
    {
      symbol: "AIA",
      name: "AI Analytics",
      balance: BigInt("2000000000000000000000"), // 2k tokens
      decimals: 18,
      address: "0x4567890123456789012345678901234567890123" as `0x${string}`,
    },
  ],
};

/**
 * 模拟用户活动记录
 */
export const mockUserActivities: UserActivity[] = [
  {
    id: "1",
    userId: "current-user",
    type: "vote_cast",
    title: "对提案 #15 投票",
    description: "支持增加社区资金池的提案",
    timestamp: Math.floor(Date.now() / 1000) - 3600, // 1小时前
    metadata: {
      proposalId: "15",
      vote: "yes",
      votingPower: "50000",
    },
  },
  {
    id: "2",
    userId: "current-user",
    type: "token_purchased",
    title: "购买 DPX 代币",
    description: "参与 DeFi Protocol X 的ICO，购买了1000个代币",
    timestamp: Math.floor(Date.now() / 1000) - 86400 * 2, // 2天前
    metadata: {
      icoId: "1",
      amount: "1000",
      price: "0.1",
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
  },
  {
    id: "3",
    userId: "current-user",
    type: "proposal_created",
    title: "创建新提案",
    description: "提议升级DAO治理合约",
    timestamp: Math.floor(Date.now() / 1000) - 86400 * 5, // 5天前
    metadata: {
      proposalId: "16",
      title: "升级DAO治理合约",
    },
  },
  {
    id: "4",
    userId: "current-user",
    type: "comment_posted",
    title: "评论提案 #14",
    description: "对社区发展计划提案发表了意见",
    timestamp: Math.floor(Date.now() / 1000) - 86400 * 7, // 7天前
    metadata: {
      proposalId: "14",
      comment: "我认为这个计划很有前景，建议增加更多的技术细节。",
    },
  },
  {
    id: "5",
    userId: "current-user",
    type: "delegation_changed",
    title: "更改投票委托",
    description: "将投票权委托给了Alice",
    timestamp: Math.floor(Date.now() / 1000) - 86400 * 10, // 10天前
    metadata: {
      delegateTo: "0x2345678901234567890123456789012345678901",
      delegateName: "Alice",
      amount: "25000",
    },
  },
];

/**
 * 用户偏好设置接口
 */
export interface UserPreferences {
  language: "zh" | "en";
  theme: "light" | "dark" | "auto";
  notifications: {
    email: boolean;
    push: boolean;
    proposalCreated: boolean;
    votingStarted: boolean;
    votingEnded: boolean;
    proposalExecuted: boolean;
  };
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
    showBalance: boolean;
  };
}

/**
 * 模拟用户偏好设置
 */
export const mockUserPreferences: UserPreferences = {
  language: "zh",
  theme: "auto",
  notifications: {
    email: true,
    push: true,
    proposalCreated: true,
    votingStarted: true,
    votingEnded: false,
    proposalExecuted: true,
  },
  privacy: {
    showProfile: true,
    showActivity: true,
    showBalance: false,
  },
};

/**
 * 用户工具函数
 */

// 获取当前用户信息
export const getCurrentUser = (): UserInfo => {
  return mockCurrentUser;
};

// 获取用户余额
export const getUserBalance = (address: `0x${string}`): UserBalance | undefined => {
  if (address.toLowerCase() === mockUserBalance.address.toLowerCase()) {
    return mockUserBalance;
  }
  return undefined;
};

// 获取用户活动记录
export const getUserActivities = (userId: string, limit?: number): UserActivity[] => {
  const activities = mockUserActivities.filter((activity) => activity.userId === userId);
  return limit ? activities.slice(0, limit) : activities;
};

// 获取用户偏好设置
export const getUserPreferences = (): UserPreferences => {
  return mockUserPreferences;
};

// 格式化代币余额
export const formatTokenBalance = (balance: bigint, decimals: number = 18): string => {
  const balanceNumber = Number(balance) / Math.pow(10, decimals);
  if (balanceNumber >= 1000000) {
    return `${(balanceNumber / 1000000).toFixed(2)}M`;
  } else if (balanceNumber >= 1000) {
    return `${(balanceNumber / 1000).toFixed(2)}K`;
  }
  return balanceNumber.toFixed(2);
};

// 格式化ETH余额
export const formatEthBalance = (balance: bigint): string => {
  const ethBalance = Number(balance) / 1e18;
  return `${ethBalance.toFixed(4)} ETH`;
};

// 获取活动类型的显示文本
export const getActivityTypeText = (type: UserActivity["type"]): string => {
  const typeMap = {
    proposal_created: "创建提案",
    vote_cast: "投票",
    token_purchased: "购买代币",
    comment_posted: "发表评论",
    delegation_changed: "委托变更",
  };
  return typeMap[type] || type;
};

// 计算用户声誉等级
export const getUserReputationLevel = (reputation: number): string => {
  if (reputation >= 1000) return "专家";
  if (reputation >= 500) return "活跃";
  if (reputation >= 100) return "参与者";
  return "新手";
};

// 检查用户是否有足够余额
export const hasEnoughBalance = (userBalance: UserBalance, tokenAddress: `0x${string}`, amount: bigint): boolean => {
  if (tokenAddress === "0x0000000000000000000000000000000000000000") {
    // ETH
    return userBalance.eth >= amount;
  }

  const token = userBalance.tokens.find((t) => t.address.toLowerCase() === tokenAddress.toLowerCase());
  return token ? token.balance >= amount : false;
};
