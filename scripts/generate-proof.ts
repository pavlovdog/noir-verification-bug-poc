import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from './../circuit/target/main.json';


import fs from 'fs';


const main = async () => {
  // @ts-ignore
  const backend = new BarretenbergBackend(circuit);
  // @ts-ignore
  const noir = new Noir(circuit, backend);

  console.log('generating proof');

  const proof = await noir.generateFinalProof({
    x: 10,
  });

  // console.log(proof);

  fs.writeFileSync('proof.json', JSON.stringify({
    proof: Array.from(proof.proof),
    publicInputs: proof.publicInputs.map(i => Array.from(i))
  }, null, 2));

  console.log('Proof saved into proof.json');

  const verification = await noir.verifyFinalProof(proof);

  console.log(`Verification result: ${verification}`);

  process.exit(0);
}

main();