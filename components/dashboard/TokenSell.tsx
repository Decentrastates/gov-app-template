import { type IResource } from "@/utils/types";
import { Button, Card, Heading } from "@aragon/gov-ui-kit";
import { PUB_BLOG_URL, PUB_FORUM_URL } from "@/constants";

type ITokenSellResource = IResource & {
  cta: string;
  primary?: boolean;
  internal?: boolean;
  description: string;
};

const resources: ITokenSellResource[] = [
  // {
  //   name: "Learn",
  //   link: PUB_BLOG_URL,
  //   description: "Learn more about the protocol and the changes that will impact the ecosystem.",
  //   cta: "Read the blog",
  // },
  // {
  //   name: "Discuss",
  //   link: PUB_FORUM_URL,
  //   description: "Share knowledge, contribute to open discussions and propose new ones.",
  //   cta: "Join forum",
  // },
  {
    name: "SEPT发售第1期",
    link: "/plugins/token-voting/",
    description: "本期释放100,000,000个SEPT，单价 1 USDC",
    cta: "购买SEPT",
    internal: true,
    primary: true,
  },
];

export const TokenSell = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 sm:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] md:gap-6">
      {resources.map((resource) => (
        <Card
          key={resource.link}
          className="flex flex-col justify-between gap-y-4 !rounded-2xl border border-neutral-200 bg-neutral-0 p-6 shadow-neutral-md"
        >
          <Heading size="h2">{resource.name}</Heading>
          <div className="flex grow flex-col justify-start">
            <p className="text-neutral-500">{resource.description}</p>
          </div>
          <span className="flex">
            <Button
              href={resource.link}
              variant={resource.primary ? "primary" : "secondary"}
              {...(resource.internal ? {} : { rel: "noopener noreferrer", target: "_blank" })}
            >
              {resource.cta}
            </Button>
          </span>
        </Card>
      ))}
    </div>
  );
};
