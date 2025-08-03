// import { type IResource } from "@/utils/types";
import { DaoDataListItemStructure } from "@aragon/gov-ui-kit";
// import { PUB_BLOG_URL, PUB_FORUM_URL } from "@/constants";

type IDashboardList = {
  id: string;
  name: string;
  description: string;
  address?: string;
  ens?: string;
  logoSrc?: string;
  network?: string;
  target?: string;
  href?: string;
  isExternal?: boolean;
};

const daoList: IDashboardList[] = [
  {
    id: "1",
    name: "Assets",
    address: "0xc6B61B776367b236648399ACF4A0bc5aDe70708F",
    // ens: "redblow.ens",
    description:
      "CD DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.",
    logoSrc: "https://pbs.twimg.com/profile_images/1851934141782331394/Z0ZqlyIo_400x400.png",
    network: "Ethereum",
    // target:"/plugins/assets/",
    href: "/plugins/assets/",
    // isExternal: true
  },
  {
    id: "2",
    name: "Assets",
    // address: "0xc6B61B776367b236648399ACF4A0bc5aDe70708F",
    ens: "redblow.ens",
    description:
      "CD DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.",
    logoSrc: "https://pbs.twimg.com/profile_images/1851934141782331394/Z0ZqlyIo_400x400.png",
    network: "Polygon",
    // target:"/plugins/assets/",
    href: "/plugins/assets/",
    // isExternal: true
  },
  {
    id: "3",
    name: "Assets",
    address: "0xc6B61B776367b236648399ACF4A0bc5aDe70708F",
    // ens: "redblow.ens",
    description:
      "CD DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.",
    logoSrc: "https://pbs.twimg.com/profile_images/1851934141782331394/Z0ZqlyIo_400x400.png",
    network: "Ethereum",
    // target:"/plugins/assets/",
    href: "/plugins/assets/",
    // isExternal: true
  },
  {
    id: "4",
    name: "Assets",
    address: "0xc6B61B776367b236648399ACF4A0bc5aDe70708F",
    // ens: "redblow.ens",
    description:
      "CD DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.",
    logoSrc: "https://pbs.twimg.com/profile_images/1851934141782331394/Z0ZqlyIo_400x400.png",
    network: "Ethereum",
    target: "_blank",
    href: "https://www.cddao.com",
    isExternal: true,
  },
  {
    id: "5",
    name: "Assets",
    address: "0xc6B61B776367b236648399ACF4A0bc5aDe70708F",
    // ens: "redblow.ens",
    description:
      "CD DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.",
    logoSrc: "https://pbs.twimg.com/profile_images/1851934141782331394/Z0ZqlyIo_400x400.png",
    network: "Ethereum",
    target: "_blank",
    href: "https://www.cddao.com",
    isExternal: true,
  },
  {
    id: "6",
    name: "Assets",
    address: "0xc6B61B776367b236648399ACF4A0bc5aDe70708F",
    // ens: "redblow.ens",
    description:
      "CD DAO is responsible for maximizing effective coordination and collaboration between different Patito teams and enabling them to perform at their best ability with the highest velocity they can achieve. Our main focus is on managing the day-to-day tasks of the Patito Guilds, such as enabling contractual relationships, legal operations, accounting, finance, and HR. We are also responsible for addressing any issues that may arise within the teams and deploying new tools, and infrastructure to ensure smooth operations.",
    logoSrc: "https://pbs.twimg.com/profile_images/1851934141782331394/Z0ZqlyIo_400x400.png",
    network: "Ethereum",
    target: "_blank",
    href: "https://www.cddao.com",
    isExternal: true,
  },
];

export const DaoList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-6 sm:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] md:gap-6">
      {daoList.map((dao) => (
        <DaoDataListItemStructure key={dao.id} {...dao} />
      ))}
    </div>
  );
};
