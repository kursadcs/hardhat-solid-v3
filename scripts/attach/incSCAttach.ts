import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
const hre = require("hardhat");
async function incSCAttach(){

    if (hre.network.config.chainId != 43113) return;
    const [deployer] = await ethers.getSigners();

    const kursadCSFactory = await ethers.getContractFactory("incSCABI");
    const kursadCSDiamond = await kursadCSFactory.attach("0x0example");
    console.log("KursadCS Contract Attached 👍");

    const incSCFacet = await ethers.getContractAt("incSC",kursadCSDiamond.address);




    console.log("Completed 🤩👍");
}
incSCAttach().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});