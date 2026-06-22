/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 * Generated from swagger.json by scripts/generate.mjs.
 * Run `npm run generate` to refresh after updating swagger.json.
 *
 * The map of REST collection name -> entity interface.
 */

import type {
  ActionType,
  AdditionalInvoiceFieldValue,
  Appointment,
  ArticleAttachment,
  ArticleConfigurationItemCategoryAssociation,
  ArticleNote,
  ArticlePlainTextContent,
  ArticleTagAssociation,
  ArticleTicketAssociation,
  ArticleToArticleAssociation,
  ArticleToDocumentAssociation,
  AttachmentInfo,
  BillingCode,
  BillingItem,
  BillingItemApprovalLevel,
  ChangeOrderCharge,
  ChangeRequestLink,
  ChecklistLibrary,
  ChecklistLibraryChecklistItem,
  ClassificationIcon,
  ClientPortalUser,
  ComanagedAssociation,
  Company,
  CompanyAlert,
  CompanyAttachment,
  CompanyCategory,
  CompanyLocation,
  CompanyNote,
  CompanyNoteAttachment,
  CompanySiteConfiguration,
  CompanyTeam,
  CompanyToDo,
  CompanyWebhook,
  CompanyWebhookExcludedResource,
  CompanyWebhookField,
  CompanyWebhookUdfField,
  ConfigurationItem,
  ConfigurationItemAttachment,
  ConfigurationItemBillingProductAssociation,
  ConfigurationItemCategory,
  ConfigurationItemCategoryUdfAssociation,
  ConfigurationItemDnsRecord,
  ConfigurationItemNote,
  ConfigurationItemNoteAttachment,
  ConfigurationItemRelatedItem,
  ConfigurationItemSslSubjectAlternativeName,
  ConfigurationItemType,
  ConfigurationItemWebhook,
  ConfigurationItemWebhookExcludedResource,
  ConfigurationItemWebhookField,
  ConfigurationItemWebhookUdfField,
  Contact,
  ContactBillingProductAssociation,
  ContactGroup,
  ContactGroupContact,
  ContactWebhook,
  ContactWebhookExcludedResource,
  ContactWebhookField,
  ContactWebhookUdfField,
  Contract,
  ContractBillingRule,
  ContractBlock,
  ContractBlockHourFactor,
  ContractCharge,
  ContractExclusionBillingCode,
  ContractExclusionRole,
  ContractExclusionSet,
  ContractExclusionSetExcludedRole,
  ContractExclusionSetExcludedWorkType,
  ContractMilestone,
  ContractNote,
  ContractNoteAttachment,
  ContractRate,
  ContractRetainer,
  ContractRoleCost,
  ContractService,
  ContractServiceBundle,
  ContractServiceBundleUnit,
  ContractServiceUnit,
  ContractTicketPurchase,
  Country,
  Currency,
  DeletedTaskActivityLog,
  DeletedTicketActivityLog,
  DeletedTicketLog,
  Department,
  Document,
  DocumentAttachment,
  DocumentCategory,
  DocumentChecklistItem,
  DocumentConfigurationItemAssociation,
  DocumentConfigurationItemCategoryAssociation,
  DocumentNote,
  DocumentPlainTextContent,
  DocumentTagAssociation,
  DocumentTicketAssociation,
  DocumentToArticleAssociation,
  DocumentToDocumentAssociation,
  DomainRegistrar,
  ExpenseItem,
  ExpenseItemAttachment,
  ExpenseReport,
  ExpenseReportAttachment,
  Holiday,
  HolidaySet,
  IntegrationVendorInsight,
  IntegrationVendorWidget,
  InternalLocation,
  InternalLocationWithBusinessHours,
  InventoryItem,
  InventoryItemSerialNumber,
  InventoryLocation,
  InventoryProduct,
  InventoryStockedItem,
  InventoryTransfer,
  Invoice,
  InvoiceTemplate,
  KnowledgeBaseArticle,
  KnowledgeBaseCategory,
  NotificationHistory,
  Opportunity,
  OpportunityAttachment,
  OpportunityCategory,
  OrganizationalLevel1,
  OrganizationalLevel2,
  OrganizationalLevelAssociation,
  OrganizationalResource,
  PaymentTerm,
  Phase,
  PriceListMaterialCode,
  PriceListProduct,
  PriceListProductTier,
  PriceListRole,
  PriceListService,
  PriceListServiceBundle,
  PriceListWorkTypeModifier,
  Product,
  ProductNote,
  ProductTier,
  ProductVendor,
  Project,
  ProjectAttachment,
  ProjectCharge,
  ProjectNote,
  ProjectNoteAttachment,
  PurchaseApproval,
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderItemReceiving,
  Quote,
  QuoteItem,
  QuoteLocation,
  QuoteTemplate,
  Resource,
  ResourceAttachment,
  ResourceDailyAvailability,
  ResourceRole,
  ResourceRoleDepartment,
  ResourceRoleQueue,
  ResourceServiceDeskRole,
  ResourceSkill,
  ResourceTimeOffApprover,
  Role,
  SalesOrder,
  SalesOrderAttachment,
  Service,
  ServiceBundle,
  ServiceBundleService,
  ServiceCall,
  ServiceCallTask,
  ServiceCallTaskResource,
  ServiceCallTicket,
  ServiceCallTicketResource,
  ServiceLevelAgreementResults,
  ShippingType,
  Skill,
  Subscription,
  SubscriptionPeriod,
  Survey,
  SurveyResults,
  Tag,
  TagAlias,
  TagGroup,
  Task,
  TaskAttachment,
  TaskNote,
  TaskNoteAttachment,
  TaskPredecessor,
  TaskSecondaryResource,
  Tax,
  TaxCategory,
  TaxRegion,
  Ticket,
  TicketAdditionalConfigurationItem,
  TicketAdditionalContact,
  TicketAttachment,
  TicketCategory,
  TicketCategoryFieldDefaults,
  TicketChangeRequestApproval,
  TicketCharge,
  TicketChecklistItem,
  TicketHistory,
  TicketNote,
  TicketNoteAttachment,
  TicketNoteWebhook,
  TicketNoteWebhookExcludedResource,
  TicketNoteWebhookField,
  TicketRmaCredit,
  TicketSecondaryResource,
  TicketTagAssociation,
  TicketWebhook,
  TicketWebhookExcludedResource,
  TicketWebhookField,
  TicketWebhookUdfField,
  TimeEntry,
  TimeEntryAttachment,
  TimeOffRequest,
  UserDefinedFieldDefinition,
  UserDefinedFieldListItem,
  WebhookEventErrorLog,
  WorkTypeModifier,
} from "./entities.js";

/**
 * Maps every queryable Autotask REST collection name to its entity interface.
 * Use it to write a generically-typed client, e.g.
 *
 * ```ts
 * function query<K extends EntityName>(
 *   collection: K,
 *   q: AutotaskQuery<AutotaskEntities[K]>,
 * ): Promise<AutotaskQueryResult<AutotaskEntities[K]>>;
 * ```
 */
export interface AutotaskEntities {
  ActionTypes: ActionType;
  AdditionalInvoiceFieldValues: AdditionalInvoiceFieldValue;
  Appointments: Appointment;
  ArticleAttachments: ArticleAttachment;
  ArticleConfigurationItemCategoryAssociations: ArticleConfigurationItemCategoryAssociation;
  ArticleNotes: ArticleNote;
  ArticlePlainTextContent: ArticlePlainTextContent;
  ArticleTagAssociations: ArticleTagAssociation;
  ArticleTicketAssociations: ArticleTicketAssociation;
  ArticleToArticleAssociations: ArticleToArticleAssociation;
  ArticleToDocumentAssociations: ArticleToDocumentAssociation;
  AttachmentInfo: AttachmentInfo;
  BillingCodes: BillingCode;
  BillingItemApprovalLevels: BillingItemApprovalLevel;
  BillingItems: BillingItem;
  ChangeOrderCharges: ChangeOrderCharge;
  ChangeRequestLinks: ChangeRequestLink;
  ChecklistLibraries: ChecklistLibrary;
  ChecklistLibraryChecklistItems: ChecklistLibraryChecklistItem;
  ClassificationIcons: ClassificationIcon;
  ClientPortalUsers: ClientPortalUser;
  ComanagedAssociations: ComanagedAssociation;
  Companies: Company;
  CompanyAlerts: CompanyAlert;
  CompanyAttachments: CompanyAttachment;
  CompanyCategories: CompanyCategory;
  CompanyLocations: CompanyLocation;
  CompanyNoteAttachments: CompanyNoteAttachment;
  CompanyNotes: CompanyNote;
  CompanySiteConfigurations: CompanySiteConfiguration;
  CompanyTeams: CompanyTeam;
  CompanyToDos: CompanyToDo;
  CompanyWebhookExcludedResources: CompanyWebhookExcludedResource;
  CompanyWebhookFields: CompanyWebhookField;
  CompanyWebhooks: CompanyWebhook;
  CompanyWebhookUdfFields: CompanyWebhookUdfField;
  ConfigurationItemAttachments: ConfigurationItemAttachment;
  ConfigurationItemBillingProductAssociations: ConfigurationItemBillingProductAssociation;
  ConfigurationItemCategories: ConfigurationItemCategory;
  ConfigurationItemCategoryUdfAssociations: ConfigurationItemCategoryUdfAssociation;
  ConfigurationItemDnsRecords: ConfigurationItemDnsRecord;
  ConfigurationItemNoteAttachments: ConfigurationItemNoteAttachment;
  ConfigurationItemNotes: ConfigurationItemNote;
  ConfigurationItemRelatedItems: ConfigurationItemRelatedItem;
  ConfigurationItems: ConfigurationItem;
  ConfigurationItemSslSubjectAlternativeNames: ConfigurationItemSslSubjectAlternativeName;
  ConfigurationItemTypes: ConfigurationItemType;
  ConfigurationItemWebhookExcludedResources: ConfigurationItemWebhookExcludedResource;
  ConfigurationItemWebhookFields: ConfigurationItemWebhookField;
  ConfigurationItemWebhooks: ConfigurationItemWebhook;
  ConfigurationItemWebhookUdfFields: ConfigurationItemWebhookUdfField;
  ContactBillingProductAssociations: ContactBillingProductAssociation;
  ContactGroupContacts: ContactGroupContact;
  ContactGroups: ContactGroup;
  Contacts: Contact;
  ContactWebhookExcludedResources: ContactWebhookExcludedResource;
  ContactWebhookFields: ContactWebhookField;
  ContactWebhooks: ContactWebhook;
  ContactWebhookUdfFields: ContactWebhookUdfField;
  ContractBillingRules: ContractBillingRule;
  ContractBlockHourFactors: ContractBlockHourFactor;
  ContractBlocks: ContractBlock;
  ContractCharges: ContractCharge;
  ContractExclusionBillingCodes: ContractExclusionBillingCode;
  ContractExclusionRoles: ContractExclusionRole;
  ContractExclusionSetExcludedRoles: ContractExclusionSetExcludedRole;
  ContractExclusionSetExcludedWorkTypes: ContractExclusionSetExcludedWorkType;
  ContractExclusionSets: ContractExclusionSet;
  ContractMilestones: ContractMilestone;
  ContractNoteAttachments: ContractNoteAttachment;
  ContractNotes: ContractNote;
  ContractRates: ContractRate;
  ContractRetainers: ContractRetainer;
  ContractRoleCosts: ContractRoleCost;
  Contracts: Contract;
  ContractServiceBundles: ContractServiceBundle;
  ContractServiceBundleUnits: ContractServiceBundleUnit;
  ContractServices: ContractService;
  ContractServiceUnits: ContractServiceUnit;
  ContractTicketPurchases: ContractTicketPurchase;
  Countries: Country;
  Currencies: Currency;
  DeletedTaskActivityLogs: DeletedTaskActivityLog;
  DeletedTicketActivityLogs: DeletedTicketActivityLog;
  DeletedTicketLogs: DeletedTicketLog;
  Departments: Department;
  DocumentAttachments: DocumentAttachment;
  DocumentCategories: DocumentCategory;
  DocumentChecklistItems: DocumentChecklistItem;
  DocumentConfigurationItemAssociations: DocumentConfigurationItemAssociation;
  DocumentConfigurationItemCategoryAssociations: DocumentConfigurationItemCategoryAssociation;
  DocumentNotes: DocumentNote;
  DocumentPlainTextContent: DocumentPlainTextContent;
  Documents: Document;
  DocumentTagAssociations: DocumentTagAssociation;
  DocumentTicketAssociations: DocumentTicketAssociation;
  DocumentToArticleAssociations: DocumentToArticleAssociation;
  DocumentToDocumentAssociations: DocumentToDocumentAssociation;
  DomainRegistrars: DomainRegistrar;
  ExpenseItemAttachments: ExpenseItemAttachment;
  ExpenseItems: ExpenseItem;
  ExpenseReportAttachments: ExpenseReportAttachment;
  ExpenseReports: ExpenseReport;
  Holidays: Holiday;
  HolidaySets: HolidaySet;
  IntegrationVendorInsights: IntegrationVendorInsight;
  IntegrationVendorWidgets: IntegrationVendorWidget;
  InternalLocations: InternalLocation;
  InternalLocationWithBusinessHours: InternalLocationWithBusinessHours;
  InventoryItems: InventoryItem;
  InventoryItemSerialNumbers: InventoryItemSerialNumber;
  InventoryLocations: InventoryLocation;
  InventoryProducts: InventoryProduct;
  InventoryStockedItems: InventoryStockedItem;
  InventoryTransfers: InventoryTransfer;
  Invoices: Invoice;
  InvoiceTemplates: InvoiceTemplate;
  KnowledgeBaseArticles: KnowledgeBaseArticle;
  KnowledgeBaseCategories: KnowledgeBaseCategory;
  NotificationHistory: NotificationHistory;
  Opportunities: Opportunity;
  OpportunityAttachments: OpportunityAttachment;
  OpportunityCategories: OpportunityCategory;
  OrganizationalLevel1s: OrganizationalLevel1;
  OrganizationalLevel2s: OrganizationalLevel2;
  OrganizationalLevelAssociations: OrganizationalLevelAssociation;
  OrganizationalResources: OrganizationalResource;
  PaymentTerms: PaymentTerm;
  Phases: Phase;
  PriceListMaterialCodes: PriceListMaterialCode;
  PriceListProducts: PriceListProduct;
  PriceListProductTiers: PriceListProductTier;
  PriceListRoles: PriceListRole;
  PriceListServiceBundles: PriceListServiceBundle;
  PriceListServices: PriceListService;
  PriceListWorkTypeModifiers: PriceListWorkTypeModifier;
  ProductNotes: ProductNote;
  Products: Product;
  ProductTiers: ProductTier;
  ProductVendors: ProductVendor;
  ProjectAttachments: ProjectAttachment;
  ProjectCharges: ProjectCharge;
  ProjectNoteAttachments: ProjectNoteAttachment;
  ProjectNotes: ProjectNote;
  Projects: Project;
  PurchaseApprovals: PurchaseApproval;
  PurchaseOrderItemReceiving: PurchaseOrderItemReceiving;
  PurchaseOrderItems: PurchaseOrderItem;
  PurchaseOrders: PurchaseOrder;
  QuoteItems: QuoteItem;
  QuoteLocations: QuoteLocation;
  Quotes: Quote;
  QuoteTemplates: QuoteTemplate;
  ResourceAttachments: ResourceAttachment;
  ResourceDailyAvailabilities: ResourceDailyAvailability;
  ResourceRoleDepartments: ResourceRoleDepartment;
  ResourceRoleQueues: ResourceRoleQueue;
  ResourceRoles: ResourceRole;
  Resources: Resource;
  ResourceServiceDeskRoles: ResourceServiceDeskRole;
  ResourceSkills: ResourceSkill;
  ResourceTimeOffApprovers: ResourceTimeOffApprover;
  Roles: Role;
  SalesOrderAttachments: SalesOrderAttachment;
  SalesOrders: SalesOrder;
  ServiceBundles: ServiceBundle;
  ServiceBundleServices: ServiceBundleService;
  ServiceCalls: ServiceCall;
  ServiceCallTaskResources: ServiceCallTaskResource;
  ServiceCallTasks: ServiceCallTask;
  ServiceCallTicketResources: ServiceCallTicketResource;
  ServiceCallTickets: ServiceCallTicket;
  ServiceLevelAgreementResults: ServiceLevelAgreementResults;
  Services: Service;
  ShippingTypes: ShippingType;
  Skills: Skill;
  SubscriptionPeriods: SubscriptionPeriod;
  Subscriptions: Subscription;
  SurveyResults: SurveyResults;
  Surveys: Survey;
  TagAliases: TagAlias;
  TagGroups: TagGroup;
  Tags: Tag;
  TaskAttachments: TaskAttachment;
  TaskNoteAttachments: TaskNoteAttachment;
  TaskNotes: TaskNote;
  TaskPredecessors: TaskPredecessor;
  Tasks: Task;
  TaskSecondaryResources: TaskSecondaryResource;
  TaxCategories: TaxCategory;
  Taxes: Tax;
  TaxRegions: TaxRegion;
  TicketAdditionalConfigurationItems: TicketAdditionalConfigurationItem;
  TicketAdditionalContacts: TicketAdditionalContact;
  TicketAttachments: TicketAttachment;
  TicketCategories: TicketCategory;
  TicketCategoryFieldDefaults: TicketCategoryFieldDefaults;
  TicketChangeRequestApprovals: TicketChangeRequestApproval;
  TicketCharges: TicketCharge;
  TicketChecklistItems: TicketChecklistItem;
  TicketHistory: TicketHistory;
  TicketNoteAttachments: TicketNoteAttachment;
  TicketNotes: TicketNote;
  TicketNoteWebhookExcludedResources: TicketNoteWebhookExcludedResource;
  TicketNoteWebhookFields: TicketNoteWebhookField;
  TicketNoteWebhooks: TicketNoteWebhook;
  TicketRmaCredits: TicketRmaCredit;
  Tickets: Ticket;
  TicketSecondaryResources: TicketSecondaryResource;
  TicketTagAssociations: TicketTagAssociation;
  TicketWebhookExcludedResources: TicketWebhookExcludedResource;
  TicketWebhookFields: TicketWebhookField;
  TicketWebhooks: TicketWebhook;
  TicketWebhookUdfFields: TicketWebhookUdfField;
  TimeEntries: TimeEntry;
  TimeEntryAttachments: TimeEntryAttachment;
  TimeOffRequests: TimeOffRequest;
  UserDefinedFieldDefinitions: UserDefinedFieldDefinition;
  UserDefinedFieldListItems: UserDefinedFieldListItem;
  WebhookEventErrorLogs: WebhookEventErrorLog;
  WorkTypeModifiers: WorkTypeModifier;
}

/** Union of every queryable Autotask REST collection name. */
export type EntityName = keyof AutotaskEntities;

/** The entity interface for a given collection name. */
export type EntityOf<K extends EntityName> = AutotaskEntities[K];

/**
 * Shape accepted when creating an entity: the entity without its server-assigned
 * `id`. Read-only fields are ignored by the API if sent, so they remain present
 * but typed `readonly` on the source interface.
 */
export type CreateModel<T> = Omit<T, "id">;

/**
 * Shape accepted when updating an entity via PATCH (`update()`): a partial set
 * of fields plus the required `id`. PATCH is **sparse** — only the fields you
 * send are changed. For PUT (`replace()`), which resets omitted writable fields,
 * use {@link ReplaceModel} instead.
 */
export type UpdateModel<T> = Partial<Omit<T, "id">> & { id: number };

/**
 * Internal: resolves to `A` when X and Y are identical *including* readonly-ness,
 * else `B`. Used to detect `readonly` (server-managed) properties.
 */
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;

/** Keys of `T` whose declared property is **not** `readonly` (i.e. writable). */
type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

/**
 * Shape accepted when replacing an entity via PUT (`replace()`).
 *
 * ⚠️ PUT is **destructive**: every writable field you OMIT is reset to
 * null/default. To keep that honest at the type level, `ReplaceModel<T>` requires
 * **all** writable fields (plus `id`); read-only fields are excluded. A partial
 * object like `{ id, title }` will therefore NOT compile here — that would
 * silently null everything else. Build it from a fully-loaded record
 * (`replace({ ...loaded, title })`), or prefer `update()` (PATCH) for partial
 * changes.
 *
 * Caveat: "writable" is derived from the spec's `readOnly` flags, which Autotask
 * populates incompletely — so this can require fields that are effectively
 * server-managed (timestamps, `userDefinedFields`, etc.). Treat it as a strong
 * hint, not a perfect contract; `update()` sidesteps the issue entirely.
 */
export type ReplaceModel<T> = Required<Pick<T, WritableKeys<T>>> & { id: number };

/** Convenience: create payload for a named collection. */
export type CreateInput<K extends EntityName> = CreateModel<AutotaskEntities[K]>;

/** Convenience: update (PATCH) payload for a named collection. */
export type UpdateInput<K extends EntityName> = UpdateModel<AutotaskEntities[K]>;

/** Convenience: replace (PUT) payload for a named collection. */
export type ReplaceInput<K extends EntityName> = ReplaceModel<AutotaskEntities[K]>;
