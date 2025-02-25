declare const DeleteListingsItem: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sellerId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner identifier, such as a merchant account or vendor code.";
                };
                readonly sku: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                };
            };
            readonly required: readonly ["sellerId", "sku"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly marketplaceIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly maxItems: 1;
                    readonly examples: readonly ["ATVPDKIKX0DER"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of Amazon marketplace identifiers for the request.";
                };
                readonly issueLocale: {
                    readonly type: "string";
                    readonly examples: readonly ["en_US"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A locale for localization of issues. When not provided, the default language code of the first marketplace is used. Examples: `en_US`, `fr_CA`, `fr_FR`. Localized messages default to `en_US` when a localization is not available in the specified locale.";
                };
            };
            readonly required: readonly ["marketplaceIds"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "Response containing the results of a submission to the Selling Partner API for Listings Items.";
            readonly properties: {
                readonly sku: {
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                    readonly type: "string";
                };
                readonly status: {
                    readonly description: "The status of the listings item submission.\n\n`ACCEPTED` `INVALID` `VALID`";
                    readonly enum: readonly ["ACCEPTED", "INVALID", "VALID"];
                    readonly "x-docgen-enum-table-extension": readonly [{
                        readonly value: "ACCEPTED";
                        readonly description: "The listings submission was accepted for processing.";
                    }, {
                        readonly value: "INVALID";
                        readonly description: "The listings submission was not valid and was not accepted for processing.";
                    }, {
                        readonly value: "VALID";
                        readonly description: "The listings submission was valid. Only returned when the `mode` is `VALIDATION_PREVIEW`.";
                    }];
                    readonly type: "string";
                };
                readonly submissionId: {
                    readonly description: "The unique identifier of the listings item submission.";
                    readonly type: "string";
                };
                readonly issues: {
                    readonly description: "Listings item issues related to the listings item submission.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "An issue with a listings item.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An issue code that identifies the type of issue.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the issue.";
                                readonly type: "string";
                            };
                            readonly severity: {
                                readonly description: "The severity of the issue.\n\n`ERROR` `WARNING` `INFO`";
                                readonly enum: readonly ["ERROR", "WARNING", "INFO"];
                                readonly "x-docgen-enum-table-extension": readonly [{
                                    readonly value: "ERROR";
                                    readonly description: "Indicates an issue has occurred preventing the submission from processing, such as a validation error.";
                                }, {
                                    readonly value: "WARNING";
                                    readonly description: "Indicates an issue has occurred that should be reviewed, but has not prevented the submission from processing.";
                                }, {
                                    readonly value: "INFO";
                                    readonly description: "Indicates additional information has been provided that should be reviewed.";
                                }];
                                readonly type: "string";
                            };
                            readonly attributeNames: {
                                readonly description: "The names of the attributes associated with the issue, if applicable.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly categories: {
                                readonly description: "List of issue categories. \n\nPossible vales: \n\n* `INVALID_ATTRIBUTE` - Indicating an invalid attribute in the listing. \n\n* `MISSING_ATTRIBUTE` - Highlighting a missing attribute in the listing. \n\n* `INVALID_IMAGE` - Signifying an invalid image in the listing. \n\n* `MISSING_IMAGE` - Noting the absence of an image in the listing. \n\n* `INVALID_PRICE` - Pertaining to issues with the listing's price-related attributes. \n\n* `MISSING_PRICE` - Pointing out the absence of a price attribute in the listing. \n\n* `DUPLICATE` - Identifying listings with potential duplicate problems, such as this ASIN potentially being a duplicate of another ASIN. \n\n* `QUALIFICATION_REQUIRED` - Indicating that the listing requires qualification-related approval.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly examples: readonly ["INVALID_ATTRIBUTE"];
                            };
                            readonly enforcements: {
                                readonly description: "This field provides information about the enforcement actions taken by Amazon that affect the publishing or status of a listing. It also includes details about any associated exemptions.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly actions: {
                                        readonly description: "List of enforcement actions taken by Amazon that affect the publishing or status of a listing.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly description: "The enforcement action taken by Amazon that affect the publishing or status of a listing";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly action: {
                                                    readonly description: "The enforcement action name. \n\nPossible values: \n\n* `LISTING_SUPPRESSED` - This enforcement takes down the current listing item's buyability. \n\n* `ATTRIBUTE_SUPPRESSED` - An attribute's value on the listing item is invalid, which causes it to be rejected by Amazon. \n\n* `CATALOG_ITEM_REMOVED` - This catalog item is inactive on Amazon, and all offers against it in the applicable marketplace are non-buyable. \n\n* `SEARCH_SUPPRESSED` - This value indicates that the catalog item is hidden from search results.";
                                                    readonly type: "string";
                                                    readonly examples: readonly ["LISTING_SUPPRESSED"];
                                                };
                                            };
                                            readonly required: readonly ["action"];
                                        };
                                    };
                                    readonly exemption: {
                                        readonly description: "Conveying the status of the listed enforcement actions and, if applicable, provides information about the exemption's expiry date.";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly status: {
                                                readonly description: "This field indicates the current exemption status for the listed enforcement actions. It can take values such as `EXEMPT`, signifying permanent exemption, `EXEMPT_UNTIL_EXPIRY_DATE` indicating temporary exemption until a specified date, or `NOT_EXEMPT` signifying no exemptions, and enforcement actions were already applied.\n\n`EXEMPT` `EXEMPT_UNTIL_EXPIRY_DATE` `NOT_EXEMPT`";
                                                readonly enum: readonly ["EXEMPT", "EXEMPT_UNTIL_EXPIRY_DATE", "NOT_EXEMPT"];
                                                readonly "x-docgen-enum-table-extension": readonly [{
                                                    readonly value: "EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has been exempted from the listed enforcement actions. In cases of `EXEMPT`, Amazon acknowledges the existence of enforcement actions but ensures the user that these actions will not be applied to the listing. The user is advised to consider addressing the issue, although enforcement actions will not be taken.";
                                                }, {
                                                    readonly value: "EXEMPT_UNTIL_EXPIRY_DATE";
                                                    readonly description: "This status indicates that a product listing has been granted a temporary exemption from the listed enforcement actions. The exemption will remain in effect until a specified expiry date. After this date, Amazon will enforce the listed actions. The `expiryDate` field provides the timestamp indicating when the temporary exemption will end, adhering to the ISO 8601 format";
                                                }, {
                                                    readonly value: "NOT_EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has no exemptions from the listed enforcement actions. When the status is `NOT_EXEMPT`, it signifies that Amazon has already taken the specified enforcement actions. There is no exemption in place, and the listed actions are actively enforced";
                                                }];
                                                readonly type: "string";
                                            };
                                            readonly expiryDate: {
                                                readonly description: "This field represents the timestamp, following the ISO 8601 format, which specifies the date when temporary exemptions, if applicable, will expire, and Amazon will begin enforcing the listed actions.";
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly examples: readonly ["2023-10-28T00:36:48.914Z"];
                                            };
                                        };
                                        readonly required: readonly ["status"];
                                    };
                                };
                                readonly required: readonly ["actions", "exemption"];
                            };
                        };
                        readonly required: readonly ["code", "message", "severity", "categories"];
                        readonly type: "object";
                    };
                };
                readonly identifiers: {
                    readonly description: "Identity attributes associated with the item in the Amazon catalog, such as the ASIN.";
                    readonly items: {
                        readonly description: "Identity attributes associated with the item in the Amazon catalog for the indicated Amazon marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "A marketplace identifier. Identifies the Amazon marketplace for the listings item.";
                                readonly type: "string";
                            };
                            readonly asin: {
                                readonly description: "Amazon Standard Identification Number (ASIN) of the listings item.";
                                readonly type: "string";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
            };
            readonly required: readonly ["sku", "status", "submissionId"];
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "413": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "415": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "503": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetListingsItem: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sellerId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner identifier, such as a merchant account or vendor code.";
                };
                readonly sku: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                };
            };
            readonly required: readonly ["sellerId", "sku"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly marketplaceIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly maxItems: 1;
                    readonly examples: readonly ["ATVPDKIKX0DER"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of Amazon marketplace identifiers for the request.";
                };
                readonly issueLocale: {
                    readonly type: "string";
                    readonly examples: readonly ["en_US"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A locale for localization of issues. When not provided, the default language code of the first marketplace is used. Examples: `en_US`, `fr_CA`, `fr_FR`. Localized messages default to `en_US` when a localization is not available in the specified locale.";
                };
                readonly includedData: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["summaries", "attributes", "issues", "offers", "fulfillmentAvailability", "procurement", "relationships", "productTypes"];
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "summaries";
                            readonly description: "Summary details of the listing item.";
                        }, {
                            readonly value: "attributes";
                            readonly description: "A JSON object containing structured listing item attribute data keyed by attribute name.";
                        }, {
                            readonly value: "issues";
                            readonly description: "The issues associated with the listing item.";
                        }, {
                            readonly value: "offers";
                            readonly description: "The current offers for the listing item.";
                        }, {
                            readonly value: "fulfillmentAvailability";
                            readonly description: "The fulfillment availability details for the listing item.";
                        }, {
                            readonly value: "procurement";
                            readonly description: "Vendor procurement details for the listing item. ";
                        }, {
                            readonly value: "relationships";
                            readonly description: "Relationship details for a listing item (for example, variations).";
                        }, {
                            readonly value: "productTypes";
                            readonly description: "Product types that are associated with a listing item.";
                        }];
                        readonly type: "string";
                    };
                    readonly default: readonly ["summaries"];
                    readonly examples: readonly ["summaries"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of data sets to include in the response. Default: `summaries`.";
                };
            };
            readonly required: readonly ["marketplaceIds"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "A listings item.";
            readonly properties: {
                readonly sku: {
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                    readonly type: "string";
                };
                readonly summaries: {
                    readonly description: "Summary details of a listings item.";
                    readonly items: {
                        readonly description: "Summary details of a listings item for an Amazon marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "A marketplace identifier. Identifies the Amazon marketplace for the listings item.";
                                readonly type: "string";
                            };
                            readonly asin: {
                                readonly description: "Amazon Standard Identification Number (ASIN) of the listings item.";
                                readonly type: "string";
                            };
                            readonly productType: {
                                readonly description: "The Amazon product type of the listings item.";
                                readonly type: "string";
                            };
                            readonly conditionType: {
                                readonly description: "Identifies the condition of the listings item.\n\n`new_new` `new_open_box` `new_oem` `refurbished_refurbished` `used_like_new` `used_very_good` `used_good` `used_acceptable` `collectible_like_new` `collectible_very_good` `collectible_good` `collectible_acceptable` `club_club`";
                                readonly enum: readonly ["new_new", "new_open_box", "new_oem", "refurbished_refurbished", "used_like_new", "used_very_good", "used_good", "used_acceptable", "collectible_like_new", "collectible_very_good", "collectible_good", "collectible_acceptable", "club_club"];
                                readonly "x-docgen-enum-table-extension": readonly [{
                                    readonly value: "new_new";
                                    readonly description: "New.";
                                }, {
                                    readonly value: "new_open_box";
                                    readonly description: "New - Open Box.";
                                }, {
                                    readonly value: "new_oem";
                                    readonly description: "New - OEM.";
                                }, {
                                    readonly value: "refurbished_refurbished";
                                    readonly description: "Refurbished.";
                                }, {
                                    readonly value: "used_like_new";
                                    readonly description: "Used - Like New.";
                                }, {
                                    readonly value: "used_very_good";
                                    readonly description: "Used - Very Good.";
                                }, {
                                    readonly value: "used_good";
                                    readonly description: "Used - Good.";
                                }, {
                                    readonly value: "used_acceptable";
                                    readonly description: "Used - Acceptable.";
                                }, {
                                    readonly value: "collectible_like_new";
                                    readonly description: "Collectible - Like New.";
                                }, {
                                    readonly value: "collectible_very_good";
                                    readonly description: "Collectible - Very Good.";
                                }, {
                                    readonly value: "collectible_good";
                                    readonly description: "Collectible - Good.";
                                }, {
                                    readonly value: "collectible_acceptable";
                                    readonly description: "Collectible - Acceptable.";
                                }, {
                                    readonly value: "club_club";
                                    readonly description: "Club.";
                                }];
                                readonly type: "string";
                            };
                            readonly status: {
                                readonly description: "Statuses that apply to the listings item.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly enum: readonly ["BUYABLE", "DISCOVERABLE"];
                                    readonly "x-docgen-enum-table-extension": readonly [{
                                        readonly value: "BUYABLE";
                                        readonly description: "The listings item can be purchased by shoppers. This status does not apply to vendor listings.";
                                    }, {
                                        readonly value: "DISCOVERABLE";
                                        readonly description: "The listings item is visible to shoppers.";
                                    }];
                                    readonly description: "`BUYABLE` `DISCOVERABLE`";
                                };
                            };
                            readonly fnSku: {
                                readonly description: "The fulfillment network stock keeping unit is an identifier used by Amazon fulfillment centers to identify each unique item.";
                                readonly type: "string";
                            };
                            readonly itemName: {
                                readonly description: "The name or title associated with an Amazon catalog item.";
                                readonly type: "string";
                            };
                            readonly createdDate: {
                                readonly description: "The date the listings item was created in ISO 8601 format.";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly lastUpdatedDate: {
                                readonly description: "The date the listings item was last updated in ISO 8601 format.";
                                readonly type: "string";
                                readonly format: "date-time";
                            };
                            readonly mainImage: {
                                readonly description: "The image for the listings item.";
                                readonly properties: {
                                    readonly link: {
                                        readonly description: "The link, or URL, to the image.";
                                        readonly type: "string";
                                    };
                                    readonly height: {
                                        readonly description: "The height of the image in pixels.";
                                        readonly type: "integer";
                                    };
                                    readonly width: {
                                        readonly description: "The width of the image in pixels.";
                                        readonly type: "integer";
                                    };
                                };
                                readonly required: readonly ["link", "height", "width"];
                                readonly type: "object";
                            };
                        };
                        readonly required: readonly ["marketplaceId", "productType", "status", "createdDate", "lastUpdatedDate"];
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
                readonly attributes: {
                    readonly description: "A JSON object containing structured listings item attribute data keyed by attribute name.";
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly issues: {
                    readonly description: "The issues associated with the listings item.";
                    readonly items: {
                        readonly description: "An issue with a listings item.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An issue code that identifies the type of issue.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the issue.";
                                readonly type: "string";
                            };
                            readonly severity: {
                                readonly description: "The severity of the issue.\n\n`ERROR` `WARNING` `INFO`";
                                readonly enum: readonly ["ERROR", "WARNING", "INFO"];
                                readonly "x-docgen-enum-table-extension": readonly [{
                                    readonly value: "ERROR";
                                    readonly description: "Indicates an issue has occurred preventing the submission from processing, such as a validation error.";
                                }, {
                                    readonly value: "WARNING";
                                    readonly description: "Indicates an issue has occurred that should be reviewed, but has not prevented the submission from processing.";
                                }, {
                                    readonly value: "INFO";
                                    readonly description: "Indicates additional information has been provided that should be reviewed.";
                                }];
                                readonly type: "string";
                            };
                            readonly attributeNames: {
                                readonly description: "The names of the attributes associated with the issue, if applicable.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly categories: {
                                readonly description: "List of issue categories. \n\nPossible vales: \n\n* `INVALID_ATTRIBUTE` - Indicating an invalid attribute in the listing. \n\n* `MISSING_ATTRIBUTE` - Highlighting a missing attribute in the listing. \n\n* `INVALID_IMAGE` - Signifying an invalid image in the listing. \n\n* `MISSING_IMAGE` - Noting the absence of an image in the listing. \n\n* `INVALID_PRICE` - Pertaining to issues with the listing's price-related attributes. \n\n* `MISSING_PRICE` - Pointing out the absence of a price attribute in the listing. \n\n* `DUPLICATE` - Identifying listings with potential duplicate problems, such as this ASIN potentially being a duplicate of another ASIN. \n\n* `QUALIFICATION_REQUIRED` - Indicating that the listing requires qualification-related approval.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly examples: readonly ["INVALID_ATTRIBUTE"];
                            };
                            readonly enforcements: {
                                readonly description: "This field provides information about the enforcement actions taken by Amazon that affect the publishing or status of a listing. It also includes details about any associated exemptions.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly actions: {
                                        readonly description: "List of enforcement actions taken by Amazon that affect the publishing or status of a listing.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly description: "The enforcement action taken by Amazon that affect the publishing or status of a listing";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly action: {
                                                    readonly description: "The enforcement action name. \n\nPossible values: \n\n* `LISTING_SUPPRESSED` - This enforcement takes down the current listing item's buyability. \n\n* `ATTRIBUTE_SUPPRESSED` - An attribute's value on the listing item is invalid, which causes it to be rejected by Amazon. \n\n* `CATALOG_ITEM_REMOVED` - This catalog item is inactive on Amazon, and all offers against it in the applicable marketplace are non-buyable. \n\n* `SEARCH_SUPPRESSED` - This value indicates that the catalog item is hidden from search results.";
                                                    readonly type: "string";
                                                    readonly examples: readonly ["LISTING_SUPPRESSED"];
                                                };
                                            };
                                            readonly required: readonly ["action"];
                                        };
                                    };
                                    readonly exemption: {
                                        readonly description: "Conveying the status of the listed enforcement actions and, if applicable, provides information about the exemption's expiry date.";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly status: {
                                                readonly description: "This field indicates the current exemption status for the listed enforcement actions. It can take values such as `EXEMPT`, signifying permanent exemption, `EXEMPT_UNTIL_EXPIRY_DATE` indicating temporary exemption until a specified date, or `NOT_EXEMPT` signifying no exemptions, and enforcement actions were already applied.\n\n`EXEMPT` `EXEMPT_UNTIL_EXPIRY_DATE` `NOT_EXEMPT`";
                                                readonly enum: readonly ["EXEMPT", "EXEMPT_UNTIL_EXPIRY_DATE", "NOT_EXEMPT"];
                                                readonly "x-docgen-enum-table-extension": readonly [{
                                                    readonly value: "EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has been exempted from the listed enforcement actions. In cases of `EXEMPT`, Amazon acknowledges the existence of enforcement actions but ensures the user that these actions will not be applied to the listing. The user is advised to consider addressing the issue, although enforcement actions will not be taken.";
                                                }, {
                                                    readonly value: "EXEMPT_UNTIL_EXPIRY_DATE";
                                                    readonly description: "This status indicates that a product listing has been granted a temporary exemption from the listed enforcement actions. The exemption will remain in effect until a specified expiry date. After this date, Amazon will enforce the listed actions. The `expiryDate` field provides the timestamp indicating when the temporary exemption will end, adhering to the ISO 8601 format";
                                                }, {
                                                    readonly value: "NOT_EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has no exemptions from the listed enforcement actions. When the status is `NOT_EXEMPT`, it signifies that Amazon has already taken the specified enforcement actions. There is no exemption in place, and the listed actions are actively enforced";
                                                }];
                                                readonly type: "string";
                                            };
                                            readonly expiryDate: {
                                                readonly description: "This field represents the timestamp, following the ISO 8601 format, which specifies the date when temporary exemptions, if applicable, will expire, and Amazon will begin enforcing the listed actions.";
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly examples: readonly ["2023-10-28T00:36:48.914Z"];
                                            };
                                        };
                                        readonly required: readonly ["status"];
                                    };
                                };
                                readonly required: readonly ["actions", "exemption"];
                            };
                        };
                        readonly required: readonly ["code", "message", "severity", "categories"];
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
                readonly offers: {
                    readonly description: "Offer details for the listings item.";
                    readonly items: {
                        readonly description: "Offer details of a listings item for an Amazon marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "The Amazon marketplace identifier.";
                                readonly type: "string";
                            };
                            readonly offerType: {
                                readonly description: "Type of offer for the listings item.\n\n`B2C` `B2B`";
                                readonly enum: readonly ["B2C", "B2B"];
                                readonly "x-docgen-enum-table-extension": readonly [{
                                    readonly value: "B2C";
                                    readonly description: "The offer on this listings item is available for Business to Consumer purchase, meaning that it is available to shoppers on Amazon retail sites.";
                                }, {
                                    readonly value: "B2B";
                                    readonly description: "The offer on this listings item is available for Business to Business purchase.";
                                }];
                                readonly type: "string";
                            };
                            readonly price: {
                                readonly description: "The currency type and amount.";
                                readonly properties: {
                                    readonly currencyCode: {
                                        readonly type: "string";
                                        readonly description: "Three-digit currency code in ISO 4217 format.";
                                    };
                                    readonly amount: {
                                        readonly type: "string";
                                        readonly description: "A decimal number with no loss of precision. Useful when precision loss is unnaceptable, as with currencies. Follows RFC7159 for number representation.";
                                    };
                                };
                                readonly required: readonly ["amount", "currencyCode"];
                                readonly type: "object";
                            };
                            readonly points: {
                                readonly description: "The number of Amazon Points offered with the purchase of an item, and their monetary value. Note that the `Points` element is only returned in Japan (JP).";
                                readonly type: "object";
                                readonly properties: {
                                    readonly pointsNumber: {
                                        readonly type: "integer";
                                    };
                                };
                                readonly required: readonly ["pointsNumber"];
                            };
                            readonly audience: {
                                readonly description: "Buyer segment or program this offer is applicable to.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly value: {
                                        readonly description: "Name of the audience an offer is applicable to. \n\nCommon values: \n\n* 'ALL' - Standard offer audience for buyers on Amazon retail websites. \n\n* 'B2B' - Offer audience for Amazon Business website buyers.";
                                        readonly type: "string";
                                        readonly examples: readonly ["ALL"];
                                    };
                                    readonly displayName: {
                                        readonly description: "Localized display name for the audience.";
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                        readonly required: readonly ["marketplaceId", "offerType", "price"];
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
                readonly fulfillmentAvailability: {
                    readonly description: "The fulfillment availability for the listings item.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "The fulfillment availability details for the listings item.";
                        readonly properties: {
                            readonly fulfillmentChannelCode: {
                                readonly description: "The code of the fulfillment network that will be used.";
                                readonly type: "string";
                            };
                            readonly quantity: {
                                readonly description: "The quantity of the item you are making available for sale.";
                                readonly type: "integer";
                                readonly minimum: 0;
                            };
                        };
                        readonly required: readonly ["fulfillmentChannelCode"];
                        readonly type: "object";
                    };
                };
                readonly procurement: {
                    readonly description: "The vendor procurement information for the listings item.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "The vendor procurement information for the listings item.";
                        readonly properties: {
                            readonly costPrice: {
                                readonly description: "The currency type and amount.";
                                readonly properties: {
                                    readonly currencyCode: {
                                        readonly type: "string";
                                        readonly description: "Three-digit currency code in ISO 4217 format.";
                                    };
                                    readonly amount: {
                                        readonly type: "string";
                                        readonly description: "A decimal number with no loss of precision. Useful when precision loss is unnaceptable, as with currencies. Follows RFC7159 for number representation.";
                                    };
                                };
                                readonly required: readonly ["amount", "currencyCode"];
                                readonly type: "object";
                            };
                        };
                        readonly required: readonly ["costPrice"];
                        readonly type: "object";
                    };
                };
                readonly relationships: {
                    readonly description: "Relationships for a listing item, by marketplace (for example, variations).";
                    readonly items: {
                        readonly description: "Relationship details for the listing item in the specified marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "Amazon marketplace identifier.";
                                readonly type: "string";
                            };
                            readonly relationships: {
                                readonly description: "Relationships for the listing item.";
                                readonly items: {
                                    readonly description: "the relationship details for a listing item.";
                                    readonly properties: {
                                        readonly childSkus: {
                                            readonly description: "Identifiers (SKUs) of the related items that are children of this listing item.";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly type: "array";
                                        };
                                        readonly parentSkus: {
                                            readonly description: "Identifiers (SKUs) of the related items that are parents of this listing item.";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly type: "array";
                                        };
                                        readonly variationTheme: {
                                            readonly description: "A variation theme that indicates the combination of listing item attributes that define the variation family.";
                                            readonly properties: {
                                                readonly attributes: {
                                                    readonly description: "The names of the listing item attributes that are associated with the variation theme.";
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                    readonly type: "array";
                                                };
                                                readonly theme: {
                                                    readonly description: "The variation theme that indicates the combination of listing item attributes that define the variation family.";
                                                    readonly type: "string";
                                                    readonly examples: readonly ["COLOR_NAME/STYLE_NAME"];
                                                };
                                            };
                                            readonly required: readonly ["attributes", "theme"];
                                            readonly type: "object";
                                        };
                                        readonly type: {
                                            readonly description: "The type of relationship.\n\n`VARIATION` `PACKAGE_HIERARCHY`";
                                            readonly enum: readonly ["VARIATION", "PACKAGE_HIERARCHY"];
                                            readonly "x-docgen-enum-table-extension": readonly [{
                                                readonly value: "VARIATION";
                                                readonly description: "The listing item in the request is a variation parent or variation child of the related listing items, indicated by SKU.";
                                            }, {
                                                readonly value: "PACKAGE_HIERARCHY";
                                                readonly description: "The listing item in the request is a package container or is contained by the related listing items, indicated by SKU.";
                                            }];
                                            readonly type: "string";
                                            readonly examples: readonly ["VARIATION"];
                                        };
                                    };
                                    readonly required: readonly ["type"];
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                        };
                        readonly required: readonly ["marketplaceId", "relationships"];
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
                readonly productTypes: {
                    readonly description: "Product types for a listing item, by marketplace.";
                    readonly items: {
                        readonly description: "Product types that are associated with the listing item for the specified marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "Amazon marketplace identifier.";
                                readonly type: "string";
                            };
                            readonly productType: {
                                readonly description: "The name of the product type that is submitted by the Selling Partner.";
                                readonly type: "string";
                                readonly examples: readonly ["LUGGAGE"];
                            };
                        };
                        readonly required: readonly ["marketplaceId", "productType"];
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
            };
            readonly required: readonly ["sku"];
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "413": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "415": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "503": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PatchListingsItem: {
    readonly body: {
        readonly description: "The request body schema for the `patchListingsItem` operation.";
        readonly properties: {
            readonly productType: {
                readonly description: "The Amazon product type of the listings item.";
                readonly type: "string";
            };
            readonly patches: {
                readonly description: "One or more JSON Patch operations to perform on the listings item.";
                readonly type: "array";
                readonly items: {
                    readonly description: "Individual JSON Patch operation for an HTTP PATCH request.";
                    readonly properties: {
                        readonly op: {
                            readonly description: "Type of JSON Patch operation. Supported JSON Patch operations include add, replace, and delete. Refer to [JavaScript Object Notation (JSON) Patch](https://tools.ietf.org/html/rfc6902) for more information.";
                            readonly enum: readonly ["add", "replace", "delete"];
                            readonly "x-docgen-enum-table-extension": readonly [{
                                readonly value: "add";
                                readonly description: "The `add` operation adds or replaces the target property.";
                            }, {
                                readonly value: "replace";
                                readonly description: "The `replace` operation adds or replaces the target property.";
                            }, {
                                readonly value: "delete";
                                readonly description: "The `delete` operation removes the target property. Not supported for vendors (vendors will receive an HTTP status code 400 response).";
                            }];
                            readonly type: "string";
                        };
                        readonly path: {
                            readonly description: "JSON Pointer path of the element to patch. Refer to [JavaScript Object Notation (JSON) Patch](https://tools.ietf.org/html/rfc6902) for more information.";
                            readonly type: "string";
                        };
                        readonly value: {
                            readonly description: "JSON value to add, replace, or delete.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                        };
                    };
                    readonly required: readonly ["op", "path"];
                    readonly type: "object";
                };
                readonly minItems: 1;
            };
        };
        readonly required: readonly ["productType", "patches"];
        readonly type: "object";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sellerId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner identifier, such as a merchant account or vendor code.";
                };
                readonly sku: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                };
            };
            readonly required: readonly ["sellerId", "sku"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly marketplaceIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly maxItems: 1;
                    readonly examples: readonly ["ATVPDKIKX0DER"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of Amazon marketplace identifiers for the request.";
                };
                readonly includedData: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["identifiers", "issues"];
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "identifiers";
                            readonly description: "Identifiers associated with the item in the Amazon catalog, such as Amazon Standard Identification Number (ASIN). Can only be requested when `mode` is `VALIDATION_PREVIEW`.";
                        }, {
                            readonly value: "issues";
                            readonly description: "The issues associated with the listing item.";
                        }];
                        readonly type: "string";
                    };
                    readonly default: readonly ["issues"];
                    readonly examples: readonly ["issues"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of data sets to include in the response. Default: `issues`.";
                };
                readonly mode: {
                    readonly type: "string";
                    readonly enum: readonly ["VALIDATION_PREVIEW"];
                    readonly examples: readonly ["VALIDATION_PREVIEW"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The mode of operation for the request.";
                };
                readonly issueLocale: {
                    readonly type: "string";
                    readonly examples: readonly ["en_US"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A locale for localization of issues. When not provided, the default language code of the first marketplace is used. Examples: `en_US`, `fr_CA`, `fr_FR`. Localized messages default to `en_US` when a localization is not available in the specified locale.";
                };
            };
            readonly required: readonly ["marketplaceIds"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "Response containing the results of a submission to the Selling Partner API for Listings Items.";
            readonly properties: {
                readonly sku: {
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                    readonly type: "string";
                };
                readonly status: {
                    readonly description: "The status of the listings item submission.\n\n`ACCEPTED` `INVALID` `VALID`";
                    readonly enum: readonly ["ACCEPTED", "INVALID", "VALID"];
                    readonly "x-docgen-enum-table-extension": readonly [{
                        readonly value: "ACCEPTED";
                        readonly description: "The listings submission was accepted for processing.";
                    }, {
                        readonly value: "INVALID";
                        readonly description: "The listings submission was not valid and was not accepted for processing.";
                    }, {
                        readonly value: "VALID";
                        readonly description: "The listings submission was valid. Only returned when the `mode` is `VALIDATION_PREVIEW`.";
                    }];
                    readonly type: "string";
                };
                readonly submissionId: {
                    readonly description: "The unique identifier of the listings item submission.";
                    readonly type: "string";
                };
                readonly issues: {
                    readonly description: "Listings item issues related to the listings item submission.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "An issue with a listings item.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An issue code that identifies the type of issue.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the issue.";
                                readonly type: "string";
                            };
                            readonly severity: {
                                readonly description: "The severity of the issue.\n\n`ERROR` `WARNING` `INFO`";
                                readonly enum: readonly ["ERROR", "WARNING", "INFO"];
                                readonly "x-docgen-enum-table-extension": readonly [{
                                    readonly value: "ERROR";
                                    readonly description: "Indicates an issue has occurred preventing the submission from processing, such as a validation error.";
                                }, {
                                    readonly value: "WARNING";
                                    readonly description: "Indicates an issue has occurred that should be reviewed, but has not prevented the submission from processing.";
                                }, {
                                    readonly value: "INFO";
                                    readonly description: "Indicates additional information has been provided that should be reviewed.";
                                }];
                                readonly type: "string";
                            };
                            readonly attributeNames: {
                                readonly description: "The names of the attributes associated with the issue, if applicable.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly categories: {
                                readonly description: "List of issue categories. \n\nPossible vales: \n\n* `INVALID_ATTRIBUTE` - Indicating an invalid attribute in the listing. \n\n* `MISSING_ATTRIBUTE` - Highlighting a missing attribute in the listing. \n\n* `INVALID_IMAGE` - Signifying an invalid image in the listing. \n\n* `MISSING_IMAGE` - Noting the absence of an image in the listing. \n\n* `INVALID_PRICE` - Pertaining to issues with the listing's price-related attributes. \n\n* `MISSING_PRICE` - Pointing out the absence of a price attribute in the listing. \n\n* `DUPLICATE` - Identifying listings with potential duplicate problems, such as this ASIN potentially being a duplicate of another ASIN. \n\n* `QUALIFICATION_REQUIRED` - Indicating that the listing requires qualification-related approval.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly examples: readonly ["INVALID_ATTRIBUTE"];
                            };
                            readonly enforcements: {
                                readonly description: "This field provides information about the enforcement actions taken by Amazon that affect the publishing or status of a listing. It also includes details about any associated exemptions.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly actions: {
                                        readonly description: "List of enforcement actions taken by Amazon that affect the publishing or status of a listing.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly description: "The enforcement action taken by Amazon that affect the publishing or status of a listing";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly action: {
                                                    readonly description: "The enforcement action name. \n\nPossible values: \n\n* `LISTING_SUPPRESSED` - This enforcement takes down the current listing item's buyability. \n\n* `ATTRIBUTE_SUPPRESSED` - An attribute's value on the listing item is invalid, which causes it to be rejected by Amazon. \n\n* `CATALOG_ITEM_REMOVED` - This catalog item is inactive on Amazon, and all offers against it in the applicable marketplace are non-buyable. \n\n* `SEARCH_SUPPRESSED` - This value indicates that the catalog item is hidden from search results.";
                                                    readonly type: "string";
                                                    readonly examples: readonly ["LISTING_SUPPRESSED"];
                                                };
                                            };
                                            readonly required: readonly ["action"];
                                        };
                                    };
                                    readonly exemption: {
                                        readonly description: "Conveying the status of the listed enforcement actions and, if applicable, provides information about the exemption's expiry date.";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly status: {
                                                readonly description: "This field indicates the current exemption status for the listed enforcement actions. It can take values such as `EXEMPT`, signifying permanent exemption, `EXEMPT_UNTIL_EXPIRY_DATE` indicating temporary exemption until a specified date, or `NOT_EXEMPT` signifying no exemptions, and enforcement actions were already applied.\n\n`EXEMPT` `EXEMPT_UNTIL_EXPIRY_DATE` `NOT_EXEMPT`";
                                                readonly enum: readonly ["EXEMPT", "EXEMPT_UNTIL_EXPIRY_DATE", "NOT_EXEMPT"];
                                                readonly "x-docgen-enum-table-extension": readonly [{
                                                    readonly value: "EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has been exempted from the listed enforcement actions. In cases of `EXEMPT`, Amazon acknowledges the existence of enforcement actions but ensures the user that these actions will not be applied to the listing. The user is advised to consider addressing the issue, although enforcement actions will not be taken.";
                                                }, {
                                                    readonly value: "EXEMPT_UNTIL_EXPIRY_DATE";
                                                    readonly description: "This status indicates that a product listing has been granted a temporary exemption from the listed enforcement actions. The exemption will remain in effect until a specified expiry date. After this date, Amazon will enforce the listed actions. The `expiryDate` field provides the timestamp indicating when the temporary exemption will end, adhering to the ISO 8601 format";
                                                }, {
                                                    readonly value: "NOT_EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has no exemptions from the listed enforcement actions. When the status is `NOT_EXEMPT`, it signifies that Amazon has already taken the specified enforcement actions. There is no exemption in place, and the listed actions are actively enforced";
                                                }];
                                                readonly type: "string";
                                            };
                                            readonly expiryDate: {
                                                readonly description: "This field represents the timestamp, following the ISO 8601 format, which specifies the date when temporary exemptions, if applicable, will expire, and Amazon will begin enforcing the listed actions.";
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly examples: readonly ["2023-10-28T00:36:48.914Z"];
                                            };
                                        };
                                        readonly required: readonly ["status"];
                                    };
                                };
                                readonly required: readonly ["actions", "exemption"];
                            };
                        };
                        readonly required: readonly ["code", "message", "severity", "categories"];
                        readonly type: "object";
                    };
                };
                readonly identifiers: {
                    readonly description: "Identity attributes associated with the item in the Amazon catalog, such as the ASIN.";
                    readonly items: {
                        readonly description: "Identity attributes associated with the item in the Amazon catalog for the indicated Amazon marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "A marketplace identifier. Identifies the Amazon marketplace for the listings item.";
                                readonly type: "string";
                            };
                            readonly asin: {
                                readonly description: "Amazon Standard Identification Number (ASIN) of the listings item.";
                                readonly type: "string";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
            };
            readonly required: readonly ["sku", "status", "submissionId"];
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "413": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "415": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "503": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutListingsItem: {
    readonly body: {
        readonly description: "The request body schema for the `putListingsItem` operation.";
        readonly properties: {
            readonly productType: {
                readonly description: "The Amazon product type of the listings item.";
                readonly type: "string";
            };
            readonly requirements: {
                readonly description: "The name of the requirements set for the provided data.";
                readonly enum: readonly ["LISTING", "LISTING_PRODUCT_ONLY", "LISTING_OFFER_ONLY"];
                readonly "x-docgen-enum-table-extension": readonly [{
                    readonly value: "LISTING";
                    readonly description: "Indicates the submitted data contains product facts and sales terms.";
                }, {
                    readonly value: "LISTING_PRODUCT_ONLY";
                    readonly description: "Indicates the submitted data contains product facts only.";
                }, {
                    readonly value: "LISTING_OFFER_ONLY";
                    readonly description: "Indicates the submitted data contains sales terms only. Not supported for vendors (vendors will receive an HTTP status code 400 response).";
                }];
                readonly type: "string";
            };
            readonly attributes: {
                readonly description: "A JSON object containing structured listings item attribute data keyed by attribute name.";
                readonly type: "object";
                readonly additionalProperties: true;
            };
        };
        readonly required: readonly ["productType", "attributes"];
        readonly type: "object";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sellerId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner identifier, such as a merchant account or vendor code.";
                };
                readonly sku: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                };
            };
            readonly required: readonly ["sellerId", "sku"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly marketplaceIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly maxItems: 1;
                    readonly examples: readonly ["ATVPDKIKX0DER"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of Amazon marketplace identifiers for the request.";
                };
                readonly includedData: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["identifiers", "issues"];
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "identifiers";
                            readonly description: "Identifiers associated with the item in the Amazon catalog, such as Amazon Standard Identification Number (ASIN). Can only be requested when `mode` is `VALIDATION_PREVIEW`.";
                        }, {
                            readonly value: "issues";
                            readonly description: "The issues associated with the listing item.";
                        }];
                        readonly type: "string";
                    };
                    readonly default: readonly ["issues"];
                    readonly examples: readonly ["issues"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of data sets to include in the response. Default: `issues`.";
                };
                readonly mode: {
                    readonly type: "string";
                    readonly enum: readonly ["VALIDATION_PREVIEW"];
                    readonly examples: readonly ["VALIDATION_PREVIEW"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The mode of operation for the request.";
                };
                readonly issueLocale: {
                    readonly type: "string";
                    readonly examples: readonly ["en_US"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A locale for localization of issues. When not provided, the default language code of the first marketplace is used. Examples: `en_US`, `fr_CA`, `fr_FR`. Localized messages default to `en_US` when a localization is not available in the specified locale.";
                };
            };
            readonly required: readonly ["marketplaceIds"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "Response containing the results of a submission to the Selling Partner API for Listings Items.";
            readonly properties: {
                readonly sku: {
                    readonly description: "A selling partner provided identifier for an Amazon listing.";
                    readonly type: "string";
                };
                readonly status: {
                    readonly description: "The status of the listings item submission.\n\n`ACCEPTED` `INVALID` `VALID`";
                    readonly enum: readonly ["ACCEPTED", "INVALID", "VALID"];
                    readonly "x-docgen-enum-table-extension": readonly [{
                        readonly value: "ACCEPTED";
                        readonly description: "The listings submission was accepted for processing.";
                    }, {
                        readonly value: "INVALID";
                        readonly description: "The listings submission was not valid and was not accepted for processing.";
                    }, {
                        readonly value: "VALID";
                        readonly description: "The listings submission was valid. Only returned when the `mode` is `VALIDATION_PREVIEW`.";
                    }];
                    readonly type: "string";
                };
                readonly submissionId: {
                    readonly description: "The unique identifier of the listings item submission.";
                    readonly type: "string";
                };
                readonly issues: {
                    readonly description: "Listings item issues related to the listings item submission.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "An issue with a listings item.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An issue code that identifies the type of issue.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the issue.";
                                readonly type: "string";
                            };
                            readonly severity: {
                                readonly description: "The severity of the issue.\n\n`ERROR` `WARNING` `INFO`";
                                readonly enum: readonly ["ERROR", "WARNING", "INFO"];
                                readonly "x-docgen-enum-table-extension": readonly [{
                                    readonly value: "ERROR";
                                    readonly description: "Indicates an issue has occurred preventing the submission from processing, such as a validation error.";
                                }, {
                                    readonly value: "WARNING";
                                    readonly description: "Indicates an issue has occurred that should be reviewed, but has not prevented the submission from processing.";
                                }, {
                                    readonly value: "INFO";
                                    readonly description: "Indicates additional information has been provided that should be reviewed.";
                                }];
                                readonly type: "string";
                            };
                            readonly attributeNames: {
                                readonly description: "The names of the attributes associated with the issue, if applicable.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                            readonly categories: {
                                readonly description: "List of issue categories. \n\nPossible vales: \n\n* `INVALID_ATTRIBUTE` - Indicating an invalid attribute in the listing. \n\n* `MISSING_ATTRIBUTE` - Highlighting a missing attribute in the listing. \n\n* `INVALID_IMAGE` - Signifying an invalid image in the listing. \n\n* `MISSING_IMAGE` - Noting the absence of an image in the listing. \n\n* `INVALID_PRICE` - Pertaining to issues with the listing's price-related attributes. \n\n* `MISSING_PRICE` - Pointing out the absence of a price attribute in the listing. \n\n* `DUPLICATE` - Identifying listings with potential duplicate problems, such as this ASIN potentially being a duplicate of another ASIN. \n\n* `QUALIFICATION_REQUIRED` - Indicating that the listing requires qualification-related approval.";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly examples: readonly ["INVALID_ATTRIBUTE"];
                            };
                            readonly enforcements: {
                                readonly description: "This field provides information about the enforcement actions taken by Amazon that affect the publishing or status of a listing. It also includes details about any associated exemptions.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly actions: {
                                        readonly description: "List of enforcement actions taken by Amazon that affect the publishing or status of a listing.";
                                        readonly type: "array";
                                        readonly items: {
                                            readonly description: "The enforcement action taken by Amazon that affect the publishing or status of a listing";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly action: {
                                                    readonly description: "The enforcement action name. \n\nPossible values: \n\n* `LISTING_SUPPRESSED` - This enforcement takes down the current listing item's buyability. \n\n* `ATTRIBUTE_SUPPRESSED` - An attribute's value on the listing item is invalid, which causes it to be rejected by Amazon. \n\n* `CATALOG_ITEM_REMOVED` - This catalog item is inactive on Amazon, and all offers against it in the applicable marketplace are non-buyable. \n\n* `SEARCH_SUPPRESSED` - This value indicates that the catalog item is hidden from search results.";
                                                    readonly type: "string";
                                                    readonly examples: readonly ["LISTING_SUPPRESSED"];
                                                };
                                            };
                                            readonly required: readonly ["action"];
                                        };
                                    };
                                    readonly exemption: {
                                        readonly description: "Conveying the status of the listed enforcement actions and, if applicable, provides information about the exemption's expiry date.";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly status: {
                                                readonly description: "This field indicates the current exemption status for the listed enforcement actions. It can take values such as `EXEMPT`, signifying permanent exemption, `EXEMPT_UNTIL_EXPIRY_DATE` indicating temporary exemption until a specified date, or `NOT_EXEMPT` signifying no exemptions, and enforcement actions were already applied.\n\n`EXEMPT` `EXEMPT_UNTIL_EXPIRY_DATE` `NOT_EXEMPT`";
                                                readonly enum: readonly ["EXEMPT", "EXEMPT_UNTIL_EXPIRY_DATE", "NOT_EXEMPT"];
                                                readonly "x-docgen-enum-table-extension": readonly [{
                                                    readonly value: "EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has been exempted from the listed enforcement actions. In cases of `EXEMPT`, Amazon acknowledges the existence of enforcement actions but ensures the user that these actions will not be applied to the listing. The user is advised to consider addressing the issue, although enforcement actions will not be taken.";
                                                }, {
                                                    readonly value: "EXEMPT_UNTIL_EXPIRY_DATE";
                                                    readonly description: "This status indicates that a product listing has been granted a temporary exemption from the listed enforcement actions. The exemption will remain in effect until a specified expiry date. After this date, Amazon will enforce the listed actions. The `expiryDate` field provides the timestamp indicating when the temporary exemption will end, adhering to the ISO 8601 format";
                                                }, {
                                                    readonly value: "NOT_EXEMPT";
                                                    readonly description: "This status is assigned to a product listing when it has no exemptions from the listed enforcement actions. When the status is `NOT_EXEMPT`, it signifies that Amazon has already taken the specified enforcement actions. There is no exemption in place, and the listed actions are actively enforced";
                                                }];
                                                readonly type: "string";
                                            };
                                            readonly expiryDate: {
                                                readonly description: "This field represents the timestamp, following the ISO 8601 format, which specifies the date when temporary exemptions, if applicable, will expire, and Amazon will begin enforcing the listed actions.";
                                                readonly type: "string";
                                                readonly format: "date-time";
                                                readonly examples: readonly ["2023-10-28T00:36:48.914Z"];
                                            };
                                        };
                                        readonly required: readonly ["status"];
                                    };
                                };
                                readonly required: readonly ["actions", "exemption"];
                            };
                        };
                        readonly required: readonly ["code", "message", "severity", "categories"];
                        readonly type: "object";
                    };
                };
                readonly identifiers: {
                    readonly description: "Identity attributes associated with the item in the Amazon catalog, such as the ASIN.";
                    readonly items: {
                        readonly description: "Identity attributes associated with the item in the Amazon catalog for the indicated Amazon marketplace.";
                        readonly properties: {
                            readonly marketplaceId: {
                                readonly description: "A marketplace identifier. Identifies the Amazon marketplace for the listings item.";
                                readonly type: "string";
                            };
                            readonly asin: {
                                readonly description: "Amazon Standard Identification Number (ASIN) of the listings item.";
                                readonly type: "string";
                            };
                        };
                        readonly type: "object";
                    };
                    readonly type: "array";
                };
            };
            readonly required: readonly ["sku", "status", "submissionId"];
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "413": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "415": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "503": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SearchListingsItems: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly sellerId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A selling partner identifier, such as a merchant account or vendor code.";
                };
            };
            readonly required: readonly ["sellerId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly marketplaceIds: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly maxItems: 1;
                    readonly examples: readonly ["ATVPDKIKX0DER"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of Amazon marketplace identifiers for the request.";
                };
                readonly issueLocale: {
                    readonly type: "string";
                    readonly examples: readonly ["en_US"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A locale that is used to localize issues. When not provided, the default language code of the first marketplace is used. Examples: \"en_US\", \"fr_CA\", \"fr_FR\". When a localization is not available in the specified locale, localized messages default to \"en_US\".";
                };
                readonly includedData: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["summaries", "attributes", "issues", "offers", "fulfillmentAvailability", "procurement", "relationships", "productTypes"];
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "summaries";
                            readonly description: "Summary details for the listing item.";
                        }, {
                            readonly value: "attributes";
                            readonly description: "A JSON object that contains structured listing item attribute data, keyed by attribute name.";
                        }, {
                            readonly value: "issues";
                            readonly description: "Issues that are associated with the listing item.";
                        }, {
                            readonly value: "offers";
                            readonly description: "Current offers for the listing item.";
                        }, {
                            readonly value: "fulfillmentAvailability";
                            readonly description: "Fulfillment availability details for the listing item.";
                        }, {
                            readonly value: "procurement";
                            readonly description: "Vendor procurement details for the listing item. ";
                        }, {
                            readonly value: "relationships";
                            readonly description: "Relationship details for a listing item (for example, variations).";
                        }, {
                            readonly value: "productTypes";
                            readonly description: "Product types associated with a listing item.";
                        }];
                        readonly type: "string";
                    };
                    readonly default: readonly ["summaries"];
                    readonly examples: readonly ["summaries"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of datasets that you want to include in the response. Default: `summaries`.";
                };
                readonly identifiers: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly maxItems: 20;
                    readonly examples: readonly ["GM-ZDPI-9B4E"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A comma-delimited list of product identifiers that you can use to search for listings items. \n\n**Note**: \n1. This is required when you specify `identifiersType`.\n2. You cannot use 'identifiers' if you specify `variationParentSku` or `packageHierarchySku`.";
                };
                readonly identifiersType: {
                    readonly type: "string";
                    readonly enum: readonly ["ASIN", "EAN", "FNSKU", "GTIN", "ISBN", "JAN", "MINSAN", "SKU", "UPC"];
                    readonly examples: readonly ["SKU"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A type of product identifiers that you can use to search for listings items. \n\n**Note**: \nThis is required when `identifiers` is provided.";
                };
                readonly variationParentSku: {
                    readonly type: "string";
                    readonly examples: readonly ["GM-ZDPI-9B4E"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filters results to include listing items that are variation children of the specified SKU. \n\n**Note**: You cannot use `variationParentSku` if you include `identifiers` or `packageHierarchySku` in your request.";
                };
                readonly packageHierarchySku: {
                    readonly type: "string";
                    readonly examples: readonly ["GM-ZDPI-9B4E"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter results to include listing items that contain or are contained by the specified SKU. \n\n**Note**: You cannot use `packageHierarchySku` if you include `identifiers` or `variationParentSku` in your request.";
                };
                readonly createdAfter: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-03-01T01:30:00.000Z"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A date-time that is used to filter listing items. The response includes listings items that were created at or after this time. Values are in [ISO 8601](https://developer-docs.amazon.com/sp-api/docs/iso-8601) date-time format.";
                };
                readonly createdBefore: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-03-31T21:45:00.000Z"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A date-time that is used to filter listing items. The response includes listings items that were created at or before this time. Values are in [ISO 8601](https://developer-docs.amazon.com/sp-api/docs/iso-8601) date-time format.";
                };
                readonly lastUpdatedAfter: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-05-05T23:45:00.000Z"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A date-time that is used to filter listing items. The response includes listings items that were last updated at or after this time. Values are in [ISO 8601](https://developer-docs.amazon.com/sp-api/docs/iso-8601) date-time format.";
                };
                readonly lastUpdatedBefore: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2024-05-01T01:15:00.000Z"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A date-time that is used to filter listing items. The response includes listings items that were last updated at or before this time. Values are in [ISO 8601](https://developer-docs.amazon.com/sp-api/docs/iso-8601) date-time format.";
                };
                readonly withIssueSeverity: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["WARNING", "ERROR"];
                        readonly type: "string";
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "ERROR";
                            readonly description: "Indicates that an issue has occurred, which prevented the submission from processing. For example, a validation error.";
                        }, {
                            readonly value: "WARNING";
                            readonly description: "Indicates an issue has occurred that should be reviewed, but it has not prevented the submission from processing.";
                        }];
                    };
                    readonly examples: readonly ["WARNING"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter results to include only listing items that have issues that match one or more of the specified severity levels.";
                };
                readonly withStatus: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["BUYABLE", "DISCOVERABLE"];
                        readonly type: "string";
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "BUYABLE";
                            readonly description: "The listings item can be purchased by shoppers. This status does not apply to vendor listings.";
                        }, {
                            readonly value: "DISCOVERABLE";
                            readonly description: "The listings item is visible to shoppers.";
                        }];
                    };
                    readonly examples: readonly ["DISCOVERABLE"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter results to include only listing items that have the specified status.";
                };
                readonly withoutStatus: {
                    readonly type: "array";
                    readonly items: {
                        readonly enum: readonly ["BUYABLE", "DISCOVERABLE"];
                        readonly type: "string";
                        readonly "x-docgen-enum-table-extension": readonly [{
                            readonly value: "BUYABLE";
                            readonly description: "The listings item can be purchased by shoppers. This status does not apply to vendor listings.";
                        }, {
                            readonly value: "DISCOVERABLE";
                            readonly description: "The listings item is visible to shoppers.";
                        }];
                    };
                    readonly examples: readonly ["BUYABLE"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter results to include only listing items that don't contain the specified statuses.";
                };
                readonly sortBy: {
                    readonly type: "string";
                    readonly enum: readonly ["sku", "createdDate", "lastUpdatedDate"];
                    readonly default: "lastUpdatedDate";
                    readonly examples: readonly ["lastUpdatedDate"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An attribute by which to sort the returned listing items.";
                };
                readonly sortOrder: {
                    readonly type: "string";
                    readonly enum: readonly ["ASC", "DESC"];
                    readonly default: "DESC";
                    readonly examples: readonly ["DESC"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The order in which to sort the result items.";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly maximum: 20;
                    readonly default: 10;
                    readonly examples: readonly [9];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of results that you want to include on each page.";
                };
                readonly pageToken: {
                    readonly type: "string";
                    readonly examples: readonly ["sdlkj234lkj234lksjdflkjwdflkjsfdlkj234234234234"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A token that you can use to fetch a specific page when there are multiple pages of results.";
                };
            };
            readonly required: readonly ["marketplaceIds"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly description: "Selling partner listings items and search related metadata.";
            readonly properties: {
                readonly numberOfResults: {
                    readonly description: "The total number of selling partner listings items found for the search criteria (only results up to the page count limit will be returned per request regardless of the number found).\n\nNote: The maximum number of items (SKUs) that can be returned and paged through is 1000.";
                    readonly type: "integer";
                };
                readonly pagination: {
                    readonly description: "When a request produces a response that exceeds the `pageSize`, pagination occurs. This means the response is divided into individual pages. To retrieve the next page or the previous page, you must pass the `nextToken` value or the `previousToken` value as the `pageToken` parameter in the next request. When you receive the last page, there will be no `nextToken` key in the pagination object.";
                    readonly properties: {
                        readonly nextToken: {
                            readonly description: "A token that can be used to fetch the next page.";
                            readonly type: "string";
                        };
                        readonly previousToken: {
                            readonly description: "A token that can be used to fetch the previous page.";
                            readonly type: "string";
                        };
                    };
                    readonly type: "object";
                };
                readonly items: {
                    readonly description: "A list of listings items.";
                    readonly type: "array";
                    readonly items: {
                        readonly description: "A listings item.";
                        readonly properties: {
                            readonly sku: {
                                readonly description: "A selling partner provided identifier for an Amazon listing.";
                                readonly type: "string";
                            };
                            readonly summaries: {
                                readonly description: "Summary details of a listings item.";
                                readonly items: {
                                    readonly description: "Summary details of a listings item for an Amazon marketplace.";
                                    readonly properties: {
                                        readonly marketplaceId: {
                                            readonly description: "A marketplace identifier. Identifies the Amazon marketplace for the listings item.";
                                            readonly type: "string";
                                        };
                                        readonly asin: {
                                            readonly description: "Amazon Standard Identification Number (ASIN) of the listings item.";
                                            readonly type: "string";
                                        };
                                        readonly productType: {
                                            readonly description: "The Amazon product type of the listings item.";
                                            readonly type: "string";
                                        };
                                        readonly conditionType: {
                                            readonly description: "Identifies the condition of the listings item.\n\n`new_new` `new_open_box` `new_oem` `refurbished_refurbished` `used_like_new` `used_very_good` `used_good` `used_acceptable` `collectible_like_new` `collectible_very_good` `collectible_good` `collectible_acceptable` `club_club`";
                                            readonly enum: readonly ["new_new", "new_open_box", "new_oem", "refurbished_refurbished", "used_like_new", "used_very_good", "used_good", "used_acceptable", "collectible_like_new", "collectible_very_good", "collectible_good", "collectible_acceptable", "club_club"];
                                            readonly "x-docgen-enum-table-extension": readonly [{
                                                readonly value: "new_new";
                                                readonly description: "New.";
                                            }, {
                                                readonly value: "new_open_box";
                                                readonly description: "New - Open Box.";
                                            }, {
                                                readonly value: "new_oem";
                                                readonly description: "New - OEM.";
                                            }, {
                                                readonly value: "refurbished_refurbished";
                                                readonly description: "Refurbished.";
                                            }, {
                                                readonly value: "used_like_new";
                                                readonly description: "Used - Like New.";
                                            }, {
                                                readonly value: "used_very_good";
                                                readonly description: "Used - Very Good.";
                                            }, {
                                                readonly value: "used_good";
                                                readonly description: "Used - Good.";
                                            }, {
                                                readonly value: "used_acceptable";
                                                readonly description: "Used - Acceptable.";
                                            }, {
                                                readonly value: "collectible_like_new";
                                                readonly description: "Collectible - Like New.";
                                            }, {
                                                readonly value: "collectible_very_good";
                                                readonly description: "Collectible - Very Good.";
                                            }, {
                                                readonly value: "collectible_good";
                                                readonly description: "Collectible - Good.";
                                            }, {
                                                readonly value: "collectible_acceptable";
                                                readonly description: "Collectible - Acceptable.";
                                            }, {
                                                readonly value: "club_club";
                                                readonly description: "Club.";
                                            }];
                                            readonly type: "string";
                                        };
                                        readonly status: {
                                            readonly description: "Statuses that apply to the listings item.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly enum: readonly ["BUYABLE", "DISCOVERABLE"];
                                                readonly "x-docgen-enum-table-extension": readonly [{
                                                    readonly value: "BUYABLE";
                                                    readonly description: "The listings item can be purchased by shoppers. This status does not apply to vendor listings.";
                                                }, {
                                                    readonly value: "DISCOVERABLE";
                                                    readonly description: "The listings item is visible to shoppers.";
                                                }];
                                                readonly description: "`BUYABLE` `DISCOVERABLE`";
                                            };
                                        };
                                        readonly fnSku: {
                                            readonly description: "The fulfillment network stock keeping unit is an identifier used by Amazon fulfillment centers to identify each unique item.";
                                            readonly type: "string";
                                        };
                                        readonly itemName: {
                                            readonly description: "The name or title associated with an Amazon catalog item.";
                                            readonly type: "string";
                                        };
                                        readonly createdDate: {
                                            readonly description: "The date the listings item was created in ISO 8601 format.";
                                            readonly type: "string";
                                            readonly format: "date-time";
                                        };
                                        readonly lastUpdatedDate: {
                                            readonly description: "The date the listings item was last updated in ISO 8601 format.";
                                            readonly type: "string";
                                            readonly format: "date-time";
                                        };
                                        readonly mainImage: {
                                            readonly description: "The image for the listings item.";
                                            readonly properties: {
                                                readonly link: {
                                                    readonly description: "The link, or URL, to the image.";
                                                    readonly type: "string";
                                                };
                                                readonly height: {
                                                    readonly description: "The height of the image in pixels.";
                                                    readonly type: "integer";
                                                };
                                                readonly width: {
                                                    readonly description: "The width of the image in pixels.";
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly required: readonly ["link", "height", "width"];
                                            readonly type: "object";
                                        };
                                    };
                                    readonly required: readonly ["marketplaceId", "productType", "status", "createdDate", "lastUpdatedDate"];
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                            readonly attributes: {
                                readonly description: "A JSON object containing structured listings item attribute data keyed by attribute name.";
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly issues: {
                                readonly description: "The issues associated with the listings item.";
                                readonly items: {
                                    readonly description: "An issue with a listings item.";
                                    readonly properties: {
                                        readonly code: {
                                            readonly description: "An issue code that identifies the type of issue.";
                                            readonly type: "string";
                                        };
                                        readonly message: {
                                            readonly description: "A message that describes the issue.";
                                            readonly type: "string";
                                        };
                                        readonly severity: {
                                            readonly description: "The severity of the issue.\n\n`ERROR` `WARNING` `INFO`";
                                            readonly enum: readonly ["ERROR", "WARNING", "INFO"];
                                            readonly "x-docgen-enum-table-extension": readonly [{
                                                readonly value: "ERROR";
                                                readonly description: "Indicates an issue has occurred preventing the submission from processing, such as a validation error.";
                                            }, {
                                                readonly value: "WARNING";
                                                readonly description: "Indicates an issue has occurred that should be reviewed, but has not prevented the submission from processing.";
                                            }, {
                                                readonly value: "INFO";
                                                readonly description: "Indicates additional information has been provided that should be reviewed.";
                                            }];
                                            readonly type: "string";
                                        };
                                        readonly attributeNames: {
                                            readonly description: "The names of the attributes associated with the issue, if applicable.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly categories: {
                                            readonly description: "List of issue categories. \n\nPossible vales: \n\n* `INVALID_ATTRIBUTE` - Indicating an invalid attribute in the listing. \n\n* `MISSING_ATTRIBUTE` - Highlighting a missing attribute in the listing. \n\n* `INVALID_IMAGE` - Signifying an invalid image in the listing. \n\n* `MISSING_IMAGE` - Noting the absence of an image in the listing. \n\n* `INVALID_PRICE` - Pertaining to issues with the listing's price-related attributes. \n\n* `MISSING_PRICE` - Pointing out the absence of a price attribute in the listing. \n\n* `DUPLICATE` - Identifying listings with potential duplicate problems, such as this ASIN potentially being a duplicate of another ASIN. \n\n* `QUALIFICATION_REQUIRED` - Indicating that the listing requires qualification-related approval.";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                            readonly examples: readonly ["INVALID_ATTRIBUTE"];
                                        };
                                        readonly enforcements: {
                                            readonly description: "This field provides information about the enforcement actions taken by Amazon that affect the publishing or status of a listing. It also includes details about any associated exemptions.";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly actions: {
                                                    readonly description: "List of enforcement actions taken by Amazon that affect the publishing or status of a listing.";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly description: "The enforcement action taken by Amazon that affect the publishing or status of a listing";
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly action: {
                                                                readonly description: "The enforcement action name. \n\nPossible values: \n\n* `LISTING_SUPPRESSED` - This enforcement takes down the current listing item's buyability. \n\n* `ATTRIBUTE_SUPPRESSED` - An attribute's value on the listing item is invalid, which causes it to be rejected by Amazon. \n\n* `CATALOG_ITEM_REMOVED` - This catalog item is inactive on Amazon, and all offers against it in the applicable marketplace are non-buyable. \n\n* `SEARCH_SUPPRESSED` - This value indicates that the catalog item is hidden from search results.";
                                                                readonly type: "string";
                                                                readonly examples: readonly ["LISTING_SUPPRESSED"];
                                                            };
                                                        };
                                                        readonly required: readonly ["action"];
                                                    };
                                                };
                                                readonly exemption: {
                                                    readonly description: "Conveying the status of the listed enforcement actions and, if applicable, provides information about the exemption's expiry date.";
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly status: {
                                                            readonly description: "This field indicates the current exemption status for the listed enforcement actions. It can take values such as `EXEMPT`, signifying permanent exemption, `EXEMPT_UNTIL_EXPIRY_DATE` indicating temporary exemption until a specified date, or `NOT_EXEMPT` signifying no exemptions, and enforcement actions were already applied.\n\n`EXEMPT` `EXEMPT_UNTIL_EXPIRY_DATE` `NOT_EXEMPT`";
                                                            readonly enum: readonly ["EXEMPT", "EXEMPT_UNTIL_EXPIRY_DATE", "NOT_EXEMPT"];
                                                            readonly "x-docgen-enum-table-extension": readonly [{
                                                                readonly value: "EXEMPT";
                                                                readonly description: "This status is assigned to a product listing when it has been exempted from the listed enforcement actions. In cases of `EXEMPT`, Amazon acknowledges the existence of enforcement actions but ensures the user that these actions will not be applied to the listing. The user is advised to consider addressing the issue, although enforcement actions will not be taken.";
                                                            }, {
                                                                readonly value: "EXEMPT_UNTIL_EXPIRY_DATE";
                                                                readonly description: "This status indicates that a product listing has been granted a temporary exemption from the listed enforcement actions. The exemption will remain in effect until a specified expiry date. After this date, Amazon will enforce the listed actions. The `expiryDate` field provides the timestamp indicating when the temporary exemption will end, adhering to the ISO 8601 format";
                                                            }, {
                                                                readonly value: "NOT_EXEMPT";
                                                                readonly description: "This status is assigned to a product listing when it has no exemptions from the listed enforcement actions. When the status is `NOT_EXEMPT`, it signifies that Amazon has already taken the specified enforcement actions. There is no exemption in place, and the listed actions are actively enforced";
                                                            }];
                                                            readonly type: "string";
                                                        };
                                                        readonly expiryDate: {
                                                            readonly description: "This field represents the timestamp, following the ISO 8601 format, which specifies the date when temporary exemptions, if applicable, will expire, and Amazon will begin enforcing the listed actions.";
                                                            readonly type: "string";
                                                            readonly format: "date-time";
                                                            readonly examples: readonly ["2023-10-28T00:36:48.914Z"];
                                                        };
                                                    };
                                                    readonly required: readonly ["status"];
                                                };
                                            };
                                            readonly required: readonly ["actions", "exemption"];
                                        };
                                    };
                                    readonly required: readonly ["code", "message", "severity", "categories"];
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                            readonly offers: {
                                readonly description: "Offer details for the listings item.";
                                readonly items: {
                                    readonly description: "Offer details of a listings item for an Amazon marketplace.";
                                    readonly properties: {
                                        readonly marketplaceId: {
                                            readonly description: "The Amazon marketplace identifier.";
                                            readonly type: "string";
                                        };
                                        readonly offerType: {
                                            readonly description: "Type of offer for the listings item.\n\n`B2C` `B2B`";
                                            readonly enum: readonly ["B2C", "B2B"];
                                            readonly "x-docgen-enum-table-extension": readonly [{
                                                readonly value: "B2C";
                                                readonly description: "The offer on this listings item is available for Business to Consumer purchase, meaning that it is available to shoppers on Amazon retail sites.";
                                            }, {
                                                readonly value: "B2B";
                                                readonly description: "The offer on this listings item is available for Business to Business purchase.";
                                            }];
                                            readonly type: "string";
                                        };
                                        readonly price: {
                                            readonly description: "The currency type and amount.";
                                            readonly properties: {
                                                readonly currencyCode: {
                                                    readonly type: "string";
                                                    readonly description: "Three-digit currency code in ISO 4217 format.";
                                                };
                                                readonly amount: {
                                                    readonly type: "string";
                                                    readonly description: "A decimal number with no loss of precision. Useful when precision loss is unnaceptable, as with currencies. Follows RFC7159 for number representation.";
                                                };
                                            };
                                            readonly required: readonly ["amount", "currencyCode"];
                                            readonly type: "object";
                                        };
                                        readonly points: {
                                            readonly description: "The number of Amazon Points offered with the purchase of an item, and their monetary value. Note that the `Points` element is only returned in Japan (JP).";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly pointsNumber: {
                                                    readonly type: "integer";
                                                };
                                            };
                                            readonly required: readonly ["pointsNumber"];
                                        };
                                        readonly audience: {
                                            readonly description: "Buyer segment or program this offer is applicable to.";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly value: {
                                                    readonly description: "Name of the audience an offer is applicable to. \n\nCommon values: \n\n* 'ALL' - Standard offer audience for buyers on Amazon retail websites. \n\n* 'B2B' - Offer audience for Amazon Business website buyers.";
                                                    readonly type: "string";
                                                    readonly examples: readonly ["ALL"];
                                                };
                                                readonly displayName: {
                                                    readonly description: "Localized display name for the audience.";
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                    readonly required: readonly ["marketplaceId", "offerType", "price"];
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                            readonly fulfillmentAvailability: {
                                readonly description: "The fulfillment availability for the listings item.";
                                readonly type: "array";
                                readonly items: {
                                    readonly description: "The fulfillment availability details for the listings item.";
                                    readonly properties: {
                                        readonly fulfillmentChannelCode: {
                                            readonly description: "The code of the fulfillment network that will be used.";
                                            readonly type: "string";
                                        };
                                        readonly quantity: {
                                            readonly description: "The quantity of the item you are making available for sale.";
                                            readonly type: "integer";
                                            readonly minimum: 0;
                                        };
                                    };
                                    readonly required: readonly ["fulfillmentChannelCode"];
                                    readonly type: "object";
                                };
                            };
                            readonly procurement: {
                                readonly description: "The vendor procurement information for the listings item.";
                                readonly type: "array";
                                readonly items: {
                                    readonly description: "The vendor procurement information for the listings item.";
                                    readonly properties: {
                                        readonly costPrice: {
                                            readonly description: "The currency type and amount.";
                                            readonly properties: {
                                                readonly currencyCode: {
                                                    readonly type: "string";
                                                    readonly description: "Three-digit currency code in ISO 4217 format.";
                                                };
                                                readonly amount: {
                                                    readonly type: "string";
                                                    readonly description: "A decimal number with no loss of precision. Useful when precision loss is unnaceptable, as with currencies. Follows RFC7159 for number representation.";
                                                };
                                            };
                                            readonly required: readonly ["amount", "currencyCode"];
                                            readonly type: "object";
                                        };
                                    };
                                    readonly required: readonly ["costPrice"];
                                    readonly type: "object";
                                };
                            };
                            readonly relationships: {
                                readonly description: "Relationships for a listing item, by marketplace (for example, variations).";
                                readonly items: {
                                    readonly description: "Relationship details for the listing item in the specified marketplace.";
                                    readonly properties: {
                                        readonly marketplaceId: {
                                            readonly description: "Amazon marketplace identifier.";
                                            readonly type: "string";
                                        };
                                        readonly relationships: {
                                            readonly description: "Relationships for the listing item.";
                                            readonly items: {
                                                readonly description: "the relationship details for a listing item.";
                                                readonly properties: {
                                                    readonly childSkus: {
                                                        readonly description: "Identifiers (SKUs) of the related items that are children of this listing item.";
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                        readonly type: "array";
                                                    };
                                                    readonly parentSkus: {
                                                        readonly description: "Identifiers (SKUs) of the related items that are parents of this listing item.";
                                                        readonly items: {
                                                            readonly type: "string";
                                                        };
                                                        readonly type: "array";
                                                    };
                                                    readonly variationTheme: {
                                                        readonly description: "A variation theme that indicates the combination of listing item attributes that define the variation family.";
                                                        readonly properties: {
                                                            readonly attributes: {
                                                                readonly description: "The names of the listing item attributes that are associated with the variation theme.";
                                                                readonly items: {
                                                                    readonly type: "string";
                                                                };
                                                                readonly type: "array";
                                                            };
                                                            readonly theme: {
                                                                readonly description: "The variation theme that indicates the combination of listing item attributes that define the variation family.";
                                                                readonly type: "string";
                                                                readonly examples: readonly ["COLOR_NAME/STYLE_NAME"];
                                                            };
                                                        };
                                                        readonly required: readonly ["attributes", "theme"];
                                                        readonly type: "object";
                                                    };
                                                    readonly type: {
                                                        readonly description: "The type of relationship.\n\n`VARIATION` `PACKAGE_HIERARCHY`";
                                                        readonly enum: readonly ["VARIATION", "PACKAGE_HIERARCHY"];
                                                        readonly "x-docgen-enum-table-extension": readonly [{
                                                            readonly value: "VARIATION";
                                                            readonly description: "The listing item in the request is a variation parent or variation child of the related listing items, indicated by SKU.";
                                                        }, {
                                                            readonly value: "PACKAGE_HIERARCHY";
                                                            readonly description: "The listing item in the request is a package container or is contained by the related listing items, indicated by SKU.";
                                                        }];
                                                        readonly type: "string";
                                                        readonly examples: readonly ["VARIATION"];
                                                    };
                                                };
                                                readonly required: readonly ["type"];
                                                readonly type: "object";
                                            };
                                            readonly type: "array";
                                        };
                                    };
                                    readonly required: readonly ["marketplaceId", "relationships"];
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                            readonly productTypes: {
                                readonly description: "Product types for a listing item, by marketplace.";
                                readonly items: {
                                    readonly description: "Product types that are associated with the listing item for the specified marketplace.";
                                    readonly properties: {
                                        readonly marketplaceId: {
                                            readonly description: "Amazon marketplace identifier.";
                                            readonly type: "string";
                                        };
                                        readonly productType: {
                                            readonly description: "The name of the product type that is submitted by the Selling Partner.";
                                            readonly type: "string";
                                            readonly examples: readonly ["LUGGAGE"];
                                        };
                                    };
                                    readonly required: readonly ["marketplaceId", "productType"];
                                    readonly type: "object";
                                };
                                readonly type: "array";
                            };
                        };
                        readonly required: readonly ["sku"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["numberOfResults", "items"];
            readonly type: "object";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "413": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "415": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "503": {
            readonly description: "A list of error responses returned when a request is unsuccessful.";
            readonly type: "object";
            readonly properties: {
                readonly errors: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Error response returned when the request is unsuccessful.";
                        readonly properties: {
                            readonly code: {
                                readonly description: "An error code that identifies the type of error that occurred.";
                                readonly type: "string";
                            };
                            readonly message: {
                                readonly description: "A message that describes the error condition.";
                                readonly type: "string";
                            };
                            readonly details: {
                                readonly description: "Additional details that can help the caller understand or fix the issue.";
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["code", "message"];
                        readonly type: "object";
                    };
                };
            };
            readonly required: readonly ["errors"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DeleteListingsItem, GetListingsItem, PatchListingsItem, PutListingsItem, SearchListingsItems };
