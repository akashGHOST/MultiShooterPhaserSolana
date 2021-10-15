import Phaser from "phaser";
import {Connection , SystemProgram, Transaction, clusterApiUrl, PublicKey} from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
var web3 = require('@solana/web3.js');

let connection;
let txid;
let transactionComplete = false;

export default class Welcome extends Phaser.Scene {
  init() {
    var alpha = "abcdefghijklmnopqrstuvwxyz".split("").join(",");
    this.keys = this.input.keyboard.addKeys(alpha);
    this.backspace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    );
    this.enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }
  create() {
    this.btntext = `connect wallet\n`
    this.textbtn = this.add.text(520, 200, this.btntext);
    this.textbtn.setInteractive();
    this.textbtn.addListener('pointerdown', this.connectWallet);
    this.welcome_text = `Welcome, enter your name\n\n`;
    this.text = this.add.text(450, 250, this.welcome_text, {
      color: "#00ff00",
      align: "center",
      fontSize: "20px",
    });
    this.name = "";
    this.walletAddress = "";
    console.log('walletaddres create', this.walletAddress);

 
  }
  update() {
    /*
    Poll for keyboard keys to display name, and for enter to go to game scene.
    */
    for (const key of Object.keys(this.keys)) {
      if (Phaser.Input.Keyboard.JustDown(this.keys[key])) {
        if (this.name.length < 15) {
          this.name += key;
        }
      }
    }
    if (Phaser.Input.Keyboard.JustDown(this.backspace)) {
      this.name = this.name.substring(0, this.name.length - 1);
    }
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      if(transactionComplete == true){
        alert('Transaction Complete');

        let data = {
          name: this.name,
          walletADD: this.walletAddress
        }
       
        this.scene.start("playgame", data);
        console.log('name', data.name);
        console.log('walletaddress', data.walletADD);
      }
      
    }
    if(transactionComplete == true){
      this.btntext = `Press Enter\n`
      this.textbtn = this.add.text(550, 350, this.btntext);
    }
    this.text.setText(this.welcome_text + this.name);
  }

  connectWallet = async () => {
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    if (isPhantomInstalled) {
      await window.solana.connect();
  
      if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          const k = await provider.publicKey.toString();
          this.walletAddress = k;
          // console.log("k", k);
  
          const network = "https://api.testnet.solana.com";
          const connection = new Connection(network);
          // const transaction = new Transaction();
  
          // var fromPubkey = await k;
          // var toPubkey = "6dTUCnKv5ZHRbh2J8y1JyK9wmAgNqj1PzNDKgWCRnxtQ";
  
          const hash = await (await connection.getRecentBlockhash()).blockhash;
          console.log(hash);
  
          let transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: provider.publicKey,
              toPubkey: "6dTUCnKv5ZHRbh2J8y1JyK9wmAgNqj1PzNDKgWCRnxtQ",
              lamports: 10000000,
            })
          );
          transaction.feePayer = provider.publicKey;
          transaction.recentBlockhash = hash;
          // const signedTransaction = await window.solana.request({
          //   method: "signTransaction",
          //   params: {
          //     message: bs58.encode(transaction.serializeMessage()),
          //   },
          // });
          const signedTransaction = await window.solana.signTransaction(transaction);
          const signature = await connection.sendRawTransaction(
            signedTransaction.serialize()
          );
          console.log(signature);
          console.log("trans", transaction);
          if(transaction){
            transactionComplete = true;
          }
          return transaction;
        }
      }
      await window.solana.on("connect", () => console.log("connected!"));
    } else {
      const getProvider = () => {
        if ("solana" in window) {
          const provider = window.solana;
          if (provider.isPhantom) {
            return provider;
          }
        }
        window.open("https://phantom.app/", "_blank");
      };
      getProvider();
    }
  }
}
