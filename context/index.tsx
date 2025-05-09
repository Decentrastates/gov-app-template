import { AlertProvider } from "./Alerts";
import type { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { useDisconnect, useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import { WagmiProvider, deserialize, serialize, type Config } from "wagmi";
import { PUB_WALLET_CONNECT_PROJECT_ID } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { UseDerivedWalletProvider } from "../hooks/useDerivedWallet";
import { GukModulesProvider } from "@aragon/gov-ui-kit";
import { customModulesCopy, coreProviderValues } from "@/components/customizations";
import { wagmiAdapter } from "@/utils/appKitConfig";
import ContextProvider from "./Web3Modal";
import { useState, useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createAsyncStoragePersister({
  serialize,
  storage: AsyncStorage,
  deserialize,
});

export function RootContextProvider({ children }: { children: ReactNode }) {
  const [cookies, setCookies] = useState<string>("");

  useEffect(() => {
    setCookies(document.cookie);
  }, []);

  return (
    <ContextProvider cookies={cookies}>
      <GukModulesProvider
        wagmiConfig={wagmiAdapter.wagmiConfig as Config}
        queryClient={queryClient}
        coreProviderValues={coreProviderValues}
        values={{ copy: customModulesCopy }}
      >
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          <AlertProvider>
            <UseDerivedWalletProvider>{children}</UseDerivedWalletProvider>
          </AlertProvider>
        </PersistQueryClientProvider>
      </GukModulesProvider>
    </ContextProvider>
  );
}
