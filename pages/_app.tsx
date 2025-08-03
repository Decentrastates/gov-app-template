import { RootContextProvider } from "@/context";
import { Layout } from "@/components/layout";
import AlertContainer from "@/components/alert/alert-container";
import { Manrope } from "next/font/google";
import "@aragon/gov-ui-kit/index.css";
// import '@aragon/gov-ui-kit/build.css';
import "@/pages/globals.css";
import { PUB_APP_NAME } from "@/constants";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import "@/utils/i18n";

const manrope = Manrope({
  subsets: ["latin"],
});

function AragonetteApp({ Component, pageProps }: any) {
  return (
    <div className={manrope.className}>
      <Head>
        <title>{PUB_APP_NAME}</title>
      </Head>
      <RootContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <AlertContainer />
      </RootContextProvider>
    </div>
  );
}

export default appWithTranslation(AragonetteApp);
