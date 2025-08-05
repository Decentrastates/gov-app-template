import { useState, useEffect, useMemo } from "react";
import { ICOProject, ICOStatus, ICOCategory } from "../utils/types";
import { mockICOProjects, getICOById, getICOsByStatus, getICOsByCategory, calculateProgress } from "../utils/mockData";
import { simulateApiDelay } from "@/mock/config";

// 获取所有ICO项目的钩子
export const useICOList = () => {
  const [icos, setIcos] = useState<ICOProject[]>(mockICOProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 模拟API调用延迟
      await simulateApiDelay();
      setIcos(mockICOProjects);
    } catch (err: any) {
      setError(err.message || "获取数据失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    icos,
    loading,
    error,
    refreshData,
  };
};

// 获取单个ICO项目详情的钩子
export const useICODetail = (icoId: string) => {
  const [ico, setIco] = useState<ICOProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchICO = async () => {
      setLoading(true);
      setError(null);
      try {
        // 模拟API调用延迟
        await simulateApiDelay();
        const icoData = getICOById(icoId);
        if (!icoData) {
          throw new Error("ICO项目未找到");
        }
        setIco(icoData);
      } catch (err: any) {
        setError(err.message || "获取ICO详情失败");
      } finally {
        setLoading(false);
      }
    };

    if (icoId) {
      fetchICO();
    }
  }, [icoId]);

  const progress = useMemo(() => {
    return ico ? calculateProgress(ico) : 0;
  }, [ico]);

  return {
    ico,
    loading,
    error,
    progress,
  };
};

// 筛选ICO项目的钩子
export const useICOFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ICOStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ICOCategory | "all">("all");

  const filterICOs = (icos: ICOProject[]) => {
    let filtered = icos;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(
        (ico) =>
          ico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ico.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ico.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 状态过滤
    if (statusFilter !== "all") {
      filtered = filtered.filter((ico) => ico.status === statusFilter);
    }

    // 分类过滤
    if (categoryFilter !== "all") {
      filtered = filtered.filter((ico) => ico.category === categoryFilter);
    }

    return filtered;
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    filterICOs,
    resetFilters,
  };
};

// ICO统计数据的钩子
export const useICOStats = () => {
  const { icos } = useICOList();

  const stats = useMemo(() => {
    const totalProjects = icos.length;
    const activeProjects = icos.filter((ico) => ico.status === ICOStatus.ACTIVE).length;
    const successfulProjects = icos.filter((ico) => ico.status === ICOStatus.SUCCESSFUL).length;
    const upcomingProjects = icos.filter((ico) => ico.status === ICOStatus.UPCOMING).length;

    const totalRaised = icos.reduce((sum, ico) => sum + Number(ico.raisedAmount), 0);
    const totalHardCap = icos.reduce((sum, ico) => sum + Number(ico.hardCap), 0);

    return {
      totalProjects,
      activeProjects,
      successfulProjects,
      upcomingProjects,
      totalRaised,
      totalHardCap,
      averageProgress:
        totalProjects > 0 ? icos.reduce((sum, ico) => sum + calculateProgress(ico), 0) / totalProjects : 0,
    };
  }, [icos]);

  return stats;
};
