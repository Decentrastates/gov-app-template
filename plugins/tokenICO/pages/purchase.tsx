import React, { useState, useEffect } from "react";
import { Button, Card, Tag, Heading, InputText, AlertInline } from "@aragon/gov-ui-kit";
import { getICOById } from "../utils/mockData";
import { ICOProject, ICOStatus, PurchaseTransaction, TransactionStatus } from "../utils/types";
import { formatEther, parseEther } from "viem";
import { useTranslation } from "next-i18next";
import {
  simulateTransactionDelay,
  simulateRandomTransactionFailure,
  generateMockTransactionHash,
} from "@/mock/transaction";
import { getCurrentUser } from "@/mock/user";

interface PurchasePageProps {
  icoId: string;
  onBack: () => void;
  onSuccess: (transaction: PurchaseTransaction) => void;
}

export const PurchasePage: React.FC<PurchasePageProps> = ({ icoId, onBack, onSuccess }) => {
  const { t } = useTranslation("common");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userBalance] = useState("10000.0"); // 模拟用户USDT余额

  const ico = getICOById(icoId);

  if (!ico) {
    return (
      <Card className="p-6">
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-neutral-800">项目未找到</h2>
          <p className="text-neutral-600">请检查项目ID是否正确</p>
          <Button variant="primary" onClick={onBack}>
            返回详情
          </Button>
        </div>
      </Card>
    );
  }

  if (ico.status !== ICOStatus.ACTIVE) {
    return (
      <Card className="p-6">
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-neutral-800">ICO未激活</h2>
          <p className="text-neutral-600">该ICO项目当前不可购买</p>
          <Button variant="primary" onClick={onBack}>
            返回详情
          </Button>
        </div>
      </Card>
    );
  }

  const calculateTokenAmount = (usdtAmount: string): string => {
    if (!usdtAmount || isNaN(Number(usdtAmount))) return "0";
    // 计算代币数量：USDT金额 / 代币价格(USDT)
    const usdtValue = Number(usdtAmount);
    const tokenPriceInUsdt = Number(formatEther(ico.tokenPrice)) * 3000;
    const tokenAmount = usdtValue / tokenPriceInUsdt;
    return tokenAmount.toFixed(6);
  };

  const validatePurchaseAmount = (amount: string): string | null => {
    if (!amount || isNaN(Number(amount))) {
      return "请输入有效的购买金额";
    }

    // 将USDT转换为ETH等价值进行验证
    const ethEquivalent = parseEther((Number(amount) / 3000).toString());

    if (ethEquivalent < ico.minPurchase) {
      return `最小购买金额为 ${(Number(formatEther(ico.minPurchase)) * 3000).toFixed(2)} USDT`;
    }

    if (ethEquivalent > ico.maxPurchase) {
      return `最大购买金额为 ${(Number(formatEther(ico.maxPurchase)) * 3000).toFixed(2)} USDT`;
    }

    if (Number(amount) > Number(userBalance)) {
      return "余额不足";
    }

    const remainingCap = ico.hardCap - ico.raisedAmount;
    if (ethEquivalent > remainingCap) {
      return `剩余额度仅 ${(parseFloat(formatEther(remainingCap)) * 3000).toFixed(2)} USDT`;
    }

    return null;
  };

  const handlePurchaseAmountChange = (value: string) => {
    setPurchaseAmount(value);
    setError(null);
  };

  const handleMaxClick = () => {
    const maxAmount = Math.min(
      parseFloat(formatEther(ico.maxPurchase)) * 3000, // 转换为USDT
      Number(userBalance),
      parseFloat(formatEther(ico.hardCap - ico.raisedAmount)) * 3000 // 转换为USDT
    );
    setPurchaseAmount(maxAmount.toFixed(2));
    setError(null);
  };

  const handlePurchase = async () => {
    const validationError = validatePurchaseAmount(purchaseAmount);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // 模拟区块链交易延迟
      await simulateTransactionDelay();

      // 模拟随机失败
      await simulateRandomTransactionFailure();

      const transaction: PurchaseTransaction = {
        id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        icoId: ico.id,
        userAddress: getCurrentUser().address, // 从mock用户数据获取地址
        ethAmount: parseEther((Number(purchaseAmount) / 3000).toString()), // 转换为ETH等价值
        tokenAmount: parseEther(calculateTokenAmount(purchaseAmount)),
        timestamp: Math.floor(Date.now() / 1000),
        txHash: generateMockTransactionHash(), // 使用统一的交易哈希生成函数
        status: TransactionStatus.CONFIRMED,
        gasUsed: BigInt("21000"),
        gasFee: parseEther("0.003"), // 调整为USDT等价的Gas费
      };

      setSuccess(`成功购买 ${calculateTokenAmount(purchaseAmount)} ${ico.symbol} 代币！`);

      // 延迟调用成功回调
      setTimeout(() => {
        onSuccess(transaction);
      }, 2000);
    } catch (err: any) {
      setError(err.message || "购买失败，请重试");
    } finally {
      setIsProcessing(false);
    }
  };

  const tokenAmount = calculateTokenAmount(purchaseAmount);
  const validationError = validatePurchaseAmount(purchaseAmount);
  const canPurchase = purchaseAmount && !validationError && !isProcessing;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* 返回按钮 */}
      <div className="flex items-center gap-4">
        <Button variant="tertiary" onClick={onBack} className="flex items-center gap-2">
          <span>←</span> 返回详情
        </Button>
        <div className="w-px h-6 bg-neutral-200"></div>
        <span className="text-sm text-neutral-600">购买代币</span>
      </div>

      {/* 项目信息卡片 */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <img src={ico.logoUrl} alt={ico.name} className="h-16 w-16 rounded-lg" />
          <div className="flex-1">
            <h1 className="mb-1 text-2xl font-semibold text-neutral-800">{ico.name}</h1>
            <p className="mb-2 text-lg text-neutral-600">{ico.symbol}</p>
            <Tag label="进行中" variant="success" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-neutral-50 p-4">
            <p className="mb-1 text-sm text-neutral-600">代币价格</p>
            <p className="text-xl font-semibold text-neutral-800">
              {(Number(formatEther(ico.tokenPrice)) * 3000).toFixed(2)} USDT
            </p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-4">
            <p className="mb-1 text-sm text-neutral-600">剩余额度</p>
            <p className="text-xl font-semibold text-neutral-800">
              {(Number(formatEther(ico.hardCap - ico.raisedAmount)) * 3000).toFixed(2)} USDT
            </p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-4">
            <p className="mb-1 text-sm text-neutral-600">筹资进度</p>
            <p className="text-xl font-semibold text-neutral-800">
              {((Number(formatEther(ico.raisedAmount)) / Number(formatEther(ico.hardCap))) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      {/* 购买表单 */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <Heading size="h2" className="mb-2 text-xl font-semibold text-neutral-800">
              购买代币
            </Heading>
            <p className="text-neutral-600">请输入您要购买的USDT数量</p>
          </div>

          {/* 用户余额 */}
          <div className="rounded-lg border bg-neutral-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-neutral-600">您的USDT余额</span>
              <span className="font-semibold text-neutral-800">{userBalance} USDT</span>
            </div>
          </div>

          {/* 购买金额输入 */}
          <div className="space-y-3">
            <label className="font-medium block text-neutral-800">购买金额 (USDT)</label>
            <div className="relative">
              <InputText
                value={purchaseAmount}
                onChange={(e) => handlePurchaseAmountChange(e.target.value)}
                placeholder="0.00"
                className="pr-16"
              />
              <Button
                variant="tertiary"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleMaxClick}
              >
                最大
              </Button>
            </div>
            <div className="flex justify-between text-sm text-neutral-600">
              <span>最小: {(parseFloat(formatEther(ico.minPurchase)) * 3000).toFixed(2)} USDT</span>
              <span>最大: {(parseFloat(formatEther(ico.maxPurchase)) * 3000).toFixed(2)} USDT</span>
            </div>
          </div>

          {/* 预计获得代币 */}
          {purchaseAmount && !isNaN(Number(purchaseAmount)) && (
            <div className="rounded-lg border bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">预计获得代币</span>
                <span className="font-semibold text-neutral-800">
                  {tokenAmount} {ico.symbol}
                </span>
              </div>
            </div>
          )}

          {/* 交易详情 */}
          {purchaseAmount && !isNaN(Number(purchaseAmount)) && (
            <div className="rounded-lg border bg-neutral-50 p-4">
              <h4 className="font-medium mb-3 text-neutral-800">交易详情</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">购买金额</span>
                  <span className="font-medium">{purchaseAmount} USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">代币价格</span>
                  <span className="font-medium">{(Number(formatEther(ico.tokenPrice)) * 3000).toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">获得代币</span>
                  <span className="font-medium">
                    {tokenAmount} {ico.symbol}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">预估Gas费</span>
                  <span className="font-medium">~3.0 USDT</span>
                </div>
                <div className="mt-2 border-t pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-neutral-800">总计</span>
                    <span className="font-semibold text-neutral-800">
                      {(Number(purchaseAmount) + 3.0).toFixed(2)} USDT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 错误提示 */}
          {error && <AlertInline message={error} variant="critical" />}

          {/* 成功提示 */}
          {success && <AlertInline message={success} variant="success" />}

          {/* 购买按钮 */}
          <Button variant="primary" size="lg" className="w-full" onClick={handlePurchase} disabled={!canPurchase}>
            {isProcessing ? "处理中..." : "确认购买"}
          </Button>

          {/* 风险提示 */}
          <div className="bg-amber-50 border-amber-200 rounded-lg border p-4">
            <h4 className="text-amber-800 font-medium mb-2">风险提示</h4>
            <ul className="text-amber-700 space-y-1 text-sm">
              <li>• 数字资产投资存在风险，请谨慎投资</li>
              <li>• 请确保您已充分了解项目风险</li>
              <li>• 投资前请仔细阅读项目白皮书</li>
              <li>• 请勿投资超过您承受能力的资金</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PurchasePage;
