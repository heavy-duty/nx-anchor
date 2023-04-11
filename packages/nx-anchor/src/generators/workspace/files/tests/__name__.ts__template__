import { Provider, setProvider, workspace } from '@project-serum/anchor';

describe('<%= crateName %>', () => {

  // Configure the client to use the local cluster.
  setProvider(Provider.env());

  it('Is initialized!', async () => {
    // Add your test here.
    const program = workspace.<%= className %>;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});
