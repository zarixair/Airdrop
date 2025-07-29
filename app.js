let web3;
let accounts;
let tokenContract;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    accounts = await web3.eth.getAccounts();
    tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
    document.getElementById("status").innerText = "متصل شد: " + accounts[0];
  } else {
    alert("MetaMask نصب نیست!");
  }
}

async function sendAirdrop() {
  const addresses = document.getElementById("addresses").value.split('\n').map(a => a.trim()).filter(a => a);
  const amount = document.getElementById("amount").value;

  if (!addresses.length || !amount) {
    alert("آدرس‌ها و مقدار را وارد کنید");
    return;
  }

  for (const addr of addresses) {
    try {
      await tokenContract.methods.transfer(addr, web3.utils.toWei(amount, "ether")).send({ from: accounts[0] });
      document.getElementById("status").innerText += "\nارسال موفق به: " + addr;
    } catch (err) {
      document.getElementById("status").innerText += "\nخطا در ارسال به " + addr + ": " + err.message;
    }
  }
}