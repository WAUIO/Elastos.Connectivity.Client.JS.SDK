import type {
    JSONObject,
    VerifiableCredential, VerifiablePresentation
} from "@elastosfoundation/did-js-sdk";
import type { CredentialDisclosureRequest } from "../../did";
import type { DeleteCredentialOptions } from "../../did/model/deletecredentialoptions";
import type { GetCredentialsQuery } from "../../did/model/getcredentialsquery";
import type { ImportCredentialOptions } from "../../did/model/importcredentialoptions";
import type { ImportedCredential } from "../../did/model/importedcredential";
import type { SignedData } from "../../did/model/signeddata";
import type { UpdateHiveVaultAddressStatus } from "../../did/model/updatehivevault";

/**
 * NOTE: All methods are marked as optional to avoid breaking builds when adding new methods to the
 * connectivity SDK, while some connectors are not updated yet. But all implementations are
 * actually required.
 */
export interface IDIDConnectorAPI {
    requestCredentials?(request: CredentialDisclosureRequest): Promise<VerifiablePresentation>;
    issueCredential?(holder: string, types: string[], subject: JSONObject, identifier?: string, expirationDate?: string): Promise<VerifiableCredential>;
    importCredentials?(credentials: VerifiableCredential[], options?: ImportCredentialOptions): Promise<ImportedCredential[]>;
    deleteCredentials?(credentialIds: string[], options?: DeleteCredentialOptions): Promise<string[]>;
    signData?(data: string, jwtExtra?: any, signatureFieldName?: string): Promise<SignedData>;
    requestPublish?(): Promise<string>;
    updateHiveVaultAddress?(vaultAddress: string, displayName: string): Promise<UpdateHiveVaultAddressStatus>;
    importCredentialContext?(serviceName: string, contextCredential: VerifiableCredential): Promise<ImportedCredential>;

    // deprecated
    getCredentials?(query: GetCredentialsQuery): Promise<VerifiablePresentation>;

    /**
     * @param appInstanceDID The temporary application instance DID. Usually, automatically generated by this SDK.
     * @param appDID The developer defined application DID. This DID must be published on chain and configured with a developer tool application.
     */
    generateAppIdCredential?(appInstanceDID: string, appDID: string): Promise<VerifiableCredential>;
}