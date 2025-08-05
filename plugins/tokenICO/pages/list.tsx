import React, { useState } from "react";
import { Button, Card, Tag, IconType, InputText } from "@aragon/gov-ui-kit";
import { mockICOProjects, calculateProgress, calculateTimeRemaining } from "../utils/mockData";
import { ICOProject, ICOStatus, ICOCategory } from "../utils/types";
import { formatEther } from "viem";
import { useTranslation } from "next-i18next";
import Link from "next/link";

interface ICOListProps {
  onSelectICO: (icoId: string) => void;
}

export const ICOList: React.FC<ICOListProps> = ({ onSelectICO }) => {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ICOStatus | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<ICOCategory | "all">("all");

  // 筛选ICO项目
  const filteredICOs = mockICOProjects.filter((ico) => {
    const matchesSearch =
      ico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ico.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ico.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || ico.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || ico.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusVariant = (status: ICOStatus) => {
    switch (status) {
      case ICOStatus.ACTIVE:
        return "success";
      case ICOStatus.UPCOMING:
        return "info";
      case ICOStatus.SUCCESSFUL:
        return "success";
      case ICOStatus.ENDED:
        return "neutral";
      case ICOStatus.FAILED:
        return "critical";
      case ICOStatus.CANCELLED:
        return "critical";
      default:
        return "neutral";
    }
  };

  const getStatusText = (status: ICOStatus) => {
    switch (status) {
      case ICOStatus.ACTIVE:
        return "进行中";
      case ICOStatus.UPCOMING:
        return "即将开始";
      case ICOStatus.SUCCESSFUL:
        return "成功结束";
      case ICOStatus.ENDED:
        return "已结束";
      case ICOStatus.FAILED:
        return "失败";
      case ICOStatus.CANCELLED:
        return "已取消";
      default:
        return status;
    }
  };

  const getCategoryText = (category: ICOCategory) => {
    switch (category) {
      case ICOCategory.DEFI:
        return "DeFi";
      case ICOCategory.GAMING:
        return "游戏";
      case ICOCategory.NFT:
        return "NFT";
      case ICOCategory.INFRASTRUCTURE:
        return "基础设施";
      case ICOCategory.SOCIAL:
        return "社交";
      case ICOCategory.METAVERSE:
        return "元宇宙";
      case ICOCategory.AI:
        return "人工智能";
      case ICOCategory.OTHER:
        return "其他";
      default:
        return category;
    }
  };

  const getCategoryIcon = (category: ICOCategory) => {
    switch (category) {
      case ICOCategory.DEFI:
        return "🏦";
      case ICOCategory.GAMING:
        return "🎮";
      case ICOCategory.NFT:
        return "🎨";
      case ICOCategory.INFRASTRUCTURE:
        return "🏗️";
      case ICOCategory.SOCIAL:
        return "👥";
      case ICOCategory.METAVERSE:
        return "🌐";
      case ICOCategory.AI:
        return "🤖";
      case ICOCategory.OTHER:
        return "📦";
      default:
        return "📦";
    }
  };

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-3xl text-neutral-800">Token ICO</h1>
          <p className="mt-2 text-neutral-600">发现和参与优质的代币首次发行项目</p>
        </div>
        <div className="text-right">
          <span className="text-sm text-neutral-500">总项目数</span>
          <div className="font-bold text-2xl text-neutral-800">{filteredICOs.length}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-neutral-800">筛选项目</h2>
          <p className="text-sm text-neutral-600">使用下方工具快速找到您感兴趣的ICO项目</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <InputText
              label="搜索项目"
              placeholder="输入项目名称、代币符号或描述"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <div className="space-y-2">
              <label className="font-medium block text-sm text-neutral-700">状态筛选</label>
              <div className="relative">
                <select
                  className="bg-white focus:ring-2 focus:ring-primary-500/20 w-full appearance-none rounded-lg border border-neutral-200 px-3 text-sm transition-all hover:border-neutral-300 focus:border-primary-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as ICOStatus | "all")}
                  title="选择状态筛选"
                  style={{ height: "48px", padding: "12px", lineHeight: "1.5" }}
                >
                  <option value="all">全部状态</option>
                  <option value={ICOStatus.ACTIVE}>🟢 进行中</option>
                  <option value={ICOStatus.UPCOMING}>🔵 即将开始</option>
                  <option value={ICOStatus.SUCCESSFUL}>✅ 成功结束</option>
                  <option value={ICOStatus.ENDED}>⚪ 已结束</option>
                  <option value={ICOStatus.FAILED}>❌ 失败</option>
                  <option value={ICOStatus.CANCELLED}>🚫 已取消</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-neutral-400">▼</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <label className="font-medium block text-sm text-neutral-700">分类筛选</label>
              <div className="relative">
                <select
                  className="bg-white focus:ring-2 focus:ring-primary-500/20 w-full appearance-none rounded-lg border border-neutral-200 px-3 text-sm transition-all hover:border-neutral-300 focus:border-primary-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ICOCategory | "all")}
                  title="选择分类筛选"
                  style={{ height: "48px", padding: "12px", lineHeight: "1.5" }}
                >
                  <option value="all">全部分类</option>
                  <option value={ICOCategory.DEFI}>🏦 DeFi</option>
                  <option value={ICOCategory.GAMING}>🎮 游戏</option>
                  <option value={ICOCategory.NFT}>🎨 NFT</option>
                  <option value={ICOCategory.INFRASTRUCTURE}>🏗️ 基础设施</option>
                  <option value={ICOCategory.SOCIAL}>👥 社交</option>
                  <option value={ICOCategory.METAVERSE}>🌐 元宇宙</option>
                  <option value={ICOCategory.AI}>🤖 人工智能</option>
                  <option value={ICOCategory.OTHER}>📦 其他</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-neutral-400">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(searchTerm || selectedStatus !== "all" || selectedCategory !== "all") && (
          <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
            <span className="text-sm text-neutral-600">找到 {filteredICOs.length} 个匹配项目</span>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedStatus("all");
                setSelectedCategory("all");
              }}
            >
              清除筛选
            </Button>
          </div>
        )}
      </Card>

      {/* ICO项目列表 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredICOs.map((ico) => {
          const progress = calculateProgress(ico);
          const timeRemaining = calculateTimeRemaining(ico.endTime);

          return (
            <Card
              key={ico.id}
              className="hover:shadow-md group relative cursor-pointer overflow-hidden transition-all duration-200"
            >
              {/* 状态指示器 */}
              <div className="absolute right-4 top-4 z-10">
                <Tag label={getStatusText(ico.status)} variant={getStatusVariant(ico.status)} />
              </div>

              {/* 项目头部 */}
              <div className="relative p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img src={ico.logoUrl} alt={ico.name} className="h-12 w-12 rounded-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-neutral-800">{ico.name}</h3>
                    <p className="text-sm text-neutral-500">{ico.symbol}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4">
                {/* 分类标签 */}
                <div className="mb-3">
                  <Tag label={getCategoryText(ico.category)} variant="neutral" />
                </div>

                {/* 项目描述 */}
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-600">{ico.description}</p>

                {/* 项目特性 */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {ico.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="rounded-md inline-flex items-center bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
                    >
                      {feature}
                    </span>
                  ))}
                  {ico.features.length > 2 && (
                    <span className="rounded-md inline-flex items-center bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
                      +{ico.features.length - 2} 更多
                    </span>
                  )}
                </div>

                {/* 筹资信息 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-neutral-700">筹资进度</span>
                    <span className="text-sm font-semibold text-neutral-800">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary-500 transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>已筹集: ${(Number(formatEther(ico.raisedAmount)) * 3000).toLocaleString()}</span>
                    <span>目标: ${(Number(formatEther(ico.hardCap)) * 3000).toLocaleString()}</span>
                  </div>
                </div>

                {/* 底部信息 */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div>
                    <p className="text-xs text-neutral-500">代币价格</p>
                    <p className="text-sm font-semibold text-neutral-800">
                      ${(Number(formatEther(ico.tokenPrice)) * 3000).toFixed(4)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">{ico.status === ICOStatus.ACTIVE ? "剩余时间" : "状态"}</p>
                    <p className="font-medium text-sm text-neutral-700">
                      {ico.status === ICOStatus.ACTIVE ? timeRemaining : getStatusText(ico.status)}
                    </p>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-4">
                  <Button variant="primary" size="md" className="w-full" onClick={() => onSelectICO(ico.id)}>
                    查看详情
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 空状态 */}
      {filteredICOs.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <div className="h-8 w-8 text-neutral-400">🔍</div>
            </div>
            <div>
              <h3 className="font-medium text-lg text-neutral-800">未找到匹配的项目</h3>
              <p className="mt-1 text-neutral-600">请尝试调整搜索条件或筛选器</p>
            </div>
            <Button
              variant="tertiary"
              onClick={() => {
                setSearchTerm("");
                setSelectedStatus("all");
                setSelectedCategory("all");
              }}
            >
              清除筛选
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ICOList;
