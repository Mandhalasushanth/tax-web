import React, { useState } from "react";
import { useAuthStore } from "@store/index";
import { StepActionBar, ConfirmAccountNumberInput } from "@shared/components";
import {
  BankCardIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  DocumentCategoryIcon,
  GlobeIcon,
  HistoryDocIcon,
  ItrFilingHeaderStepper,
  PlusCircleIcon,
  ShieldCategoryIcon,
  UserCategoryIcon,
  getStoredTaxpayerProfile,
  type AssessmentYearOption,
  type FilingBankAccount,
  type FilingTypeOption,
  type PreviousItrInfo,
  type ResidentialStatusOption,
  type TaxpayerProfile,
} from "../itrFiling.constants";
import "./ItrPersonalInfoView.css";
import "./ItrRefundBank.css";

export const AY_OPTIONS: { ay: AssessmentYearOption; fy: string }[] = [
  { ay: "AY 2026-27", fy: "FY 2025-2026" },
  { ay: "AY 2027-28", fy: "FY 2026-2027" },
  { ay: "AY 2025-26", fy: "FY 2024-2025" },
];

export const RESIDENTIAL_OPTIONS: {
  id: ResidentialStatusOption;
  label: string;
  desc: string;
}[] = [
  {
    id: "resident",
    label: "Resident",
    desc: "Applicable to individuals residing primarily in India during the financial year.",
  },
  {
    id: "nri",
    label: "Non-Resident (NRI)",
    desc: "Applicable to individuals residing outside India during the financial year.",
  },
  {
    id: "rnor",
    label: "Resident but NOR",
    desc: "Applicable to individuals who are resident in India but Not Ordinarily Resident.",
  },
];

export const FILING_OPTIONS: {
  id: FilingTypeOption;
  label: string;
  subtext: string;
}[] = [
  {
    id: "original",
    label: "Original Return (u/s 139(1))",
    subtext: "Filing on or before statutory due date.",
  },
  {
    id: "belated",
    label: "Belated Return (u/s 139(4))",
    subtext: "Filing after statutory due date with applicable late fees.",
  },
  {
    id: "revised",
    label: "Revised Return (u/s 139(5))",
    subtext: "Correct omission or error in previously filed return.",
  },
  {
    id: "updated",
    label: "Updated Return (ITR-U) (u/s 139(8A))",
    subtext: "Filing within 24 months from the end of relevant AY.",
  },
];

const PREVIOUS_IMPORT_OPTIONS: {
  key:
    "importSalary" | "importDeductions" | "importLosses" | "importBankAccounts";
  label: string;
}[] = [
  { key: "importSalary", label: "Salary & employer details" },
  { key: "importDeductions", label: "Deduction records (80C, 80D)" },
  { key: "importLosses", label: "Carried-forward business & capital losses" },
  { key: "importBankAccounts", label: "Bank account details" },
];

export const ItrTaxpayerProfileCard: React.FC<{
  taxpayerProfile: TaxpayerProfile;
}> = ({ taxpayerProfile }) => {
  const detailRows = [
    { label: "PAN Number", value: taxpayerProfile.panNumber, mono: true },
    {
      label: "Aadhaar Number",
      value: taxpayerProfile.aadhaarNumber,
      mono: true,
    },
    { label: "Full Legal Name", value: taxpayerProfile.fullName },
    { label: "Date of Birth", value: taxpayerProfile.dob },
    { label: "Mobile Number", value: taxpayerProfile.mobileNumber },
    { label: "Email Address", value: taxpayerProfile.emailAddress },
    { label: "Registered Address", value: taxpayerProfile.registeredAddress },
  ];

  return (
    <section
      className="itr-info-card"
      aria-labelledby="taxpayer-identity-heading"
    >
      <div className="itr-info-card__top itr-row-between">
        <div className="itr-info-card__title-row itr-row-center">
          <div className="itr-info-card__icon-wrap">
            <UserCategoryIcon size={20} />
          </div>
          <h2 id="taxpayer-identity-heading" className="itr-info-card__title">
            Taxpayer Identity
          </h2>
        </div>
        <span className="itr-badge-verified">
          <ShieldCategoryIcon size={13} />
          <span>Auto-Verified</span>
        </span>
      </div>
      <p className="itr-info-card__desc">
        Auto-filled from your TaxEdge profile. Verified with Income Tax
        Department PAN Master.
      </p>
      <div className="itr-taxpayer-details-box itr-card-box">
        {detailRows.map((row) => (
          <div key={row.label} className="itr-detail-row itr-row-between">
            <span className="itr-detail-label">{row.label}</span>
            <strong
              className={`itr-detail-val ${row.mono ? "itr-detail-val--mono" : ""}`}
            >
              {row.value}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ItrAssessmentYearCard: React.FC<{
  assessmentYear: AssessmentYearOption;
  onAssessmentYearChange: (ay: AssessmentYearOption) => void;
  error?: string | null;
}> = ({ assessmentYear, onAssessmentYearChange, error }) => (
  <section className={`itr-info-card ${error ? "itr-info-card--error" : ""}`} aria-labelledby="ay-heading">
    <div className="itr-info-card__title-row itr-row-center">
      <div className="itr-info-card__icon-wrap">
        <CalendarIcon size={20} />
      </div>
      <h2 id="ay-heading" className="itr-info-card__title">
        Assessment Year (AY){" "}
        <span className="itr-required-star" aria-hidden="true">
          *
        </span>
      </h2>
    </div>
    <p className="itr-info-card__desc">
      Select the assessment year for which you are filing this income tax
      return.
    </p>
    <div className="itr-ay-buttons-grid itr-grid-cards">
      {AY_OPTIONS.map((opt) => (
        <button
          key={opt.ay}
          type="button"
          className={`itr-ay-btn itr-option-card ${assessmentYear === opt.ay ? "itr-ay-btn--active itr-option-card--active" : ""}`}
          onClick={() => onAssessmentYearChange(opt.ay)}
        >
          <span className="itr-ay-main">{opt.ay}</span>
          <span className="itr-ay-sub">{opt.fy}</span>
        </button>
      ))}
    </div>
    {error && (
      <div className="itr-field-error" role="alert">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span>{error}</span>
      </div>
    )}
  </section>
);

export const ItrResidentialStatusCard: React.FC<{
  residentialStatus: ResidentialStatusOption;
  onResidentialStatusChange: (status: ResidentialStatusOption) => void;
  error?: string | null;
}> = ({ residentialStatus, onResidentialStatusChange, error }) => {
  const activeRes =
    RESIDENTIAL_OPTIONS.find((r) => r.id === residentialStatus) || null;
  return (
    <section className={`itr-info-card ${error ? "itr-info-card--error" : ""}`} aria-labelledby="res-heading">
      <div className="itr-info-card__title-row itr-row-center">
        <div className="itr-info-card__icon-wrap">
          <GlobeIcon size={20} />
        </div>
        <h2 id="res-heading" className="itr-info-card__title">
          Residential Status{" "}
          <span className="itr-required-star" aria-hidden="true">
            *
          </span>
        </h2>
      </div>
      <p className="itr-info-card__desc">
        Select your residential status in India for the selected financial year.
      </p>
      <div className="itr-status-group">
        <div className="itr-status-buttons itr-grid-cards">
          {RESIDENTIAL_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`itr-status-btn itr-option-card ${residentialStatus === opt.id ? "itr-status-btn--active itr-option-card--active" : ""}`}
              onClick={() => onResidentialStatusChange(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="itr-info-callout itr-card-box">
          {activeRes ? (
            <span className="itr-info-callout__text">
              Selected Status: <strong>{activeRes.label}</strong> –{" "}
              {activeRes.desc}
            </span>
          ) : (
            <span className="itr-info-callout__text itr-info-callout__text--italic">
              Please select your residential status above.
            </span>
          )}
        </div>
        {error && (
          <div className="itr-field-error" role="alert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export const ItrFilingOptionsCard: React.FC<{
  assessmentYear: AssessmentYearOption;
  onAssessmentYearChange: (ay: AssessmentYearOption) => void;
  residentialStatus: ResidentialStatusOption;
  onResidentialStatusChange: (status: ResidentialStatusOption) => void;
  ayError?: string | null;
  resError?: string | null;
}> = ({
  assessmentYear,
  onAssessmentYearChange,
  residentialStatus,
  onResidentialStatusChange,
  ayError,
  resError,
}) => (
  <>
    <ItrAssessmentYearCard
      assessmentYear={assessmentYear}
      onAssessmentYearChange={onAssessmentYearChange}
      error={ayError}
    />
    <ItrResidentialStatusCard
      residentialStatus={residentialStatus}
      onResidentialStatusChange={onResidentialStatusChange}
      error={resError}
    />
  </>
);

export const ItrFilingTypeCard: React.FC<{
  filingType: FilingTypeOption;
  onFilingTypeChange: (ft: FilingTypeOption) => void;
  error?: string | null;
}> = ({ filingType, onFilingTypeChange, error }) => (
  <section className={`itr-info-card ${error ? "itr-info-card--error" : ""}`} aria-labelledby="filing-type-heading">
    <div className="itr-info-card__title-row itr-row-center">
      <div className="itr-info-card__icon-wrap">
        <DocumentCategoryIcon size={20} />
      </div>
      <h2 id="filing-type-heading" className="itr-info-card__title">
        Filing Type{" "}
        <span className="itr-required-star" aria-hidden="true">
          *
        </span>
      </h2>
    </div>
    <p className="itr-info-card__desc">
      Select your return filing type according to the Income Tax Act, 1961.
    </p>
    <div className="itr-filing-options-list itr-col-stack">
      {FILING_OPTIONS.map((f) => (
        <label
          key={f.id}
          className={`itr-filing-option-card itr-row-center itr-option-card ${filingType === f.id ? "itr-filing-option-card--active itr-option-card--active" : ""}`}
        >
          <div className="itr-radio-outer">
            <input
              type="radio"
              name="filingType"
              value={f.id}
              checked={filingType === f.id}
              onChange={() => onFilingTypeChange(f.id)}
              className="itr-filing-radio-input"
            />
            {filingType === f.id && <div className="itr-radio-inner" />}
          </div>
          <div className="itr-filing-option-text">
            <span className="itr-filing-option-title">{f.label}</span>
            <span className="itr-filing-option-desc">{f.subtext}</span>
          </div>
        </label>
      ))}
    </div>
    {error && (
      <div className="itr-field-error" role="alert">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span>{error}</span>
      </div>
    )}
  </section>
);

const validateNewBankForm = (
  bankName: string,
  accountType: string,
  accNum: string,
  confirmAccNum: string,
  ifsc: string,
): string | null => {
  try {
    if (!bankName.trim()) return "Bank name is required";
    if (!accountType.trim()) return "Account type is required";
    if (!accNum.trim()) return "Bank account number is required";
    if (accNum.length < 9 || accNum.length > 18)
      return "Enter a valid bank account number";
    if (!confirmAccNum.trim())
      return "Bank account number is required";
    if (accNum !== confirmAccNum)
      return "Account numbers do not match";
    if (!ifsc.trim()) return "IFSC code is required";
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim().toUpperCase()))
      return "Enter a valid IFSC code";
    return null;
  } catch {
    return "Invalid bank form input.";
  }
};

export const ItrRefundBankSection: React.FC<{
  bankAccounts: FilingBankAccount[];
  onBankAccountsChange: (accounts: FilingBankAccount[]) => void;
  selectedBankId: string;
  onSelectedBankIdChange: (id: string) => void;
  error?: string | null;
}> = ({
  bankAccounts,
  onBankAccountsChange,
  selectedBankId,
  onSelectedBankIdChange,
  error,
}) => {
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountType, setAccountType] = useState<string>("");
  const [bankFormError, setBankFormError] = useState<string | null>(null);

  const clearError = () => {
    if (bankFormError) setBankFormError(null);
  };

  const handleSaveBank = (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const errorMsg = validateNewBankForm(
        bankName,
        accountType,
        accountNumber,
        confirmAccountNumber,
        ifsc,
      );
      if (errorMsg) {
        setBankFormError(errorMsg);
        return;
      }
      const createdBank: FilingBankAccount = {
        id: `bank-${Date.now()}`,
        bankName: bankName.trim(),
        accountNumber: `•••• •••• ${accountNumber.slice(-4)}`,
        ifsc: ifsc.trim().toUpperCase(),
        accountType: accountType === "current" ? "current" : "savings",
        isPrimary: bankAccounts.length === 0,
        isPreValidated: true,
      };
      onBankAccountsChange([...bankAccounts, createdBank]);
      onSelectedBankIdChange(createdBank.id);
      setBankName("");
      setAccountNumber("");
      setConfirmAccountNumber("");
      setIfsc("");
      setAccountType("");
      setBankFormError(null);
      setIsAddingBank(false);
    } catch {
      setBankFormError("Unable to save bank account.");
    }
  };

  return (
    <section className="itr-info-card" aria-labelledby="bank-account-heading">
      <div className="itr-info-card__title-row itr-row-center">
        <div className="itr-info-card__icon-wrap">
          <BankCardIcon size={20} />
        </div>
        <h2 id="bank-account-heading" className="itr-info-card__title">
          Refund Bank Account{" "}
          <span className="itr-required-star" aria-hidden="true">
            *
          </span>
        </h2>
      </div>
      <p className="itr-info-card__desc">
        Select the bank account to receive direct tax refund credit from the
        Income Tax Department.
      </p>
      {bankAccounts.length === 0 ? (
        <div className="itr-bank-empty-box itr-card-box">
          No bank accounts added yet. Please add a bank account for refund
          credit.
        </div>
      ) : (
        <div className="itr-bank-accounts-grid itr-col-stack">
          {bankAccounts.map((acc) => {
            const isSelected = selectedBankId === acc.id;
            return (
              <label
                key={acc.id}
                className={`itr-bank-account-card ${isSelected ? "itr-bank-account-card--selected" : ""}`}
              >
                <div className="itr-bank-card-content">
                  <div className="itr-bank-card-header">
                    <strong className="itr-bank-name">{acc.bankName}</strong>
                    {acc.isPreValidated && (
                      <span className="itr-bank-badge itr-bank-badge--validated">
                        <CheckCircleIcon size={13} />
                        <span>Validated</span>
                      </span>
                    )}
                    {isSelected && (
                      <span className="itr-bank-badge itr-bank-badge--selected">
                        <CheckIcon size={13} />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>
                  <div className="itr-bank-acc-num itr-mono">
                    {acc.accountNumber}
                  </div>
                  <div className="itr-bank-meta">
                    IFSC: {acc.ifsc} •{" "}
                    {acc.accountType === "current" ? "Current" : "Savings"}
                  </div>
                </div>
                <div className="itr-bank-radio-col">
                  <div
                    className={`itr-radio-outer ${isSelected ? "itr-radio-outer--checked" : ""}`}
                  >
                    {isSelected && <div className="itr-radio-inner" />}
                  </div>
                </div>
                <input
                  type="radio"
                  name="selectedBank"
                  value={acc.id}
                  checked={isSelected}
                  onChange={() => onSelectedBankIdChange(acc.id)}
                  className="itr-sr-only"
                />
              </label>
            );
          })}
        </div>
      )}
      {!isAddingBank ? (
        <div className="itr-add-bank-row">
          <button
            type="button"
            className="itr-btn-add-bank itr-row-center"
            onClick={() => setIsAddingBank(true)}
          >
            <PlusCircleIcon size={18} />
            <span>Add Another Bank Account</span>
          </button>
        </div>
      ) : (
        <form
          className="itr-add-bank-form itr-card-box"
          onSubmit={handleSaveBank}
        >
          <h3 className="itr-add-bank-title">Refund Bank Account</h3>
          {bankFormError && (
            <div className="itr-bank-form-error" role="alert">
              {bankFormError}
            </div>
          )}
          <div className="itr-bank-inputs-grid itr-grid-cards">
            <div className="itr-input-group">
              <label htmlFor="new-bank-name" className="itr-input-label">
                Bank Name *
              </label>
              <input
                id="new-bank-name"
                type="text"
                className="itr-text-input"
                placeholder="Enter bank name"
                value={bankName}
                onChange={(e) => {
                  setBankName(e.target.value);
                  clearError();
                }}
              />
            </div>
            <div className="itr-input-group">
              <label htmlFor="new-account-type" className="itr-input-label">
                Account Type *
              </label>
              <select
                id="new-account-type"
                className="itr-select-input"
                value={accountType}
                onChange={(e) => {
                  setAccountType(e.target.value);
                  clearError();
                }}
              >
                <option value="" disabled>
                  Select account type
                </option>
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>
            <div className="itr-input-group">
              <label htmlFor="new-account-number" className="itr-input-label">
                Account Number *
              </label>
              <input
                id="new-account-number"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={18}
                className="itr-text-input itr-mono"
                placeholder="Enter your bank account number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 18),
                  );
                  clearError();
                }}
              />
            </div>
            <div className="itr-input-group">
              <label htmlFor="new-confirm-account" className="itr-input-label">
                Confirm Account Number *
              </label>
              <ConfirmAccountNumberInput
                id="new-confirm-account"
                name="confirmAccountNumber"
                placeholder="Enter your bank account number"
                value={confirmAccountNumber}
                onChange={(val) => {
                  setConfirmAccountNumber(val);
                  clearError();
                }}
                className="itr-text-input itr-mono"
              />
            </div>
            <div className="itr-input-group itr-input-group--full">
              <label htmlFor="new-ifsc" className="itr-input-label">
                IFSC Code *
              </label>
              <input
                id="new-ifsc"
                type="text"
                className="itr-text-input itr-mono"
                placeholder="Enter your IFSC code"
                maxLength={11}
                value={ifsc}
                onChange={(e) => {
                  setIfsc(e.target.value.toUpperCase());
                  clearError();
                }}
              />
            </div>
          </div>
          <div className="itr-add-bank-actions itr-row-center">
            <button type="submit" className="itr-btn-save-bank">
              Save Bank Account
            </button>
            <button
              type="button"
              className="itr-btn-cancel-bank"
              onClick={() => {
                setIsAddingBank(false);
                setBankFormError(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {error && (
        <div className="itr-field-error" role="alert" style={{ marginTop: '0.75rem' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </section>
  );
};

export const ItrPreviousItrSection: React.FC<{
  previousItr: PreviousItrInfo;
  onPreviousItrChange: (info: PreviousItrInfo) => void;
}> = ({ previousItr, onPreviousItrChange }) => {
  const [isOpen, setIsOpen] = useState(() =>
    Boolean(previousItr.hasPreviousReturn),
  );
  const handleToggle = (chk: boolean) => {
    try {
      onPreviousItrChange({
        ...previousItr,
        hasPreviousReturn: chk,
        importSalary: chk && Boolean(previousItr.importSalary),
        importDeductions: chk && Boolean(previousItr.importDeductions),
        importLosses: chk && Boolean(previousItr.importLosses),
        importBankAccounts: chk && Boolean(previousItr.importBankAccounts),
      });
    } catch {
      /* Fallback */
    }
  };

  return (
    <section
      className="itr-info-card itr-info-card--full-width"
      aria-labelledby="prev-itr-heading"
    >
      <div className="itr-info-card__top itr-row-between">
        <div className="itr-info-card__title-row itr-row-center">
          <div className="itr-info-card__icon-wrap">
            <HistoryDocIcon size={20} />
          </div>
          <h2 id="prev-itr-heading" className="itr-info-card__title">
            Previous ITR Data
          </h2>
        </div>
        <div className="itr-card-header-actions itr-row-center">
          <span className="itr-badge-optional">Optional</span>
          <button
            type="button"
            className={`itr-btn-accordion-toggle ${isOpen ? "itr-btn-accordion-toggle--open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Previous ITR Data Details"
          >
            <ChevronDownIcon size={18} />
          </button>
        </div>
      </div>
      {isOpen && (
        <>
          <p className="itr-info-card__desc">
            Optional — If you filed a return through TaxEdge previously, you can
            import carry-forward loss and deduction records.
          </p>
          <div className="itr-prev-import-card itr-card-box">
            <div
              className="itr-prev-import-header itr-row-between"
              onClick={() => handleToggle(!previousItr.hasPreviousReturn)}
            >
              <span className="itr-prev-import-title">
                I have previously filed return details
              </span>
              <div
                className={`itr-prev-custom-checkbox ${previousItr.hasPreviousReturn ? "itr-prev-custom-checkbox--checked" : ""}`}
                role="checkbox"
                aria-checked={previousItr.hasPreviousReturn}
              >
                {previousItr.hasPreviousReturn && <CheckIcon size={16} />}
              </div>
            </div>
            {previousItr.hasPreviousReturn && (
              <div className="itr-prev-import-body">
                <div className="itr-prev-import-subtitle">
                  Select details to import:
                </div>
                <div className="itr-prev-import-options itr-col-stack">
                  {PREVIOUS_IMPORT_OPTIONS.map((opt) => (
                    <label
                      key={opt.key}
                      className="itr-prev-option-item itr-row-center"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(previousItr[opt.key])}
                        onChange={() =>
                          onPreviousItrChange({
                            ...previousItr,
                            [opt.key]: !previousItr[opt.key],
                          })
                        }
                        className="itr-prev-option-checkbox"
                      />
                      <span className="itr-prev-option-label">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export interface ItrPersonalInfoViewProps {
  onBack: () => void;
  onNext: () => void;
  onSaveDraft?: () => void;
  initialAssessmentYear?: AssessmentYearOption;
  onAssessmentYearChange?: (ay: AssessmentYearOption) => void;
  initialResidentialStatus?: ResidentialStatusOption;
  onResidentialStatusChange?: (status: ResidentialStatusOption) => void;
  initialFilingType?: FilingTypeOption;
  onFilingTypeChange?: (ft: FilingTypeOption) => void;
  initialBankAccounts?: FilingBankAccount[];
  onBankAccountsChange?: (accounts: FilingBankAccount[]) => void;
  initialSelectedBankId?: string;
  onSelectedBankIdChange?: (id: string) => void;
  initialPreviousItr?: PreviousItrInfo;
  onPreviousItrChange?: (info: PreviousItrInfo) => void;
}

export const ItrPersonalInfoView: React.FC<ItrPersonalInfoViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  initialAssessmentYear,
  onAssessmentYearChange,
  initialResidentialStatus,
  onResidentialStatusChange,
  initialFilingType,
  onFilingTypeChange,
  initialBankAccounts,
  onBankAccountsChange,
  initialSelectedBankId,
  onSelectedBankIdChange,
  initialPreviousItr,
  onPreviousItrChange,
}) => {
  const authUser = useAuthStore((state) => state.user);
  const taxpayerProfile = getStoredTaxpayerProfile(authUser);
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYearOption>(
    initialAssessmentYear || "",
  );
  const [residentialStatus, setResidentialStatus] =
    useState<ResidentialStatusOption>(initialResidentialStatus || "");
  const [filingType, setFilingType] = useState<FilingTypeOption>(
    initialFilingType || "",
  );
  const [showErrors, setShowErrors] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<FilingBankAccount[]>(
    initialBankAccounts ?? [],
  );
  const [selectedBankId, setSelectedBankId] = useState<string>(
    initialSelectedBankId || initialBankAccounts?.[0]?.id || "",
  );
  const hasValidBank =
    bankAccounts.length > 0 && Boolean(selectedBankId || bankAccounts[0]?.id);
  const isFormValid =
    Boolean(assessmentYear) &&
    Boolean(residentialStatus) &&
    Boolean(filingType) &&
    hasValidBank;

  const handleNext = () => {
    if (!isFormValid) {
      setShowErrors(true);
      const firstInvalid = document.querySelector(".itr-info-card--error, .itr-field-error");
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    onNext();
  };

  React.useEffect(() => {
    const handleAttempt = () => {
      if (!isFormValid) {
        setShowErrors(true);
        const firstInvalid = document.querySelector(".itr-info-card--error, .itr-field-error");
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };
    window.addEventListener("step-action-bar:submit-attempt", handleAttempt);
    return () => window.removeEventListener("step-action-bar:submit-attempt", handleAttempt);
  }, [isFormValid]);

  return (
    <div className="itr-step-view-container itr-step-personal-info">
      <ItrFilingHeaderStepper currentStepId={1} />
      <ItrTaxpayerProfileCard taxpayerProfile={taxpayerProfile} />
      <ItrAssessmentYearCard
        assessmentYear={assessmentYear}
        onAssessmentYearChange={(ay) => {
          setAssessmentYear(ay);
          onAssessmentYearChange?.(ay);
        }}
        error={showErrors && !assessmentYear ? "Please select an Assessment Year to proceed." : undefined}
      />
      <ItrResidentialStatusCard
        residentialStatus={residentialStatus}
        onResidentialStatusChange={(s) => {
          setResidentialStatus(s);
          onResidentialStatusChange?.(s);
        }}
        error={showErrors && !residentialStatus ? "Please select your residential status." : undefined}
      />
      <ItrFilingTypeCard
        filingType={filingType}
        onFilingTypeChange={(ft) => {
          setFilingType(ft);
          onFilingTypeChange?.(ft);
        }}
        error={showErrors && !filingType ? "Please select a return filing type." : undefined}
      />
      <ItrRefundBankSection
        bankAccounts={bankAccounts}
        onBankAccountsChange={(accs) => {
          setBankAccounts(accs);
          if (!selectedBankId && accs.length > 0) setSelectedBankId(accs[0].id);
          onBankAccountsChange?.(accs);
        }}
        selectedBankId={selectedBankId || (bankAccounts[0]?.id ?? "")}
        onSelectedBankIdChange={(id) => {
          setSelectedBankId(id);
          onSelectedBankIdChange?.(id);
        }}
        error={showErrors && !hasValidBank ? "Please select or add at least one bank account for refund credit." : undefined}
      />
      <ItrPreviousItrSection
        previousItr={initialPreviousItr ?? { hasPreviousReturn: false }}
        onPreviousItrChange={onPreviousItrChange ?? (() => {})}
      />
      <StepActionBar
        onBack={onBack}
        onNext={handleNext}
        onSaveDraft={onSaveDraft}
        nextLabel="Continue"
        nextDisabled={!isFormValid}
      />
    </div>
  );
};

export default ItrPersonalInfoView;
