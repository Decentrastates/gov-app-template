import WalletContainer from "@/components/WalletContainer";
import { plugins } from "@/plugins";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { MobileNavDialog } from "./mobileNavDialog";
import { NavLink, type INavLink } from "./navLink";
import { AvatarIcon, DaoAvatar, IconType } from "@aragon/gov-ui-kit";
import { useTranslation } from "next-i18next";

export const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation("common");
  const navLinks: INavLink[] = [
    {
      id: "dashboard",
      name: t("nav.dashboard"),
      path: "/",
      // icon: IconType.APP_DASHBOARD
    },
    ...plugins.map((p) => ({
      id: p.id,
      name: t(`plugins.${p.id}`),
      path: `/plugins/${p.id}/#/`,
      icon: p.icon,
    })),
  ];

  return (
    <>
      <nav className="h-30 sticky top-0 z-[var(--hub-navbar-z-index)] flex w-full select-none items-center justify-center border-b border-b-neutral-100 bg-neutral-0">
        <div className="w-full  flex-col gap-2 p-3 md:px-6 md:pb-0 lg:gap-3">
          <div className="flex w-full items-center justify-between">
            <div>
              <Link
                href="/"
                className={classNames(
                  "flex items-center gap-x-5 rounded-full py-2 md:rounded-lg",
                  "outline-none focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset" // focus styles
                )}
              >
                <DaoAvatar
                  name="CD Dao"
                  // src="https://cdn.discordapp.com/icons/672466989217873929/acffa3e9e09ac5962ff803a5f8649040.webp?size=240"
                />
                <div className="line-clamp-1 flex flex-1 shrink-0 text-2xl font-normal leading-tight text-neutral-800 md:text-3xl">
                  CDDAO
                </div>
                {/* <img src={PUB_PROJECT_LOGO} width="150" className="shrink-0" alt={PUB_APP_NAME + " logo"} /> */}
              </Link>
              {/* <div className="flex items-center gap-x-2">
                <span className="text-md leading-tight text-neutral-500">Governed on</span>
                <img src="/logo-aragon-text.svg" alt="Aragon" className="h-6" />
              </div> */}
            </div>

            <div className="flex items-center gap-x-2">
              <div className="shrink-0">
                <WalletContainer />
              </div>

              {/* Nav Trigger */}
              <button
                onClick={() => setShowMenu(true)}
                className={classNames(
                  "rounded-full border border-neutral-100 bg-neutral-0 p-1 md:hidden",
                  "outline-none focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset" // focus styles
                )}
              >
                <AvatarIcon size="lg" icon={IconType.MENU} />
              </button>
            </div>
          </div>

          {/* Tab wrapper */}
          <ul className="hidden gap-x-6 md:flex ">
            {navLinks.map(({ id, name, path }) => (
              <NavLink name={name} path={path} id={id} key={id} />
            ))}
          </ul>
        </div>
      </nav>
      <MobileNavDialog open={showMenu} navLinks={navLinks} onOpenChange={setShowMenu} />
    </>
  );
};
