import { MainSection } from "@/components/layout/main-section";
// import { type ReactNode } from "react";
import { useAccount } from "wagmi";
// import { Else, If, Then } from "@/components/if";
// import { PUB_APP_NAME } from "@/constants";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DaoResources } from "@/components/dashboard/DaoResources";
import dynamic from "next/dynamic";
import { DaoDataListItemStructure } from "@aragon/gov-ui-kit";
import { DaoList } from "@/components/dashboard/DaoList";
import { useAppKit } from "@reown/appkit/react";

// const MemberDataListItemStructure = dynamic(
//   () => import("@aragon/gov-ui-kit").then((mod) => mod.MemberDataListItemStructure),
//   { ssr: false }
// );

export default function StandardHome() {
  const { isConnected } = useAccount();
  const { open } = useAppKit();
  const { t } = useTranslation("common");

  return (
    <MainSection>
      <main className="mx-auto">
        <div className="w-full pb-4 md:pb-6">
          <DaoResources />
        </div>
        {/* <MemberDataListItemStructure address="0x1234567890123456789012345678901234567890" /> */}
        <DaoList />
        {/* <StaticListComponent itemsCount={21} layoutClassName="grid grid-cols-1 lg:grid-cols-3" pageSize={9} /> */}
        {/* <div className="flex flex-col gap-y-10 pb-6 pt-10 md:flex-row md:gap-x-12 md:pb-12">
          <LatestProposals />
          <section className="flex flex-shrink flex-col gap-y-10 md:max-w-[464px] lg:w-full">
            <LatestTweets />
          </section>
        </div> */}
      </main>
    </MainSection>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
