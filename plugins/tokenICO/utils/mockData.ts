// 重新导出ICO相关的模拟数据和工具函数
// 所有ICO相关的模拟数据现在统一从 mock/ico.ts 导入
export {
  mockICOProjects,
  getICOById,
  getICOsByStatus,
  getICOsByCategory,
  getActiveICOs,
  getUpcomingICOs,
  calculateProgress,
  calculateTimeRemaining,
  ICOStatus,
  ICOCategory,
} from "../../../mock/ico";

// 重新导出类型定义，保持向后兼容性
export type { ICOProject, RoadmapItem, TeamMember, TokenomicsItem } from "./types";
