import hre, { ethers } from "hardhat";
const { getSelectors, FacetCutAction } = require('../libs/diamond.js')
async function main() {

    if (hre.network.config.chainId != 43113) return;

    const kursadCSFactory = await ethers.getContractFactory('KursadCS');
    const kursadCSDiamond = await kursadCSFactory.attach("0x0example");
    await kursadCSDiamond.deployed();

    const cut = []
    const FacetName="incSC2";
    const facet = await ethers.getContractAt(FacetName, kursadCSDiamond.address);
    await facet.deployed()
    console.log(`${FacetName} deployed: ${facet.address}`)
    cut.push({
        facetAddress: ethers.constants.AddressZero,
        action: FacetCutAction.Remove,
        functionSelectors: getSelectors(facet)
    });

    const diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', kursadCSDiamond.address);

    const tx = await diamondCutFacet.diamondCut(cut, ethers.constants.AddressZero, "0x")
    await tx.wait();
    console.log("Deleted Facet");
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
