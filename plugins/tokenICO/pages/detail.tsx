import React, { useState } from "react";
import { Button, Card, Tag, Heading, Link, AlertInline } from "@aragon/gov-ui-kit";
import { getICOById, calculateProgress, calculateTimeRemaining } from "../utils/mockData";
import { ICOProject, ICOStatus } from "../utils/types";
import { formatEther } from "viem";
import { useTranslation } from "next-i18next";

interface ICODetailProps {
  icoId: string;
  onPurchase: (icoId: string) => void;
  onBack: () => void;
}

export const ICODetail: React.FC<ICODetailProps> = ({ icoId, onPurchase, onBack }) => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState<"overview" | "tokenomics" | "roadmap" | "team">("overview");

  const ico = getICOById(icoId);

  if (!ico) {
    return (
      <Card className="p-6">
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-neutral-800">项目未找到</h2>
          <p className="text-neutral-600">请检查项目ID是否正确</p>
          <Button variant="primary" onClick={onBack}>
            返回列表
          </Button>
        </div>
      </Card>
    );
  }

  const progress = calculateProgress(ico);
  const timeRemaining = calculateTimeRemaining(ico.endTime);

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

  const getCategoryText = (category: any) => {
    switch (category) {
      case "DEFI":
        return "DeFi";
      case "GAMING":
        return "游戏";
      case "NFT":
        return "NFT";
      case "INFRASTRUCTURE":
        return "基础设施";
      case "SOCIAL":
        return "社交";
      case "METAVERSE":
        return "元宇宙";
      case "AI":
        return "人工智能";
      case "OTHER":
        return "其他";
      default:
        return category;
    }
  };

  const getCategoryIcon = (category: any) => {
    switch (category) {
      case "DEFI":
        return "🏦";
      case "GAMING":
        return "🎮";
      case "NFT":
        return "🎨";
      case "INFRASTRUCTURE":
        return "🏗️";
      case "SOCIAL":
        return "👥";
      case "METAVERSE":
        return "🌐";
      case "AI":
        return "🤖";
      case "OTHER":
        return "📦";
      default:
        return "📦";
    }
  };

  const canPurchase = ico.status === ICOStatus.ACTIVE;

  return (
    <div className="space-y-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Button variant="tertiary" onClick={onBack} className="flex items-center gap-2">
          <span>←</span> 返回列表
        </Button>
      </div>

      {/* 项目信息 */}
      <Card className="mb-6 p-6">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-neutral-100">
            {ico.logoUrl ? (
              <img src={ico.logoUrl} alt={ico.name} className="h-16 w-16 rounded-lg" />
            ) : (
              <span className="text-2xl">{getCategoryIcon(ico.category)}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h1 className="font-bold text-2xl text-neutral-800">{ico.name}</h1>
              <Tag label={getStatusText(ico.status)} variant={getStatusVariant(ico.status)} />
            </div>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-medium text-lg text-neutral-600">{ico.symbol}</span>
              <Tag label={getCategoryText(ico.category)} variant="neutral" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-neutral-50 p-4">
                <div className="text-sm text-neutral-600">代币价格</div>
                <div className="text-lg font-semibold text-neutral-800">
                  {(Number(formatEther(ico.tokenPrice)) * 3000).toFixed(2)} USDT
                </div>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4">
                <div className="text-sm text-neutral-600">已筹集</div>
                <div className="text-lg font-semibold text-neutral-800">
                  {(Number(formatEther(ico.raisedAmount)) * 3000).toFixed(2)} USDT
                </div>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4">
                <div className="text-sm text-neutral-600">硬顶</div>
                <div className="text-lg font-semibold text-neutral-800">
                  {(Number(formatEther(ico.hardCap)) * 3000).toFixed(2)} USDT
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 主要内容 */}
        <div className="space-y-6 lg:col-span-2">
          {/* 标签导航 */}
          <Card className="p-0">
            <div className="border-b border-neutral-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: "overview", label: "项目概览" },
                  { key: "tokenomics", label: "代币经济" },
                  { key: "roadmap", label: "路线图" },
                  { key: "team", label: "团队" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`font-medium border-b-2 px-2 py-4 text-sm ${
                      activeTab === tab.key
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-700"
                    }`}
                    onClick={() => setActiveTab(tab.key as any)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* 项目概览 */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <Heading size="h3" className="mb-3">
                      项目描述
                    </Heading>
                    <p className="leading-relaxed text-neutral-700">{ico.description}</p>
                  </div>

                  <div>
                    <Heading size="h3" className="mb-3">
                      核心特性
                    </Heading>
                    <div className="grid grid-cols-2 gap-3">
                      {ico.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 外部链接 */}
                  <div>
                    <Heading size="h3" className="mb-3">
                      相关链接
                    </Heading>
                    <div className="grid grid-cols-2 gap-3">
                      {ico.website && (
                        <Link href={ico.website} target="_blank" variant="primary">
                          官方网站
                        </Link>
                      )}
                      {ico.whitepaper && (
                        <Link href={ico.whitepaper} target="_blank" variant="primary">
                          白皮书
                        </Link>
                      )}
                      {ico.twitter && (
                        <Link href={ico.twitter} target="_blank" variant="primary">
                          Twitter
                        </Link>
                      )}
                      {ico.telegram && (
                        <Link href={ico.telegram} target="_blank" variant="primary">
                          Telegram
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 代币经济 */}
              {activeTab === "tokenomics" && (
                <div className="space-y-6">
                  <div>
                    <Heading size="h3" className="mb-3">
                      代币分配
                    </Heading>
                    <div className="space-y-4">
                      {ico.tokenomics.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-lg bg-neutral-50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <div>
                              <p className="font-medium text-neutral-800">{item.category}</p>
                              <p className="text-sm text-neutral-600">{item.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-neutral-800">{item.percentage}%</p>
                            <p className="text-sm text-neutral-600">
                              {formatEther(item.amount)} {ico.symbol}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-neutral-50 p-4">
                      <p className="text-sm text-neutral-600">总供应量</p>
                      <p className="text-lg font-semibold">
                        {formatEther(ico.totalSupply)} {ico.symbol}
                      </p>
                    </div>
                    <div className="rounded-lg bg-neutral-50 p-4">
                      <p className="text-sm text-neutral-600">代币价格</p>
                      <p className="text-lg font-semibold">
                        {(Number(formatEther(ico.tokenPrice)) * 3000).toFixed(2)} USDT
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 路线图 */}
              {activeTab === "roadmap" && (
                <div className="space-y-6">
                  <Heading size="h3">发展路线图</Heading>
                  <div className="space-y-4">
                    {ico.roadmap.map((item, index) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-4 w-4 rounded-full ${item.completed ? "bg-success-500" : "bg-neutral-300"}`}
                          ></div>
                          {index < ico.roadmap.length - 1 && <div className="mt-2 h-16 w-0.5 bg-neutral-200"></div>}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="mb-2 flex items-center gap-2">
                            <h4 className="font-semibold text-neutral-800">{item.title}</h4>
                            <span className="text-sm text-neutral-500">
                              {item.quarter} {item.year}
                            </span>
                            {item.completed && <Tag label="已完成" variant="success" />}
                          </div>
                          <p className="text-neutral-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 团队 */}
              {activeTab === "team" && (
                <div className="space-y-6">
                  <Heading size="h3">核心团队</Heading>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {ico.team.map((member) => (
                      <div key={member.id} className="flex gap-4 rounded-lg bg-neutral-50 p-4">
                        <img
                          src={
                            member.avatar ||
                            `https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=${member.name.charAt(0)}`
                          }
                          alt={member.name}
                          className="h-16 w-16 rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-800">{member.name}</h4>
                          <p className="mb-2 text-sm text-primary-600">{member.role}</p>
                          {member.bio && <p className="mb-2 text-sm text-neutral-600">{member.bio}</p>}
                          <div className="flex gap-2">
                            {member.linkedin && (
                              <Link href={member.linkedin} target="_blank" variant="primary">
                                LinkedIn
                              </Link>
                            )}
                            {member.twitter && (
                              <Link href={member.twitter} target="_blank" variant="primary">
                                Twitter
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 购买卡片 */}
          <Card className="p-6">
            <div className="space-y-4">
              <Heading size="h3">参与ICO</Heading>

              {/* 筹资进度 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">筹资进度</span>
                  <span className="font-medium">{progress.toFixed(1)}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-neutral-200">
                  <div
                    className="h-3 rounded-full bg-primary-500 transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>{(Number(formatEther(ico.raisedAmount)) * 3000).toFixed(2)} USDT</span>
                  <span>{(Number(formatEther(ico.hardCap)) * 3000).toFixed(2)} USDT</span>
                </div>
              </div>

              {/* 时间信息 */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-600">状态</span>
                  <Tag label={getStatusText(ico.status)} variant={getStatusVariant(ico.status)} />
                </div>
                {ico.status === ICOStatus.ACTIVE && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">剩余时间</span>
                    <span className="font-medium text-critical-600">{timeRemaining}</span>
                  </div>
                )}
              </div>

              {/* 购买信息 */}
              <div className="space-y-2 border-t border-neutral-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">代币价格</span>
                  <span className="font-medium">{(Number(formatEther(ico.tokenPrice)) * 3000).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">最小购买</span>
                  <span className="font-medium">{(Number(formatEther(ico.minPurchase)) * 3000).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">最大购买</span>
                  <span className="font-medium">{(Number(formatEther(ico.maxPurchase)) * 3000).toFixed(2)} USDT</span>
                </div>
              </div>

              {/* 购买按钮 */}
              <div className="pt-4">
                {canPurchase ? (
                  <Button variant="primary" size="lg" className="w-full" onClick={() => onPurchase(ico.id)}>
                    立即购买
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button variant="tertiary" size="lg" className="w-full" disabled>
                      {ico.status === ICOStatus.UPCOMING ? "尚未开始" : "已结束"}
                    </Button>
                    {ico.status === ICOStatus.UPCOMING && (
                      <AlertInline
                        message={`ICO将在 ${new Date(ico.startTime * 1000).toLocaleDateString()} 开始`}
                        variant="info"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 项目统计 */}
          <Card className="p-6">
            <div className="space-y-4">
              <Heading size="h3">项目统计</Heading>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">软顶</span>
                  <span className="font-medium">{(Number(formatEther(ico.softCap)) * 3000).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">硬顶</span>
                  <span className="font-medium">{(Number(formatEther(ico.hardCap)) * 3000).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">已筹集</span>
                  <span className="font-medium">{(Number(formatEther(ico.raisedAmount)) * 3000).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">开始时间</span>
                  <span className="font-medium">{new Date(ico.startTime * 1000).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">结束时间</span>
                  <span className="font-medium">{new Date(ico.endTime * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ICODetail;
