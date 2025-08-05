/**
 * 配置相关模拟数据
 */

/**
 * 模拟配置接口
 */
export interface MockConfig {
  // 是否启用模拟数据
  enabled: boolean;
  // API延迟配置
  apiDelay: {
    min: number;
    max: number;
  };
  // 错误模拟配置
  errorSimulation: {
    enabled: boolean;
    rate: number; // 错误概率 (0-1)
  };
  // 交易模拟配置
  transaction: {
    // 交易延迟
    delay: {
      min: number;
      max: number;
    };
    // 交易失败率
    failureRate: number;
    // Gas价格范围 (Gwei)
    gasPrice: {
      min: number;
      max: number;
    };
  };
  // 区块链网络配置
  network: {
    chainId: number;
    name: string;
    rpcUrl: string;
    blockExplorer: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
  // 合约地址配置
  contracts: {
    dao: `0x${string}`;
    governanceToken: `0x${string}`;
    tokenVoting: `0x${string}`;
    icoFactory: `0x${string}`;
  };
}

/**
 * 默认模拟配置
 */
export const MOCK_CONFIG: MockConfig = {
  enabled: true,
  apiDelay: {
    min: 500,
    max: 2000,
  },
  errorSimulation: {
    enabled: false,
    rate: 0.05, // 5%错误率
  },
  transaction: {
    delay: {
      min: 1000,
      max: 5000,
    },
    failureRate: 0.1, // 10%失败率
    gasPrice: {
      min: 20, // 20 Gwei
      max: 50, // 50 Gwei
    },
  },
  network: {
    chainId: 1337,
    name: "Local Testnet",
    rpcUrl: "http://localhost:8545",
    blockExplorer: "http://localhost:4000",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  contracts: {
    dao: "0x1234567890123456789012345678901234567890" as `0x${string}`,
    governanceToken: "0x2345678901234567890123456789012345678901" as `0x${string}`,
    tokenVoting: "0x3456789012345678901234567890123456789012" as `0x${string}`,
    icoFactory: "0x4567890123456789012345678901234567890123" as `0x${string}`,
  },
};

/**
 * 环境配置接口
 */
export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  apiBaseUrl: string;
  enableLogging: boolean;
  enableAnalytics: boolean;
}

/**
 * 模拟环境配置
 */
export const mockEnvironmentConfig: EnvironmentConfig = {
  isDevelopment: true,
  isProduction: false,
  isTest: false,
  apiBaseUrl: "http://localhost:3000/api",
  enableLogging: true,
  enableAnalytics: false,
};

/**
 * 功能开关配置接口
 */
export interface FeatureFlags {
  // ICO功能
  icoEnabled: boolean;
  // 投票功能
  votingEnabled: boolean;
  // 委托功能
  delegationEnabled: boolean;
  // 多签功能
  multisigEnabled: boolean;
  // NFT功能
  nftEnabled: boolean;
  // 跨链功能
  crossChainEnabled: boolean;
  // 高级分析
  advancedAnalyticsEnabled: boolean;
  // 社交功能
  socialFeaturesEnabled: boolean;
}

/**
 * 模拟功能开关配置
 */
export const mockFeatureFlags: FeatureFlags = {
  icoEnabled: true,
  votingEnabled: true,
  delegationEnabled: true,
  multisigEnabled: false,
  nftEnabled: false,
  crossChainEnabled: false,
  advancedAnalyticsEnabled: true,
  socialFeaturesEnabled: true,
};

/**
 * UI配置接口
 */
export interface UIConfig {
  // 主题配置
  theme: {
    defaultTheme: "light" | "dark" | "auto";
    allowThemeSwitch: boolean;
  };
  // 语言配置
  language: {
    defaultLanguage: "zh" | "en";
    supportedLanguages: string[];
  };
  // 布局配置
  layout: {
    sidebarCollapsed: boolean;
    showBreadcrumb: boolean;
    showFooter: boolean;
  };
  // 分页配置
  pagination: {
    defaultPageSize: number;
    pageSizeOptions: number[];
  };
}

/**
 * 模拟UI配置
 */
export const mockUIConfig: UIConfig = {
  theme: {
    defaultTheme: "auto",
    allowThemeSwitch: true,
  },
  language: {
    defaultLanguage: "zh",
    supportedLanguages: ["zh", "en"],
  },
  layout: {
    sidebarCollapsed: false,
    showBreadcrumb: true,
    showFooter: true,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
};

/**
 * 配置工具函数
 */

// 获取模拟配置
export const getMockConfig = (): MockConfig => {
  return MOCK_CONFIG;
};

// 获取环境配置
export const getEnvironmentConfig = (): EnvironmentConfig => {
  return mockEnvironmentConfig;
};

// 获取功能开关配置
export const getFeatureFlags = (): FeatureFlags => {
  return mockFeatureFlags;
};

// 获取UI配置
export const getUIConfig = (): UIConfig => {
  return mockUIConfig;
};

// 检查功能是否启用
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  return mockFeatureFlags[feature];
};

// 模拟API延迟
export const simulateApiDelay = async (): Promise<void> => {
  if (!MOCK_CONFIG.enabled) return;

  const delay = Math.random() * (MOCK_CONFIG.apiDelay.max - MOCK_CONFIG.apiDelay.min) + MOCK_CONFIG.apiDelay.min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// 模拟随机错误
export const simulateRandomError = (): boolean => {
  if (!MOCK_CONFIG.enabled || !MOCK_CONFIG.errorSimulation.enabled) return false;
  return Math.random() < MOCK_CONFIG.errorSimulation.rate;
};

// 生成随机Gas价格
export const generateRandomGasPrice = (): bigint => {
  const { min, max } = MOCK_CONFIG.transaction.gasPrice;
  const gasPrice = Math.random() * (max - min) + min;
  return BigInt(Math.floor(gasPrice * 1e9)); // 转换为Wei
};

// 模拟交易延迟
export const simulateTransactionDelay = async (): Promise<void> => {
  if (!MOCK_CONFIG.enabled) return;

  const { min, max } = MOCK_CONFIG.transaction.delay;
  const delay = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// 模拟交易失败
export const simulateTransactionFailure = (): boolean => {
  if (!MOCK_CONFIG.enabled) return false;
  return Math.random() < MOCK_CONFIG.transaction.failureRate;
};

// 获取合约地址
export const getContractAddress = (contractName: keyof MockConfig["contracts"]): `0x${string}` => {
  return MOCK_CONFIG.contracts[contractName];
};

// 获取网络配置
export const getNetworkConfig = () => {
  return MOCK_CONFIG.network;
};

// 更新模拟配置
export const updateMockConfig = (updates: Partial<MockConfig>): void => {
  Object.assign(MOCK_CONFIG, updates);
};

// 重置模拟配置
export const resetMockConfig = (): void => {
  Object.assign(MOCK_CONFIG, {
    enabled: true,
    apiDelay: { min: 500, max: 2000 },
    errorSimulation: { enabled: false, rate: 0.05 },
    transaction: {
      delay: { min: 1000, max: 5000 },
      failureRate: 0.1,
      gasPrice: { min: 20, max: 50 },
    },
  });
};

// 启用/禁用模拟数据
export const toggleMockData = (enabled: boolean): void => {
  MOCK_CONFIG.enabled = enabled;
};

// 启用/禁用错误模拟
export const toggleErrorSimulation = (enabled: boolean): void => {
  MOCK_CONFIG.errorSimulation.enabled = enabled;
};

// 设置错误率
export const setErrorRate = (rate: number): void => {
  MOCK_CONFIG.errorSimulation.rate = Math.max(0, Math.min(1, rate));
};

// 设置交易失败率
export const setTransactionFailureRate = (rate: number): void => {
  MOCK_CONFIG.transaction.failureRate = Math.max(0, Math.min(1, rate));
};
