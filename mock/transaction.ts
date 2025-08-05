/**
 * 交易相关模拟数据
 */

/**
 * 交易状态枚举
 */
export enum TransactionStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

/**
 * 交易类型枚举
 */
export enum TransactionType {
  TOKEN_PURCHASE = "token_purchase",
  VOTE = "vote",
  PROPOSAL_CREATION = "proposal_creation",
  PROPOSAL_EXECUTION = "proposal_execution",
  DELEGATION = "delegation",
  TRANSFER = "transfer",
  APPROVAL = "approval",
}

/**
 * 交易信息接口
 */
export interface TransactionInfo {
  id: string;
  hash: `0x${string}`;
  from: `0x${string}`;
  to: `0x${string}`;
  value: bigint;
  gasUsed: bigint;
  gasPrice: bigint;
  blockNumber: number;
  timestamp: number;
  status: TransactionStatus;
  type: TransactionType;
  metadata?: Record<string, any>;
}

/**
 * 模拟交易数据
 */
export const mockTransactions: TransactionInfo[] = [
  {
    id: "1",
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890" as `0x${string}`,
    from: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    to: "0x2345678901234567890123456789012345678901" as `0x${string}`,
    value: BigInt("100000000000000000"), // 0.1 ETH
    gasUsed: BigInt("21000"),
    gasPrice: BigInt("20000000000"), // 20 Gwei
    blockNumber: 18500000,
    timestamp: Math.floor(Date.now() / 1000) - 3600, // 1小时前
    status: TransactionStatus.CONFIRMED,
    type: TransactionType.TOKEN_PURCHASE,
    metadata: {
      icoId: "1",
      tokenAmount: "1000",
      tokenSymbol: "DPX",
      tokenPrice: "0.1",
    },
  },
  {
    id: "2",
    hash: "0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567891" as `0x${string}`,
    from: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    to: "0x3456789012345678901234567890123456789012" as `0x${string}`,
    value: BigInt("0"),
    gasUsed: BigInt("45000"),
    gasPrice: BigInt("25000000000"), // 25 Gwei
    blockNumber: 18499950,
    timestamp: Math.floor(Date.now() / 1000) - 7200, // 2小时前
    status: TransactionStatus.CONFIRMED,
    type: TransactionType.VOTE,
    metadata: {
      proposalId: "15",
      vote: "yes",
      votingPower: "50000",
    },
  },
  {
    id: "3",
    hash: "0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567892" as `0x${string}`,
    from: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    to: "0x4567890123456789012345678901234567890123" as `0x${string}`,
    value: BigInt("0"),
    gasUsed: BigInt("120000"),
    gasPrice: BigInt("30000000000"), // 30 Gwei
    blockNumber: 18499800,
    timestamp: Math.floor(Date.now() / 1000) - 86400 * 5, // 5天前
    status: TransactionStatus.CONFIRMED,
    type: TransactionType.PROPOSAL_CREATION,
    metadata: {
      proposalId: "16",
      title: "升级DAO治理合约",
      description: "提议升级DAO治理合约以支持新功能",
    },
  },
  {
    id: "4",
    hash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567893" as `0x${string}`,
    from: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    to: "0x5678901234567890123456789012345678901234" as `0x${string}`,
    value: BigInt("50000000000000000"), // 0.05 ETH
    gasUsed: BigInt("35000"),
    gasPrice: BigInt("22000000000"), // 22 Gwei
    blockNumber: 18499700,
    timestamp: Math.floor(Date.now() / 1000) - 86400 * 7, // 7天前
    status: TransactionStatus.CONFIRMED,
    type: TransactionType.TRANSFER,
    metadata: {
      recipient: "0x5678901234567890123456789012345678901234",
      amount: "0.05",
      currency: "ETH",
    },
  },
  {
    id: "5",
    hash: "0xef1234567890abcdef1234567890abcdef1234567890abcdef1234567894" as `0x${string}`,
    from: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    to: "0x6789012345678901234567890123456789012345" as `0x${string}`,
    value: BigInt("0"),
    gasUsed: BigInt("0"),
    gasPrice: BigInt("25000000000"), // 25 Gwei
    blockNumber: 0,
    timestamp: Math.floor(Date.now() / 1000) - 300, // 5分钟前
    status: TransactionStatus.PENDING,
    type: TransactionType.DELEGATION,
    metadata: {
      delegateTo: "0x6789012345678901234567890123456789012345",
      delegateName: "Bob Wilson",
      amount: "25000",
    },
  },
  {
    id: "6",
    hash: "0xf1234567890abcdef1234567890abcdef1234567890abcdef1234567895" as `0x${string}`,
    from: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    to: "0x7890123456789012345678901234567890123456" as `0x${string}`,
    value: BigInt("0"),
    gasUsed: BigInt("0"),
    gasPrice: BigInt("28000000000"), // 28 Gwei
    blockNumber: 0,
    timestamp: Math.floor(Date.now() / 1000) - 600, // 10分钟前
    status: TransactionStatus.FAILED,
    type: TransactionType.TOKEN_PURCHASE,
    metadata: {
      icoId: "2",
      tokenAmount: "500",
      tokenSymbol: "GFU",
      tokenPrice: "0.25",
      error: "Insufficient funds",
    },
  },
];

/**
 * 交易统计接口
 */
export interface TransactionStats {
  totalTransactions: number;
  pendingTransactions: number;
  confirmedTransactions: number;
  failedTransactions: number;
  totalGasUsed: bigint;
  totalValue: bigint;
}

/**
 * 模拟交易统计数据
 */
export const mockTransactionStats: TransactionStats = {
  totalTransactions: mockTransactions.length,
  pendingTransactions: mockTransactions.filter((tx) => tx.status === TransactionStatus.PENDING).length,
  confirmedTransactions: mockTransactions.filter((tx) => tx.status === TransactionStatus.CONFIRMED).length,
  failedTransactions: mockTransactions.filter((tx) => tx.status === TransactionStatus.FAILED).length,
  totalGasUsed: mockTransactions.reduce((sum, tx) => sum + tx.gasUsed, BigInt(0)),
  totalValue: mockTransactions.reduce((sum, tx) => sum + tx.value, BigInt(0)),
};

/**
 * 交易工具函数
 */

// 根据哈希获取交易
export const getTransactionByHash = (hash: `0x${string}`): TransactionInfo | undefined => {
  return mockTransactions.find((tx) => tx.hash.toLowerCase() === hash.toLowerCase());
};

// 根据地址获取交易列表
export const getTransactionsByAddress = (address: `0x${string}`, limit?: number): TransactionInfo[] => {
  const transactions = mockTransactions.filter(
    (tx) => tx.from.toLowerCase() === address.toLowerCase() || tx.to.toLowerCase() === address.toLowerCase()
  );
  return limit ? transactions.slice(0, limit) : transactions;
};

// 根据类型获取交易列表
export const getTransactionsByType = (type: TransactionType): TransactionInfo[] => {
  return mockTransactions.filter((tx) => tx.type === type);
};

// 根据状态获取交易列表
export const getTransactionsByStatus = (status: TransactionStatus): TransactionInfo[] => {
  return mockTransactions.filter((tx) => tx.status === status);
};

// 获取待确认交易
export const getPendingTransactions = (): TransactionInfo[] => {
  return getTransactionsByStatus(TransactionStatus.PENDING);
};

// 获取最近交易
export const getRecentTransactions = (limit: number = 10): TransactionInfo[] => {
  return [...mockTransactions].sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
};

// 计算交易费用
export const calculateTransactionFee = (transaction: TransactionInfo): bigint => {
  return transaction.gasUsed * transaction.gasPrice;
};

// 格式化交易哈希
export const formatTransactionHash = (hash: `0x${string}`, length: number = 10): string => {
  if (hash.length <= length + 2) return hash;
  return `${hash.slice(0, length + 2)}...${hash.slice(-4)}`;
};

// 格式化Gas价格
export const formatGasPrice = (gasPrice: bigint): string => {
  const gwei = Number(gasPrice) / 1e9;
  return `${gwei.toFixed(2)} Gwei`;
};

// 格式化交易值
export const formatTransactionValue = (value: bigint): string => {
  const ethValue = Number(value) / 1e18;
  if (ethValue === 0) return "0 ETH";
  if (ethValue < 0.001) return `${(ethValue * 1e18).toFixed(0)} Wei`;
  return `${ethValue.toFixed(6)} ETH`;
};

// 获取交易状态颜色
export const getTransactionStatusColor = (status: TransactionStatus): string => {
  const colorMap = {
    [TransactionStatus.PENDING]: "text-yellow-600",
    [TransactionStatus.CONFIRMED]: "text-green-600",
    [TransactionStatus.FAILED]: "text-red-600",
    [TransactionStatus.CANCELLED]: "text-gray-600",
  };
  return colorMap[status] || "text-gray-600";
};

// 获取交易类型显示文本
export const getTransactionTypeText = (type: TransactionType): string => {
  const typeMap = {
    [TransactionType.TOKEN_PURCHASE]: "代币购买",
    [TransactionType.VOTE]: "投票",
    [TransactionType.PROPOSAL_CREATION]: "创建提案",
    [TransactionType.PROPOSAL_EXECUTION]: "执行提案",
    [TransactionType.DELEGATION]: "委托",
    [TransactionType.TRANSFER]: "转账",
    [TransactionType.APPROVAL]: "授权",
  };
  return typeMap[type] || type;
};

// 获取交易状态显示文本
export const getTransactionStatusText = (status: TransactionStatus): string => {
  const statusMap = {
    [TransactionStatus.PENDING]: "待确认",
    [TransactionStatus.CONFIRMED]: "已确认",
    [TransactionStatus.FAILED]: "失败",
    [TransactionStatus.CANCELLED]: "已取消",
  };
  return statusMap[status] || status;
};

// 模拟交易延迟
export const simulateTransactionDelay = async (minMs: number = 1000, maxMs: number = 5000): Promise<void> => {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// 模拟随机交易失败
export const simulateRandomTransactionFailure = (failureRate: number = 0.1): boolean => {
  return Math.random() < failureRate;
};

// 生成模拟交易哈希
export const generateMockTransactionHash = (): `0x${string}` => {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash as `0x${string}`;
};
