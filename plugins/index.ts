import {
  PUB_DELEGATION_WALL_CONTRACT_ADDRESS,
  PUB_DUAL_GOVERNANCE_PLUGIN_ADDRESS,
  PUB_MULTISIG_PLUGIN_ADDRESS,
  PUB_EMERGENCY_MULTISIG_PLUGIN_ADDRESS,
  PUB_TOKEN_VOTING_PLUGIN_ADDRESS,
  PUB_LOCK_TO_VOTE_PLUGIN_ADDRESS,
  PUB_OPT_MULTISIG_PLUGIN_ADDRESS,
  PUB_TOKEN_SALE_PLUGIN_ADDRESS,
} from "@/constants";
import { IconType } from "@aragon/gov-ui-kit";

type PluginItem = {
  /** The URL fragment after /plugins */
  id: string;
  /** The name of the folder within `/plugins` */
  folderName: string;
  /** Title on menu */
  title: string;
  icon?: IconType;
  pluginAddress: string;
};

export const plugins: PluginItem[] = [
  // {
  //   id: "multisig",
  //   folderName: "multisig",
  //   title: "plugins.multisig",
  //   // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
  //   pluginAddress: PUB_MULTISIG_PLUGIN_ADDRESS,
  // },
  {
    id: "token-voting",
    folderName: "tokenVoting",
    title: "plugins.token_voting",
    // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: PUB_TOKEN_VOTING_PLUGIN_ADDRESS,
  },
  {
    id: "token-ico",
    folderName: "tokenICO",
    title: "plugins.token_ico",
    // icon: IconType.BLOCKCHAIN_TOKEN,
    pluginAddress: PUB_TOKEN_SALE_PLUGIN_ADDRESS,
  },
  // {
  //   id: "lock-to-vote",
  //   folderName: "lockToVote",
  //   title: "plugins.lock_to_vote",
  //   // icon: IconType.BLOCKCHAIN_BLOCK,
  //   pluginAddress: PUB_LOCK_TO_VOTE_PLUGIN_ADDRESS,
  // },
  // {
  //   id: "proposals",
  //   folderName: "proposals",
  //   title: "plugins.proposals",
  //   // icon: IconType.APP_MEMBERS,
  //   pluginAddress: PUB_DUAL_GOVERNANCE_PLUGIN_ADDRESS,
  // },
  // {
  //   id: "optimistic",
  //   folderName: "optimistic-proposals",
  //   title: "plugins.optimistic",
  //   // icon: IconType.APP_MEMBERS,
  //   pluginAddress: PUB_DUAL_GOVERNANCE_PLUGIN_ADDRESS,
  // },
  // {
  //   id: "opt-multisig",
  //   folderName: "opt-multisig",
  //   title: "plugins.multisig_optimistic",
  //   // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
  //   pluginAddress: PUB_OPT_MULTISIG_PLUGIN_ADDRESS,
  // },
  {
    id: "emergency",
    folderName: "emergency-multisig",
    title: "plugins.emergency",
    // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: PUB_EMERGENCY_MULTISIG_PLUGIN_ADDRESS,
  },
  {
    id: "assets",
    folderName: "assets",
    title: "plugins.assets",
    // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: PUB_DELEGATION_WALL_CONTRACT_ADDRESS,
  },
  {
    id: "transactions",
    folderName: "transactions",
    title: "plugins.transactions",
    // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: PUB_DELEGATION_WALL_CONTRACT_ADDRESS,
  },
  {
    id: "members",
    folderName: "members",
    title: "plugins.members",
    // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: PUB_DELEGATION_WALL_CONTRACT_ADDRESS,
  },
  {
    id: "settings",
    folderName: "settings",
    title: "plugins.settings",
    // icon: IconType.BLOCKCHAIN_BLOCKCHAIN,
    pluginAddress: PUB_DELEGATION_WALL_CONTRACT_ADDRESS,
  },
];
