import { IEntityContentJson } from "@beefree.io/sdk/dist/types/bee";

/* ========== COMMONS ========== */

export enum SmartCheckCategory {
  MISSING_ALT_TEXT = 'missingAltText',
  MISSING_IMAGE_LINK = 'missingImageLink',
  MISSING_COPY_LINK = 'missingCopyLink',
  OVERAGE_IMAGE_WEIGHT = 'overageImageWeight',
  OVERAGE_HTML_WEIGHT = 'overageHtmlWeight'
}

/* ========== REQUEST TYPES ========== */

export type SmartCheckRequest = {
  template: IEntityContentJson
  checks: ({
    category: SmartCheckCategory.OVERAGE_IMAGE_WEIGHT,
    limit: number
  } | {
    category: SmartCheckCategory.OVERAGE_HTML_WEIGHT,
    limit: number,
    beautified: boolean
  } | {
    category: (
      SmartCheckCategory.MISSING_ALT_TEXT 
      | SmartCheckCategory.MISSING_IMAGE_LINK 
      | SmartCheckCategory.MISSING_COPY_LINK
    )
  })[];
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
  [SmartCheckCategory.OVERAGE_HTML_WEIGHT]: SmartCheckBase & { weight: number, beautified: boolean }
}

type CheckTarget = {
  [K in keyof CheckTypeToTarget]: {
    type: K
    targets: CheckTypeToTarget[K][]
  };
}[keyof CheckTypeToTarget]

export enum SmartChecksStatus {
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

export type BasicSmartCheckResponse = {
  language: 'default' | string
  checks: SmartChecksType[]
  status: SmartChecksStatus
  checksWarningCount: number      // warnings
  checksSuggestionCount: number   // suggestions
  checksFailedCount: number       // warnings + suggestions
  dateTime: Date
}

export type SmartCheckResponse = BasicSmartCheckResponse[]