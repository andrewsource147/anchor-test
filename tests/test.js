const anchor = require('@project-serum/anchor');

describe('test', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized v1!', async () => {
    // Add your test here.
    const program = anchor.workspace.Test;

    let testAccount = anchor.web3.Keypair.generate();
    await program.rpc.initializeV1(
      {
        accounts: {
          testAcc: testAccount.publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        instructions: [
          await program.account.testAccount.createInstruction(testAccount, 2000),
        ],
        signers: [testAccount],
      }
    );

    const testAccountState = await program.account.testAccount.fetch(testAccount.publicKey);
    console.log(testAccountState.data.toString());
  });

  it('Is initialized v2!', async () => {
    // Add your test here.
    const program = anchor.workspace.Test;

    let testAccount = anchor.web3.Keypair.generate();
    await program.rpc.initializeV2(
      {
        accounts: {
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        remainingAccounts: [
          {
            pubkey: testAccount.publicKey,
            isWritable: true,
            isSigner: true,
          },
        ],
        instructions: [
          await program.account.testAccount.createInstruction(testAccount, 2000),
        ],
        signers: [testAccount],
      }
    );

    const testAccountState = await program.account.testAccount.fetch(testAccount.publicKey);
    console.log(testAccountState.data.toString());
  });
});
