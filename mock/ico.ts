import { parseEther } from "viem";

/**
 * ICO项目状态枚举
 */
export enum ICOStatus {
  UPCOMING = "upcoming",
  ACTIVE = "active",
  SUCCESSFUL = "successful",
  FAILED = "failed",
  ENDED = "ended",
  CANCELLED = "cancelled",
}

/**
 * ICO项目分类枚举
 */
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

/**
 * 路线图项目接口
 */
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  quarter: string;
  year: number;
  completed: boolean;
}

/**
 * 团队成员接口
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * 代币经济学项目接口
 */
export interface TokenomicsItem {
  id: string;
  category: string;
  percentage: number;
  amount: bigint;
  description: string;
  color: string;
}

/**
 * ICO项目接口
 */
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
  tokenPrice: bigint;
  softCap: bigint;
  hardCap: bigint;
  raisedAmount: bigint;
  startTime: number;
  endTime: number;
  minPurchase: bigint;
  maxPurchase: bigint;
  creator: `0x${string}`;
  status: ICOStatus;
  category: ICOCategory;
  features: string[];
  roadmap: RoadmapItem[];
  team: TeamMember[];
  tokenomics: TokenomicsItem[];
}

/**
 * 模拟ICO项目数据
 */
export const mockICOProjects: ICOProject[] = [
  {
    id: "1",
    name: "DeFi Protocol X",
    symbol: "DPX",
    description:
      "下一代去中心化金融协议，提供创新的流动性挖矿和借贷解决方案。通过先进的算法和智能合约技术，为用户提供更高的收益率和更低的风险。",
    logoUrl: "https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=DPX",
    bannerUrl: "https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=DeFi+Protocol+X",
    website: "https://defiprotocolx.com",
    whitepaper: "https://defiprotocolx.com/whitepaper.pdf",
    twitter: "https://twitter.com/defiprotocolx",
    telegram: "https://t.me/defiprotocolx",
    discord: "https://discord.gg/defiprotocolx",
    totalSupply: parseEther("1000000"),
    tokenPrice: parseEther("0.1"),
    softCap: parseEther("500"),
    hardCap: parseEther("2000"),
    raisedAmount: parseEther("1250"),
    startTime: Math.floor(Date.now() / 1000) - 86400 * 5, // 5天前开始
    endTime: Math.floor(Date.now() / 1000) + 86400 * 25, // 25天后结束
    minPurchase: parseEther("0.1"),
    maxPurchase: parseEther("10"),
    creator: "0x1234567890123456789012345678901234567890" as any,
    status: ICOStatus.ACTIVE,
    category: ICOCategory.DEFI,
    features: ["流动性挖矿", "借贷协议", "治理代币", "跨链兼容"],
    roadmap: [
      {
        id: "1",
        title: "项目启动",
        description: "完成核心团队组建和初始资金筹集",
        quarter: "Q1",
        year: 2024,
        completed: true,
      },
      {
        id: "2",
        title: "测试网发布",
        description: "发布测试网版本，开放社区测试",
        quarter: "Q2",
        year: 2024,
        completed: true,
      },
      {
        id: "3",
        title: "主网上线",
        description: "正式发布主网，开始提供服务",
        quarter: "Q3",
        year: 2024,
        completed: false,
      },
      {
        id: "4",
        title: "生态扩展",
        description: "与其他DeFi协议集成，扩大生态系统",
        quarter: "Q4",
        year: 2024,
        completed: false,
      },
    ],
    team: [
      {
        id: "1",
        name: "Alice Chen",
        role: "CEO & 创始人",
        avatar: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=AC",
        bio: "前以太坊核心开发者，拥有10年区块链开发经验",
        linkedin: "https://linkedin.com/in/alicechen",
        twitter: "https://twitter.com/alicechen",
      },
      {
        id: "2",
        name: "Bob Wilson",
        role: "CTO",
        avatar: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=BW",
        bio: "智能合约安全专家，曾在多个知名DeFi项目担任技术负责人",
        linkedin: "https://linkedin.com/in/bobwilson",
      },
      {
        id: "3",
        name: "Carol Davis",
        role: "CMO",
        avatar: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=CD",
        bio: "资深营销专家，在加密货币领域有丰富的市场推广经验",
        twitter: "https://twitter.com/caroldavis",
      },
    ],
    tokenomics: [
      {
        id: "1",
        category: "公开销售",
        percentage: 30,
        amount: parseEther("300000"),
        description: "向公众开放的代币销售",
        color: "#3B82F6",
      },
      {
        id: "2",
        category: "团队",
        percentage: 20,
        amount: parseEther("200000"),
        description: "团队成员激励，锁仓2年",
        color: "#10B981",
      },
      {
        id: "3",
        category: "生态发展",
        percentage: 25,
        amount: parseEther("250000"),
        description: "用于生态系统建设和合作伙伴激励",
        color: "#8B5CF6",
      },
      {
        id: "4",
        category: "流动性",
        percentage: 15,
        amount: parseEther("150000"),
        description: "提供初始流动性",
        color: "#F59E0B",
      },
      {
        id: "5",
        category: "储备金",
        percentage: 10,
        amount: parseEther("100000"),
        description: "项目储备资金",
        color: "#EF4444",
      },
    ],
  },
  {
    id: "2",
    name: "GameFi Universe",
    symbol: "GFU",
    description:
      "革命性的区块链游戏平台，结合NFT和DeFi机制，为玩家提供边玩边赚的全新体验。支持多种游戏类型和跨游戏资产交易。",
    logoUrl: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=GFU",
    bannerUrl: "https://via.placeholder.com/800x400/10B981/FFFFFF?text=GameFi+Universe",
    website: "https://gamefi-universe.com",
    whitepaper: "https://gamefi-universe.com/whitepaper.pdf",
    twitter: "https://twitter.com/gamefiuniverse",
    telegram: "https://t.me/gamefiuniverse",
    totalSupply: parseEther("500000"),
    tokenPrice: parseEther("0.25"),
    softCap: parseEther("300"),
    hardCap: parseEther("1500"),
    raisedAmount: parseEther("450"),
    startTime: Math.floor(Date.now() / 1000) + 86400 * 7, // 7天后开始
    endTime: Math.floor(Date.now() / 1000) + 86400 * 37, // 37天后结束
    minPurchase: parseEther("0.05"),
    maxPurchase: parseEther("5"),
    creator: "0x2345678901234567890123456789012345678901" as any,
    status: ICOStatus.UPCOMING,
    category: ICOCategory.GAMING,
    features: ["Play-to-Earn", "NFT交易", "跨游戏资产", "DAO治理"],
    roadmap: [
      {
        id: "1",
        title: "概念验证",
        description: "完成游戏核心机制设计和原型开发",
        quarter: "Q2",
        year: 2024,
        completed: true,
      },
      {
        id: "2",
        title: "Alpha测试",
        description: "发布Alpha版本，邀请核心用户测试",
        quarter: "Q3",
        year: 2024,
        completed: false,
      },
      {
        id: "3",
        title: "Beta发布",
        description: "公开Beta测试，完善游戏机制",
        quarter: "Q4",
        year: 2024,
        completed: false,
      },
      {
        id: "4",
        title: "正式上线",
        description: "游戏正式发布，开启Play-to-Earn模式",
        quarter: "Q1",
        year: 2025,
        completed: false,
      },
    ],
    team: [
      {
        id: "1",
        name: "David Kim",
        role: "游戏总监",
        avatar: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=DK",
        bio: "资深游戏开发者，曾参与多款知名游戏的开发",
      },
      {
        id: "2",
        name: "Emma Zhang",
        role: "区块链架构师",
        avatar: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=EZ",
        bio: "区块链技术专家，专注于游戏与区块链的结合",
      },
    ],
    tokenomics: [
      {
        id: "1",
        category: "公开销售",
        percentage: 35,
        amount: parseEther("175000"),
        description: "向公众开放的代币销售",
        color: "#10B981",
      },
      {
        id: "2",
        category: "游戏奖励",
        percentage: 30,
        amount: parseEther("150000"),
        description: "用于Play-to-Earn奖励池",
        color: "#3B82F6",
      },
      {
        id: "3",
        category: "团队",
        percentage: 15,
        amount: parseEther("75000"),
        description: "团队成员激励",
        color: "#8B5CF6",
      },
      {
        id: "4",
        category: "营销",
        percentage: 10,
        amount: parseEther("50000"),
        description: "市场推广和合作伙伴",
        color: "#F59E0B",
      },
      {
        id: "5",
        category: "开发",
        percentage: 10,
        amount: parseEther("50000"),
        description: "持续开发和维护",
        color: "#EF4444",
      },
    ],
  },
  {
    id: "3",
    name: "AI Analytics",
    symbol: "AIA",
    description: "基于人工智能的区块链数据分析平台，为投资者和项目方提供深度市场洞察和预测分析服务。",
    logoUrl: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=AIA",
    bannerUrl: "https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=AI+Analytics",
    website: "https://ai-analytics.com",
    totalSupply: parseEther("2000000"),
    tokenPrice: parseEther("0.05"),
    softCap: parseEther("200"),
    hardCap: parseEther("1000"),
    raisedAmount: parseEther("1000"),
    startTime: Math.floor(Date.now() / 1000) - 86400 * 30, // 30天前开始
    endTime: Math.floor(Date.now() / 1000) - 86400 * 1, // 1天前结束
    minPurchase: parseEther("0.01"),
    maxPurchase: parseEther("20"),
    creator: "0x3456789012345678901234567890123456789012" as any,
    status: ICOStatus.SUCCESSFUL,
    category: ICOCategory.AI,
    features: ["AI预测", "数据分析", "市场洞察", "API服务"],
    roadmap: [
      {
        id: "1",
        title: "平台开发",
        description: "完成核心AI算法和分析平台开发",
        quarter: "Q1",
        year: 2024,
        completed: true,
      },
      {
        id: "2",
        title: "数据集成",
        description: "集成多个数据源，提升分析准确性",
        quarter: "Q2",
        year: 2024,
        completed: true,
      },
      {
        id: "3",
        title: "API发布",
        description: "发布开发者API，支持第三方集成",
        quarter: "Q3",
        year: 2024,
        completed: true,
      },
      {
        id: "4",
        title: "移动应用",
        description: "发布移动端应用，提供便捷访问",
        quarter: "Q4",
        year: 2024,
        completed: false,
      },
    ],
    team: [
      {
        id: "1",
        name: "Frank Liu",
        role: "AI研究总监",
        avatar: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=FL",
        bio: "机器学习博士，在金融科技领域有丰富经验",
      },
    ],
    tokenomics: [
      {
        id: "1",
        category: "公开销售",
        percentage: 40,
        amount: parseEther("800000"),
        description: "向公众开放的代币销售",
        color: "#8B5CF6",
      },
      {
        id: "2",
        category: "团队",
        percentage: 25,
        amount: parseEther("500000"),
        description: "团队成员激励",
        color: "#3B82F6",
      },
      {
        id: "3",
        category: "研发",
        percentage: 20,
        amount: parseEther("400000"),
        description: "持续研发投入",
        color: "#10B981",
      },
      {
        id: "4",
        category: "运营",
        percentage: 15,
        amount: parseEther("300000"),
        description: "平台运营和维护",
        color: "#F59E0B",
      },
    ],
  },
];

/**
 * ICO工具函数
 */

// 根据ID获取ICO项目
export const getICOById = (id: string): ICOProject | undefined => {
  return mockICOProjects.find((ico) => ico.id === id);
};

// 根据状态筛选ICO项目
export const getICOsByStatus = (status: ICOStatus): ICOProject[] => {
  return mockICOProjects.filter((ico) => ico.status === status);
};

// 根据分类筛选ICO项目
export const getICOsByCategory = (category: ICOCategory): ICOProject[] => {
  return mockICOProjects.filter((ico) => ico.category === category);
};

// 获取活跃的ICO项目
export const getActiveICOs = (): ICOProject[] => {
  return getICOsByStatus(ICOStatus.ACTIVE);
};

// 获取即将开始的ICO项目
export const getUpcomingICOs = (): ICOProject[] => {
  return getICOsByStatus(ICOStatus.UPCOMING);
};

// 计算ICO进度百分比
export const calculateProgress = (ico: ICOProject): number => {
  if (ico.hardCap === BigInt(0)) return 0;
  return Number((ico.raisedAmount * BigInt(100)) / ico.hardCap);
};

// 计算剩余时间
export const calculateTimeRemaining = (endTime: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const remaining = endTime - now;

  if (remaining <= 0) return "已结束";

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);

  if (days > 0) return `${days}天 ${hours}小时`;
  if (hours > 0) return `${hours}小时 ${minutes}分钟`;
  return `${minutes}分钟`;
};
