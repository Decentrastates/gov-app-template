import { Button, IconType, InputText, TextAreaRichText, Tag } from "@aragon/gov-ui-kit";
import React, { ReactNode, useState } from "react";
import { RawAction } from "@/utils/types";
import { Else, ElseIf, If, Then } from "@/components/if";
import { MainSection } from "@/components/layout/main-section";
import { useCreateProposal } from "../hooks/useCreateProposal";
import { useAccount } from "wagmi";
import { useCanCreateProposal } from "../hooks/useCanCreateProposal";
import { MissingContentView } from "@/components/MissingContentView";
import { useAppKit } from "@reown/appkit/react";
import { useTranslation } from "next-i18next";

import { Address } from "viem";
import { NewActionDialog, NewActionType } from "@/components/dialogs/NewActionDialog";
import { AddActionCard } from "@/components/cards/AddActionCard";
import { ProposalActions } from "@/components/proposalActions/proposalActions";
import { downloadAsFile } from "@/utils/download-as-file";
import { encodeActionsAsJson } from "@/utils/json-actions";

export default function Create() {
  const { address: selfAddress, isConnected } = useAccount();
  const canCreate = useCanCreateProposal();
  const { t } = useTranslation("common");
  const [addActionType, setAddActionType] = useState<NewActionType>("");
  const {
    title,
    summary,
    description,
    actions,
    resources,
    setTitle,
    setSummary,
    setDescription,
    setActions,
    setResources,
    isCreating,
    submitProposal,
  } = useCreateProposal();

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target?.value);
  };
  const handleSummaryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(event?.target?.value);
  };
  const handleNewActionDialogClose = (newAction: RawAction[] | null) => {
    if (!newAction) {
      setAddActionType("");
      return;
    }

    setActions(actions.concat(newAction));
    setAddActionType("");
  };
  const onRemoveAction = (idx: number) => {
    actions.splice(idx, 1);
    setActions([].concat(actions as any));
  };
  const removeResource = (idx: number) => {
    resources.splice(idx, 1);
    setResources([].concat(resources as any));
  };
  const onResourceNameChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    resources[idx].name = event.target.value;
    setResources([].concat(resources as any));
  };
  const onResourceUrlChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    resources[idx].url = event.target.value;
    setResources([].concat(resources as any));
  };

  const exportAsJson = () => {
    if (!actions.length) return;

    const strResult = encodeActionsAsJson(actions);
    downloadAsFile("actions.json", strResult, "text/json");
  };

  return (
    <MainSection narrow>
      <div className="w-full justify-between">
        <h1 className="mb-8 line-clamp-1 flex flex-1 shrink-0 text-2xl font-normal leading-tight text-neutral-800 md:text-3xl">
          {t("tokenVoting.newProposal.title")}
        </h1>

        <PlaceHolderOr selfAddress={selfAddress} canCreate={canCreate} isConnected={isConnected}>
          <div className="mb-6">
            <InputText
              className=""
              label={t("tokenVoting.newProposal.titleLabel")}
              maxLength={100}
              placeholder={t("tokenVoting.newProposal.titlePlaceholder")}
              variant="default"
              value={title}
              readOnly={isCreating}
              onChange={handleTitleInput}
            />
          </div>
          <div className="mb-6">
            <InputText
              className=""
              label={t("tokenVoting.newProposal.summaryLabel")}
              maxLength={280}
              placeholder={t("tokenVoting.newProposal.summaryPlaceholder")}
              variant="default"
              value={summary}
              readOnly={isCreating}
              onChange={handleSummaryInput}
            />
          </div>
          <div className="mb-6">
            <TextAreaRichText
              label={t("tokenVoting.newProposal.bodyLabel")}
              className="pt-2"
              value={description}
              onChange={setDescription}
              placeholder={t("tokenVoting.newProposal.bodyPlaceholder")}
            />
          </div>

          <div className="mb-6 flex flex-col gap-y-2 md:gap-y-3">
            <div className="flex flex-col gap-0.5 md:gap-1">
              <div className="flex gap-x-3">
                <p className="text-base font-normal leading-tight text-neutral-800 md:text-lg">
                  {t("tokenVoting.newProposal.resources")}
                </p>
                <Tag label={t("tokenVoting.newProposal.optional")} />
              </div>
              <p className="text-sm font-normal leading-normal text-neutral-500 md:text-base">
                {t("tokenVoting.newProposal.addResourcesDescription")}
              </p>
            </div>
            <div className="flex flex-col gap-y-4 rounded-xl border border-neutral-100 bg-neutral-0 p-4">
              <If lengthOf={resources} is={0}>
                <p className="text-sm font-normal leading-normal text-neutral-500 md:text-base">
                  {t("tokenVoting.newProposal.noResourcesYet")}
                </p>
              </If>
              {resources.map((resource, idx) => {
                return (
                  <div key={idx} className="flex flex-col gap-y-3 py-3 md:py-4">
                    <div className="flex items-end gap-x-3">
                      <InputText
                        label={t("tokenVoting.newProposal.resourceNameLabel")}
                        readOnly={isCreating}
                        value={resource.name}
                        onChange={(e) => onResourceNameChange(e, idx)}
                        placeholder={t("tokenVoting.newProposal.resourceNamePlaceholder")}
                      />
                      <Button
                        size="lg"
                        variant="tertiary"
                        onClick={() => removeResource(idx)}
                        iconLeft={IconType.MINUS}
                      />
                    </div>
                    <InputText
                      label={t("tokenVoting.newProposal.urlLabel")}
                      value={resource.url}
                      onChange={(e) => onResourceUrlChange(e, idx)}
                      placeholder={t("tokenVoting.newProposal.urlPlaceholder")}
                      readOnly={isCreating}
                    />
                  </div>
                );
              })}
            </div>
            <span className="mt-3">
              <Button
                variant="tertiary"
                size="lg"
                iconLeft={IconType.PLUS}
                disabled={isCreating}
                onClick={() => {
                  setResources(resources.concat({ url: "", name: "" }));
                }}
              >
                {t("tokenVoting.newProposal.addResourceButton")}
              </Button>
            </span>
          </div>

          {/* Actions */}

          <ProposalActions
            actions={actions}
            emptyListDescription={t("tokenVoting.newProposal.noActionsDefined")}
            onRemove={(idx) => onRemoveAction(idx)}
          />

          <If lengthOf={actions} above={0}>
            <Button
              className="mt-6"
              iconLeft={IconType.RICHTEXT_LIST_UNORDERED}
              size="lg"
              variant="tertiary"
              onClick={() => exportAsJson()}
            >
              {t("tokenVoting.newProposal.exportActionsAsJson")}
            </Button>
          </If>

          <div className="mt-8 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            <AddActionCard
              title={t("tokenVoting.newProposal.addPayment")}
              icon={IconType.WITHDRAW}
              disabled={isCreating}
              onClick={() => setAddActionType("withdrawal")}
            />
            <AddActionCard
              title={t("tokenVoting.newProposal.addFunctionCall")}
              icon={IconType.BLOCKCHAIN_BLOCKCHAIN}
              disabled={isCreating}
              onClick={() => setAddActionType("select-abi-function")}
            />
            <AddActionCard
              title={t("tokenVoting.newProposal.addRawCalldata")}
              icon={IconType.COPY}
              disabled={isCreating}
              onClick={() => setAddActionType("calldata")}
            />
            <AddActionCard
              title={t("tokenVoting.newProposal.importJsonActions")}
              disabled={isCreating}
              icon={IconType.RICHTEXT_LIST_UNORDERED}
              onClick={() => setAddActionType("import-json")}
            />
          </div>

          {/* Dialog */}

          <NewActionDialog
            newActionType={addActionType}
            onClose={(newActions) => handleNewActionDialogClose(newActions)}
          />

          {/* Submit */}

          <div className="mt-6 flex w-full flex-col items-center">
            <Button
              isLoading={isCreating}
              className="mt-3 border-primary-400"
              size="lg"
              variant={actions.length ? "primary" : "secondary"}
              onClick={() => submitProposal()}
            >
              <If lengthOf={actions} above={0}>
                <Then>{t("tokenVoting.newProposal.submitProposal")}</Then>
                <Else>{t("tokenVoting.newProposal.submitSignalingProposal")}</Else>
              </If>
            </Button>
          </div>
        </PlaceHolderOr>
      </div>
    </MainSection>
  );
}

const PlaceHolderOr = ({
  selfAddress,
  isConnected,
  canCreate,
  children,
}: {
  selfAddress: Address | undefined;
  isConnected: boolean;
  canCreate: boolean | undefined;
  children: ReactNode;
}) => {
  const { t } = useTranslation("common");
  const { open } = useAppKit();
  return (
    <If true={!selfAddress || !isConnected}>
      <Then>
        {/* Not connected */}
        <MissingContentView callToAction={t("tokenVoting.newProposal.connectWallet")} onClick={() => open()}>
          {t("tokenVoting.newProposal.pleaseConnectWallet")}
        </MissingContentView>
      </Then>
      <ElseIf true={!canCreate}>
        {/* Not a member */}
        <MissingContentView>{t("tokenVoting.newProposal.cannotCreateProposal")}</MissingContentView>
      </ElseIf>
      <Else>{children}</Else>
    </If>
  );
};
