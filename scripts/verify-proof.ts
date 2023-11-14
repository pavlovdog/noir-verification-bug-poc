import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from './../circuit/target/main.json';


import fs from 'fs';


const main = async () => {
  // @ts-ignore
  const backend = new BarretenbergBackend(circuit);
  // @ts-ignore
  const noir = new Noir(circuit, backend);

  const proof = JSON.parse(fs.readFileSync('proof.json').toString());

  const result = await noir.verifyFinalProof({
    proof: new Uint8Array(proof.proof),
    publicInputs: proof.publicInputs.map((i: number[]) => new Uint8Array(i)),
  });

  // Fails
  console.log(`Verification result: ${result}`);
}


main();