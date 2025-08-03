// import { MemberProfile } from "@/components/nav/routes";
import { If } from "@/components/if";
import { useAnnounceDelegation } from "@/plugins/members/hooks/useAnnounceDelegation";
import { type IAnnouncementMetadata } from "@/plugins/members/utils/types";
import { EMAIL_PATTERN, URL_PATTERN, URL_WITH_PROTOCOL_PATTERN } from "@/utils/input-values";
import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Dropdown,
  IconType,
  InputText,
  Tag,
  TextArea,
  TextAreaRichText,
  type IDialogRootProps,
} from "@aragon/gov-ui-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { z } from "zod";
import { useTranslation } from "next-i18next";

const DELEGATE_RESOURCES = "resources";

const UrlRegex = new RegExp(URL_PATTERN);
const EmailRegex = new RegExp(EMAIL_PATTERN);
const UrlWithProtocolRegex = new RegExp(URL_WITH_PROTOCOL_PATTERN);
const EmptyParagraphRegex = new RegExp(/^(?!<p><\/p>$).*/i);

interface IDelegateAnnouncementDialogProps extends IDialogRootProps {
  onClose: () => void;
}

export const DelegateAnnouncementDialog: React.FC<IDelegateAnnouncementDialogProps> = (props) => {
  const { onClose, ...otherProps } = props;
  const router = useRouter();
  const { address } = useAccount();
  const { t } = useTranslation("common");

  const ResourceSchema = z
    .object({
      name: z.string().optional(),
      link: z
        .string()
        .optional()
        .refine((val) => !val || UrlRegex.test(val) || z.string().email().safeParse(val).success, {
          message: t("delegate.invalidResourceLink"),
        }),
    })
    .refine(
      (data) =>
        // 同时存在（非空字符串）或同时不存在
        (!!data.name && !!data.link) || (!data.name && !data.link),
      (data) => ({
        message: data.name ? t("delegate.linkRequired") : t("delegate.nameRequired"),
        path: data.name ? ["link"] : ["name"],
      })
    );

  const MetadataSchema = z.object({
    identifier: z.string().min(1, { message: t("delegate.identifierRequired") }),
    bio: z.string().min(1, { message: t("delegate.bioRequired") }),
    message: z.string().regex(EmptyParagraphRegex, { message: t("delegate.messageRequired") }),
    resources: z.array(ResourceSchema).optional(),
  });

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof MetadataSchema>>({
    resolver: zodResolver(MetadataSchema),
    mode: "onTouched",
    defaultValues: { bio: "", message: "<p></p>", resources: [{ name: "", link: "" }] },
  });
  const { fields, append, remove } = useFieldArray({ name: DELEGATE_RESOURCES, control });

  const onSuccessfulAnnouncement = () => {
    router.push("#/delegates/" + address!);
  };
  const { isConfirming, status, announceDelegation } = useAnnounceDelegation(onSuccessfulAnnouncement);

  const handleAnnouncement = async (values: z.infer<typeof MetadataSchema>) => {
    announceDelegation({
      ...values,
      resources: values.resources?.filter((r) => !!r.link && !!r.name) as IAnnouncementMetadata["resources"],
    });
  };

  const addProtocolToLink = (index: number) => {
    const linkKey = `${DELEGATE_RESOURCES}.${index}.link` as const;
    const value = getValues(linkKey) ?? "";

    if (UrlRegex.test(value) && !EmailRegex.test(value) && !UrlWithProtocolRegex.test(value)) {
      setValue(linkKey, `http://${value}`);
    }
  };

  const ctaLabel = isConfirming
    ? t("delegate.creatingProfile")
    : status === "pending"
      ? t("delegate.waitingForConfirmation")
      : t("delegate.createProfile");

  // console.log(otherProps, "props", props);
  return (
    <DialogRoot {...otherProps} containerClassName="!max-w-[520px] !z-[9999]" useFocusTrap={false}>
      <DialogHeader title={t("delegate.createProfileTitle")} onClose={onClose} />
      <DialogContent className="flex flex-col gap-y-4 md:gap-y-6">
        <InputText
          label={t("delegate.identifierLabel")}
          readOnly={isConfirming}
          placeholder={t("delegate.identifierPlaceholder")}
          maxLength={50}
          {...register("identifier")}
          {...(errors.identifier?.message
            ? { alert: { variant: "critical", message: errors.identifier.message } }
            : {})}
        />
        <TextArea
          placeholder={t("delegate.bioPlaceholder")}
          label={t("delegate.bioLabel")}
          {...register("bio")}
          maxLength={400}
          readOnly={isConfirming}
          alert={errors.bio?.message ? { variant: "critical", message: errors.bio.message } : undefined}
        />
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextAreaRichText
              placeholder={t("delegate.messagePlaceholder")}
              label={t("delegate.messageLabel")}
              onChange={field.onChange}
              value={field.value}
              onBlur={field.onBlur}
              alert={errors.message?.message ? { variant: "critical", message: errors.message.message } : undefined}
            />
          )}
        />

        <div className="flex flex-col gap-y-2 md:gap-y-3">
          <div className="flex flex-col gap-0.5 md:gap-1">
            <div className="flex gap-x-3">
              <p className="text-base font-normal leading-tight text-neutral-800 md:text-lg">
                {t("delegate.resourcesTitle")}
              </p>
              <Tag label={t("delegate.optional")} />
            </div>
            <p className="text-sm font-normal leading-normal text-neutral-500 md:text-base">
              {t("delegate.resourcesDescription")}
            </p>
          </div>
          <If lengthOf={fields} above={0}>
            <div className="flex flex-col gap-y-4 rounded-xl border border-neutral-100 bg-neutral-0 px-3 py-1 md:px-4 md:py-2">
              {fields.map((field, index) => {
                const { name: nameError, link: linkError } = errors[DELEGATE_RESOURCES]?.[index] ?? {};

                return (
                  <div key={field.id} className="flex flex-col gap-y-3 py-3 md:py-4">
                    <div className="flex items-end gap-x-3">
                      <InputText
                        label={t("delegate.resourceNameLabel")}
                        readOnly={isConfirming}
                        placeholder={t("delegate.resourceNamePlaceholder")}
                        {...register(`${DELEGATE_RESOURCES}.${index}.name` as const)}
                        {...(nameError?.message ? { alert: { variant: "critical", message: nameError.message } } : {})}
                      />
                      <If lengthOf={fields} above={1}>
                        <Dropdown.Container
                          align="end"
                          customTrigger={<Button size="lg" variant="tertiary" iconLeft={IconType.DOTS_VERTICAL} />}
                        >
                          <Dropdown.Item
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            {t("delegate.removeLink")}
                          </Dropdown.Item>
                        </Dropdown.Container>
                      </If>
                    </div>
                    <InputText
                      label={t("delegate.resourceLinkLabel")}
                      placeholder={t("delegate.resourceLinkPlaceholder")}
                      readOnly={isConfirming}
                      {...register(`${DELEGATE_RESOURCES}.${index}.link` as const)}
                      onBlur={(e) => {
                        register(`${DELEGATE_RESOURCES}.${index}.link` as const).onBlur(e);
                        addProtocolToLink(index);
                      }}
                      {...(linkError?.message ? { alert: { variant: "critical", message: linkError.message } } : {})}
                    />
                  </div>
                );
              })}
            </div>
          </If>
          <span className="mt-1">
            <Button
              variant="tertiary"
              size="lg"
              iconLeft={IconType.PLUS}
              onClick={() => {
                append({ link: "", name: "" });
              }}
            >
              {t("delegate.addResource")}
            </Button>
          </span>
        </div>
        <div className="mt-4 flex justify-between">
          <Button variant="secondary" size="lg" onClick={onClose} disabled={isConfirming || status === "pending"}>
            {t("delegate.cancel")}
          </Button>
          <Button
            variant="primary"
            size="lg"
            isLoading={isConfirming || status === "pending"}
            onClick={handleSubmit(handleAnnouncement)}
          >
            {ctaLabel}
          </Button>
        </div>
      </DialogContent>
      <DialogFooter />
    </DialogRoot>
  );
};
