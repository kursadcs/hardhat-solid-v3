import hre, { ethers } from "hardhat";
const { getSelectors, FacetCutAction } = require('../libs/diamond.js')
async function addFacet() {

    if (hre.network.config.chainId != 43113) return;

    const kursadCSFactory = await ethers.getContractFactory('KursadCS');
    const kursadCSDiamond = await kursadCSFactory.attach("0x0example");
    await kursadCSDiamond.deployed();

    const cut = []
    const FacetName = "incSC3";
    const Facet = await ethers.getContractFactory(FacetName);
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${FacetName} deployed: ${facet.address}`)
    cut.push({
        target: facet.address,
        action: FacetCutAction.Add,
        selectors: getSelectors(facet)
    })

    const tx = await kursadCSDiamond.diamondCut(cut, ethers.constants.AddressZero, '0x');
    await tx.wait();
}
addFacet().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
