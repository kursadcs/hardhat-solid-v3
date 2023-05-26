import hre, { ethers } from "hardhat";
const { FacetList } = require("../libs/facets.ts")
const { getSelectors, FacetCutAction } = require('../libs/diamond.js')
async function main() {

  if (hre.network.config.chainId != 43113) return;

  const [deployer] = await ethers.getSigners()

  console.log('Getting Diamond Contract Deploy. 💁 Please wait...');
  const kursadCSFactory = await ethers.getContractFactory("KursadCS");
  const kursadCSDiamond = await kursadCSFactory.deploy();
  await kursadCSDiamond.deployed();
  console.log('Diamond Contract Deployed. 🤩👍');
  console.dir(FacetList);

  const cut = []
  for (const FacetName of FacetList) {
    const Facet = await ethers.getContractFactory(FacetName);
    // @ts-ignore
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${FacetName} deployed 👍: ${facet.address}`)
    cut.push({
      target: facet.address,
      action: FacetCutAction.Add,
      selectors: getSelectors(facet)
    })
  }
  const tx = await kursadCSDiamond.diamondCut(cut, ethers.constants.AddressZero, '0x');
  await tx.wait();

  let contractAddresses = new Map<string, string>();
  contractAddresses.set("DIAMOND 💁",kursadCSDiamond.address);
  contractAddresses.set("DEPLOYER 💁",deployer.address);
  console.table(contractAddresses);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
