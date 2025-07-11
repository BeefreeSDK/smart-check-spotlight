import { IEntityContentJson } from "@beefree.io/sdk/dist/types/bee";

/* ========== COMMONS ========== */

export enum CheckAPICategory {
  MISSING_ALT_TEXT = 'missingAltText',
  MISSING_IMAGE_LINK = 'missingImageLink',
  MISSING_COPY_LINK = 'missingCopyLink',
  OVERAGE_IMAGE_WEIGHT = 'overageImageWeight',
  OVERAGE_HTML_WEIGHT = 'overageHtmlWeight'
}

/* ========== REQUEST TYPES ========== */

export type CheckAPIRequest = {
  template: IEntityContentJson
  checks: ({
    category: CheckAPICategory.OVERAGE_IMAGE_WEIGHT,
    limit: number
  } | {
    category: CheckAPICategory.OVERAGE_HTML_WEIGHT,
    limit: number,
    beautified: boolean
  } | {
    category: (
      CheckAPICategory.MISSING_ALT_TEXT 
      | CheckAPICategory.MISSING_IMAGE_LINK 
      | CheckAPICategory.MISSING_COPY_LINK
    )
  })[];
}

/* ========== RESPONSE TYPES ========== */

interface CheckAPIBase {
  uuid: string | 'default'
  widgetType: string | 'default'
  widgetLabel: string | 'default'
}

type CheckTypeToTarget = {
  [CheckAPICategory.MISSING_ALT_TEXT]: CheckAPIBase
  [CheckAPICategory.MISSING_COPY_LINK]: CheckAPIBase
  [CheckAPICategory.MISSING_IMAGE_LINK]: CheckAPIBase
  [CheckAPICategory.OVERAGE_IMAGE_WEIGHT]: CheckAPIBase & { weight: number }
  [CheckAPICategory.OVERAGE_HTML_WEIGHT]: CheckAPIBase & { weight: number, beautified: boolean }
}

type CheckTarget = {
  [K in keyof CheckTypeToTarget]: {
    type: K
    targets: CheckTypeToTarget[K][]
  };
}[keyof CheckTypeToTarget]

export enum CheckAPIStatus {
  WARNING = 'warning',
  SUGGESTION = 'suggestion',
  PASSED = 'passed',
}

type CheckAPIType = {
  type: CheckAPICategory
  targets: CheckTarget['targets']
  targetsCount: number
  checkStatus: CheckAPIStatus
  limit?: number
  evaluated?: number
  errored?: boolean
  processed?: boolean
  maxWeight?: number
  displayConditions?: boolean
}

export type BasicCheckAPIResponse = {
  language: 'default' | string
  checks: CheckAPIType[]
  status: CheckAPIStatus
  checksWarningCount: number      // warnings
  checksSuggestionCount: number   // suggestions
  checksFailedCount: number       // warnings + suggestions
  dateTime: Date
}

export type CheckAPIResponse = BasicCheckAPIResponse[]