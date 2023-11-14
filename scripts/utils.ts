export const preprocess_proof = (proof: string) => {
  const proof_json = JSON.parse(proof);

  return {
    proof: new Uint8Array(proof_json.proof),
    publicInputs: proof_json.publicInputs.map((i: number[]) => new Uint8Array(i)),
  };
}