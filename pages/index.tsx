import { MainSection } from "@/components/layout/main-section";
// import { type ReactNode } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
// import { Else, If, Then } from "@/components/if";
// import { PUB_APP_NAME } from "@/constants";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { DaoResources } from "@/components/dashboard/DaoResources";
import dynamic from "next/dynamic";
import { DaoDataListItemStructure } from "@aragon/gov-ui-kit";
import { DaoList } from "@/components/dashboard/DaoList";

const MemberDataListItemStructure = dynamic(
  () => import("@aragon/gov-ui-kit").then((mod) => mod.MemberDataListItemStructure),
  { ssr: false }
);

export default function StandardHome() {
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { t } = useTranslation("common");

  return (
    <MainSection>
      <main className="mx-auto max-w-screen-xl">
        {/* <div className="w-full pb-4 md:pb-6">
          <DaoResources />
        </div> */}
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
      {/* <Card>
        <h1 className="line-clamp-1 flex flex-1 shrink-0 text-2xl font-normal leading-tight text-neutral-800 md:text-3xl">
          {t("home.welcome", { appName: PUB_APP_NAME })}
        </h1>
        <p className="text-md text-neutral-400">{t("home.description")}</p>
        <div className="">
          <IllustrationHuman className="mx-auto mb-10 max-w-96" body="BLOCKS" expression="SMILE_WINK" hairs="CURLY" />
          <div className="flex justify-center">
            <If true={isConnected}>
              <Else>
                <Button size="md" variant="primary" onClick={() => open()}>
                  <span>{t("home.connect_wallet")}</span>
                </Button>
              </Else>
            </If>
          </div>
        </div>
      </Card> */}
    </MainSection>
  );
}

// This should be encapsulated
// const Card = function ({ children }: { children: ReactNode }) {
//   return (
//     <div
//       className="xs:px-10 mb-6 box-border flex
//     w-full flex-col space-y-6
//     rounded-xl border border-neutral-100
//     bg-neutral-0 px-4 py-5 focus:outline-none focus:ring focus:ring-primary
//     md:px-6 lg:px-7"
//     >
//       {children}
//     </div>
//   );
// };

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
