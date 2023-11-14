import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from './../circuit/target/main.json';


import fs from 'fs';
import { preprocess_proof } from './utils';


const main = async () => {
  // @ts-ignore
  const backend = new BarretenbergBackend(circuit);
  // @ts-ignore
  const noir = new Noir(circuit, backend);

  const proof_string = fs.readFileSync('proof.json').toString();

  const result = await noir.verifyFinalProof(preprocess_proof(proof_string));

  // Fails
  console.log(`Verification result: ${result}`);
}


main();