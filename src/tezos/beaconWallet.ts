import { DAppClient, NetworkType } from "@airgap/beacon-sdk";

const network = { type: NetworkType.GHOSTNET };

const initWallet = () =>
  new DAppClient({
    name: "BLAH",
    iconUrl: `https://dl.dropbox.com/s/j1x9pmo0in6orr6/seaslug_card.png`,
    featuredWallets: ["temple", ""], //["kukai", "temple", "airgap", "naan"],
    network: network,
  });

export const connectWallet = async () => {
  console.log("New beacon connector");

  const beacon = initWallet();

  // The following code should always be run during pageload if you want to show if the user is connected.
  const activeAccount = await beacon.getActiveAccount();
  if (activeAccount) {
    // User already has account connected, everything is ready
    // You can now do an operation request, sign request, or send another permission request to switch wallet
    console.log("Already connected:", activeAccount.address);
    return activeAccount.address;
  } else {
    await beacon.requestPermissions();

    const activeAccount = await beacon.getActiveAccount();

    if (!activeAccount) {
      console.log("Active account undefined");
      return;
    }

    console.log("ACTIVE ACCOUNT", activeAccount.address);
  }
};

export const disconnectWallet = async () => {
  const dAppClient = initWallet();

  const account = await dAppClient.getActiveAccount();

  if (!account) {
    console.log("No wallet connected");
    return;
  }

  const address = account.address;
  await dAppClient.clearActiveAccount();
  console.log(`Wallet ${address} disconnected`);
};
