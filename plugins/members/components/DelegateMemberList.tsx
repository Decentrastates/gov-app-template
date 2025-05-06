import { useState } from "react";
import { DataList, IllustrationHuman } from "@aragon/gov-ui-kit";
import { useTranslation } from "next-i18next";
import { DelegateListItem } from "./DelegateListItem";
import { equalAddresses } from "@/utils/evm";
import { useDelegates } from "../hooks/useDelegates";
import { useTokenVotes } from "../../../hooks/useTokenVotes";
import { useAccount } from "wagmi";
import VerifiedDelegates from "../../../verified-delegates.json";
import { PleaseWaitSpinner } from "@/components/please-wait";
// import { generateSortOptions, sortItems } from "./utils";

// const DEFAULT_PAGE_SIZE = 12;

interface IDelegateMemberListProps {
  verifiedOnly?: boolean;
}

export const DelegateMemberList: React.FC<IDelegateMemberListProps> = ({ verifiedOnly }) => {
  const { t } = useTranslation("common");
  const { address } = useAccount();
  const [searchValue, setSearchValue] = useState<string>();
  //   const [activeSort, setActiveSort] = useState<string>();
  const { delegates: fetchedDelegates, status: loadingStatus } = useDelegates();
  const { delegatesTo } = useTokenVotes(address);
  const delegates = (fetchedDelegates || []).filter((item) => {
    if (!verifiedOnly) return true;
    return VerifiedDelegates.findIndex((d) => equalAddresses(d.address, item)) >= 0;
  });

  if (loadingStatus === "pending" && !delegates?.length) {
    return <PleaseWaitSpinner fullMessage={t("members.delegates.loading")} />;
  } else if (!delegates?.length) {
    return <NoDelegatesView verified={verifiedOnly} />;
  }

  const filteredDelegates = (delegates || []).filter((item) => {
    if (!searchValue?.trim()) return true;
    return item.toLowerCase().includes(searchValue.toLowerCase());
  });

  const totalMembers = filteredDelegates.length || 0;
  const showPagination = false;
  // const showPagination = (totalMembers ?? 0) > DEFAULT_PAGE_SIZE;

  if (!totalMembers) {
    return (
      <DataList.Root entityLabel="No members" itemsCount={0}>
        <DataList.Filter
          onSearchValueChange={setSearchValue}
          searchValue={searchValue}
          placeholder={t("members.delegates.filter_placeholder")}
          // onSortChange={setActiveSort}
          // activeSort={activeSort}
          // sortItems={sortItems}
        />
        <NoDelegatesView filtered={!!searchValue?.trim()} verified={verifiedOnly} />
      </DataList.Root>
    );
  }

  return (
    <DataList.Root
      entityLabel={totalMembers === 1 ? "delegate" : "delegates"}
      itemsCount={totalMembers}
      // pageSize={DEFAULT_PAGE_SIZE}
      // state={dataListState}
      // onLoadMore={fetchNextPage}
    >
      <DataList.Filter
        onSearchValueChange={setSearchValue}
        searchValue={searchValue}
        placeholder="Filter by address"
        // onSortChange={setActiveSort}
        // activeSort={activeSort}
        // sortItems={sortItems}
      />
      <DataList.Container
        // SkeletonElement={MemberDataListItem.Skeleton}
        // errorState={errorState}
        // emptyState={emptyState}
        className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-3"
      >
        {filteredDelegates.map((delegate) => (
          <DelegateListItem
            isMyDelegate={equalAddresses(delegatesTo, delegate)}
            key={delegate}
            href={"#/delegates/" + delegate}
            address={delegate}
          />
        ))}
      </DataList.Container>
      {showPagination && <DataList.Pagination />}
    </DataList.Root>
  );
};

function NoDelegatesView({ verified, filtered }: { verified?: boolean; filtered?: boolean }) {
  const { t } = useTranslation("common");
  const messageKey = filtered
    ? verified
      ? "members.delegates.no_delegates.verified_filtered"
      : "members.delegates.no_delegates.all_filtered"
    : verified
      ? "members.delegates.no_delegates.verified_empty"
      : "members.delegates.no_delegates.all_empty";
  const message = t(messageKey);

  return (
    <div className="w-full">
      <p className="text-md text-neutral-400">{message}</p>
      <IllustrationHuman className="mx-auto mb-10 max-w-72" body="VOTING" expression="CASUAL" hairs="CURLY" />
    </div>
  );
}
