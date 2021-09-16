import type {
    VerifiableCredential, VerifiablePresentation
} from "@elastosfoundation/did-js-sdk";
import type { GetCredentialsQuery } from "../../did/model/getcredentialsquery";
import type { ImportCredentialOptions } from "../../did/model/importcredentialoptions";
import type { ImportedCredential } from "../../did/model/importedcredential";
import type { SignedData } from "../../did/model/signeddata";


export interface IDIDConnectorAPI {
    getCredentials(query: GetCredentialsQuery): Promise<VerifiablePresentation>;
    importCredentials(credentials: VerifiableCredential[], options?: ImportCredentialOptions): Promise<ImportedCredential[]>;
    deleteCredentials(credentialIds: string[]): Promise<string[]>;
    signData(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<SignedData>;

    /**
     * @param appInstanceDID The temporary application instance DID. Usually, automatically generated by this SDK.
     * @param appDID The developer defined application DID. This DID must be published on chain and configured with a developer tool application.
     */
    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<VerifiableCredential>;
}