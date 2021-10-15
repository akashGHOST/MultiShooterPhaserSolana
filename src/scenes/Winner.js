import Phaser from "phaser";
import {
  Connection,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";

var web3 = require("@solana/web3.js");
var splToken = require("@solana/spl-token");

const bs58 = require("bs58");

var connection;
var fromAirdropSignature;
// var fromWallet = '6dTUCnKv5ZHRbh2J8y1JyK9wmAgNqj1PzNDKgWCRnxtQ';
var fromWallet;
let mint;
let fromTokenAccount;
var toWallet;
var toTokenAccount;
let fromtok;

export default class Winner extends Phaser.Scene {
  init(players) {
    this.players = players;
    this.enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }
  create() {
    this.winner_text = `Winner is ${this.players[0].name}\n\nScoreboard:\n--------------------\n`;
    for (let p in this.players) {
      this.winner_text += `${this.players[p].name}: ${this.players[p].score}\n ${this.players[p].wallet}`;
      this.winner = this.players[p].wallet
      this.winnername = this.players[p].name
    }
    this.reward_text = 'Collect Reward'
    this.textReward = this.add.text(400, 30, this.reward_text);
    this.textReward.setInteractive();
    if(this.winnername){
      this.textReward.addListener('pointerdown', this.reward);
    }
  
    this.winner_text += "\n\nPress Enter to play again";
    this.text = this.add.text(450, 50, this.winner_text, {
      color: "#00ff00",
      align: "center",
      fontSize: "20px",
    });
  }
  update() {
    if (this.enter.isDown) {
      this.scene.start("playgame");
    }
  }

  reward = async () =>{
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    if (isPhantomInstalled) {
      await window.solana.connect();
  
      if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          const k = await provider.publicKey.toString();
          fromWallet = k;
          console.log("k", fromWallet);
  
          const network = "https://api.testnet.solana.com";
          connection = new Connection(network);
        }
      
    

    mint = await splToken.Token.createMint(
      connection,
      provider.publicKey,
      fromWallet,
      null,
      9,
      splToken.TOKEN_PROGRAM_ID
    );

    fromtok = await mint.getOrCreateAssociatedAccountInfo(
      fromWallet.publicKey
    );
    console.log(fromtok);
    }}
  //   let mint = await splToken.Token.createMint(
  //     connection,
  //     fromWallet,
  //     fromWallet,
  //     null,
  //     9,
  //     splToken.TOKEN_PROGRAM_ID
  //   );
  //   // fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
  //   //   fromWallet.publicKey
  //   // );
  //   console.log("mint", mint);

  //   // toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
  //   //   provider.publicKey
  //   // );

  //   await mint.mintTo(
  //     this.winner, //who it goes to
  //     // fromTokenAccount.address, 
  //     fromWallet, // minting authority
  //     [], // multisig
  //     1000000000 // how many
  //   );

  //   await mint.setAuthority(
  //     mint.publicKey,
  //     null,
  //     "MintTokens",
  //     fromWallet,
  //     []
  //   );

  //   var transaction = new web3.Transaction().add(
  //     splToken.Token.createTransferInstruction(
  //       splToken.TOKEN_PROGRAM_ID,
  //       // fromTokenAccount.address,
  //       fromWallet,
  //       this.winner,
  //       fromWallet,
  //       // toTokenAccount.address,
  //       // fromWallet.publicKey,
  //       [],
  //       1000000000
  //     )
  //   );
  //   console.log("transaction", transaction);

  //   try {
  //     var signature = await web3.sendAndConfirmTransaction(
  //       connection,
  //       transaction,
  //       [fromWallet],
  //       { commitment: "confirmed" }
  //     );
  //     console.log("SIGNATURE", signature);
  //   } catch (e) {
  //     console.log(e);
  //   }
  }
}
