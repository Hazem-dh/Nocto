const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LockModule", (m) => {
  const lock = m.contract("Stealth");
  console.log(lock);
  return { lock };
});
