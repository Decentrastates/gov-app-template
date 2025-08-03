import { usePublicClient } from "wagmi";
import { MultisigPluginAbi } from "@/plugins/members/artifacts/MultisigPlugin.sol";
import { PUB_MULTISIG_PLUGIN_ADDRESS } from "@/constants";
import { type Address, type PublicClient, getAbiItem } from "viem";
import { useEffect, useState } from "react";

const MembersAddedEvent = getAbiItem({
  abi: MultisigPluginAbi,
  name: "MembersAdded",
});
const MembersRemovedEvent = getAbiItem({
  abi: MultisigPluginAbi,
  name: "MembersRemoved",
});

export function useMultisigMembers() {
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [signers, setSigners] = useState<Address[]>([]);

  console.log("useMultisigMembers", publicClient);

  // Creation event
  useEffect(() => {
    if (!publicClient) return;

    loadSigners();
  }, [!!publicClient]);

  const loadSigners = () => {
    if (!publicClient) {
      setError(new Error("No public client available"));
      return;
    }
    setIsLoading(true);

    Promise.all([fetchAddedMembers(publicClient), fetchRemovedMembers(publicClient)])
      .then(([added, removed]) => {
        console.log("added", added);
        console.log("removed", removed);
        const result = computeFinalList(added, removed);

        setSigners(result);
        setIsLoading(false);
        setError(null);
      })
      .catch((err: any) => {
        console.error(err);
        setIsLoading(false);
        setError(err);
      });
  };

  // return { members, status, refetch };

  return {
    members: signers,
    isLoading,
    error,
    refetch: loadSigners,
  };
}

// Helpers

/**
 * 从区块链获取已添加成员的历史记录
 * @param publicClient - Viem 公共客户端实例
 * @returns 返回包含成员添加记录的数组,每条记录包含区块号、添加的成员地址列表和移除的成员地址列表(空数组)
 * @throws 当获取日志为空时抛出错误
 */
async function fetchAddedMembers(publicClient: PublicClient): Promise<MemberAddRemoveItem[]> {
  const logs = await publicClient.getLogs({
    address: PUB_MULTISIG_PLUGIN_ADDRESS,
    event: MembersAddedEvent,
    // args: {},
    fromBlock: BigInt(0),
    toBlock: "latest",
  });
  if (!logs) throw new Error("Empty response");
  return logs.map((item) => {
    return {
      blockNumber: item.blockNumber,
      added: item.args.members || ([] as any),
      removed: [],
    };
  });
}

/**
 * 从区块链获取已移除的成员列表
 * @param publicClient - Viem 公共客户端实例
 * @returns 返回包含区块号和移除成员地址的数组
 * @throws 当日志为空时抛出错误
 */
async function fetchRemovedMembers(publicClient: PublicClient): Promise<MemberAddRemoveItem[]> {
  const logs = await publicClient.getLogs({
    address: PUB_MULTISIG_PLUGIN_ADDRESS,
    event: MembersRemovedEvent,
    // args: {},
    fromBlock: BigInt(0),
    toBlock: "latest",
  });
  if (!logs) throw new Error("Empty response");
  return logs.map((item) => {
    return {
      blockNumber: item.blockNumber,
      added: [],
      removed: item.args.members || ([] as any),
    };
  });
}

type MemberAddRemoveItem = {
  blockNumber: bigint;
  added: Address[];
  removed: Address[];
};

/**
 * 计算最终的成员列表
 * 根据添加和移除记录按时间顺序合并处理，得到最终的成员地址列表
 * @param added - 添加成员的记录数组
 * @param removed - 移除成员的记录数组
 * @returns 最终的成员地址列表
 */
function computeFinalList(added: MemberAddRemoveItem[], removed: MemberAddRemoveItem[]) {
  const merged = added.concat(removed);
  const result = [] as Address[];

  merged.sort((a, b) => {
    return Number(a.blockNumber - b.blockNumber);
  });

  for (const item of merged) {
    for (const addr of item.added) {
      if (!result.includes(addr)) result.push(addr);
    }
    for (const addr of item.removed) {
      const idx = result.indexOf(addr);
      if (idx >= 0) result.splice(idx, 1);
    }
  }
  return result;
}
