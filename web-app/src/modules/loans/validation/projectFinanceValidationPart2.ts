import type { ProjectFinanceData, StepValidationResult } from '../types/projectFinance.types'
import { PROJECT_FINANCE_DOC_LIST } from '../components/ProjectFinance/steps/ReviewAndSubmit/reviewSubmitConstants'

export const validateStep4 = (data: ProjectFinanceData): StepValidationResult => {
  const errors: Record<string, string> = {}

  try {
    // Section 1: Products / Services
    if (data.productsServicesList && data.productsServicesList.length > 0) {
      data.productsServicesList.forEach((item, index) => {
        const prefix = `product_${index}`
        if (!item.name || !item.name.trim()) {
          errors[`${prefix}_name`] = 'Product / Service Name is required'
        }
        if (!item.category || !item.category.trim()) {
          errors[`${prefix}_category`] = 'Category is required'
        }
        if (!item.unit || !item.unit.trim()) {
          errors[`${prefix}_unit`] = 'Unit is required'
        }
        if (!item.installedCapacity || !item.installedCapacity.trim()) {
          errors[`${prefix}_installedCapacity`] = 'Installed Capacity is required'
        }
        if (!item.expectedProductionAnnual || !item.expectedProductionAnnual.trim()) {
          errors[`${prefix}_expectedProductionAnnual`] = 'Expected Production is required'
        }
        const capUtil = parseFloat(item.capacityUtilisationPercent || '0')
        if (!item.capacityUtilisationPercent || !item.capacityUtilisationPercent.trim()) {
          errors[`${prefix}_capacityUtilisationPercent`] = 'Capacity Utilisation is required'
        } else if (isNaN(capUtil) || capUtil <= 0 || capUtil > 100) {
          errors[`${prefix}_capacityUtilisationPercent`] = 'Utilisation must be between 1% and 100%'
        }
        if (!item.sellingPrice || !item.sellingPrice.trim()) {
          errors[`${prefix}_sellingPrice`] = 'Selling Price is required'
        }
        if (!item.domesticExport || !item.domesticExport.trim()) {
          errors[`${prefix}_domesticExport`] = 'Domestic / Export option is required'
        }
        if (!item.productMixPercent || !item.productMixPercent.trim()) {
          errors[`${prefix}_productMixPercent`] = 'Product Mix % is required'
        }
      })
    }

    // Section 2: Market Details
    if (!data.targetMarket || !data.targetMarket.trim()) {
      errors.targetMarket = 'Target Market is required'
    }
    if (!data.marketType || !data.marketType.trim()) {
      errors.marketType = 'Market Type is required'
    }
    if (!data.targetGeography || !data.targetGeography.trim()) {
      errors.targetGeography = 'Target Geography is required'
    }
    if (!data.customerSegment || !data.customerSegment.trim()) {
      errors.customerSegment = 'Customer Segment is required'
    }

    // Section 3: Customers / Offtakers
    if (data.customersOfftakersList && data.customersOfftakersList.length > 0) {
      data.customersOfftakersList.forEach((cust, index) => {
        const prefix = `customer_${index}`
        if (!cust.customerName || !cust.customerName.trim()) {
          errors[`${prefix}_customerName`] = 'Customer / Offtaker Name is required'
        }
        if (!cust.customerType || !cust.customerType.trim()) {
          errors[`${prefix}_customerType`] = 'Customer Type is required'
        }
        if (!cust.expectedPurchaseQuantity || !cust.expectedPurchaseQuantity.trim()) {
          errors[`${prefix}_expectedPurchaseQuantity`] = 'Expected Purchase Quantity is required'
        }
        if (!cust.unit || !cust.unit.trim()) {
          errors[`${prefix}_unit`] = 'Unit is required'
        }
        if (!cust.expectedRevenue || !cust.expectedRevenue.trim()) {
          errors[`${prefix}_expectedRevenue`] = 'Expected Revenue is required'
        }
      })
    }
  } catch (err) {
    console.error('Error during step 4 validation:', err)
  }

  const firstError = Object.values(errors)[0]
  return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
}

export const validateStep5 = (data: ProjectFinanceData): StepValidationResult => {
  const errors: Record<string, string> = {}

  try {
    // 1. Loan Requirement
    const loanReq = parseFloat(String(data.loanRequiredAmount || '').replace(/\D/g, ''))
    if (!data.loanRequiredAmount || !data.loanRequiredAmount.trim()) {
      errors.loanRequiredAmount = 'Loan Required amount is required'
    } else if (isNaN(loanReq) || loanReq <= 0) {
      errors.loanRequiredAmount = 'Please enter a valid loan required amount'
    }

    if (!data.loanType || !data.loanType.trim()) {
      errors.loanType = 'Please select type of loan'
    }
    if (!data.schemeProduct || !data.schemeProduct.trim()) {
      errors.schemeProduct = 'Please select scheme / product'
    }
    if (!data.proposedDisbursementDate || !data.proposedDisbursementDate.trim()) {
      errors.proposedDisbursementDate = 'Proposed disbursement date is required'
    }

    // 2. Repayment Details
    if (!data.repaymentPeriodYears || !data.repaymentPeriodYears.trim()) {
      errors.repaymentPeriodYears = 'Please select repayment period'
    }
    if (!data.repaymentFrequency || !data.repaymentFrequency.trim()) {
      errors.repaymentFrequency = 'Please select repayment frequency'
    }
    const intRate = parseFloat(data.expectedInterestRatePercent || '0')
    if (!data.expectedInterestRatePercent || !data.expectedInterestRatePercent.trim()) {
      errors.expectedInterestRatePercent = 'Expected interest rate is required'
    } else if (isNaN(intRate) || intRate <= 0 || intRate > 50) {
      errors.expectedInterestRatePercent = 'Please enter a realistic interest rate (e.g. 9.5)'
    }

    if (!data.repaymentStartDate || !data.repaymentStartDate.trim()) {
      errors.repaymentStartDate = 'Repayment start date is required'
    }

    // 4. Repayment Sources
    if (!data.primaryRepaymentSource || !data.primaryRepaymentSource.trim()) {
      errors.primaryRepaymentSource = 'Please select primary source of repayment'
    }
    const dscr = parseFloat(data.dscrProjected || '0')
    if (!data.dscrProjected || !data.dscrProjected.trim()) {
      errors.dscrProjected = 'DSCR (Projected) is required'
    } else if (isNaN(dscr) || dscr <= 0) {
      errors.dscrProjected = 'Please enter a valid projected DSCR (e.g. 1.85)'
    }

    if (!data.explainRepaymentSources || !data.explainRepaymentSources.trim()) {
      errors.explainRepaymentSources = 'Please explain repayment sources'
    }
  } catch (err) {
    console.error('Error during step 5 validation:', err)
  }

  const firstError = Object.values(errors)[0]
  return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
}

export const validateStep6 = (data: ProjectFinanceData): StepValidationResult => {
  const errors: Record<string, string> = {}

  try {
    // 1. Security / Collateral
    const list = data.securityList && data.securityList.length > 0
      ? data.securityList
      : [{
          typeOfSecurity: data.typeOfSecurity || '',
          assetDescription: data.securityAssetDescription || '',
          estimatedValue: data.securityEstimatedValue || '',
          ownershipType: data.securityOwnershipType || '',
          locationOfAsset: data.securityLocationOfAsset || '',
          valuationReportAvailable: data.securityValuationReportAvailable ?? true,
          existingCharge: data.securityExistingCharge ?? false,
          existingChargeDetails: data.securityExistingChargeDetails || '',
        }]

    list.forEach((sec, idx) => {
      const prefix = `security_${idx}`
      if (!sec.typeOfSecurity || !sec.typeOfSecurity.trim()) {
        errors[`${prefix}_typeOfSecurity`] = 'Please select security type'
      }
      if (!sec.assetDescription || !sec.assetDescription.trim()) {
        errors[`${prefix}_assetDescription`] = 'Asset description is required'
      }
      const valNum = parseFloat(String(sec.estimatedValue || '').replace(/\D/g, ''))
      if (!sec.estimatedValue || !sec.estimatedValue.trim()) {
        errors[`${prefix}_estimatedValue`] = 'Estimated value is required'
      } else if (isNaN(valNum) || valNum <= 0) {
        errors[`${prefix}_estimatedValue`] = 'Please enter a valid estimated value in ₹'
      }

      if (!sec.ownershipType || !sec.ownershipType.trim()) {
        errors[`${prefix}_ownershipType`] = 'Please select ownership type'
      }
      if (!sec.locationOfAsset || !sec.locationOfAsset.trim()) {
        errors[`${prefix}_locationOfAsset`] = 'Location of asset is required'
      }
      if (sec.existingCharge && (!sec.existingChargeDetails || !sec.existingChargeDetails.trim())) {
        errors[`${prefix}_existingChargeDetails`] = 'Details of existing charge are required'
      }
    })

    // 2. Legal & Statutory Approvals
    if (data.approvalOther && (!data.approvalOtherSpecify || !data.approvalOtherSpecify.trim())) {
      errors.approvalOtherSpecify = 'Please specify other approvals'
    }

    // 3. Regulatory Compliance
    if (!data.businessRegistrationType || !data.businessRegistrationType.trim()) {
      errors.businessRegistrationType = 'Please select business registration type'
    }
    if (!data.complianceRegistrationNumber || !data.complianceRegistrationNumber.trim()) {
      errors.complianceRegistrationNumber = 'Registration number is required'
    }
    if (data.gstApplicable) {
      const gstTrimmed = (data.complianceGstNumber || '').trim().toUpperCase()
      if (!gstTrimmed) {
        errors.complianceGstNumber = 'GSTIN is required'
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstTrimmed)) {
        errors.complianceGstNumber = 'Please enter a valid 15-digit GSTIN (e.g. 07AAAAA0000A1Z5)'
      }
    }
    const panTrimmed = (data.complianceIncomeTaxPan || '').trim().toUpperCase()
    if (!panTrimmed) {
      errors.complianceIncomeTaxPan = 'Income Tax PAN is required'
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panTrimmed)) {
      errors.complianceIncomeTaxPan = 'Please enter a valid 10-digit PAN (e.g. ABCDE1234F)'
    }

    // 5. Other Compliance
    if (data.anyPendingLitigation && (!data.pendingLitigationDetails || !data.pendingLitigationDetails.trim())) {
      errors.pendingLitigationDetails = 'Details of pending litigation are required'
    }
  } catch (err) {
    console.error('Error during step 6 validation:', err)
  }

  const firstError = Object.values(errors)[0]
  return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
}

export const validateStep7 = (data: ProjectFinanceData): StepValidationResult => {
  const errors: Record<string, string> = {}

  // 1. Mandatory Document Uploads Check
  const uploadedDocs = data.uploadedDocs || {}
  const requiredDocs = PROJECT_FINANCE_DOC_LIST.filter((d) => d.required)
  const missingDocs: string[] = []

  requiredDocs.forEach((doc) => {
    if (!uploadedDocs[doc.id]) {
      errors[doc.id] = `${doc.title} is required`
      missingDocs.push(doc.title)
    }
  })

  if (missingDocs.length > 0) {
    errors.documents = `Please upload all required documents: ${missingDocs.slice(0, 3).join(', ')}${missingDocs.length > 3 ? '...' : ''}`
  }

  // 2. Declaration & Terms Confirmation
  if (!data.declarationAccurateInfo || !data.declarationAuthorizeVerification || !data.termsAccepted) {
    errors.termsAccepted = 'Please accept all declaration checkboxes to confirm submission.'
  }

  const firstError = errors.documents || errors.termsAccepted || Object.values(errors)[0]
  return { isValid: Object.keys(errors).length === 0, error: firstError, errors }
}
