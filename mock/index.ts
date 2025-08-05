/**
 * 统一的模拟数据入口文件
 */

// 导出所有模拟数据模块
export * from "./ico";
export * from "./dao";
export * from "./user";
export * from "./transaction";
export * from "./config";

// 重新导出主要配置和工具函数
export {
  MOCK_CONFIG,
  simulateApiDelay,
  simulateRandomError,
  simulateTransactionDelay,
  simulateTransactionFailure,
  getMockConfig,
  toggleMockData,
  toggleErrorSimulation,
} from "./config";
