import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Delete a listings item for a selling partner.
     *
     * **Note:** The parameters associated with this operation may contain special characters
     * that must be encoded to successfully call the API. To avoid errors with SKUs when
     * encoding URLs, refer to [URL
     * Encoding](https://developer-docs.amazon.com/sp-api/docs/url-encoding).
     *
     * **Usage Plan:**
     *
     * | Rate (requests per second) | Burst |
     * | ---- | ---- |
     * | 5 | 10 |
     *
     * The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that
     * were applied to the requested operation, when available. The table above indicates the
     * default rate and burst values for this operation. Selling partners whose business
     * demands require higher throughput may see higher rate and burst values than those shown
     * here. For more information, see [Usage Plans and Rate Limits in the Selling Partner
     * API](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api).
     *
     * @summary deleteListingsItem
     * @throws FetchError<400, types.DeleteListingsItemResponse400> Request has missing or invalid parameters and cannot be parsed.
     * @throws FetchError<403, types.DeleteListingsItemResponse403> Indicates that access to the resource is forbidden. Possible reasons include Access
     * Denied, Unauthorized, Expired Token, or Invalid Signature.
     * @throws FetchError<413, types.DeleteListingsItemResponse413> The request size exceeded the maximum accepted size.
     * @throws FetchError<415, types.DeleteListingsItemResponse415> The request payload is in an unsupported format.
     * @throws FetchError<429, types.DeleteListingsItemResponse429> The frequency of requests was greater than allowed.
     * @throws FetchError<500, types.DeleteListingsItemResponse500> An unexpected condition occurred that prevented the server from fulfilling the request.
     * @throws FetchError<503, types.DeleteListingsItemResponse503> Temporary overloading or maintenance of the server.
     */
    deleteListingsItem(metadata: types.DeleteListingsItemMetadataParam): Promise<FetchResponse<200, types.DeleteListingsItemResponse200>>;
    /**
     * Returns details about a listings item for a selling partner.
     *
     * **Note:** The parameters associated with this operation may contain special characters
     * that must be encoded to successfully call the API. To avoid errors with SKUs when
     * encoding URLs, refer to [URL
     * Encoding](https://developer-docs.amazon.com/sp-api/docs/url-encoding).
     *
     * **Usage Plan:**
     *
     * | Rate (requests per second) | Burst |
     * | ---- | ---- |
     * | 5 | 10 |
     *
     * The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that
     * were applied to the requested operation, when available. The table above indicates the
     * default rate and burst values for this operation. Selling partners whose business
     * demands require higher throughput may see higher rate and burst values than those shown
     * here. For more information, see [Usage Plans and Rate Limits in the Selling Partner
     * API](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api).
     *
     * @summary getListingsItem
     * @throws FetchError<400, types.GetListingsItemResponse400> Request has missing or invalid parameters and cannot be parsed.
     * @throws FetchError<403, types.GetListingsItemResponse403> Indicates that access to the resource is forbidden. Possible reasons include Access
     * Denied, Unauthorized, Expired Token, or Invalid Signature.
     * @throws FetchError<404, types.GetListingsItemResponse404> The resource specified does not exist.
     * @throws FetchError<413, types.GetListingsItemResponse413> The request size exceeded the maximum accepted size.
     * @throws FetchError<415, types.GetListingsItemResponse415> The request payload is in an unsupported format.
     * @throws FetchError<429, types.GetListingsItemResponse429> The frequency of requests was greater than allowed.
     * @throws FetchError<500, types.GetListingsItemResponse500> An unexpected condition occurred that prevented the server from fulfilling the request.
     * @throws FetchError<503, types.GetListingsItemResponse503> Temporary overloading or maintenance of the server.
     */
    getListingsItem(metadata: types.GetListingsItemMetadataParam): Promise<FetchResponse<200, types.GetListingsItemResponse200>>;
    /**
     * Partially update (patch) a listings item for a selling partner. Only top-level listings
     * item attributes can be patched. Patching nested attributes is not supported.
     *
     * **Usage Plan:**
     *
     * | Rate (requests per second) | Burst |
     * | ---- | ---- |
     * | 5 | 5 |
     *
     * The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that
     * were applied to the requested operation, when available. The preceding table indicates
     * the default rate and burst values for this operation. Selling partners whose business
     * demands require higher throughput can receive higher rate and burst values then those
     * shown here. For more information, refer to [Usage Plans and Rate
     * Limits](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api)
     * in the Selling Partner API documentation.
     *
     * @summary patchListingsItem
     * @throws FetchError<400, types.PatchListingsItemResponse400> Request has missing or invalid parameters and cannot be parsed.
     * @throws FetchError<403, types.PatchListingsItemResponse403> Indicates that access to the resource is forbidden. Possible reasons include Access
     * Denied, Unauthorized, Expired Token, or Invalid Signature.
     * @throws FetchError<413, types.PatchListingsItemResponse413> The request size exceeded the maximum accepted size.
     * @throws FetchError<415, types.PatchListingsItemResponse415> The request payload is in an unsupported format.
     * @throws FetchError<429, types.PatchListingsItemResponse429> The frequency of requests was greater than allowed.
     * @throws FetchError<500, types.PatchListingsItemResponse500> An unexpected condition occurred that prevented the server from fulfilling the request.
     * @throws FetchError<503, types.PatchListingsItemResponse503> Temporary overloading or maintenance of the server.
     */
    patchListingsItem(body: types.PatchListingsItemBodyParam, metadata: types.PatchListingsItemMetadataParam): Promise<FetchResponse<200, types.PatchListingsItemResponse200>>;
    /**
     * Creates or fully updates an existing listings item for a selling partner.
     *
     * **Note:** This operation has a throttling rate of one request per second when `mode` is
     * `VALIDATION_PREVIEW`.
     *
     * **Note:** The parameters associated with this operation may contain special characters
     * that must be encoded to successfully call the API. To avoid errors with SKUs when
     * encoding URLs, refer to [URL
     * Encoding](https://developer-docs.amazon.com/sp-api/docs/url-encoding).
     *
     * **Usage Plan:**
     *
     * | Rate (requests per second) | Burst |
     * | ---- | ---- |
     * | 5 | 10 |
     *
     * The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that
     * were applied to the requested operation, when available. The table above indicates the
     * default rate and burst values for this operation. Selling partners whose business
     * demands require higher throughput may see higher rate and burst values than those shown
     * here. For more information, see [Usage Plans and Rate Limits in the Selling Partner
     * API](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api).
     *
     * @summary putListingsItem
     * @throws FetchError<400, types.PutListingsItemResponse400> Request has missing or invalid parameters and cannot be parsed.
     * @throws FetchError<403, types.PutListingsItemResponse403> Indicates that access to the resource is forbidden. Possible reasons include Access
     * Denied, Unauthorized, Expired Token, or Invalid Signature.
     * @throws FetchError<413, types.PutListingsItemResponse413> The request size exceeded the maximum accepted size.
     * @throws FetchError<415, types.PutListingsItemResponse415> The request payload is in an unsupported format.
     * @throws FetchError<429, types.PutListingsItemResponse429> The frequency of requests was greater than allowed.
     * @throws FetchError<500, types.PutListingsItemResponse500> An unexpected condition occurred that prevented the server from fulfilling the request.
     * @throws FetchError<503, types.PutListingsItemResponse503> Temporary overloading or maintenance of the server.
     */
    putListingsItem(body: types.PutListingsItemBodyParam, metadata: types.PutListingsItemMetadataParam): Promise<FetchResponse<200, types.PutListingsItemResponse200>>;
    /**
     * Search for and return a list of selling partner listings items and their respective
     * details.
     *
     * **Usage Plan:**
     *
     * | Rate (requests per second) | Burst |
     * | ---- | ---- |
     * | 5 | 5 |
     *
     * The `x-amzn-RateLimit-Limit` response header returns the usage plan rate limits that are
     * applied to the requested operation, when available. The preceding table contains the
     * default rate and burst values for this operation. Selling partners whose business
     * demands require higher throughput might have higher rate and burst values than those
     * shown here. For more information, refer to [Usage Plans and Rate
     * Limits](https://developer-docs.amazon.com/sp-api/docs/usage-plans-and-rate-limits-in-the-sp-api).
     *
     * @summary searchListingsItems
     * @throws FetchError<400, types.SearchListingsItemsResponse400> Request has missing or invalid parameters and cannot be parsed.
     * @throws FetchError<403, types.SearchListingsItemsResponse403> Indicates that access to the resource is forbidden. Possible reasons include Access
     * Denied, Unauthorized, Expired Token, or Invalid Signature.
     * @throws FetchError<404, types.SearchListingsItemsResponse404> The resource specified does not exist.
     * @throws FetchError<413, types.SearchListingsItemsResponse413> The request size exceeded the maximum accepted size.
     * @throws FetchError<415, types.SearchListingsItemsResponse415> The request payload is in an unsupported format.
     * @throws FetchError<429, types.SearchListingsItemsResponse429> The frequency of requests was greater than allowed.
     * @throws FetchError<500, types.SearchListingsItemsResponse500> An unexpected condition occurred that prevented the server from fulfilling the request.
     * @throws FetchError<503, types.SearchListingsItemsResponse503> Temporary overloading or maintenance of the server.
     */
    searchListingsItems(metadata: types.SearchListingsItemsMetadataParam): Promise<FetchResponse<200, types.SearchListingsItemsResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
