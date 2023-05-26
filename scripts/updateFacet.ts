import hre, { ethers } from "hardhat";
const { getSelectors, FacetCutAction } = require('../libs/diamond.js')
async function main() {

    if (hre.network.config.chainId != 43113) return;

    const kursadCSFactory = await ethers.getContractFactory("KursadCS");
    const kursadCSDiamond = await kursadCSFactory.attach("0x0example");
    await kursadCSDiamond.deployed();

    const cut = []
    const FacetName = "incSC";
    const Facet = await ethers.getContractFactory(FacetName);
    // @ts-ignore
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${FacetName} deployed: ${facet.address}`)
    cut.push({
        target: facet.address,
        action: FacetCutAction.Replace,
        selectors: getSelectors(facet)
    })

    const tx = await kursadCSDiamond.diamondCut(cut, ethers.constants.AddressZero, '0x');
    await tx.wait();
    console.log("Updated Facet");

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
