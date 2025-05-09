import { Address } from "viem";
import { DEPLOYMENT_TARGET_CHAIN_ID } from "./deploy/priv-constants.js";
import { deploymentPublicClient as publicClient } from "./lib/util/client";
import { checkDependencies } from "./deploy/0-checks.js";
import { deployTokenContracts } from "./deploy/1-gov-erc20-token.js";
import { ensurePluginRepo as ensureTokenVoting } from "./deploy/2-token-voting.js";
import { deployPlugin as deployDualGovernance } from "./deploy/4-dual-governance.js";
import { deployDao } from "./deploy/5-dao.js";

async function main() {
  let tokenVotingPluginRepo: Address;
  let dualGovernancePluginRepo: Address;

  try {
    // Wallet checks
    console.log("Checking the deployment wallet");
    await checkDependencies();

    // Deployment
    console.log("Token contracts");
    const { daoToken, governanceErc20Base, governanceWrappedErc20Base } = await deployTokenContracts();

    console.log("\nPlugins and helpers");
    tokenVotingPluginRepo = await ensureTokenVoting();
    dualGovernancePluginRepo = await deployDualGovernance(governanceErc20Base, governanceWrappedErc20Base);

    const { daoAddress, subdomain, installedPlugins } = await deployDao(
      daoToken,
      tokenVotingPluginRepo,
      dualGovernancePluginRepo
    );

    const currentBlock = await publicClient.getBlockNumber();

    const summary = `

Your DAO has been deployed successfully:
- DAO address:  ${daoAddress}
- DAO ENS:      ${subdomain}.dao.eth

Please, update your .env file to use the newly deployed DAO

# General
NEXT_PUBLIC_DAO_ADDRESS=${daoAddress}
NEXT_PUBLIC_TOKEN_ADDRESS=${daoToken}
NEXT_PUBLIC_DELEGATION_ANNOUNCEMENTS_START_BLOCK=${currentBlock}

# Plugin addresses
NEXT_PUBLIC_TOKEN_VOTING_PLUGIN_ADDRESS=${installedPlugins[0]} 
NEXT_PUBLIC_DUAL_GOVERNANCE_PLUGIN_ADDRESS=${installedPlugins[1]}

# Network and services
NEXT_PUBLIC_CHAIN_NAME=${DEPLOYMENT_TARGET_CHAIN_ID}
NEXT_PUBLIC_WEB3_URL_PREFIX=https://eth-${DEPLOYMENT_TARGET_CHAIN_ID}.g.alchemy.com/v2/

NEXT_PUBLIC_ALCHEMY_API_KEY=hPtbBAGXcUh-ObcGgSuy3YFrvtwh9pQh
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=8932e26c2b11da0bc00da23e10bd9294
NEXT_PUBLIC_IPFS_ENDPOINT=https://gateway.pinata.cloud/ipfs
NEXT_PUBLIC_IPFS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNDhkYzc0OS0wMTBlLTRmYmYtODU0NC1lMTI4ZWE0ODJlMTkiLCJlbWFpbCI6InJlZGJsb3dAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOWE5MzkxZmEwNGI5MjY2ZmE5M2MiLCJzY29wZWRLZXlTZWNyZXQiOiIxNWMwNDkzOGQ1MjVlODlkYjcwZDAyMzA0MTNmMzU3NGJjYmUxOTNiOTMwMzlkZjJjYmQ0MTBjMzRlZjJhY2VmIiwiZXhwIjoxNzYxMTkyMTc4fQ.xz1HoopdahGph60MSsCs4PYSn8CSXg9IfbDxCpeDm1g
NEXT_PUBLIC_ETHERSCAN_API_KEY=JKR46PMPNUNPR7ID81QQGS6FI5C325RCNN
`;
    console.log(summary);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
