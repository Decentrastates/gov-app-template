import React, { useEffect, useState, type FC } from "react";
import { useRouter } from "next/router";
import { PleaseWaitSpinner } from "@/components/please-wait";
import { resolveQueryParam } from "@/utils/query";
import { NotFound } from "@/components/not-found";
import { plugins } from "@/plugins";
import { MainSection } from "@/components/layout/main-section";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const PluginLoader: FC = () => {
  const { query } = useRouter();
  const pluginId = resolveQueryParam(query.id);
  const [PageComponent, setPageComponent] = useState<FC | null>(null);
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    if (!pluginId) return;
    // const plugins = usePlugins();

    const plugin = plugins.find((p) => p.id === pluginId);
    if (!plugin) return;

    import(`@/plugins/${plugin.folderName}`)
      .then((mod) => {
        setComponentLoading(true);
        setPageComponent(() => mod.default);
      })
      .catch((err) => {
        console.error("Failed to load the page component", err);

        setComponentLoading(false);
      });
  }, [pluginId]);

  if (!PageComponent) {
    if (componentLoading) {
      return (
        <MainSection>
          <div className="flex h-24 w-full items-center justify-center">
            <PleaseWaitSpinner />
          </div>
        </MainSection>
      );
    }
    return <NotFound />;
  }

  return <PageComponent />;
};

export default PluginLoader;

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths() {
  // 获取所有插件的 ID
  const paths = plugins.map((plugin) => ({
    params: { id: plugin.id },
  }));

  return {
    paths,
    fallback: false, // 如果访问的路径不在 paths 中，返回 404
  };
}
