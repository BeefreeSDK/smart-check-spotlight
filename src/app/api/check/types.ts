import { IEntityContentJson } from "@beefree.io/sdk/dist/types/bee";

/* ========== COMMONS ========== */

export enum SmartCheckCategory {
  MISSING_ALT_TEXT = 'missingAltText',
  MISSING_IMAGE_LINK = 'missingImageLink',
  MISSING_COPY_LINK = 'missingCopyLink',
  OVERAGE_IMAGE_WEIGHT = 'overageImageWeight',
  MISSING_EMAIL_DETAILS = 'missingEmailDetail',
  OVERAGE_HTML_WEIGHT = 'overageHtmlWeight'
}

/* ========== REQUEST TYPES ========== */

export type SmartCheckRequest = {
  template: IEntityContentJson
  checks: {
    category: SmartCheckCategory;
  }[];
}

/* ========== RESPONSE TYPES ========== */

interface SmartCheckBase {
  uuid: string | 'default'
  widgetType: string | 'default'
  widgetLabel: string | 'default'
}

type CheckTypeToTarget = {
  [SmartCheckCategory.MISSING_ALT_TEXT]: SmartCheckBase
  [SmartCheckCategory.MISSING_COPY_LINK]: SmartCheckBase
  [SmartCheckCategory.MISSING_IMAGE_LINK]: SmartCheckBase
  [SmartCheckCategory.OVERAGE_IMAGE_WEIGHT]: SmartCheckBase & { weight: number }
  [SmartCheckCategory.MISSING_EMAIL_DETAILS]: SmartCheckBase & { detailType: 'subject' | 'preheader' }
  [SmartCheckCategory.OVERAGE_HTML_WEIGHT]: SmartCheckBase & { weight: number, beautified: boolean }
}

type CheckTarget = {
  [K in keyof CheckTypeToTarget]: {
    type: K
    targets: CheckTypeToTarget[K][]
  };
}[keyof CheckTypeToTarget]

enum SmartChecksStatus {
  WARNING = 'warning',
  SUGGESTION = 'suggestion',
  PASSED = 'passed',
}

type SmartChecksType = {
  type: SmartCheckCategory
  targets: CheckTarget['targets']
  targetsCount: number
  checkStatus: SmartChecksStatus
  limit?: number
  evaluated?: number
  errored?: boolean
  processed?: boolean
  maxWeight?: number
  displayConditions?: boolean
}


export type SmartCheckResponse = {
  language: 'default' | string
  checks: SmartChecksType[]
  status: SmartChecksStatus
  checksWarningCount: number      // warnings
  checksSuggestionCount: number   // suggestions
  checksFailedCount: number       // warnings + suggestions
  dateTime: Date
}[]