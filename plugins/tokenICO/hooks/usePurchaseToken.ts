import { useState, useCallback } from "react";
import { parseEther, formatEther } from "viem";
import { PurchaseTransaction, TransactionStatus, ICOProject, ICOStatus } from "../utils/types";
import { getICOById } from "../utils/mockData";
import {
  simulateTransactionDelay,
  simulateRandomTransactionFailure,
  generateMockTransactionHash,
} from "@/mock/transaction";
import { getContractAddress } from "@/mock/config";

// 从配置获取合约地址
const TOKEN_ICO_CONTRACT_ADDRESS = getContractAddress("icoFactory");

interface UsePurchaseTokenProps {
  icoId: string;
  onSuccess?: (transaction: PurchaseTransaction) => void;
  onError?: (error: string) => void;
}

interface PurchaseTokenParams {
  ethAmount: string; // USDT amount
  userAddress?: string;
}

export const usePurchaseToken = ({ icoId, onSuccess, onError }: UsePurchaseTokenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<PurchaseTransaction | null>(null);

  const ico = getICOById(icoId);

  const validatePurchase = useCallback(
    (ethAmount: string): string | null => {
      if (!ico) {
        return "ICO项目未找到";
      }

      if (!ethAmount || isNaN(Number(ethAmount))) {
        return "请输入有效的购买金额";
      }

      const ethValue = parseEther(ethAmount);

      if (ethValue < ico.minPurchase) {
        return `最小购买金额为 ${(Number(formatEther(ico.minPurchase)) * 3000).toFixed(2)} USDT`;
      }

      if (ethValue > ico.maxPurchase) {
        return `最大购买金额为 ${(Number(formatEther(ico.maxPurchase)) * 3000).toFixed(2)} USDT`;
      }

      const remainingCap = ico.hardCap - ico.raisedAmount;
      if (ethValue > remainingCap) {
        return `剩余额度仅 ${(Number(formatEther(remainingCap)) * 3000).toFixed(2)} USDT`;
      }

      return null;
    },
    [ico]
  );

  const calculateTokenAmount = useCallback(
    (ethAmount: string): bigint => {
      if (!ico || !ethAmount || isNaN(Number(ethAmount))) {
        return BigInt(0);
      }

      const ethValue = parseEther(ethAmount);
      return ethValue / ico.tokenPrice;
    },
    [ico]
  );

  const purchaseTokens = useCallback(
    async ({ ethAmount, userAddress }: PurchaseTokenParams) => {
      if (!ico) {
        const errorMsg = "ICO项目未找到";
        setError(errorMsg);
        onError?.(errorMsg);
        return;
      }

      // 验证购买参数
      const validationError = validatePurchase(ethAmount);
      if (validationError) {
        setError(validationError);
        onError?.(validationError);
        return;
      }

      setIsLoading(true);
      setError(null);
      setTransaction(null);

      try {
        // 模拟区块链交易过程
        console.log("开始购买代币...", {
          icoId,
          ethAmount,
          userAddress: userAddress || "0x1234567890123456789012345678901234567890",
        });

        // 模拟交易延迟
        await simulateTransactionDelay();

        // 模拟随机失败
        await simulateRandomTransactionFailure();

        // 创建交易记录
        const newTransaction: PurchaseTransaction = {
          id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          icoId: ico.id,
          userAddress: userAddress || "0x1234567890123456789012345678901234567890",
          ethAmount: parseEther(ethAmount),
          tokenAmount: calculateTokenAmount(ethAmount),
          timestamp: Math.floor(Date.now() / 1000),
          txHash: generateMockTransactionHash(),
          status: TransactionStatus.CONFIRMED,
          gasUsed: BigInt("21000"),
          gasFee: parseEther("0.001"),
        };

        setTransaction(newTransaction);
        onSuccess?.(newTransaction);

        console.log("购买成功！", newTransaction);
      } catch (err: any) {
        const errorMsg = err.message || "购买失败，请重试";
        setError(errorMsg);
        onError?.(errorMsg);
        console.error("购买失败:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [ico, icoId, validatePurchase, calculateTokenAmount, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setError(null);
    setTransaction(null);
  }, []);

  return {
    // 状态
    isLoading,
    error,
    transaction,
    ico,

    // 方法
    purchaseTokens,
    validatePurchase,
    calculateTokenAmount,
    reset,

    // 计算属性
    canPurchase: !!ico && ico.status === ICOStatus.ACTIVE,
    contractAddress: TOKEN_ICO_CONTRACT_ADDRESS,
  };
};

// 获取用户购买历史的钩子
export const usePurchaseHistory = (userAddress?: string) => {
  const [history, setHistory] = useState<PurchaseTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!userAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      // 模拟从区块链或后端API获取购买历史
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟历史数据
      const mockHistory: PurchaseTransaction[] = [
        {
          id: "tx_1",
          icoId: "1",
          userAddress: userAddress,
          ethAmount: parseEther("1.5"),
          tokenAmount: parseEther("15"),
          timestamp: Math.floor(Date.now() / 1000) - 86400,
          txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          status: TransactionStatus.CONFIRMED,
          gasUsed: BigInt("21000"),
          gasFee: parseEther("0.001"),
        },
      ];

      setHistory(mockHistory);
    } catch (err: any) {
      setError(err.message || "获取购买历史失败");
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  const addTransaction = useCallback((transaction: PurchaseTransaction) => {
    setHistory((prev) => [transaction, ...prev]);
  }, []);

  return {
    history,
    isLoading,
    error,
    fetchHistory,
    addTransaction,
  };
};

export default usePurchaseToken;
