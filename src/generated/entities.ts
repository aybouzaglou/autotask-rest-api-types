/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 * Generated from swagger.json by scripts/generate.mjs.
 * Run `npm run generate` to refresh after updating swagger.json.
 */

import type { UserDefinedField } from "../core/udf.js";

/**
 * The `ActionType` entity.
 * Generated from Swagger model `ActionTypeModel`.
 */
export interface ActionType {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  name?: string | null;
  isActive?: boolean | null;
  isSystemActionType?: boolean | null;
  /** integer (int32). */
  view?: number | null;
}

/**
 * The `AdditionalInvoiceFieldValue` entity.
 * Generated from Swagger model `AdditionalInvoiceFieldValueModel`.
 */
export interface AdditionalInvoiceFieldValue {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  additionalInvoiceFieldID?: number | null;
  fieldValue?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  invoiceBatchID?: number | null;
}

/**
 * The `Appointment` entity.
 * Generated from Swagger model `AppointmentModel`.
 */
export interface Appointment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  title?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  updateDateTime?: string | null;
}

/**
 * The `ArticleAttachment` entity.
 * Generated from Swagger model `ArticleAttachmentModel`.
 */
export interface ArticleAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  articleID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ArticleConfigurationItemCategoryAssociation` entity.
 * Underlying Autotask business object: `ArticleInstalledProductCategoryAssociation`.
 * Generated from Swagger model `ArticleConfigurationItemCategoryAssociationModel`.
 */
export interface ArticleConfigurationItemCategoryAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  articleID?: number | null;
  /** integer (int32). */
  installedProductCategoryID?: number | null;
}

/**
 * The `ArticleNote` entity.
 * Generated from Swagger model `ArticleNoteModel`.
 */
export interface ArticleNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createdDateTime?: string | null;
  description?: string | null;
  /** integer (int32). */
  articleID?: number | null;
  /** integer (int32). */
  lastModifiedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  title?: string | null;
}

/**
 * The `ArticlePlainTextContent` entity.
 * Generated from Swagger model `ArticlePlainTextContentModel`.
 */
export interface ArticlePlainTextContent {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  contentData?: string | null;
}

/**
 * The `ArticleTagAssociation` entity.
 * Generated from Swagger model `ArticleTagAssociationModel`.
 */
export interface ArticleTagAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** integer (int32). */
  articleID?: number | null;
  /** integer (int32). */
  tagID?: number | null;
}

/**
 * The `ArticleTicketAssociation` entity.
 * Generated from Swagger model `ArticleTicketAssociationModel`.
 */
export interface ArticleTicketAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  articleID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `ArticleToArticleAssociation` entity.
 * Generated from Swagger model `ArticleToArticleAssociationModel`.
 */
export interface ArticleToArticleAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  associatedArticleID?: number | null;
  /** integer (int32). */
  articleID?: number | null;
}

/**
 * The `ArticleToDocumentAssociation` entity.
 * Generated from Swagger model `ArticleToDocumentAssociationModel`.
 */
export interface ArticleToDocumentAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  associatedDocumentID?: number | null;
  /** integer (int32). */
  articleID?: number | null;
}

/**
 * The `AttachmentInfo` entity.
 * Generated from Swagger model `AttachmentInfoModel`.
 */
export interface AttachmentInfo {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  articleID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyNoteID?: number | null;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  configurationItemNoteID?: number | null;
  contentType?: string | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int32). */
  contractNoteID?: number | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** integer (int32). */
  documentID?: number | null;
  /** integer (int32). */
  expenseItemID?: number | null;
  /** integer (int32). */
  expenseReportID?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  parentType?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  /** integer (int32). */
  projectNoteID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  salesOrderID?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  /** integer (int32). */
  taskNoteID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  ticketNoteID?: number | null;
  /** integer (int32). */
  timeEntryID?: number | null;
  title?: string | null;
}

/**
 * The `BillingCode` entity.
 * Underlying Autotask business object: `AllocationCode`.
 * Generated from Swagger model `BillingCodeModel`.
 */
export interface BillingCode {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  afterHoursWorkType?: number | null;
  /** integer (int32). */
  billingCodeType?: number | null;
  /** integer (int32). */
  department?: number | null;
  description?: string | null;
  externalNumber?: string | null;
  /** integer (int32). */
  generalLedgerAccount?: number | null;
  isActive?: boolean | null;
  isExcludedFromNewContracts?: boolean | null;
  /** decimal (double). */
  markupRate?: number | null;
  name?: string | null;
  /** integer (int32). */
  taxCategoryID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** integer (int32). */
  useType?: number | null;
}

/**
 * The `BillingItemApprovalLevel` entity.
 * Generated from Swagger model `BillingItemApprovalLevelModel`.
 */
export interface BillingItemApprovalLevel {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approvalDateTime?: string | null;
  /** integer (int32). */
  approvalLevel?: number | null;
  /** integer (int32). */
  approvalResourceID?: number | null;
  /** integer (int32). */
  timeEntryID?: number | null;
}

/**
 * The `BillingItem` entity.
 * Generated from Swagger model `BillingItemModel`.
 */
export interface BillingItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  accountManagerWhenApprovedID?: number | null;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** integer (int32). */
  taxCategoryID?: number | null;
  /** integer (int32). */
  billingItemType?: number | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  configurationItemID?: number | null;
  /** integer (int32). */
  contractBlockID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractChargeID?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int32). */
  contractServiceAdjustmentID?: number | null;
  /** integer (int32). */
  contractServiceBundleAdjustmentID?: number | null;
  /** integer (int32). */
  contractServiceBundleID?: number | null;
  /** integer (int32). */
  contractServiceBundlePeriodID?: number | null;
  /** integer (int32). */
  contractServiceID?: number | null;
  /** integer (int32). */
  contractServicePeriodID?: number | null;
  description?: string | null;
  /** integer (int32). */
  expenseItemID?: number | null;
  /** decimal (double). */
  extendedPrice?: number | null;
  /** decimal (double). */
  internalCurrencyExtendedPrice?: number | null;
  /** decimal (double). */
  internalCurrencyRate?: number | null;
  /** decimal (double). */
  internalCurrencyTaxDollars?: number | null;
  /** decimal (double). */
  internalCurrencyTotalAmount?: number | null;
  /** integer (int32). */
  invoiceID?: number | null;
  /** integer (int32). */
  itemApproverID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  itemDate?: string | null;
  itemName?: string | null;
  lineItemFullDescription?: string | null;
  lineItemGroupDescription?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  milestoneID?: number | null;
  /** integer (int32). */
  nonBillable?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** decimal (double). */
  ourCost?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  postedDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  postedOnTime?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  projectChargeID?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  purchaseOrderNumber?: string | null;
  /** decimal (double). */
  quantity?: number | null;
  /** decimal (double). */
  rate?: number | null;
  /** integer (int32). */
  roleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  serviceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  serviceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  sortOrderID?: number | null;
  /** integer (int32). */
  subType?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  /** decimal (double). */
  taxDollars?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  ticketChargeID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  timeEntryID?: number | null;
  /** decimal (double). */
  totalAmount?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  vendorID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  webServiceDate?: string | null;
}

/**
 * The `ChangeOrderCharge` entity.
 * Underlying Autotask business object: `ChangeOrderCost`.
 * Generated from Swagger model `ChangeOrderChargeModel`.
 */
export interface ChangeOrderCharge {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  billableAmount?: number | null;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** decimal (double). */
  changeOrderHours?: number | null;
  /** integer (int32). */
  chargeType?: number | null;
  /** integer (int32). */
  contractServiceBundleID?: number | null;
  /** integer (int32). */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  description?: string | null;
  /** decimal (double). */
  extendedCost?: number | null;
  /** decimal (double). */
  internalCurrencyBillableAmount?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  internalPurchaseOrderNumber?: string | null;
  isBillableToCompany?: boolean | null;
  isBilled?: boolean | null;
  name?: string | null;
  notes?: string | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  productID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** integer (int32). */
  statusLastModifiedBy?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  statusLastModifiedDate?: string | null;
  /** integer (int32). */
  taskID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** decimal (double). */
  unitQuantity?: number | null;
}

/**
 * The `ChangeRequestLink` entity.
 * Generated from Swagger model `ChangeRequestLinkModel`.
 */
export interface ChangeRequestLink {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  changeRequestTicketID?: number | null;
  /** integer (int32). */
  problemOrIncidentTicketID?: number | null;
}

/**
 * The `ChecklistLibraryChecklistItem` entity.
 * Generated from Swagger model `ChecklistLibraryChecklistItemModel`.
 */
export interface ChecklistLibraryChecklistItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  checklistLibraryID?: number | null;
  isImportant?: boolean | null;
  itemName?: string | null;
  /** integer (int32). */
  knowledgebaseArticleID?: number | null;
  /** integer (int32). */
  position?: number | null;
}

/**
 * The `ChecklistLibrary` entity.
 * Generated from Swagger model `ChecklistLibraryModel`.
 */
export interface ChecklistLibrary {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  /** integer (int32). */
  entityType?: number | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `ClassificationIcon` entity.
 * Generated from Swagger model `ClassificationIconModel`.
 */
export interface ClassificationIcon {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  isActive?: boolean | null;
  isSystem?: boolean | null;
  name?: string | null;
  relativeUrl?: string | null;
}

/**
 * The `ClientPortalUser` entity.
 * Generated from Swagger model `ClientPortalUserModel`.
 */
export interface ClientPortalUser {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contactID?: number | null;
  /** integer (int32). */
  dateFormat?: number | null;
  isClientPortalActive?: boolean | null;
  /** integer (int32). */
  numberFormat?: number | null;
  password?: string | null;
  /** integer (int32). */
  securityLevel?: number | null;
  /** integer (int32). */
  timeFormat?: number | null;
  userName?: string | null;
}

/**
 * The `ComanagedAssociation` entity.
 * Generated from Swagger model `ComanagedAssociationModel`.
 */
export interface ComanagedAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  companyID?: number | null;
  isPrimaryComanagedResource?: boolean | null;
  /** integer (int32). */
  resourceID?: number | null;
}

/**
 * The `CompanyAlert` entity.
 * Underlying Autotask business object: `AccountAlert`.
 * Generated from Swagger model `CompanyAlertModel`.
 */
export interface CompanyAlert {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  alertText?: string | null;
  /** integer (int32). */
  alertTypeID?: number | null;
  /** integer (int32). */
  companyID?: number | null;
}

/**
 * The `CompanyAttachment` entity.
 * Generated from Swagger model `CompanyAttachmentModel`.
 */
export interface CompanyAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyNoteID?: number | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  salesOrderID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `CompanyCategory` entity.
 * Underlying Autotask business object: `AccountCategory`.
 * Generated from Swagger model `CompanyCategoryModel`.
 */
export interface CompanyCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  displayColorRGB?: number | null;
  isActive?: boolean | null;
  isApiOnly?: boolean | null;
  isGlobalDefault?: boolean | null;
  name?: string | null;
  nickname?: string | null;
}

/**
 * The `CompanyLocation` entity.
 * Underlying Autotask business object: `AccountPhysicalLocation`.
 * Generated from Swagger model `CompanyLocationModel`.
 */
export interface CompanyLocation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  address1?: string | null;
  address2?: string | null;
  alternatePhone1?: string | null;
  alternatePhone2?: string | null;
  city?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  countryID?: number | null;
  description?: string | null;
  fax?: string | null;
  isActive?: boolean | null;
  isPrimary?: boolean | null;
  isTaxExempt?: boolean | null;
  overrideCompanyTaxSettings?: boolean | null;
  name?: string | null;
  phone?: string | null;
  postalCode?: string | null;
  /** decimal (double). */
  roundtripDistance?: number | null;
  state?: string | null;
  /** integer (int32). */
  taxRegionID?: number | null;
}

/**
 * The `Company` entity.
 * Underlying Autotask business object: `Account`.
 * Generated from Swagger model `CompanyModel`.
 */
export interface Company {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  additionalAddressInformation?: string | null;
  address1?: string | null;
  address2?: string | null;
  alternatePhone1?: string | null;
  alternatePhone2?: string | null;
  /** integer (int32). */
  apiVendorID?: number | null;
  /** decimal (double). */
  assetValue?: number | null;
  /** integer (int32). */
  billToCompanyLocationID?: number | null;
  billToAdditionalAddressInformation?: string | null;
  billingAddress1?: string | null;
  billingAddress2?: string | null;
  /** integer (int32). */
  billToAddressToUse?: number | null;
  billToAttention?: string | null;
  billToCity?: string | null;
  /** integer (int32). */
  billToCountryID?: number | null;
  billToState?: string | null;
  billToZipCode?: string | null;
  city?: string | null;
  /** integer (int32). */
  classification?: number | null;
  /** integer (int32). */
  companyCategoryID?: number | null;
  companyName?: string | null;
  companyNumber?: string | null;
  /** integer (int32). */
  companyType?: number | null;
  /** integer (int32). */
  competitorID?: number | null;
  /** integer (int32). */
  countryID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** integer (int32). */
  currencyID?: number | null;
  fax?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  invoiceEmailMessageID?: number | null;
  /** integer (int32). */
  invoiceMethod?: number | null;
  invoiceNonContractItemsToParentCompany?: boolean | null;
  /** integer (int32). */
  invoiceTemplateID?: number | null;
  isActive?: boolean | null;
  isClientPortalActive?: boolean | null;
  isEnabledForComanaged?: boolean | null;
  isSample?: boolean | null;
  isTaskFireActive?: boolean | null;
  isTaxExempt?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastTrackedModifiedDateTime?: string | null;
  /** integer (int32). */
  marketSegmentID?: number | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  /** integer (int32). */
  parentCompanyID?: number | null;
  phone?: string | null;
  postalCode?: string | null;
  /** integer (int32). */
  purchaseOrderTemplateID?: number | null;
  /** integer (int32). */
  quoteEmailMessageID?: number | null;
  /** integer (int32). */
  quoteTemplateID?: number | null;
  sicCode?: string | null;
  state?: string | null;
  stockMarket?: string | null;
  stockSymbol?: string | null;
  /** decimal (double). */
  surveyCompanyRating?: number | null;
  taxID?: string | null;
  /** integer (int32). */
  taxRegionID?: number | null;
  /** integer (int32). */
  territoryID?: number | null;
  webAddress?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `CompanyNoteAttachment` entity.
 * Generated from Swagger model `CompanyNoteAttachmentModel`.
 */
export interface CompanyNoteAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyNoteID?: number | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  salesOrderID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `CompanyNote` entity.
 * Underlying Autotask business object: `AccountNote`.
 * Generated from Swagger model `CompanyNoteModel`.
 */
export interface CompanyNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  actionType?: number | null;
  /** integer (int32). */
  assignedResourceID?: number | null;
  /** integer (int32). */
  companyID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completedDateTime?: string | null;
  /** integer (int32). */
  contactID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDate?: string | null;
  name?: string | null;
  note?: string | null;
  /** integer (int32). */
  opportunityID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
}

/**
 * The `CompanySiteConfiguration` entity.
 * Underlying Autotask business object: `AccountLocation`.
 * Generated from Swagger model `CompanySiteConfigurationModel`.
 */
export interface CompanySiteConfiguration {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  companyID?: number | null;
  locationName?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `CompanyTeam` entity.
 * Underlying Autotask business object: `AccountTeam`.
 * Generated from Swagger model `CompanyTeamModel`.
 */
export interface CompanyTeam {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  companyID?: number | null;
  isAssociatedAsComanaged?: boolean | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  resourceID?: number | null;
}

/**
 * The `CompanyToDo` entity.
 * Underlying Autotask business object: `AccountToDo`.
 * Generated from Swagger model `CompanyToDoModel`.
 */
export interface CompanyToDo {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  actionType?: number | null;
  activityDescription?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  assignedToResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  companyID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completedDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  ticketID?: number | null;
}

/**
 * The `CompanyWebhookExcludedResource` entity.
 * Underlying Autotask business object: `AccountWebhookExcludedResource`.
 * Generated from Swagger model `CompanyWebhookExcludedResourceModel`.
 */
export interface CompanyWebhookExcludedResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `CompanyWebhookField` entity.
 * Underlying Autotask business object: `AccountWebhookField`.
 * Generated from Swagger model `CompanyWebhookFieldModel`.
 */
export interface CompanyWebhookField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  fieldID?: number | null;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `CompanyWebhook` entity.
 * Underlying Autotask business object: `AccountWebhook`.
 * Generated from Swagger model `CompanyWebhookModel`.
 */
export interface CompanyWebhook {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  deactivationUrl?: string | null;
  isActive?: boolean | null;
  isReady?: boolean | null;
  isSubscribedToCreateEvents?: boolean | null;
  isSubscribedToDeleteEvents?: boolean | null;
  isSubscribedToUpdateEvents?: boolean | null;
  name?: string | null;
  notificationEmailAddress?: string | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  secretKey?: string | null;
  sendThresholdExceededNotification?: boolean | null;
  webhookGUID?: string | null;
  webhookUrl?: string | null;
}

/**
 * The `CompanyWebhookUdfField` entity.
 * Underlying Autotask business object: `AccountWebhookUdfField`.
 * Generated from Swagger model `CompanyWebhookUdfFieldModel`.
 */
export interface CompanyWebhookUdfField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  udfFieldID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ConfigurationItemAttachment` entity.
 * Generated from Swagger model `ConfigurationItemAttachmentModel`.
 */
export interface ConfigurationItemAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  configurationItemNoteID?: number | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ConfigurationItemBillingProductAssociation` entity.
 * Underlying Autotask business object: `InstalledProductBillingProductAssociation`.
 * Generated from Swagger model `ConfigurationItemBillingProductAssociationModel`.
 */
export interface ConfigurationItemBillingProductAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingProductID?: number | null;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  effectiveDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  expirationDate?: string | null;
}

/**
 * The `ConfigurationItemCategory` entity.
 * Underlying Autotask business object: `InstalledProductCategory`.
 * Generated from Swagger model `ConfigurationItemCategoryModel`.
 */
export interface ConfigurationItemCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  displayColorRGB?: number | null;
  isActive?: boolean | null;
  isClientPortalDefault?: boolean | null;
  isGlobalDefault?: boolean | null;
  name?: string | null;
  nickname?: string | null;
}

/**
 * The `ConfigurationItemCategoryUdfAssociation` entity.
 * Underlying Autotask business object: `InstalledProductCategoryUdfAssociation`.
 * Generated from Swagger model `ConfigurationItemCategoryUdfAssociationModel`.
 */
export interface ConfigurationItemCategoryUdfAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemCategoryID?: number | null;
  isRequired?: boolean | null;
  /** integer (int32). */
  userDefinedFieldDefinitionID?: number | null;
}

/**
 * The `ConfigurationItemDnsRecord` entity.
 * Underlying Autotask business object: `InstalledProductDnsRecord`.
 * Generated from Swagger model `ConfigurationItemDnsRecordModel`.
 */
export interface ConfigurationItemDnsRecord {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  data?: string | null;
  /** integer (int32). */
  installedProductID?: number | null;
  /** integer (int32). */
  timeToLiveSeconds?: number | null;
  dnsType?: string | null;
}

/**
 * The `ConfigurationItem` entity.
 * Underlying Autotask business object: `InstalledProduct`.
 * Generated from Swagger model `ConfigurationItemModel`.
 */
export interface ConfigurationItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  apiVendorID?: number | null;
  /** integer (int32). */
  configurationItemCategoryID?: number | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyLocationID?: number | null;
  /** integer (int32). */
  configurationItemType?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int32). */
  contractServiceBundleID?: number | null;
  /** integer (int32). */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  createdByPersonID?: number | null;
  /** decimal (double). */
  dailyCost?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  dattoAvailableKilobytes?: number | null;
  /** integer (int32). */
  dattoDeviceMemoryMegabytes?: number | null;
  dattoDrivesErrors?: boolean | null;
  dattoHostname?: string | null;
  dattoInternalIP?: string | null;
  /** integer (int32). */
  dattoKernelVersionID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  dattoLastCheckInDateTime?: string | null;
  /** integer (int32). */
  dattoNICSpeedKilobitsPerSecond?: number | null;
  /** integer (int32). */
  dattoNumberOfAgents?: number | null;
  /** integer (int32). */
  dattoNumberOfDrives?: number | null;
  /** integer (int32). */
  dattoNumberOfVolumes?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  dattoOffsiteUsedBytes?: number | null;
  /** integer (int32). */
  dattoOSVersionID?: number | null;
  /** decimal (double). */
  dattoPercentageUsed?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  dattoProtectedKilobytes?: number | null;
  dattoRemoteIP?: string | null;
  dattoSerialNumber?: string | null;
  /** integer (int32). */
  dattoUptimeSeconds?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  dattoUsedKilobytes?: number | null;
  /** integer (int32). */
  dattoZFSVersionID?: number | null;
  deviceNetworkingID?: string | null;
  domain?: string | null;
  /** integer (int32). */
  domainRegistrarID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  domainRegistrationDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  domainLastUpdatedDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  domainExpirationDateTime?: string | null;
  /** decimal (double). */
  hourlyCost?: number | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  installDate?: string | null;
  /** integer (int32). */
  installedByContactID?: number | null;
  /** integer (int32). */
  installedByID?: number | null;
  isActive?: boolean | null;
  /** integer (int32). */
  lastActivityPersonID?: number | null;
  /** integer (int32). */
  lastActivityPersonType?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedTime?: string | null;
  location?: string | null;
  /** decimal (double). */
  monthlyCost?: number | null;
  notes?: string | null;
  /** decimal (double). */
  numberOfUsers?: number | null;
  /** integer (int32). */
  parentConfigurationItemID?: number | null;
  /** decimal (double). */
  perUseCost?: number | null;
  /** integer (int32). */
  productID?: number | null;
  referenceNumber?: string | null;
  referenceTitle?: string | null;
  /** integer (int32). */
  rmmDeviceAuditAntivirusStatusID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditArchitectureID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditBackupStatusID?: number | null;
  rmmDeviceAuditDescription?: string | null;
  /** integer (int32). */
  rmmDeviceAuditDeviceTypeID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditDisplayAdaptorID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditDomainID?: number | null;
  rmmDeviceAuditExternalIPAddress?: string | null;
  rmmDeviceAuditHostname?: string | null;
  rmmDeviceAuditIPAddress?: string | null;
  rmmDeviceAuditLastUser?: string | null;
  rmmDeviceAuditMacAddress?: string | null;
  /** integer (int32). */
  rmmDeviceAuditManufacturerID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditFirmwareID?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  rmmDeviceAuditMemoryBytes?: number | null;
  /** integer (int32). */
  rmmDeviceAuditMissingPatchCount?: number | null;
  /** integer (int32). */
  rmmDeviceAuditMobileNetworkOperatorID?: number | null;
  rmmDeviceAuditMobileNumber?: string | null;
  /** integer (int32). */
  rmmDeviceAuditModelID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditMotherboardID?: number | null;
  rmmDeviceAuditOperatingSystem?: string | null;
  /** integer (int32). */
  rmmDeviceAuditPatchStatusID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditProcessorID?: number | null;
  /** integer (int32). */
  rmmDeviceAuditServicePackID?: number | null;
  rmmDeviceAuditSNMPContact?: string | null;
  rmmDeviceAuditSNMPLocation?: string | null;
  rmmDeviceAuditSNMPName?: string | null;
  /** integer (int32). */
  rmmDeviceAuditSoftwareStatusID?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  rmmDeviceAuditStorageBytes?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  rmmDeviceID?: number | null;
  rmmDeviceUID?: string | null;
  rmmVsaxDeviceID?: string | null;
  /** integer (int32). */
  rmmOpenAlertCount?: number | null;
  serialNumber?: string | null;
  /** integer (int32). */
  serviceBundleID?: number | null;
  /** integer (int32). */
  serviceID?: number | null;
  /** integer (int32). */
  serviceLevelAgreementID?: number | null;
  /** decimal (double). */
  setupFee?: number | null;
  /** integer (int32). */
  sourceChargeID?: number | null;
  /** integer (int32). */
  sourceChargeType?: number | null;
  sslSource?: string | null;
  sslCommonName?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sslValidFromDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sslValidUntilDateTime?: string | null;
  sslIssuedBy?: string | null;
  sslOrganization?: string | null;
  sslOrganizationUnit?: string | null;
  sslLocation?: string | null;
  sslSerialNumber?: string | null;
  sslSignatureAlgorithm?: string | null;
  /** integer (int32). */
  vendorID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  warrantyExpirationDate?: string | null;
  rmmIsInMaintenanceMode?: boolean | null;
  rmmIsMobileDeviceManagementEnrolled?: boolean | null;
  rmmDeviceUrl?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ConfigurationItemNoteAttachment` entity.
 * Generated from Swagger model `ConfigurationItemNoteAttachmentModel`.
 */
export interface ConfigurationItemNoteAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  configurationItemNoteID?: number | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ConfigurationItemNote` entity.
 * Underlying Autotask business object: `InstalledProductNote`.
 * Generated from Swagger model `ConfigurationItemNoteModel`.
 */
export interface ConfigurationItemNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  noteType?: number | null;
  title?: string | null;
}

/**
 * The `ConfigurationItemRelatedItem` entity.
 * Underlying Autotask business object: `InstalledProductRelatedItem`.
 * Generated from Swagger model `ConfigurationItemRelatedItemModel`.
 */
export interface ConfigurationItemRelatedItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  relatedConfigurationItemID?: number | null;
  /** integer (int32). */
  relationship?: number | null;
}

/**
 * The `ConfigurationItemSslSubjectAlternativeName` entity.
 * Underlying Autotask business object: `InstalledProductSslSubjectAlternativeName`.
 * Generated from Swagger model `ConfigurationItemSslSubjectAlternativeNameModel`.
 */
export interface ConfigurationItemSslSubjectAlternativeName {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemID?: number | null;
  name?: string | null;
}

/**
 * The `ConfigurationItemType` entity.
 * Underlying Autotask business object: `InstalledProductType`.
 * Generated from Swagger model `ConfigurationItemTypeModel`.
 */
export interface ConfigurationItemType {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `ConfigurationItemWebhookExcludedResource` entity.
 * Underlying Autotask business object: `InstalledProductWebhookExcludedResource`.
 * Generated from Swagger model `ConfigurationItemWebhookExcludedResourceModel`.
 */
export interface ConfigurationItemWebhookExcludedResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ConfigurationItemWebhookField` entity.
 * Underlying Autotask business object: `InstalledProductWebhookField`.
 * Generated from Swagger model `ConfigurationItemWebhookFieldModel`.
 */
export interface ConfigurationItemWebhookField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  fieldID?: number | null;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ConfigurationItemWebhook` entity.
 * Underlying Autotask business object: `InstalledProductWebhook`.
 * Generated from Swagger model `ConfigurationItemWebhookModel`.
 */
export interface ConfigurationItemWebhook {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  deactivationUrl?: string | null;
  isActive?: boolean | null;
  isReady?: boolean | null;
  isSubscribedToCreateEvents?: boolean | null;
  isSubscribedToDeleteEvents?: boolean | null;
  isSubscribedToUpdateEvents?: boolean | null;
  name?: string | null;
  notificationEmailAddress?: string | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  secretKey?: string | null;
  sendThresholdExceededNotification?: boolean | null;
  webhookGUID?: string | null;
  webhookUrl?: string | null;
}

/**
 * The `ConfigurationItemWebhookUdfField` entity.
 * Underlying Autotask business object: `InstalledProductWebhookUdfField`.
 * Generated from Swagger model `ConfigurationItemWebhookUdfFieldModel`.
 */
export interface ConfigurationItemWebhookUdfField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  udfFieldID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ContactBillingProductAssociation` entity.
 * Generated from Swagger model `ContactBillingProductAssociationModel`.
 */
export interface ContactBillingProductAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingProductID?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  effectiveDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  expirationDate?: string | null;
}

/**
 * The `ContactGroupContact` entity.
 * Generated from Swagger model `ContactGroupContactModel`.
 */
export interface ContactGroupContact {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contactId?: number | null;
  /** integer (int32). */
  contactGroupId?: number | null;
}

/**
 * The `ContactGroup` entity.
 * Generated from Swagger model `ContactGroupModel`.
 */
export interface ContactGroup {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  name?: string | null;
  isActive?: boolean | null;
}

/**
 * The `Contact` entity.
 * Generated from Swagger model `ContactModel`.
 */
export interface Contact {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  additionalAddressInformation?: string | null;
  addressLine?: string | null;
  addressLine1?: string | null;
  alternatePhone?: string | null;
  /** integer (int32). */
  apiVendorID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  bulkEmailOptOutTime?: string | null;
  city?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyLocationID?: number | null;
  /** integer (int32). */
  countryID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  emailAddress?: string | null;
  emailAddress2?: string | null;
  emailAddress3?: string | null;
  extension?: string | null;
  externalID?: string | null;
  facebookUrl?: string | null;
  faxNumber?: string | null;
  firstName?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  isActive?: number | null;
  isOptedOutFromBulkEmail?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDate?: string | null;
  lastName?: string | null;
  linkedInUrl?: string | null;
  middleInitial?: string | null;
  mobilePhone?: string | null;
  /** integer (int32). */
  namePrefix?: number | null;
  /** integer (int32). */
  nameSuffix?: number | null;
  note?: string | null;
  receivesEmailNotifications?: boolean | null;
  phone?: string | null;
  primaryContact?: boolean | null;
  billingContact?: boolean | null;
  roomNumber?: string | null;
  solicitationOptOut?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  solicitationOptOutTime?: string | null;
  state?: string | null;
  surveyOptOut?: boolean | null;
  title?: string | null;
  twitterUrl?: string | null;
  zipCode?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ContactWebhookExcludedResource` entity.
 * Generated from Swagger model `ContactWebhookExcludedResourceModel`.
 */
export interface ContactWebhookExcludedResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ContactWebhookField` entity.
 * Generated from Swagger model `ContactWebhookFieldModel`.
 */
export interface ContactWebhookField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  fieldID?: number | null;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ContactWebhook` entity.
 * Generated from Swagger model `ContactWebhookModel`.
 */
export interface ContactWebhook {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  deactivationUrl?: string | null;
  isActive?: boolean | null;
  isReady?: boolean | null;
  isSubscribedToCreateEvents?: boolean | null;
  isSubscribedToDeleteEvents?: boolean | null;
  isSubscribedToUpdateEvents?: boolean | null;
  name?: string | null;
  notificationEmailAddress?: string | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  secretKey?: string | null;
  sendThresholdExceededNotification?: boolean | null;
  webhookGUID?: string | null;
  webhookUrl?: string | null;
}

/**
 * The `ContactWebhookUdfField` entity.
 * Generated from Swagger model `ContactWebhookUdfFieldModel`.
 */
export interface ContactWebhookUdfField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  udfFieldID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `ContractBillingRule` entity.
 * Generated from Swagger model `ContractBillingRuleModel`.
 */
export interface ContractBillingRule {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractID?: number | null;
  createChargesAsBillable?: boolean | null;
  /** decimal (double). */
  dailyProratedCost?: number | null;
  /** decimal (double). */
  dailyProratedPrice?: number | null;
  /** integer (int32). */
  determineUnits?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  /** integer (int32). */
  executionMethod?: number | null;
  includeItemsInChargeDescription?: boolean | null;
  invoiceDescription?: string | null;
  isActive?: boolean | null;
  isDailyProrationEnabled?: boolean | null;
  /** integer (int32). */
  maximumUnits?: number | null;
  /** integer (int32). */
  minimumUnits?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
}

/**
 * The `ContractBlockHourFactor` entity.
 * Underlying Autotask business object: `ContractFactor`.
 * Generated from Swagger model `ContractBlockHourFactorModel`.
 */
export interface ContractBlockHourFactor {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  blockHourMultiplier?: number | null;
  /** decimal (double). */
  contractHourlyRate?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** decimal (double). */
  internalCurrencyContractHourlyRate?: number | null;
  /** integer (int32). */
  roleID?: number | null;
}

/**
 * The `ContractBlock` entity.
 * Generated from Swagger model `ContractBlockModel`.
 */
export interface ContractBlock {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  /** decimal (double). */
  hourlyRate?: number | null;
  /** decimal (double). */
  hours?: number | null;
  /** decimal (double). */
  hoursApproved?: number | null;
  invoiceNumber?: string | null;
  isPaid?: boolean | null;
  paymentNumber?: string | null;
  /** integer (int32). */
  paymentType?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  status?: number | null;
}

/**
 * The `ContractCharge` entity.
 * Underlying Autotask business object: `ContractCost`.
 * Generated from Swagger model `ContractChargeModel`.
 */
export interface ContractCharge {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  billableAmount?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  billingCodeID?: number | null;
  /** integer (int32). */
  chargeType?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  description?: string | null;
  /** decimal (double). */
  extendedCost?: number | null;
  /** decimal (double). */
  internalCurrencyBillableAmount?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  internalPurchaseOrderNumber?: string | null;
  isBillableToCompany?: boolean | null;
  isBilled?: boolean | null;
  name?: string | null;
  notes?: string | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  productID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  status?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  statusLastModifiedBy?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  statusLastModifiedDate?: string | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** decimal (double). */
  unitQuantity?: number | null;
}

/**
 * The `ContractExclusionBillingCode` entity.
 * Underlying Autotask business object: `ContractExclusionAllocationCode`.
 * Generated from Swagger model `ContractExclusionBillingCodeModel`.
 */
export interface ContractExclusionBillingCode {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  billingCodeID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractID?: number | null;
}

/**
 * The `ContractExclusionRole` entity.
 * Generated from Swagger model `ContractExclusionRoleModel`.
 */
export interface ContractExclusionRole {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  roleID?: number | null;
}

/**
 * The `ContractExclusionSetExcludedRole` entity.
 * Generated from Swagger model `ContractExclusionSetExcludedRoleModel`.
 */
export interface ContractExclusionSetExcludedRole {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractExclusionSetID?: number | null;
  /** integer (int32). */
  excludedRoleID?: number | null;
}

/**
 * The `ContractExclusionSetExcludedWorkType` entity.
 * Generated from Swagger model `ContractExclusionSetExcludedWorkTypeModel`.
 */
export interface ContractExclusionSetExcludedWorkType {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractExclusionSetID?: number | null;
  /** integer (int32). */
  excludedWorkTypeID?: number | null;
}

/**
 * The `ContractExclusionSet` entity.
 * Generated from Swagger model `ContractExclusionSetModel`.
 */
export interface ContractExclusionSet {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `ContractMilestone` entity.
 * Generated from Swagger model `ContractMilestoneModel`.
 */
export interface ContractMilestone {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  amount?: number | null;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  dateDue?: string | null;
  description?: string | null;
  /** decimal (double). */
  internalCurrencyAmount?: number | null;
  isInitialPayment?: boolean | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  status?: number | null;
  title?: string | null;
}

/**
 * The `Contract` entity.
 * Generated from Swagger model `ContractModel`.
 */
export interface Contract {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingPreference?: number | null;
  /** integer (int32). */
  billToCompanyContactID?: number | null;
  /** integer (int32). */
  billToCompanyID?: number | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  contactName?: string | null;
  /** integer (int32). */
  contractCategory?: number | null;
  /** integer (int32). */
  contractExclusionSetID?: number | null;
  contractName?: string | null;
  contractNumber?: string | null;
  /** integer (int32). */
  contractPeriodType?: number | null;
  /** integer (int32). */
  contractType?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  /** decimal (double). */
  estimatedCost?: number | null;
  /** decimal (double). */
  estimatedHours?: number | null;
  /** decimal (double). */
  estimatedRevenue?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  exclusionContractID?: number | null;
  /** decimal (double). */
  internalCurrencyOverageBillingRate?: number | null;
  /** decimal (double). */
  internalCurrencySetupFee?: number | null;
  isCompliant?: boolean | null;
  isDefaultContract?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** integer (int32). */
  opportunityID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** decimal (double). */
  overageBillingRate?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  renewedContractID?: number | null;
  /** integer (int32). */
  serviceLevelAgreementID?: number | null;
  /** decimal (double). */
  setupFee?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  setupFeeBillingCodeID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** integer (int32). */
  timeReportingRequiresStartAndStopTimes?: number | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ContractNoteAttachment` entity.
 * Generated from Swagger model `ContractNoteAttachmentModel`.
 */
export interface ContractNoteAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int32). */
  contractNoteID?: number | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ContractNote` entity.
 * Generated from Swagger model `ContractNoteModel`.
 */
export interface ContractNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  title?: string | null;
}

/**
 * The `ContractRate` entity.
 * Generated from Swagger model `ContractRateModel`.
 */
export interface ContractRate {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  contractHourlyRate?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** decimal (double). */
  internalCurrencyContractHourlyRate?: number | null;
  /** integer (int32). */
  roleID?: number | null;
}

/**
 * The `ContractRetainer` entity.
 * Generated from Swagger model `ContractRetainerModel`.
 */
export interface ContractRetainer {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  amount?: number | null;
  /** decimal (double). */
  amountApproved?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  /** decimal (double). */
  internalCurrencyAmount?: number | null;
  /** decimal (double). */
  internalCurrencyAmountApproved?: number | null;
  invoiceNumber?: string | null;
  isPaid?: boolean | null;
  /** integer (int32). */
  paymentID?: number | null;
  paymentNumber?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  status?: number | null;
}

/**
 * The `ContractRoleCost` entity.
 * Generated from Swagger model `ContractRoleCostModel`.
 */
export interface ContractRoleCost {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractID?: number | null;
  /** decimal (double). */
  rate?: number | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  roleID?: number | null;
}

/**
 * The `ContractServiceBundle` entity.
 * Generated from Swagger model `ContractServiceBundleModel`.
 */
export interface ContractServiceBundle {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  adjustedPrice?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** decimal (double). */
  internalCurrencyAdjustedPrice?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  internalDescription?: string | null;
  invoiceDescription?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  quoteItemID?: number | null;
  /** integer (int32). */
  serviceBundleID?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
}

/**
 * The `ContractServiceBundleUnit` entity.
 * Generated from Swagger model `ContractServiceBundleUnitModel`.
 */
export interface ContractServiceBundleUnit {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approveAndPostDate?: string | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int32). */
  contractServiceBundleID?: number | null;
  /** decimal (double). */
  cost?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  /** decimal (double). */
  internalCurrencyPrice?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** decimal (double). */
  price?: number | null;
  /** integer (int32). */
  serviceBundleID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  units?: number | null;
}

/**
 * The `ContractService` entity.
 * Generated from Swagger model `ContractServiceModel`.
 */
export interface ContractService {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contractID?: number | null;
  /** decimal (double). */
  internalCurrencyAdjustedPrice?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  internalDescription?: string | null;
  invoiceDescription?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  quoteItemID?: number | null;
  /** integer (int32). */
  serviceID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
}

/**
 * The `ContractServiceUnit` entity.
 * Generated from Swagger model `ContractServiceUnitModel`.
 */
export interface ContractServiceUnit {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approveAndPostDate?: string | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int32). */
  contractServiceID?: number | null;
  /** decimal (double). */
  cost?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  /** decimal (double). */
  internalCurrencyPrice?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** decimal (double). */
  price?: number | null;
  /** integer (int32). */
  serviceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  units?: number | null;
  /** integer (int32). */
  vendorCompanyID?: number | null;
}

/**
 * The `ContractTicketPurchase` entity.
 * Generated from Swagger model `ContractTicketPurchaseModel`.
 */
export interface ContractTicketPurchase {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDate?: string | null;
  invoiceNumber?: string | null;
  isPaid?: boolean | null;
  paymentNumber?: string | null;
  /** integer (int32). */
  paymentType?: number | null;
  /** decimal (double). */
  perTicketRate?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** decimal (double). */
  ticketsPurchased?: number | null;
  /** decimal (double). */
  ticketsUsed?: number | null;
}

/**
 * The `Country` entity.
 * Generated from Swagger model `CountryModel`.
 */
export interface Country {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  addressFormatID?: number | null;
  countryCode?: string | null;
  displayName?: string | null;
  /** integer (int32). */
  invoiceTemplateID?: number | null;
  isActive?: boolean | null;
  isDefaultCountry?: boolean | null;
  name?: string | null;
  /** integer (int32). */
  purchaseOrderTemplateID?: number | null;
  /** integer (int32). */
  quoteTemplateID?: number | null;
}

/**
 * The `Currency` entity.
 * Generated from Swagger model `CurrencyModel`.
 */
export interface Currency {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  currencyNegativeFormat?: string | null;
  currencyPositiveFormat?: string | null;
  description?: string | null;
  /** integer (int32). */
  displaySymbol?: number | null;
  /** decimal (double). */
  exchangeRate?: number | null;
  isActive?: boolean | null;
  isInternalCurrency?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  name?: string | null;
  /** integer (int32). */
  updateResourceId?: number | null;
}

/**
 * The `DeletedTaskActivityLog` entity.
 * Generated from Swagger model `DeletedTaskActivityLogModel`.
 */
export interface DeletedTaskActivityLog {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  typeID?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  taskNumber?: string | null;
  noteOrAttachmentTitle?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  activityDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** decimal (double). */
  hoursWorked?: number | null;
  /** integer (int32). */
  deletedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  deletedDateTime?: string | null;
}

/**
 * The `DeletedTicketActivityLog` entity.
 * Generated from Swagger model `DeletedTicketActivityLogModel`.
 */
export interface DeletedTicketActivityLog {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  typeID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  ticketNumber?: string | null;
  noteOrAttachmentTitle?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  activityDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** decimal (double). */
  hoursWorked?: number | null;
  /** integer (int32). */
  deletedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  deletedDateTime?: string | null;
}

/**
 * The `DeletedTicketLog` entity.
 * Generated from Swagger model `DeletedTicketLogModel`.
 */
export interface DeletedTicketLog {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  ticketID?: number | null;
  ticketNumber?: string | null;
  ticketTitle?: string | null;
  /** integer (int32). */
  deletedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  deletedDateTime?: string | null;
}

/**
 * The `Department` entity.
 * Generated from Swagger model `DepartmentModel`.
 */
export interface Department {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  name?: string | null;
  number?: string | null;
  /** integer (int32). */
  primaryLocationID?: number | null;
}

/**
 * The `DocumentAttachment` entity.
 * Generated from Swagger model `DocumentAttachmentModel`.
 */
export interface DocumentAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** integer (int32). */
  documentID?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `DocumentCategory` entity.
 * Generated from Swagger model `DocumentCategoryModel`.
 */
export interface DocumentCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  name?: string | null;
  /** integer (int32). */
  parentCategoryID?: number | null;
}

/**
 * The `DocumentChecklistItem` entity.
 * Generated from Swagger model `DocumentChecklistItemModel`.
 */
export interface DocumentChecklistItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  documentID?: number | null;
  isImportant?: boolean | null;
  itemName?: string | null;
  /** integer (int32). */
  position?: number | null;
}

/**
 * The `DocumentConfigurationItemAssociation` entity.
 * Underlying Autotask business object: `DocumentInstalledProductAssociation`.
 * Generated from Swagger model `DocumentConfigurationItemAssociationModel`.
 */
export interface DocumentConfigurationItemAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  documentID?: number | null;
}

/**
 * The `DocumentConfigurationItemCategoryAssociation` entity.
 * Underlying Autotask business object: `DocumentInstalledProductCategoryAssociation`.
 * Generated from Swagger model `DocumentConfigurationItemCategoryAssociationModel`.
 */
export interface DocumentConfigurationItemCategoryAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  documentID?: number | null;
  /** integer (int32). */
  installedProductCategoryID?: number | null;
}

/**
 * The `Document` entity.
 * Generated from Swagger model `DocumentModel`.
 */
export interface Document {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createdDateTime?: string | null;
  /** integer (int32). */
  documentCategoryID?: number | null;
  errorCodes?: string | null;
  isActive?: boolean | null;
  keywords?: string | null;
  /** integer (int32). */
  lastModifiedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** integer (int32). */
  publish?: number | null;
  referenceLink?: string | null;
  title?: string | null;
}

/**
 * The `DocumentNote` entity.
 * Generated from Swagger model `DocumentNoteModel`.
 */
export interface DocumentNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createdDateTime?: string | null;
  description?: string | null;
  /** integer (int32). */
  documentID?: number | null;
  /** integer (int32). */
  lastModifiedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  title?: string | null;
}

/**
 * The `DocumentPlainTextContent` entity.
 * Generated from Swagger model `DocumentPlainTextContentModel`.
 */
export interface DocumentPlainTextContent {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  contentData?: string | null;
}

/**
 * The `DocumentTagAssociation` entity.
 * Generated from Swagger model `DocumentTagAssociationModel`.
 */
export interface DocumentTagAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** integer (int32). */
  documentID?: number | null;
  /** integer (int32). */
  tagID?: number | null;
}

/**
 * The `DocumentTicketAssociation` entity.
 * Generated from Swagger model `DocumentTicketAssociationModel`.
 */
export interface DocumentTicketAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  documentID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `DocumentToArticleAssociation` entity.
 * Generated from Swagger model `DocumentToArticleAssociationModel`.
 */
export interface DocumentToArticleAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  associatedArticleID?: number | null;
  /** integer (int32). */
  documentID?: number | null;
}

/**
 * The `DocumentToDocumentAssociation` entity.
 * Generated from Swagger model `DocumentToDocumentAssociationModel`.
 */
export interface DocumentToDocumentAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  associatedDocumentID?: number | null;
  /** integer (int32). */
  documentID?: number | null;
}

/**
 * The `DomainRegistrar` entity.
 * Generated from Swagger model `DomainRegistrarModel`.
 */
export interface DomainRegistrar {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  name?: string | null;
  url?: string | null;
}

/**
 * The `ExpenseItemAttachment` entity.
 * Generated from Swagger model `ExpenseItemAttachmentModel`.
 */
export interface ExpenseItemAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** integer (int32). */
  expenseItemID?: number | null;
  /** integer (int32). */
  expenseReportID?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ExpenseItem` entity.
 * Generated from Swagger model `ExpenseItemModel`.
 */
export interface ExpenseItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  companyID?: number | null;
  description?: string | null;
  destination?: string | null;
  entertainmentLocation?: string | null;
  /** integer (int32). */
  expenseCategory?: number | null;
  /** decimal (double). */
  expenseCurrencyExpenseAmount?: number | null;
  /** integer (int32). */
  expenseCurrencyID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  expenseDate?: string | null;
  /** integer (int32). */
  expenseReportID?: number | null;
  glCode?: string | null;
  haveReceipt?: boolean | null;
  /** decimal (double). */
  internalCurrencyExpenseAmount?: number | null;
  /** decimal (double). */
  internalCurrencyReimbursementAmount?: number | null;
  isBillableToCompany?: boolean | null;
  isReimbursable?: boolean | null;
  isRejected?: boolean | null;
  /** decimal (double). */
  miles?: number | null;
  /** decimal (double). */
  odometerEnd?: number | null;
  /** decimal (double). */
  odometerStart?: number | null;
  origin?: string | null;
  /** integer (int32). */
  paymentType?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  purchaseOrderNumber?: string | null;
  /** decimal (double). */
  reimbursementCurrencyReimbursementAmount?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  workType?: number | null;
}

/**
 * The `ExpenseReportAttachment` entity.
 * Generated from Swagger model `ExpenseReportAttachmentModel`.
 */
export interface ExpenseReportAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** integer (int32). */
  expenseItemID?: number | null;
  /** integer (int32). */
  expenseReportID?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ExpenseReport` entity.
 * Generated from Swagger model `ExpenseReportModel`.
 */
export interface ExpenseReport {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  amountDue?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approvedDate?: string | null;
  /** integer (int32). */
  approverID?: number | null;
  departmentNumber?: string | null;
  /** decimal (double). */
  internalCurrencyCashAdvanceAmount?: number | null;
  /** decimal (double). */
  internalCurrencyExpenseTotal?: number | null;
  name?: string | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  quickBooksReferenceNumber?: string | null;
  /** decimal (double). */
  reimbursementCurrencyAmountDue?: number | null;
  /** decimal (double). */
  reimbursementCurrencyCashAdvanceAmount?: number | null;
  /** integer (int32). */
  reimbursementCurrencyID?: number | null;
  rejectionReason?: string | null;
  /** integer (int32). */
  status?: number | null;
  submit?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  submitDate?: string | null;
  /** integer (int32). */
  submitterID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  weekEnding?: string | null;
}

/**
 * The `Holiday` entity.
 * Generated from Swagger model `HolidayModel`.
 */
export interface Holiday {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  holidayDate?: string | null;
  holidayName?: string | null;
  /** integer (int32). */
  holidaySetID?: number | null;
}

/**
 * The `HolidaySet` entity.
 * Generated from Swagger model `HolidaySetModel`.
 */
export interface HolidaySet {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  holidaySetDescription?: string | null;
  holidaySetName?: string | null;
}

/**
 * The `IntegrationVendorInsight` entity.
 * Generated from Swagger model `IntegrationVendorInsightModel`.
 */
export interface IntegrationVendorInsight {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  description?: string | null;
  /** integer (int32). */
  height?: number | null;
  /** integer (int32). */
  insightCategory?: number | null;
  insightKey?: string | null;
  isActive?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  referenceUrl?: string | null;
  secret?: string | null;
  title?: string | null;
  vendorSuppliedID?: string | null;
}

/**
 * The `IntegrationVendorWidget` entity.
 * Generated from Swagger model `IntegrationVendorWidgetModel`.
 */
export interface IntegrationVendorWidget {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  description?: string | null;
  isActive?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  referenceUrl?: string | null;
  secret?: string | null;
  title?: string | null;
  vendorSuppliedID?: string | null;
  widgetKey?: string | null;
  /** integer (int32). */
  width?: number | null;
}

/**
 * The `InternalLocation` entity.
 * Generated from Swagger model `InternalLocationModel`.
 */
export interface InternalLocation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  additionalAddressInfo?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  holidaySetId?: number | null;
  isDefault?: boolean | null;
  name?: string | null;
  postalCode?: string | null;
  state?: string | null;
  timeZone?: string | null;
}

/**
 * The `InternalLocationWithBusinessHours` entity.
 * Underlying Autotask business object: `BusinessLocation`.
 * Generated from Swagger model `InternalLocationWithBusinessHoursModel`.
 */
export interface InternalLocationWithBusinessHours {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  additionalAddressInfo?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  /** integer (int32). */
  countryID?: number | null;
  dateFormat?: string | null;
  /** integer (int32). */
  firstDayOfWeek?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  fridayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  fridayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  fridayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  fridayExtendedHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  holidayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  holidayExtendedHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  holidayHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  holidayHoursStartTime?: string | null;
  /** integer (int32). */
  holidayHoursType?: number | null;
  /** integer (int32). */
  holidaySetID?: number | null;
  isDefault?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  mondayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  mondayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  mondayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  mondayExtendedHoursStartTime?: string | null;
  name?: string | null;
  noHoursOnHolidays?: boolean | null;
  numberFormat?: string | null;
  postalCode?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  saturdayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  saturdayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  saturdayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  saturdayExtendedHoursStartTime?: string | null;
  state?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sundayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sundayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sundayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sundayExtendedHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  thursdayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  thursdayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  thursdayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  thursdayExtendedHoursStartTime?: string | null;
  timeFormat?: string | null;
  /** integer (int32). */
  timeZoneID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  tuesdayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  tuesdayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  tuesdayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  tuesdayExtendedHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  wednesdayBusinessHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  wednesdayBusinessHoursStartTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  wednesdayExtendedHoursEndTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  wednesdayExtendedHoursStartTime?: string | null;
}

/**
 * The `InventoryItem` entity.
 * Generated from Swagger model `InventoryItemModel`.
 */
export interface InventoryItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  backOrderQuantity?: number | null;
  bin?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  inventoryLocationID?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** integer (int32). */
  quantityMaximum?: number | null;
  /** integer (int32). */
  quantityMinimum?: number | null;
  /** integer (int32). */
  quantityOnHand?: number | null;
  /** integer (int32). */
  quantityOnOrder?: number | null;
  /** integer (int32). */
  quantityPicked?: number | null;
  /** integer (int32). */
  quantityReserved?: number | null;
  referenceNumber?: string | null;
}

/**
 * The `InventoryItemSerialNumber` entity.
 * Generated from Swagger model `InventoryItemSerialNumberModel`.
 */
export interface InventoryItemSerialNumber {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  inventoryItemID?: number | null;
  serialNumber?: string | null;
}

/**
 * The `InventoryLocation` entity.
 * Generated from Swagger model `InventoryLocationModel`.
 */
export interface InventoryLocation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  isActive?: boolean | null;
  isDefault?: boolean | null;
  locationName?: string | null;
  /** integer (int32). */
  resourceID?: number | null;
}

/**
 * The `InventoryProduct` entity.
 * Generated from Swagger model `InventoryProductModel`.
 */
export interface InventoryProduct {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  availableUnits?: number | null;
  /** integer (int32). */
  backOrderQuantity?: number | null;
  bin?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** integer (int32). */
  inventoryLocationID?: number | null;
  /** integer (int32). */
  onHandUnits?: number | null;
  /** integer (int32). */
  pickedUnits?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** integer (int32). */
  quantityMaximum?: number | null;
  /** integer (int32). */
  quantityMinimum?: number | null;
  referenceNumber?: string | null;
  /** integer (int32). */
  reservedUnits?: number | null;
  /** integer (int32). */
  unitsOnOrder?: number | null;
}

/**
 * The `InventoryStockedItem` entity.
 * Generated from Swagger model `InventoryStockedItemModel`.
 */
export interface InventoryStockedItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  availableUnits?: number | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** integer (int32). */
  currentInventoryLocationID?: number | null;
  /** integer (int32). */
  deliveredUnits?: number | null;
  /** integer (int32). */
  inventoryProductID?: number | null;
  /** integer (int32). */
  purchaseOrderItemReceivingID?: number | null;
  /** integer (int32). */
  onHandUnits?: number | null;
  /** integer (int32). */
  parentInventoryStockedItemID?: number | null;
  /** integer (int32). */
  pickedRemovedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  pickedRemovedDateTime?: string | null;
  /** integer (int32). */
  pickedUnits?: number | null;
  /** integer (int32). */
  purchaseOrderID?: number | null;
  /** integer (int32). */
  purchaseOrderItemID?: number | null;
  /** integer (int32). */
  quoteItemID?: number | null;
  /** integer (int32). */
  removedUnits?: number | null;
  /** integer (int32). */
  reservedUnits?: number | null;
  /** decimal (double). */
  returnPrice?: number | null;
  /** integer (int32). */
  returnTypeID?: number | null;
  serialNumber?: string | null;
  /** integer (int32). */
  statusID?: number | null;
  /** integer (int32). */
  transferredUnits?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** integer (int32). */
  vendorID?: number | null;
  vendorInvoiceNumber?: string | null;
  /** integer (int32). */
  parentStockedItemReceivedUnits?: number | null;
  /** integer (int32). */
  contractChargeID?: number | null;
  /** integer (int32). */
  projectChargeID?: number | null;
  /** integer (int32). */
  ticketChargeID?: number | null;
}

/**
 * The `InventoryTransfer` entity.
 * Generated from Swagger model `InventoryTransferModel`.
 */
export interface InventoryTransfer {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  fromLocationID?: number | null;
  notes?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  productID?: number | null;
  /** integer (int32). */
  quantityTransferred?: number | null;
  serialNumber?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  toLocationID?: number | null;
  /** integer (int32). */
  transferByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  transferDate?: string | null;
  updateNote?: string | null;
}

/**
 * The `Invoice` entity.
 * Generated from Swagger model `InvoiceModel`.
 */
export interface Invoice {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  batchID?: number | null;
  comments?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  dueDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  fromDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  invoiceDateTime?: string | null;
  /** integer (int32). */
  invoiceEditorTemplateID?: number | null;
  invoiceNumber?: string | null;
  /** decimal (double). */
  invoiceTotal?: number | null;
  isVoided?: boolean | null;
  orderNumber?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  paidDate?: string | null;
  /** integer (int32). */
  paymentTerm?: number | null;
  /** integer (int32). */
  taxGroup?: number | null;
  taxRegionName?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  toDate?: string | null;
  /** decimal (double). */
  totalTaxValue?: number | null;
  /** integer (int32). */
  voidedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  voidedDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  webServiceDate?: string | null;
  /** integer (int32). */
  invoiceStatus?: number | null;
  invoiceTaxMethodExternalCode?: string | null;
}

/**
 * The `InvoiceTemplate` entity.
 * Generated from Swagger model `InvoiceTemplateModel`.
 */
export interface InvoiceTemplate {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  coveredByBlockRetainerContractLabel?: string | null;
  coveredByRecurringServiceFixedPricePerTicketContractLabel?: string | null;
  currencyNegativeFormat?: string | null;
  currencyPositiveFormat?: string | null;
  /** integer (int32). */
  dateFormat?: number | null;
  displayFixedPriceContractLabor?: boolean | null;
  displayRecurringServiceContractLabor?: boolean | null;
  displaySeparateLineItemForEachTax?: boolean | null;
  displayTaxCategory?: boolean | null;
  displayTaxCategorySuperscripts?: boolean | null;
  displayZeroAmountRecurringServicesAndBundles?: boolean | null;
  /** integer (int32). */
  groupBy?: number | null;
  /** integer (int32). */
  itemizeItemsInEachGroup?: number | null;
  itemizeServicesAndBundles?: boolean | null;
  name?: string | null;
  nonBillableLaborLabel?: string | null;
  /** integer (int32). */
  numberFormat?: number | null;
  /** integer (int32). */
  pageLayout?: number | null;
  /** integer (int32). */
  pageNumberFormat?: number | null;
  /** integer (int32). */
  paymentTerms?: number | null;
  rateCostExpression?: string | null;
  showGridHeader?: boolean | null;
  showVerticalGridLines?: boolean | null;
  /** integer (int32). */
  sortBy?: number | null;
  /** integer (int32). */
  timeFormat?: number | null;
}

/**
 * The `KnowledgeBaseArticle` entity.
 * Generated from Swagger model `KnowledgeBaseArticleModel`.
 */
export interface KnowledgeBaseArticle {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createdDateTime?: string | null;
  /** integer (int32). */
  articleCategoryID?: number | null;
  errorCodes?: string | null;
  isActive?: boolean | null;
  keywords?: string | null;
  /** integer (int32). */
  lastModifiedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** integer (int32). */
  publish?: number | null;
  referenceLink?: string | null;
  title?: string | null;
}

/**
 * The `KnowledgeBaseCategory` entity.
 * Generated from Swagger model `KnowledgeBaseCategoryModel`.
 */
export interface KnowledgeBaseCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  name?: string | null;
  /** integer (int32). */
  parentCategoryID?: number | null;
}

/**
 * The `NotificationHistory` entity.
 * Generated from Swagger model `NotificationHistoryModel`.
 */
export interface NotificationHistory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  companyID?: number | null;
  entityNumber?: string | null;
  entityTitle?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  initiatingContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  initiatingResourceID?: number | null;
  isActive?: boolean | null;
  isDeleted?: boolean | null;
  isTemplateJob?: boolean | null;
  /** integer (int32). */
  notificationHistoryTypeID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  notificationSentTime?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  projectID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  quoteID?: number | null;
  recipientDisplayName?: string | null;
  recipientEmailAddress?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  taskID?: number | null;
  templateName?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  ticketID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  timeEntryID?: number | null;
}

/**
 * The `OpportunityAttachment` entity.
 * Generated from Swagger model `OpportunityAttachmentModel`.
 */
export interface OpportunityAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `OpportunityCategory` entity.
 * Generated from Swagger model `OpportunityCategoryModel`.
 */
export interface OpportunityCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  displayColorRGB?: number | null;
  isActive?: boolean | null;
  isGlobalDefault?: boolean | null;
  name?: string | null;
  nickname?: string | null;
}

/**
 * The `Opportunity` entity.
 * Generated from Swagger model `OpportunityModel`.
 */
export interface Opportunity {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  advancedField1?: number | null;
  /** decimal (double). */
  advancedField2?: number | null;
  /** decimal (double). */
  advancedField3?: number | null;
  /** decimal (double). */
  advancedField4?: number | null;
  /** decimal (double). */
  advancedField5?: number | null;
  /** decimal (double). */
  amount?: number | null;
  /** decimal (double). */
  assessmentScore?: number | null;
  barriers?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  closedDate?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  /** decimal (double). */
  cost?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  helpNeeded?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivity?: string | null;
  /** integer (int32). */
  leadSource?: number | null;
  /** integer (int32). */
  lossReason?: number | null;
  lossReasonDetail?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lostDate?: string | null;
  market?: string | null;
  /** decimal (double). */
  monthlyCost?: number | null;
  /** decimal (double). */
  monthlyRevenue?: number | null;
  nextStep?: string | null;
  /** decimal (double). */
  onetimeCost?: number | null;
  /** decimal (double). */
  onetimeRevenue?: number | null;
  /** integer (int32). */
  opportunityCategoryID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  /** integer (int32). */
  primaryCompetitor?: number | null;
  /** integer (int32). */
  probability?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  projectedCloseDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  promisedFulfillmentDate?: string | null;
  promotionName?: string | null;
  /** decimal (double). */
  quarterlyCost?: number | null;
  /** decimal (double). */
  quarterlyRevenue?: number | null;
  /** integer (int32). */
  rating?: number | null;
  /** decimal (double). */
  relationshipAssessmentScore?: number | null;
  /** integer (int32). */
  revenueSpread?: number | null;
  revenueSpreadUnit?: string | null;
  /** integer (int32). */
  salesOrderID?: number | null;
  /** decimal (double). */
  salesProcessPercentComplete?: number | null;
  /** decimal (double). */
  semiannualCost?: number | null;
  /** decimal (double). */
  semiannualRevenue?: number | null;
  /** integer (int32). */
  stage?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** decimal (double). */
  technicalAssessmentScore?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  throughDate?: string | null;
  title?: string | null;
  /** integer (int32). */
  totalAmountMonths?: number | null;
  useQuoteTotals?: boolean | null;
  /** integer (int32). */
  winReason?: number | null;
  winReasonDetail?: string | null;
  /** decimal (double). */
  yearlyCost?: number | null;
  /** decimal (double). */
  yearlyRevenue?: number | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `OrganizationalLevel1` entity.
 * Underlying Autotask business object: `BusinessDivision`.
 * Generated from Swagger model `OrganizationalLevel1Model`.
 */
export interface OrganizationalLevel1 {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `OrganizationalLevel2` entity.
 * Underlying Autotask business object: `BusinessSubdivision`.
 * Generated from Swagger model `OrganizationalLevel2Model`.
 */
export interface OrganizationalLevel2 {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `OrganizationalLevelAssociation` entity.
 * Underlying Autotask business object: `BusinessDivisionSubdivision`.
 * Generated from Swagger model `OrganizationalLevelAssociationModel`.
 */
export interface OrganizationalLevelAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isActive?: boolean | null;
  /** integer (int32). */
  organizationalLevel1ID?: number | null;
  /** integer (int32). */
  organizationalLevel2ID?: number | null;
}

/**
 * The `OrganizationalResource` entity.
 * Underlying Autotask business object: `BusinessDivisionSubdivisionResource`.
 * Generated from Swagger model `OrganizationalResourceModel`.
 */
export interface OrganizationalResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  resourceID?: number | null;
}

/**
 * The `PaymentTerm` entity.
 * Generated from Swagger model `PaymentTermModel`.
 */
export interface PaymentTerm {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
  /** integer (int32). */
  paymentDueInDays?: number | null;
}

/**
 * The `Phase` entity.
 * Generated from Swagger model `PhaseModel`.
 */
export interface Phase {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  dueDate?: string | null;
  /** decimal (double). */
  estimatedHours?: number | null;
  externalID?: string | null;
  isScheduled?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDateTime?: string | null;
  /** integer (int32). */
  parentPhaseID?: number | null;
  phaseNumber?: string | null;
  /** integer (int32). */
  projectID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDate?: string | null;
  title?: string | null;
}

/**
 * The `PriceListMaterialCode` entity.
 * Generated from Swagger model `PriceListMaterialCodeModel`.
 */
export interface PriceListMaterialCode {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** integer (int32). */
  currencyID?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
}

/**
 * The `PriceListProduct` entity.
 * Generated from Swagger model `PriceListProductModel`.
 */
export interface PriceListProduct {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  currencyID?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
}

/**
 * The `PriceListProductTier` entity.
 * Generated from Swagger model `PriceListProductTierModel`.
 */
export interface PriceListProductTier {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  currencyID?: number | null;
  /** integer (int32). */
  productTierID?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
}

/**
 * The `PriceListRole` entity.
 * Generated from Swagger model `PriceListRoleModel`.
 */
export interface PriceListRole {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  currencyID?: number | null;
  /** decimal (double). */
  hourlyRate?: number | null;
  /** integer (int32). */
  roleID?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
}

/**
 * The `PriceListServiceBundle` entity.
 * Generated from Swagger model `PriceListServiceBundleModel`.
 */
export interface PriceListServiceBundle {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  currencyID?: number | null;
  /** integer (int32). */
  serviceBundleID?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
}

/**
 * The `PriceListService` entity.
 * Generated from Swagger model `PriceListServiceModel`.
 */
export interface PriceListService {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  currencyID?: number | null;
  /** integer (int32). */
  serviceID?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
}

/**
 * The `PriceListWorkTypeModifier` entity.
 * Generated from Swagger model `PriceListWorkTypeModifierModel`.
 */
export interface PriceListWorkTypeModifier {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  currencyID?: number | null;
  /** integer (int32). */
  modifierType?: number | null;
  /** decimal (double). */
  modifierValue?: number | null;
  usesInternalCurrencyPrice?: boolean | null;
  /** integer (int32). */
  workTypeModifierID?: number | null;
}

/**
 * The `Product` entity.
 * Generated from Swagger model `ProductModel`.
 */
export interface Product {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingType?: number | null;
  /** integer (int32). */
  chargeBillingCodeID?: number | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createdTime?: string | null;
  /** integer (int32). */
  defaultVendorID?: number | null;
  description?: string | null;
  doesNotRequireProcurement?: boolean | null;
  externalProductID?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  internalProductID?: string | null;
  isActive?: boolean | null;
  isEligibleForRma?: boolean | null;
  isSerialized?: boolean | null;
  link?: string | null;
  manufacturerName?: string | null;
  manufacturerProductName?: string | null;
  /** decimal (double). */
  markupRate?: number | null;
  /** decimal (double). */
  msrp?: number | null;
  name?: string | null;
  /** integer (int32). */
  periodType?: number | null;
  /** integer (int32). */
  priceCostMethod?: number | null;
  /** integer (int32). */
  productBillingCodeID?: number | null;
  /** integer (int32). */
  productCategory?: number | null;
  sku?: string | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  vendorProductNumber?: string | null;
  /** integer (int32). */
  defaultInstalledProductCategoryID?: number | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ProductNote` entity.
 * Generated from Swagger model `ProductNoteModel`.
 */
export interface ProductNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  productID?: number | null;
  title?: string | null;
}

/**
 * The `ProductTier` entity.
 * Generated from Swagger model `ProductTierModel`.
 */
export interface ProductTier {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  productID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** decimal (double). */
  upToUnitCount?: number | null;
}

/**
 * The `ProductVendor` entity.
 * Generated from Swagger model `ProductVendorModel`.
 */
export interface ProductVendor {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isActive?: boolean | null;
  isDefault?: boolean | null;
  /** integer (int32). */
  productID?: number | null;
  /** decimal (double). */
  vendorCost?: number | null;
  /** integer (int32). */
  vendorID?: number | null;
  vendorPartNumber?: string | null;
}

/**
 * The `ProjectAttachment` entity.
 * Generated from Swagger model `ProjectAttachmentModel`.
 */
export interface ProjectAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  /** integer (int32). */
  projectNoteID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ProjectCharge` entity.
 * Underlying Autotask business object: `ProjectCost`.
 * Generated from Swagger model `ProjectChargeModel`.
 */
export interface ProjectCharge {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  billableAmount?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  billingCodeID?: number | null;
  /** integer (int32). */
  chargeType?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  description?: string | null;
  /** decimal (double). */
  estimatedCost?: number | null;
  /** decimal (double). */
  extendedCost?: number | null;
  /** decimal (double). */
  internalCurrencyBillableAmount?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  internalPurchaseOrderNumber?: string | null;
  isBillableToCompany?: boolean | null;
  isBilled?: boolean | null;
  name?: string | null;
  notes?: string | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  productID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  projectID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  status?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  statusLastModifiedBy?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  statusLastModifiedDate?: string | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** decimal (double). */
  unitQuantity?: number | null;
}

/**
 * The `Project` entity.
 * Generated from Swagger model `ProjectModel`.
 */
export interface Project {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  actualBilledHours?: number | null;
  /** decimal (double). */
  actualHours?: number | null;
  /** decimal (double). */
  changeOrdersBudget?: number | null;
  /** decimal (double). */
  changeOrdersRevenue?: number | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyOwnerResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completedDateTime?: string | null;
  /** integer (int32). */
  completedPercentage?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** integer (int32). */
  department?: number | null;
  description?: string | null;
  /** integer (int32). */
  duration?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** decimal (double). */
  estimatedSalesCost?: number | null;
  /** decimal (double). */
  estimatedTime?: number | null;
  extProjectNumber?: string | null;
  /** integer (int32). */
  extProjectType?: number | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** decimal (double). */
  laborEstimatedCosts?: number | null;
  /** decimal (double). */
  laborEstimatedMarginPercentage?: number | null;
  /** decimal (double). */
  laborEstimatedRevenue?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDateTime?: string | null;
  /** integer (int32). */
  lastActivityPersonType?: number | null;
  /** integer (int32). */
  lastActivityResourceID?: number | null;
  /** integer (int32). */
  opportunityID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** decimal (double). */
  originalEstimatedRevenue?: number | null;
  /** decimal (double). */
  projectCostEstimatedMarginPercentage?: number | null;
  /** decimal (double). */
  projectCostsBudget?: number | null;
  /** decimal (double). */
  projectCostsRevenue?: number | null;
  /** integer (int32). */
  projectLeadResourceID?: number | null;
  projectName?: string | null;
  projectNumber?: string | null;
  /** integer (int32). */
  projectType?: number | null;
  purchaseOrderNumber?: string | null;
  /** decimal (double). */
  sgda?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  statusDateTime?: string | null;
  statusDetail?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ProjectNoteAttachment` entity.
 * Generated from Swagger model `ProjectNoteAttachmentModel`.
 */
export interface ProjectNoteAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  /** integer (int32). */
  projectNoteID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ProjectNote` entity.
 * Generated from Swagger model `ProjectNoteModel`.
 */
export interface ProjectNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  createdByContactID?: number | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  isAnnouncement?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  noteType?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  title?: string | null;
}

/**
 * The `PurchaseApproval` entity.
 * Generated from Swagger model `PurchaseApprovalModel`.
 */
export interface PurchaseApproval {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  costType?: string | null;
  isApproved?: boolean | null;
  rejectNote?: string | null;
}

/**
 * The `PurchaseOrderItem` entity.
 * Generated from Swagger model `PurchaseOrderItemModel`.
 */
export interface PurchaseOrderItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  chargeID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  estimatedArrivalDate?: string | null;
  /** decimal (double). */
  internalCurrencyUnitCost?: number | null;
  /** integer (int32). */
  inventoryLocationID?: number | null;
  memo?: string | null;
  /** integer (int32). */
  orderID?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  projectID?: number | null;
  /** integer (int32). */
  quantity?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  salesOrderID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  ticketID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
}

/**
 * The `PurchaseOrderItemReceiving` entity.
 * Underlying Autotask business object: `PurchaseOrderReceive`.
 * Generated from Swagger model `PurchaseOrderItemReceivingModel`.
 */
export interface PurchaseOrderItemReceiving {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  purchaseOrderItemID?: number | null;
  /** integer (int32). */
  quantityBackOrdered?: number | null;
  /** integer (int32). */
  quantityNowReceiving?: number | null;
  /** integer (int32). */
  quantityPreviouslyReceived?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  receiveDate?: string | null;
  /** integer (int32). */
  receivedByResourceID?: number | null;
  serialNumber?: string | null;
  vendorInvoiceNumber?: string | null;
}

/**
 * The `PurchaseOrder` entity.
 * Generated from Swagger model `PurchaseOrderModel`.
 */
export interface PurchaseOrder {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  cancelDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  externalPONumber?: string | null;
  fax?: string | null;
  /** decimal (double). */
  freight?: number | null;
  generalMemo?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** decimal (double). */
  internalCurrencyFreight?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  latestEstimatedArrivalDate?: string | null;
  /** integer (int32). */
  paymentTerm?: number | null;
  phone?: string | null;
  /** integer (int32). */
  purchaseForCompanyID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  purchaseOrderTemplateID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  shippingDate?: string | null;
  /** integer (int32). */
  shippingType?: number | null;
  shipToAddress1?: string | null;
  shipToAddress2?: string | null;
  shipToCity?: string | null;
  shipToName?: string | null;
  shipToPostalCode?: string | null;
  shipToState?: string | null;
  showEachTaxInGroup?: boolean | null;
  showTaxCategory?: boolean | null;
  /** integer (int32). */
  status?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  submitDateTime?: string | null;
  /** integer (int32). */
  taxRegionID?: number | null;
  /** integer (int32). */
  useItemDescriptionsFrom?: number | null;
  /** integer (int32). */
  vendorID?: number | null;
  vendorInvoiceNumber?: string | null;
  additionalVendorInvoiceNumbers?: string | null;
}

/**
 * The `QuoteItem` entity.
 * Generated from Swagger model `QuoteItemModel`.
 */
export interface QuoteItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  averageCost?: number | null;
  /** integer (int32). */
  chargeID?: number | null;
  description?: string | null;
  /** integer (int32). */
  expenseID?: number | null;
  /** decimal (double). */
  highestCost?: number | null;
  /** decimal (double). */
  internalCurrencyLineDiscount?: number | null;
  /** decimal (double). */
  internalCurrencyUnitDiscount?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  isOptional?: boolean | null;
  isTaxable?: boolean | null;
  /** integer (int32). */
  laborID?: number | null;
  /** decimal (double). */
  lineDiscount?: number | null;
  /** decimal (double). */
  markupRate?: number | null;
  name?: string | null;
  /** decimal (double). */
  percentageDiscount?: number | null;
  /** integer (int32). */
  periodType?: number | null;
  /** integer (int32). */
  productID?: number | null;
  /** decimal (double). */
  quantity?: number | null;
  /** integer (int32). */
  quoteID?: number | null;
  /** integer (int32). */
  quoteItemType?: number | null;
  /** integer (int32). */
  serviceBundleID?: number | null;
  /** integer (int32). */
  serviceID?: number | null;
  /** integer (int32). */
  shippingID?: number | null;
  /** integer (int32). */
  sortOrderID?: number | null;
  /** integer (int32). */
  taxCategoryID?: number | null;
  /** decimal (double). */
  totalEffectiveTax?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitDiscount?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
}

/**
 * The `QuoteLocation` entity.
 * Generated from Swagger model `QuoteLocationModel`.
 */
export interface QuoteLocation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  postalCode?: string | null;
  state?: string | null;
}

/**
 * The `Quote` entity.
 * Generated from Swagger model `QuoteModel`.
 */
export interface Quote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  approvalStatus?: number | null;
  /** integer (int32). */
  approvalStatusChangedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approvalStatusChangedDate?: string | null;
  /** integer (int32). */
  billToLocationID?: number | null;
  calculateTaxSeparately?: boolean | null;
  comment?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  effectiveDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  expirationDate?: string | null;
  /** integer (int32). */
  extApprovalContactResponse?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  extApprovalResponseDate?: string | null;
  extApprovalResponseSignature?: string | null;
  externalQuoteNumber?: string | null;
  /** integer (int32). */
  groupByID?: number | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  isActive?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  lastModifiedBy?: number | null;
  /** integer (int32). */
  lastPublishedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastPublishedDateTime?: string | null;
  name?: string | null;
  /** integer (int32). */
  opportunityID?: number | null;
  /** integer (int32). */
  paymentTerm?: number | null;
  /** integer (int32). */
  paymentType?: number | null;
  primaryQuote?: boolean | null;
  /** integer (int32). */
  proposalProjectID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  quoteNumber?: number | null;
  /** integer (int32). */
  quoteTemplateID?: number | null;
  /** integer (int32). */
  shippingType?: number | null;
  /** integer (int32). */
  shipToLocationID?: number | null;
  showEachTaxInGroup?: boolean | null;
  showTaxCategory?: boolean | null;
  /** integer (int32). */
  soldToLocationID?: number | null;
  /** integer (int32). */
  taxRegionID?: number | null;
}

/**
 * The `QuoteTemplate` entity.
 * Generated from Swagger model `QuoteTemplateModel`.
 */
export interface QuoteTemplate {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  calculateTaxSeparately?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  createdBy?: number | null;
  currencyNegativeFormat?: string | null;
  currencyPositiveFormat?: string | null;
  /** integer (int32). */
  dateFormat?: number | null;
  description?: string | null;
  displayTaxCategorySuperscripts?: boolean | null;
  isActive?: boolean | null;
  /** integer (int32). */
  lastActivityBy?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  name?: string | null;
  /** integer (int32). */
  numberFormat?: number | null;
  /** integer (int32). */
  pageLayout?: number | null;
  /** integer (int32). */
  pageNumberFormat?: number | null;
  showEachTaxInGroup?: boolean | null;
  showGridHeader?: boolean | null;
  showTaxCategory?: boolean | null;
  showVerticalGridLines?: boolean | null;
}

/**
 * The `ResourceAttachment` entity.
 * Generated from Swagger model `ResourceAttachmentModel`.
 */
export interface ResourceAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  resourceID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `ResourceDailyAvailability` entity.
 * Generated from Swagger model `ResourceDailyAvailabilityModel`.
 */
export interface ResourceDailyAvailability {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** decimal (double). */
  sundayAvailableHours?: number | null;
  /** decimal (double). */
  mondayAvailableHours?: number | null;
  /** decimal (double). */
  tuesdayAvailableHours?: number | null;
  /** decimal (double). */
  wednesdayAvailableHours?: number | null;
  /** decimal (double). */
  thursdayAvailableHours?: number | null;
  /** decimal (double). */
  fridayAvailableHours?: number | null;
  /** decimal (double). */
  saturdayAvailableHours?: number | null;
  /** decimal (double). */
  weeklyBillableHoursGoal?: number | null;
  travelAvailability?: string | null;
}

/**
 * The `Resource` entity.
 * Generated from Swagger model `ResourceModel`.
 */
export interface Resource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  accountingReferenceID?: string | null;
  dateFormat?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  defaultServiceDeskRoleID?: number | null;
  email?: string | null;
  email2?: string | null;
  email3?: string | null;
  emailTypeCode?: string | null;
  emailTypeCode2?: string | null;
  emailTypeCode3?: string | null;
  firstName?: string | null;
  gender?: string | null;
  /** integer (int32). */
  greeting?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  hireDate?: string | null;
  homePhone?: string | null;
  initials?: string | null;
  /** decimal (double). */
  internalCost?: number | null;
  isActive?: boolean | null;
  lastName?: string | null;
  /** integer (int32). */
  licenseType?: number | null;
  /** integer (int32). */
  locationID?: number | null;
  middleName?: string | null;
  mobilePhone?: string | null;
  numberFormat?: string | null;
  officeExtension?: string | null;
  officePhone?: string | null;
  payrollIdentifier?: string | null;
  /** integer (int32). */
  payrollType?: number | null;
  resourceType?: string | null;
  /** integer (int32). */
  suffix?: number | null;
  /** decimal (double). */
  surveyResourceRating?: number | null;
  timeFormat?: string | null;
  title?: string | null;
  travelAvailabilityPct?: string | null;
  userName?: string | null;
  /** integer (int32). */
  userType?: number | null;
}

/**
 * The `ResourceRoleDepartment` entity.
 * Generated from Swagger model `ResourceRoleDepartmentModel`.
 */
export interface ResourceRoleDepartment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  departmentID?: number | null;
  isActive?: boolean | null;
  isDefault?: boolean | null;
  isDepartmentLead?: boolean | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  roleID?: number | null;
}

/**
 * The `ResourceRole` entity.
 * Generated from Swagger model `ResourceRoleModel`.
 */
export interface ResourceRole {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  departmentID?: number | null;
  isActive?: boolean | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  queueID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  resourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  roleID?: number | null;
}

/**
 * The `ResourceRoleQueue` entity.
 * Generated from Swagger model `ResourceRoleQueueModel`.
 */
export interface ResourceRoleQueue {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  queueID?: number | null;
  /** integer (int32). */
  resourceID?: number | null;
}

/**
 * The `ResourceServiceDeskRole` entity.
 * Generated from Swagger model `ResourceServiceDeskRoleModel`.
 */
export interface ResourceServiceDeskRole {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isActive?: boolean | null;
  isDefault?: boolean | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  roleID?: number | null;
}

/**
 * The `ResourceSkill` entity.
 * Generated from Swagger model `ResourceSkillModel`.
 */
export interface ResourceSkill {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  resourceID?: number | null;
  skillDescription?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  skillID?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  skillLevel?: number | null;
}

/**
 * The `ResourceTimeOffAdditional` entity.
 * Generated from Swagger model `ResourceTimeOffAdditionalModel`.
 */
export interface ResourceTimeOffAdditional {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  currentYear?: number | null;
  /** decimal (double). */
  currentYearAdditionalVacationTime?: number | null;
  /** decimal (double). */
  currentYearAdditionalPersonalTime?: number | null;
  /** decimal (double). */
  currentYearAdditionalSickTime?: number | null;
  /** decimal (double). */
  currentYearAdditionalFloatingHoliday?: number | null;
  /** decimal (double). */
  currentYearAnnualVacationTime?: number | null;
  /** decimal (double). */
  currentYearAnnualPersonalTime?: number | null;
  /** decimal (double). */
  currentYearAnnualSickTime?: number | null;
  /** decimal (double). */
  currentYearAnnualFloatingHoliday?: number | null;
  /** integer (int32). */
  nextYear?: number | null;
  /** decimal (double). */
  nextYearAdditionalVacationTime?: number | null;
  /** decimal (double). */
  nextYearAdditionalPersonalTime?: number | null;
  /** decimal (double). */
  nextYearAdditionalSickTime?: number | null;
  /** decimal (double). */
  nextYearAdditionalFloatingHoliday?: number | null;
  /** decimal (double). */
  nextYearAnnualVacationTime?: number | null;
  /** decimal (double). */
  nextYearAnnualPersonalTime?: number | null;
  /** decimal (double). */
  nextYearAnnualSickTime?: number | null;
  /** decimal (double). */
  nextYearAnnualFloatingHoliday?: number | null;
}

/**
 * The `ResourceTimeOffApprover` entity.
 * Generated from Swagger model `ResourceTimeOffApproverModel`.
 */
export interface ResourceTimeOffApprover {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  approverResourceID?: number | null;
  /** integer (int32). */
  approvalLevel?: number | null;
}

/**
 * The `ResourceTimeOffBalance` entity.
 * Generated from Swagger model `ResourceTimeOffBalanceModel`.
 */
export interface ResourceTimeOffBalance {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** decimal (double). */
  floatingHolidayAnnualAllowance?: number | null;
  /** decimal (double). */
  floatingHolidayBalance?: number | null;
  /** decimal (double). */
  floatingHolidayPlanned?: number | null;
  /** decimal (double). */
  floatingHolidayUsed?: number | null;
  /** decimal (double). */
  floatingHolidayWaitingApproval?: number | null;
  /** decimal (double). */
  personalTimeAnnualAllowance?: number | null;
  /** decimal (double). */
  personalTimeBalance?: number | null;
  /** decimal (double). */
  personalTimePlanned?: number | null;
  /** decimal (double). */
  personalTimeUsed?: number | null;
  /** decimal (double). */
  personalTimeWaitingApproval?: number | null;
  /** decimal (double). */
  sickTimeAnnualAllowance?: number | null;
  /** decimal (double). */
  sickTimeBalance?: number | null;
  /** decimal (double). */
  sickTimePlanned?: number | null;
  /** decimal (double). */
  sickTimeUsed?: number | null;
  /** decimal (double). */
  sickTimeWaitingApproval?: number | null;
  /** decimal (double). */
  vacationTimeAnnualAllowance?: number | null;
  /** decimal (double). */
  vacationTimeBalance?: number | null;
  /** decimal (double). */
  vacationTimePlanned?: number | null;
  /** decimal (double). */
  vacationTimeUsed?: number | null;
  /** decimal (double). */
  vacationTimeWaitingApproval?: number | null;
  /** integer (int32). */
  year?: number | null;
}

/**
 * The `Role` entity.
 * Generated from Swagger model `RoleModel`.
 */
export interface Role {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  /** decimal (double). */
  hourlyFactor?: number | null;
  /** decimal (double). */
  hourlyRate?: number | null;
  isActive?: boolean | null;
  isExcludedFromNewContracts?: boolean | null;
  isSystemRole?: boolean | null;
  name?: string | null;
  /** integer (int32). */
  quoteItemDefaultTaxCategoryId?: number | null;
  /** integer (int32). */
  roleType?: number | null;
}

/**
 * The `SalesOrderAttachment` entity.
 * Generated from Swagger model `SalesOrderAttachmentModel`.
 */
export interface SalesOrderAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  salesOrderID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `SalesOrder` entity.
 * Generated from Swagger model `SalesOrderModel`.
 */
export interface SalesOrder {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  additionalBillToAddressInformation?: string | null;
  additionalShipToAddressInformation?: string | null;
  billingAddress1?: string | null;
  billingAddress2?: string | null;
  billToCity?: string | null;
  /** integer (int32). */
  billToCountryID?: number | null;
  billToPostalCode?: string | null;
  billToState?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  opportunityID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  promisedFulfillmentDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  salesOrderDate?: string | null;
  shipToAddress1?: string | null;
  shipToAddress2?: string | null;
  shipToCity?: string | null;
  /** integer (int32). */
  shipToCountryID?: number | null;
  shipToPostalCode?: string | null;
  shipToState?: string | null;
  /** integer (int32). */
  status?: number | null;
  title?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ServiceBundle` entity.
 * Generated from Swagger model `ServiceBundleModel`.
 */
export interface ServiceBundle {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  invoiceDescription?: string | null;
  isActive?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDate?: string | null;
  name?: string | null;
  /** decimal (double). */
  percentageDiscount?: number | null;
  /** integer (int32). */
  periodType?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  serviceLevelAgreementID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitDiscount?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** integer (int32). */
  updateResourceID?: number | null;
  manufacturerServiceProvider?: string | null;
  manufacturerServiceProviderProductNumber?: string | null;
  catalogNumberPartNumber?: string | null;
  sku?: string | null;
  internalID?: string | null;
  externalID?: string | null;
  url?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ServiceBundleService` entity.
 * Generated from Swagger model `ServiceBundleServiceModel`.
 */
export interface ServiceBundleService {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  serviceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  serviceID?: number | null;
}

/**
 * The `ServiceCall` entity.
 * Generated from Swagger model `ServiceCallModel`.
 */
export interface ServiceCall {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  cancelationNoticeHours?: number | null;
  /** integer (int32). */
  canceledByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  canceledDateTime?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyLocationID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** decimal (double). */
  duration?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  isComplete?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  /** integer (int32). */
  status?: number | null;
}

/**
 * The `ServiceCallTask` entity.
 * Generated from Swagger model `ServiceCallTaskModel`.
 */
export interface ServiceCallTask {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  serviceCallID?: number | null;
  /** integer (int32). */
  taskID?: number | null;
}

/**
 * The `ServiceCallTaskResource` entity.
 * Generated from Swagger model `ServiceCallTaskResourceModel`.
 */
export interface ServiceCallTaskResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  serviceCallTaskID?: number | null;
}

/**
 * The `ServiceCallTicket` entity.
 * Generated from Swagger model `ServiceCallTicketModel`.
 */
export interface ServiceCallTicket {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  serviceCallID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `ServiceCallTicketResource` entity.
 * Generated from Swagger model `ServiceCallTicketResourceModel`.
 */
export interface ServiceCallTicketResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  serviceCallTicketID?: number | null;
}

/**
 * The `ServiceLevelAgreementResults` entity.
 * Generated from Swagger model `ServiceLevelAgreementResultsModel`.
 */
export interface ServiceLevelAgreementResults {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  firstResponseElapsedHours?: number | null;
  /** integer (int32). */
  firstResponseInitiatingResourceID?: number | null;
  /** integer (int32). */
  firstResponseResourceID?: number | null;
  isFirstResponseMet?: boolean | null;
  isResolutionMet?: boolean | null;
  isResolutionPlanMet?: boolean | null;
  /** decimal (double). */
  resolutionElapsedHours?: number | null;
  /** decimal (double). */
  resolutionPlanElapsedHours?: number | null;
  /** integer (int32). */
  resolutionPlanResourceID?: number | null;
  /** integer (int32). */
  resolutionResourceID?: number | null;
  serviceLevelAgreementName?: string | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `Service` entity.
 * Generated from Swagger model `ServiceModel`.
 */
export interface Service {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  invoiceDescription?: string | null;
  isActive?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDate?: string | null;
  /** decimal (double). */
  markupRate?: number | null;
  name?: string | null;
  /** integer (int32). */
  periodType?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  serviceLevelAgreementID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** integer (int32). */
  updateResourceID?: number | null;
  /** integer (int32). */
  vendorCompanyID?: number | null;
  manufacturerServiceProvider?: string | null;
  manufacturerServiceProviderProductNumber?: string | null;
  catalogNumberPartNumber?: string | null;
  sku?: string | null;
  internalID?: string | null;
  externalID?: string | null;
  url?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `ShippingType` entity.
 * Generated from Swagger model `ShippingTypeModel`.
 */
export interface ShippingType {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  billingCodeID?: number | null;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `Skill` entity.
 * Generated from Swagger model `SkillModel`.
 */
export interface Skill {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  categoryID?: number | null;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `Subscription` entity.
 * Generated from Swagger model `SubscriptionModel`.
 */
export interface Subscription {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemID?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  effectiveDate?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  expirationDate?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  materialCodeID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** decimal (double). */
  periodCost?: number | null;
  /** decimal (double). */
  periodPrice?: number | null;
  /** integer (int32). */
  periodType?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  status?: number | null;
  subscriptionName?: string | null;
  /** decimal (double). */
  totalCost?: number | null;
  /** decimal (double). */
  totalPrice?: number | null;
  /** integer (int32). */
  vendorID?: number | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `SubscriptionPeriod` entity.
 * Generated from Swagger model `SubscriptionPeriodModel`.
 */
export interface SubscriptionPeriod {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  periodCost?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  periodDate?: string | null;
  /** decimal (double). */
  periodPrice?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  postedDate?: string | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  subscriptionID?: number | null;
}

/**
 * The `Survey` entity.
 * Generated from Swagger model `SurveyModel`.
 */
export interface Survey {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  displayName?: string | null;
  name?: string | null;
}

/**
 * The `SurveyResults` entity.
 * Generated from Swagger model `SurveyResultsModel`.
 */
export interface SurveyResults {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  companyID?: number | null;
  /** decimal (double). */
  companyRating?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completeDate?: string | null;
  /** integer (int32). */
  contactID?: number | null;
  /** decimal (double). */
  contactRating?: number | null;
  /** decimal (double). */
  resourceRating?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  sendDate?: string | null;
  /** integer (int32). */
  surveyID?: number | null;
  /** decimal (double). */
  surveyRating?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TagAlias` entity.
 * Generated from Swagger model `TagAliasModel`.
 */
export interface TagAlias {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  alias?: string | null;
  /** integer (int32). */
  tagID?: number | null;
}

/**
 * The `TagGroup` entity.
 * Generated from Swagger model `TagGroupModel`.
 */
export interface TagGroup {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  displayColor?: number | null;
  isActive?: boolean | null;
  isSystem?: boolean | null;
  label?: string | null;
}

/**
 * The `Tag` entity.
 * Generated from Swagger model `TagModel`.
 */
export interface Tag {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  isActive?: boolean | null;
  isExcludedFromAutomaticTagging?: boolean | null;
  isSystem?: boolean | null;
  label?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** integer (int32). */
  tagGroupID?: number | null;
}

/**
 * The `TaskAttachment` entity.
 * Generated from Swagger model `TaskAttachmentModel`.
 */
export interface TaskAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  /** integer (int32). */
  taskNoteID?: number | null;
  /** integer (int32). */
  timeEntryID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
}

/**
 * The `Task` entity.
 * Generated from Swagger model `TaskModel`.
 */
export interface Task {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  assignedResourceID?: number | null;
  /** integer (int32). */
  assignedResourceRoleID?: number | null;
  /** integer (int32). */
  billingCodeID?: number | null;
  canClientPortalUserCompleteTask?: boolean | null;
  /** integer (int32). */
  companyLocationID?: number | null;
  /** integer (int32). */
  completedByResourceID?: number | null;
  /** integer (int32). */
  completedByType?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completedDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** integer (int32). */
  departmentID?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** decimal (double). */
  estimatedHours?: number | null;
  externalID?: string | null;
  /** decimal (double). */
  hoursToBeScheduled?: number | null;
  isTaskBillable?: boolean | null;
  isVisibleInClientPortal?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDateTime?: string | null;
  /** integer (int32). */
  lastActivityPersonType?: number | null;
  /** integer (int32). */
  lastActivityResourceID?: number | null;
  /** integer (int32). */
  phaseID?: number | null;
  /** integer (int32). */
  priority?: number | null;
  /** integer (int32). */
  priorityLabel?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  purchaseOrderNumber?: string | null;
  /** decimal (double). */
  remainingHours?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** integer (int32). */
  taskCategoryID?: number | null;
  taskNumber?: string | null;
  /** integer (int32). */
  taskType?: number | null;
  title?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `TaskNoteAttachment` entity.
 * Generated from Swagger model `TaskNoteAttachmentModel`.
 */
export interface TaskNoteAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  /** integer (int32). */
  taskNoteID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
}

/**
 * The `TaskNote` entity.
 * Generated from Swagger model `TaskNoteModel`.
 */
export interface TaskNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** integer (int32). */
  createdByContactID?: number | null;
  description?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  noteType?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  title?: string | null;
}

/**
 * The `TaskPredecessor` entity.
 * Generated from Swagger model `TaskPredecessorModel`.
 */
export interface TaskPredecessor {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  lagDays?: number | null;
  /** integer (int32). */
  predecessorTaskID?: number | null;
  /** integer (int32). */
  successorTaskID?: number | null;
}

/**
 * The `TaskSecondaryResource` entity.
 * Generated from Swagger model `TaskSecondaryResourceModel`.
 */
export interface TaskSecondaryResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  roleID?: number | null;
  /** integer (int32). */
  taskID?: number | null;
}

/**
 * The `TaxCategory` entity.
 * Generated from Swagger model `TaxCategoryModel`.
 */
export interface TaxCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `Tax` entity.
 * Generated from Swagger model `TaxModel`.
 */
export interface Tax {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isCompounded?: boolean | null;
  /** integer (int32). */
  taxCategoryID?: number | null;
  taxName?: string | null;
  /** decimal (double). */
  taxRate?: number | null;
  /** integer (int32). */
  taxRegionID?: number | null;
}

/**
 * The `TaxRegion` entity.
 * Generated from Swagger model `TaxRegionModel`.
 */
export interface TaxRegion {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isActive?: boolean | null;
  name?: string | null;
}

/**
 * The `TicketAdditionalConfigurationItem` entity.
 * Underlying Autotask business object: `TicketAdditionalInstalledProduct`.
 * Generated from Swagger model `TicketAdditionalConfigurationItemModel`.
 */
export interface TicketAdditionalConfigurationItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TicketAdditionalContact` entity.
 * Generated from Swagger model `TicketAdditionalContactModel`.
 */
export interface TicketAdditionalContact {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  contactID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TicketAttachment` entity.
 * Generated from Swagger model `TicketAttachmentModel`.
 */
export interface TicketAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int32). */
  parentAttachmentID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  ticketNoteID?: number | null;
  /** integer (int32). */
  timeEntryID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `TicketCategoryFieldDefaults` entity.
 * Generated from Swagger model `TicketCategoryFieldDefaultsModel`.
 */
export interface TicketCategoryFieldDefaults {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  description?: string | null;
  /** decimal (double). */
  estimatedHours?: number | null;
  /** integer (int32). */
  issueTypeID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  priority?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  queueID?: number | null;
  resolution?: string | null;
  /** integer (int32). */
  serviceLevelAgreementID?: number | null;
  /** integer (int32). */
  sourceID?: number | null;
  /** integer (int32). */
  status?: number | null;
  /** integer (int32). */
  subIssueTypeID?: number | null;
  /** integer (int32). */
  ticketCategoryID?: number | null;
  /** integer (int32). */
  ticketTypeID?: number | null;
  title?: string | null;
  /** integer (int32). */
  workTypeID?: number | null;
}

/**
 * The `TicketCategory` entity.
 * Generated from Swagger model `TicketCategoryModel`.
 */
export interface TicketCategory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  displayColorRGB?: number | null;
  isActive?: boolean | null;
  isApiOnly?: boolean | null;
  isGlobalDefault?: boolean | null;
  name?: string | null;
  nickname?: string | null;
}

/**
 * The `TicketChangeRequestApproval` entity.
 * Generated from Swagger model `TicketChangeRequestApprovalModel`.
 */
export interface TicketChangeRequestApproval {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approveRejectDateTime?: string | null;
  approveRejectNote?: string | null;
  /** integer (int32). */
  contactID?: number | null;
  isApproved?: boolean | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TicketCharge` entity.
 * Underlying Autotask business object: `TicketCost`.
 * Generated from Swagger model `TicketChargeModel`.
 */
export interface TicketCharge {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  billableAmount?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  billingCodeID?: number | null;
  /** integer (int32). */
  chargeType?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  creatorResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  datePurchased?: string | null;
  description?: string | null;
  /** decimal (double). */
  extendedCost?: number | null;
  /** decimal (double). */
  internalCurrencyBillableAmount?: number | null;
  /** decimal (double). */
  internalCurrencyUnitPrice?: number | null;
  internalPurchaseOrderNumber?: string | null;
  isBillableToCompany?: boolean | null;
  isBilled?: boolean | null;
  name?: string | null;
  notes?: string | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  productID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  status?: number | null;
  /** integer (int64) — may exceed JS safe-integer range (2^53); large values are not guaranteed lossless. */
  statusLastModifiedBy?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  statusLastModifiedDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  ticketID?: number | null;
  /** decimal (double). */
  unitCost?: number | null;
  /** decimal (double). */
  unitPrice?: number | null;
  /** decimal (double). */
  unitQuantity?: number | null;
}

/**
 * The `TicketChecklistItem` entity.
 * Generated from Swagger model `TicketChecklistItemModel`.
 */
export interface TicketChecklistItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  completedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completedDateTime?: string | null;
  isCompleted?: boolean | null;
  isImportant?: boolean | null;
  itemName?: string | null;
  /** integer (int32). */
  knowledgebaseArticleID?: number | null;
  /** integer (int32). */
  position?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TicketHistory` entity.
 * Generated from Swagger model `TicketHistoryModel`.
 */
export interface TicketHistory {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  action?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  date?: string | null;
  detail?: string | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `Ticket` entity.
 * Generated from Swagger model `TicketModel`.
 */
export interface Ticket {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  apiVendorID?: number | null;
  /** integer (int32). */
  assignedResourceID?: number | null;
  /** integer (int32). */
  assignedResourceRoleID?: number | null;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** integer (int32). */
  changeApprovalBoard?: number | null;
  /** integer (int32). */
  changeApprovalStatus?: number | null;
  /** integer (int32). */
  changeApprovalType?: number | null;
  changeInfoField1?: string | null;
  changeInfoField2?: string | null;
  changeInfoField3?: string | null;
  changeInfoField4?: string | null;
  changeInfoField5?: string | null;
  /** integer (int32). */
  companyID?: number | null;
  /** integer (int32). */
  companyLocationID?: number | null;
  /** integer (int32). */
  completedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  completedDate?: string | null;
  /** integer (int32). */
  configurationItemID?: number | null;
  /** integer (int32). */
  contactID?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int32). */
  createdByContactID?: number | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** integer (int32). */
  currentServiceThermometerRating?: number | null;
  description?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  dueDateTime?: string | null;
  /** decimal (double). */
  estimatedHours?: number | null;
  externalID?: string | null;
  /** integer (int32). */
  firstResponseAssignedResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  firstResponseDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  firstResponseDueDateTime?: string | null;
  /** integer (int32). */
  firstResponseInitiatingResourceID?: number | null;
  /** decimal (double). */
  hoursToBeScheduled?: number | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  isAssignedToComanaged?: boolean | null;
  /** integer (int32). */
  issueType?: number | null;
  isVisibleToComanaged?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  lastActivityPersonType?: number | null;
  /** integer (int32). */
  lastActivityResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastCustomerNotificationDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastCustomerVisibleActivityDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastTrackedModificationDateTime?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  monitorID?: number | null;
  /** integer (int32). */
  monitorTypeID?: number | null;
  /** integer (int32). */
  opportunityID?: number | null;
  /** integer (int32). */
  organizationalLevelAssociationID?: number | null;
  /** integer (int32). */
  previousServiceThermometerRating?: number | null;
  /** integer (int32). */
  priority?: number | null;
  /** integer (int32). */
  problemTicketId?: number | null;
  /** integer (int32). */
  projectID?: number | null;
  purchaseOrderNumber?: string | null;
  /** integer (int32). */
  queueID?: number | null;
  resolution?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  resolutionPlanDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  resolutionPlanDueDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  resolvedDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  resolvedDueDateTime?: string | null;
  /** integer (int32). */
  rmaStatus?: number | null;
  /** integer (int32). */
  rmaType?: number | null;
  rmmAlertID?: string | null;
  serviceLevelAgreementHasBeenMet?: boolean | null;
  /** integer (int32). */
  serviceLevelAgreementID?: number | null;
  /** decimal (double). */
  serviceLevelAgreementPausedNextEventHours?: number | null;
  /** integer (int32). */
  serviceThermometerTemperature?: number | null;
  /** integer (int32). */
  source?: number | null;
  /** integer (int32). */
  status?: number | null;
  /** integer (int32). */
  subIssueType?: number | null;
  /** integer (int32). */
  ticketCategory?: number | null;
  ticketNumber?: string | null;
  /** integer (int32). */
  ticketType?: number | null;
  title?: string | null;
  userDefinedFields?: UserDefinedField[] | null;
}

/**
 * The `TicketNoteAttachment` entity.
 * Generated from Swagger model `TicketNoteAttachmentModel`.
 */
export interface TicketNoteAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  ticketNoteID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `TicketNote` entity.
 * Generated from Swagger model `TicketNoteModel`.
 */
export interface TicketNote {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  createdByContactID?: number | null;
  /** integer (int32). */
  creatorResourceID?: number | null;
  description?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastActivityDate?: string | null;
  /** integer (int32). */
  noteType?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  title?: string | null;
}

/**
 * The `TicketNoteWebhookExcludedResource` entity.
 * Generated from Swagger model `TicketNoteWebhookExcludedResourceModel`.
 */
export interface TicketNoteWebhookExcludedResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `TicketNoteWebhookField` entity.
 * Generated from Swagger model `TicketNoteWebhookFieldModel`.
 */
export interface TicketNoteWebhookField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  fieldID?: number | null;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `TicketNoteWebhook` entity.
 * Generated from Swagger model `TicketNoteWebhookModel`.
 */
export interface TicketNoteWebhook {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  deactivationUrl?: string | null;
  isActive?: boolean | null;
  isReady?: boolean | null;
  isSubscribedToCreateEvents?: boolean | null;
  isSubscribedToDeleteEvents?: boolean | null;
  isSubscribedToUpdateEvents?: boolean | null;
  name?: string | null;
  notificationEmailAddress?: string | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  secretKey?: string | null;
  sendThresholdExceededNotification?: boolean | null;
  webhookGUID?: string | null;
  webhookUrl?: string | null;
}

/**
 * The `TicketRmaCredit` entity.
 * Generated from Swagger model `TicketRmaCreditModel`.
 */
export interface TicketRmaCredit {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** decimal (double). */
  creditAmount?: number | null;
  creditDetails?: string | null;
  /** decimal (double). */
  internalCurrencyCreditAmount?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TicketSecondaryResource` entity.
 * Generated from Swagger model `TicketSecondaryResourceModel`.
 */
export interface TicketSecondaryResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  resourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  roleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  ticketID?: number | null;
}

/**
 * The `TicketTagAssociation` entity.
 * Generated from Swagger model `TicketTagAssociationModel`.
 */
export interface TicketTagAssociation {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  tagID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
}

/**
 * The `TicketWebhookExcludedResource` entity.
 * Generated from Swagger model `TicketWebhookExcludedResourceModel`.
 */
export interface TicketWebhookExcludedResource {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `TicketWebhookField` entity.
 * Generated from Swagger model `TicketWebhookFieldModel`.
 */
export interface TicketWebhookField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  fieldID?: number | null;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `TicketWebhook` entity.
 * Generated from Swagger model `TicketWebhookModel`.
 */
export interface TicketWebhook {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  deactivationUrl?: string | null;
  isActive?: boolean | null;
  isReady?: boolean | null;
  isSubscribedToCreateEvents?: boolean | null;
  isSubscribedToDeleteEvents?: boolean | null;
  isSubscribedToUpdateEvents?: boolean | null;
  name?: string | null;
  notificationEmailAddress?: string | null;
  /** integer (int32). */
  ownerResourceID?: number | null;
  secretKey?: string | null;
  sendThresholdExceededNotification?: boolean | null;
  webhookGUID?: string | null;
  webhookUrl?: string | null;
}

/**
 * The `TicketWebhookUdfField` entity.
 * Generated from Swagger model `TicketWebhookUdfFieldModel`.
 */
export interface TicketWebhookUdfField {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  isDisplayAlwaysField?: boolean | null;
  isSubscribedField?: boolean | null;
  /** integer (int32). */
  udfFieldID?: number | null;
  /** integer (int32). */
  webhookID?: number | null;
}

/**
 * The `TimeEntryAttachment` entity.
 * Generated from Swagger model `TimeEntryAttachmentModel`.
 */
export interface TimeEntryAttachment {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  attachDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByContactID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  attachedByResourceID?: number | null;
  attachmentType?: string | null;
  contentType?: string | null;
  /** integer (int32). */
  creatorType?: number | null;
  /** decimal (double). */
  fileSize?: number | null;
  fullPath?: string | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  opportunityID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  parentID?: number | null;
  /** integer (int32). */
  publish?: number | null;
  /** integer (int32). */
  taskID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  timeEntryID?: number | null;
  title?: string | null;
  /** base64-encoded binary string. */
  data?: string | null;
  /** integer (int32). read-only (server-managed). */
  readonly parentType?: number | null;
  /** read-only (server-managed). */
  readonly isTaskAttachment?: boolean | null;
}

/**
 * The `TimeEntry` entity.
 * Generated from Swagger model `TimeEntryModel`.
 */
export interface TimeEntry {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  billingApprovalDateTime?: string | null;
  /** integer (int32). */
  billingApprovalLevelMostRecent?: number | null;
  /** integer (int32). */
  billingApprovalResourceID?: number | null;
  /** integer (int32). */
  billingCodeID?: number | null;
  /** integer (int32). */
  contractID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceBundleID?: number | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  contractServiceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** integer (int32). */
  creatorUserID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  dateWorked?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endDateTime?: string | null;
  /** decimal (double). */
  hoursToBill?: number | null;
  /** decimal (double). */
  hoursWorked?: number | null;
  /** integer (int32). */
  impersonatorCreatorResourceID?: number | null;
  /** integer (int32). */
  impersonatorUpdaterResourceID?: number | null;
  /** integer (int32). */
  internalBillingCodeID?: number | null;
  internalNotes?: string | null;
  isInternalNotesVisibleToComanaged?: boolean | null;
  isNonBillable?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** integer (int32). */
  lastModifiedUserID?: number | null;
  /** decimal (double). */
  offsetHours?: number | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** integer (int32). */
  roleID?: number | null;
  showOnInvoice?: boolean | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startDateTime?: string | null;
  summaryNotes?: string | null;
  /** integer (int32). */
  taskID?: number | null;
  /** integer (int32). */
  ticketID?: number | null;
  /** integer (int32). */
  timeEntryType?: number | null;
}

/**
 * The `TimeOffRequest` entity.
 * Generated from Swagger model `TimeOffRequestModel`.
 */
export interface TimeOffRequest {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  approvedDateTime?: string | null;
  /** integer (int32). */
  approveRejectResourceID?: number | null;
  /** integer (int32). */
  createdByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  endTime?: string | null;
  /** decimal (double). */
  hours?: number | null;
  /** integer (int32). */
  impersonatorApproveRejectResourceID?: number | null;
  /** integer (int32). */
  lastModifiedByResourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  lastModifiedDateTime?: string | null;
  /** integer (int32). */
  lastApprovedLevel?: number | null;
  reason?: string | null;
  rejectReason?: string | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  requestDate?: string | null;
  /** integer (int32). */
  resourceID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  startTime?: string | null;
  /** integer (int32). */
  status?: number | null;
  /** integer (int32). */
  timeOffRequestType?: number | null;
}

/**
 * The `UserDefinedFieldDefinition` entity.
 * Generated from Swagger model `UserDefinedFieldDefinitionModel`.
 */
export interface UserDefinedFieldDefinition {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  crmToProjectUdfId?: number | null;
  /** integer (int32). */
  dataType?: number | null;
  defaultValue?: unknown | null;
  description?: string | null;
  /** integer (int32). */
  displayFormat?: number | null;
  isActive?: boolean | null;
  isEncrypted?: boolean | null;
  isFieldMapping?: boolean | null;
  isPrivate?: boolean | null;
  isProtected?: boolean | null;
  isRequired?: boolean | null;
  isVisibleToClientPortal?: boolean | null;
  mergeVariableName?: string | null;
  name?: string | null;
  /** integer (int32). */
  numberOfDecimalPlaces?: number | null;
  /** integer (int32). */
  sortOrder?: number | null;
  /** integer (int32). */
  udfType?: number | null;
}

/**
 * The `UserDefinedFieldListItem` entity.
 * Generated from Swagger model `UserDefinedFieldListItemModel`.
 */
export interface UserDefinedFieldListItem {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDate?: string | null;
  isActive?: boolean | null;
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  udfFieldId?: number | null;
  valueForDisplay?: string | null;
  valueForExport?: string | null;
}

/**
 * The `WebhookEventErrorLog` entity.
 * Generated from Swagger model `WebhookEventErrorLogModel`.
 */
export interface WebhookEventErrorLog {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  accountWebhookID?: number | null;
  /** integer (int32). */
  contactWebhookID?: number | null;
  /** UTC date-time string with no timezone designator, e.g. `2024-01-31T15:04:05.307`; append "Z" to parse as UTC (`new Date(s + "Z")`). */
  createDateTime?: string | null;
  errorMessage?: string | null;
  payload?: string | null;
  /** integer (int32). */
  sequenceNumber?: number | null;
}

/**
 * The `WorkTypeModifier` entity.
 * Generated from Swagger model `WorkTypeModifierModel`.
 */
export interface WorkTypeModifier {
  /** integer (int64) — within JS safe-integer range for Autotask ids. */
  readonly id?: number;
  /** integer (int32). */
  modifierType?: number | null;
  /** decimal (double). */
  modifierValue?: number | null;
}
