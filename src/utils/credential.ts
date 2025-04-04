import { existsSync } from "fs";
import { Vault } from "node-credentials";

export const getCredential = (env: string) => {
  try {
    const credentialsFilePath = existsSync(`dist/credentials/${env}.yaml`)
      ? `dist/credentials/${env}.yaml`
      : `src/credentials/${env}.yaml`;
    const vault = new Vault({ credentialsFilePath });
    return vault.credentials;
  } catch (e) {
    console.log(e.message);
    return {};
  }
};
