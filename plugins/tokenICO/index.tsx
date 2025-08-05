import React, { useState } from "react";
import ICOList from "./pages/list";
import ICODetail from "./pages/detail";
import PurchasePage from "./pages/purchase";
import { PurchaseTransaction } from "./utils/types";

type PageType = "list" | "detail" | "purchase";

interface PageState {
  type: PageType;
  icoId?: string;
}

export const TokenICOPlugin: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>({ type: "list" });
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseTransaction[]>([]);

  const navigateToList = () => {
    setCurrentPage({ type: "list" });
  };

  const navigateToDetail = (icoId: string) => {
    setCurrentPage({ type: "detail", icoId });
  };

  const navigateToPurchase = (icoId: string) => {
    setCurrentPage({ type: "purchase", icoId });
  };

  const handlePurchaseSuccess = (transaction: PurchaseTransaction) => {
    setPurchaseHistory((prev) => [transaction, ...prev]);
    // 购买成功后返回详情页
    if (currentPage.icoId) {
      navigateToDetail(currentPage.icoId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage.type) {
      case "list":
        return <ICOList onSelectICO={navigateToDetail} />;

      case "detail":
        if (!currentPage.icoId) {
          navigateToList();
          return null;
        }
        return <ICODetail icoId={currentPage.icoId} onPurchase={navigateToPurchase} onBack={navigateToList} />;

      case "purchase":
        if (!currentPage.icoId) {
          navigateToList();
          return null;
        }
        return (
          <PurchasePage
            icoId={currentPage.icoId}
            onBack={() => navigateToDetail(currentPage.icoId!)}
            onSuccess={handlePurchaseSuccess}
          />
        );

      default:
        return <ICOList onSelectICO={navigateToDetail} />;
    }
  };

  return <div className="container mx-auto px-4 py-6">{renderCurrentPage()}</div>;
};

export default TokenICOPlugin;
