import { MainSection } from "@/components/layout/main-section";
import { Button, Heading, Toggle, ToggleGroup } from "@aragon/gov-ui-kit";
import { PUB_APP_NAME, PUB_PROJECT_URL } from "@/constants";
import { useState } from "react";
import { useAccount } from "wagmi";
import { DelegateAnnouncementDialog } from "../components/DelegateAnnouncementDialog";
import { DelegateMemberList } from "../components/DelegateMemberList";
import { AddressText } from "@/components/text/address";
import { PUB_TOKEN_ADDRESS } from "@/constants";
import { Else, ElseIf, If, Then } from "@/components/if";
import { useAppKit } from "@reown/appkit/react";

import { useDelegates } from "../hooks/useDelegates";
import { useDelegateAnnounce } from "../hooks/useDelegateAnnounce";
import { MultisigMemberList } from "../components/MultisigMemberList";
import { useMultisigMembers } from "../hooks/useMultisigMembers";
import { useTranslation } from "next-i18next";

export default function MembersList() {
  const { t } = useTranslation("common");
  const { open } = useAppKit();
  const [showProfileCreationDialog, setShowProfileCreationDialog] = useState(false);
  const { address, isConnected } = useAccount();
  const { delegates } = useDelegates();
  const delegateCount = delegates?.length || 0;
  const { members: multisigMembers, isLoading: isLoadingMultisigMembers } = useMultisigMembers();

  const [toggleValue, setToggleValue] = useState<"all" | "verified" | "multisig" | "holders">("all");
  const onToggleChange = (value: string | undefined) => {
    if (value) setToggleValue(value as "all" | "verified");
  };

  const { announce } = useDelegateAnnounce(address);

  return (
    <>
      <MainSection>
        <div className="flex w-full max-w-[1280] flex-col gap-x-10 gap-y-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-y-6">
            <div className="flex items-start justify-between">
              <If some={[toggleValue === "all", toggleValue === "verified"]}>
                <Then>
                  <Heading size="h1">{t("members.delegates.title")}</Heading>
                </Then>
                <ElseIf some={[toggleValue === "holders"]}>
                  <Heading size="h1">{t("members.holders.title")}</Heading>
                </ElseIf>
                <Else>
                  <Heading size="h1">{t("members.security_council.title")}</Heading>
                </Else>
              </If>

              <ToggleGroup
                isMultiSelect={false}
                onChange={onToggleChange}
                value={toggleValue}
                className="flex justify-end"
              >
                <Toggle value="holders" label={t("members.filter.holders")} className="rounded-lg" />
                <Toggle value="all" label={t("members.filter.registered")} className="rounded-lg" />
                <Toggle value="verified" label={t("members.filter.verified")} className="rounded-lg" />
                <Toggle value="multisig" label={t("members.filter.security_council")} className="rounded-lg" />
              </ToggleGroup>
            </div>
            <If some={[toggleValue === "all", toggleValue === "verified"]}>
              <Then>
                <DelegateMemberList verifiedOnly={toggleValue === "verified"} />
              </Then>
              <ElseIf some={[toggleValue === "holders"]}>
                {/* <StaticListComponent itemsCount={21} layoutClassName="grid grid-cols-1 lg:grid-cols-3" pageSize={9} /> */}
              </ElseIf>
              <Else>
                <MultisigMemberList />
              </Else>
            </If>
          </div>
          <aside className="flex w-full flex-col gap-y-4 lg:max-w-[280px] lg:gap-y-6">
            <div className="flex flex-col gap-y-3">
              <Heading size="h3">{t("members.details.title")}</Heading>
              <If some={[toggleValue === "all", toggleValue === "verified"]}>
                <Then>
                  <p className="text-neutral-500">{t("members.details.delegation_description")}</p>
                </Then>
                <Else>
                  <p className="text-neutral-500">{t("members.details.security_council_description")}</p>
                </Else>
              </If>
            </div>
            <dl className="divide-y divide-neutral-100">
              <div className="flex flex-col items-baseline gap-y-2 py-3 lg:gap-x-6 lg:py-4">
                <dt className="line-clamp-1 shrink-0 text-lg leading-tight text-neutral-800 lg:line-clamp-6 lg:w-40">
                  {t("members.details.about_project")}
                </dt>
                <dd className="size-full text-base leading-tight text-neutral-500">
                  <a href={PUB_PROJECT_URL} target="_blank" className="font-semibold text-primary-400 underline">
                    {t("members.details.learn_more", { appName: PUB_APP_NAME })}
                  </a>
                </dd>
              </div>
              <If some={[toggleValue === "all", toggleValue === "verified"]}>
                <Then>
                  <div className="flex flex-col items-baseline gap-y-2 py-3 lg:gap-x-6 lg:py-4">
                    <dt className="line-clamp-1 shrink-0 text-lg leading-tight text-neutral-800 lg:line-clamp-6 lg:w-40">
                      {/* Token contract */}
                      {t("members.details.token-contract")}
                    </dt>
                    <dd className="size-full text-base leading-tight text-neutral-500">
                      <AddressText>{PUB_TOKEN_ADDRESS}</AddressText>
                    </dd>
                  </div>
                  <div className="flex flex-col items-baseline gap-y-2 py-3 lg:gap-x-6 lg:py-4">
                    <dt className="line-clamp-1 shrink-0 text-lg leading-tight text-neutral-800 lg:line-clamp-6 lg:w-40">
                      {t("members.details.delegates")}
                    </dt>
                    <dd className="size-full text-base leading-tight text-neutral-500">
                      {delegateCount === 1
                        ? `1 ${t("members.details.delegate")}`
                        : `${delegateCount} ${t("members.details.delegates")}`}{" "}
                      {t("members.filter.registered")}
                    </dd>
                  </div>
                </Then>
                <Else>
                  <If not={isLoadingMultisigMembers}>
                    <div className="flex flex-col items-baseline gap-y-2 py-3 lg:gap-x-6 lg:py-4">
                      <dt className="line-clamp-1 shrink-0 text-lg leading-tight text-neutral-800 lg:line-clamp-6 lg:w-40">
                        {/* Security Council */}
                        {t("members.filter.security_council")}
                      </dt>
                      <dd className="size-full text-base leading-tight text-neutral-500">
                        {multisigMembers?.length === 1
                          ? `1 ${t("members.security_council.member")}`
                          : `${multisigMembers?.length || 0} ${t("members.security_council.members")}`}
                      </dd>
                    </div>
                  </If>
                </Else>
              </If>
            </dl>
            <If not={isConnected}>
              <Then>
                <Button onClick={() => open()}>{t("members.profile.connect_to_create")}</Button>
              </Then>
              <ElseIf val={toggleValue} is="multisig">
                {/* nop */}
              </ElseIf>
              <ElseIf true={announce}>
                <Button onClick={() => setShowProfileCreationDialog(true)}>{t("members.profile.update")}</Button>
              </ElseIf>
              <Else>
                <Button onClick={() => setShowProfileCreationDialog(true)}>{t("members.profile.create")}</Button>
              </Else>
            </If>

            <DelegateAnnouncementDialog
              onClose={() => setShowProfileCreationDialog(false)}
              open={showProfileCreationDialog}
            />
          </aside>
        </div>
      </MainSection>
    </>
  );
}
