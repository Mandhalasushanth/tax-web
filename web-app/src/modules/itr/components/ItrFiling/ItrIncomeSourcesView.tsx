import React from "react";
import { StepActionBar } from "@shared/components";
import {
  ALL_SOURCES,
  ASSET_TYPE_OPTIONS,
  BUSINESS_METHODS,
  CheckIcon,
  SaveDraftIcon,
  ItrFilingHeaderStepper,
  type SalaryDetails,
  type HousePropertyDetails,
  type BusinessDetails,
  type CapitalGainsDetails,
  type OtherSourcesDetails,
} from "./itrFiling.constants";
import "./ItrIncomeSourcesView.css";

export type {
  SalaryDetails,
  HousePropertyDetails,
  BusinessDetails,
  CapitalGainsDetails,
  OtherSourcesDetails,
};

const SparklesBlueIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 2C14 6.97 10.42 11 5.5 11C10.42 11 14 15.03 14 20C14 15.03 17.58 11 22.5 11C17.58 11 14 6.97 14 2Z" />
    <path d="M5 2C5 3.66 3.66 5 2 5C3.66 5 5 6.34 5 8C5 6.34 6.34 5 8 5C6.34 5 5 3.66 5 2Z" />
    <path d="M5.5 15C5.5 16.38 4.38 17.5 3 17.5C4.38 17.5 5.5 18.62 5.5 20C5.5 18.62 6.62 17.5 8 17.5C6.62 17.5 5.5 16.38 5.5 15Z" />
  </svg>
);

interface ApplicableFormInfo {
  form: string;
  description: string;
  checklist: string[];
}

const getApplicableFormInfo = (
  selectedSources: string[],
  businessDetails?: BusinessDetails,
): ApplicableFormInfo => {
  const hasBusiness = selectedSources.includes("business");
  const hasCapitalGains = selectedSources.includes("capital_gains");
  const method = businessDetails?.reportingMethod ?? "44AD";

  if (hasBusiness) {
    if (hasCapitalGains || method === "regular") {
      return {
        form: "ITR-3",
        description:
          "Based on business or professional income with regular books, ITR-3 applies.",
        checklist: [
          "Business / Professional income with regular books detected",
          "Mandatory filing under ITR-3 as per Income Tax Department rules",
          "Resident individual",
        ],
      };
    }
    const sectionLabel =
      method === "44ADA" ? "Section 44ADA" : "Section 44AD";
    return {
      form: "ITR-4",
      description:
        "Based on presumptive business or professional income under Section 44AD / 44ADA up to ₹50 Lakhs, ITR-4 applies.",
      checklist: [
        `Presumptive taxation selected (${sectionLabel})`,
        "No capital gains or trading income",
        "Total income is within statutory threshold (<= ₹50 Lakhs)",
        "Resident individual status confirmed",
      ],
    };
  }

  if (hasCapitalGains) {
    return {
      form: "ITR-2",
      description:
        "Based on capital gains or multiple house properties without business income, ITR-2 applies.",
      checklist: [
        "Capital gains or equity/crypto trading declared",
        "No business or professional income declared",
        "Multiple house properties permitted",
        "Resident individual status confirmed",
      ],
    };
  }

  return {
    form: "ITR-1",
    description:
      "Based on your salary and interest income up to ₹50 Lakhs as a resident, ITR-1 applies.",
    checklist: [
      "Salary / Pension income declared",
      "No business or professional income declared",
      "No capital gains or trading declared",
      "Resident individual with income <= ₹50 Lakhs",
    ],
  };
};

const GST_RECONCILE_ROWS = [
  {
    label: "GSTR-1 Outward Supplies",
    sub: "Invoice-level filed returns (FY 2024-25)",
    val: "₹ 0",
  },
  {
    label: "GSTR-3B Outward Supplies",
    sub: "Monthly summary return filings",
    val: "₹ 0",
  },
  {
    label: "Books of Account Turnover",
    sub: "Audited ledger / sales register",
    val: "₹ 0",
  },
  {
    label: "Proposed ITR Business Turnover",
    sub: "Turnover declared for Income Tax computation",
    val: "₹ 0",
  },
];

interface SourceCardHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  toggleTitle: string;
  onToggle: () => void;
}

const renderSourceCardHeader = ({
  icon,
  title,
  subtitle,
  toggleTitle,
  onToggle,
}: SourceCardHeaderProps) => (
  <div className="itr-salary-card__header">
    <div className="itr-salary-card__left">
      <div className="itr-salary-icon-box" aria-hidden="true">
        {icon}
      </div>
      <div className="itr-salary-card__titles">
        <h3 className="itr-salary-card__title">{title}</h3>
        <p className="itr-salary-card__sub">{subtitle}</p>
      </div>
    </div>
    <div
      className="itr-salary-checkbox-wrap"
      onClick={onToggle}
      title={toggleTitle}
      role="checkbox"
      aria-checked={true}
      tabIndex={0}
    >
      <div className="itr-checkbox-custom">
        <CheckIcon size={14} />
      </div>
    </div>
  </div>
);

const renderCurrencyField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="itr-form-group">
    <label className="itr-form-label" htmlFor={id}>
      {label}
    </label>
    <div className="itr-input-currency-wrap">
      <span className="itr-currency-prefix">₹</span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        maxLength={14}
        className="itr-input-currency"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9,]/g, ""))}
      />
    </div>
  </div>
);

export const ItrSalaryIncomeCard: React.FC<{
  salaryDetails: SalaryDetails;
  onSalaryDetailsChange: (d: SalaryDetails) => void;
  onToggle: () => void;
}> = ({ salaryDetails, onSalaryDetailsChange, onToggle }) => (
  <div className="itr-salary-card">
    {renderSourceCardHeader({
      icon: "💼",
      title: "Salary Income",
      subtitle: "Employer Form 16, payslips, TDS credits",
      toggleTitle: "Toggle Salary Income",
      onToggle,
    })}
    <div className="itr-form-group">
      <label className="itr-form-label" htmlFor="salary-employer-name">
        Employer Legal Name
      </label>
      <input
        id="salary-employer-name"
        type="text"
        className="itr-input-text"
        placeholder="e.g. Acme Technologies Ltd"
        value={salaryDetails.employerName}
        onChange={(e) =>
          onSalaryDetailsChange({
            ...salaryDetails,
            employerName: e.target.value,
          })
        }
      />
    </div>
    <div className="itr-grid-2col">
      {renderCurrencyField({
        id: "salary-gross-amount",
        label: "Gross Salary (Annual)",
        placeholder: "e.g. 8,50,000",
        value: salaryDetails.grossSalary,
        onChange: (val) =>
          onSalaryDetailsChange({ ...salaryDetails, grossSalary: val }),
      })}
      {renderCurrencyField({
        id: "salary-exempt-amount",
        label: "Exempt Allowances (HRA, LTA)",
        placeholder: "e.g. 50,000",
        value: salaryDetails.exemptAllowances,
        onChange: (val) =>
          onSalaryDetailsChange({ ...salaryDetails, exemptAllowances: val }),
      })}
    </div>
    {renderCurrencyField({
      id: "salary-tds-amount",
      label: "TDS Deducted by Employer",
      placeholder: "e.g. 45,000",
      value: salaryDetails.tdsDeducted,
      onChange: (val) =>
        onSalaryDetailsChange({ ...salaryDetails, tdsDeducted: val }),
    })}
  </div>
);

export const ItrHousePropertyCard: React.FC<{
  housePropertyDetails: HousePropertyDetails;
  onHousePropertyDetailsChange: (d: HousePropertyDetails) => void;
  onToggle: () => void;
}> = ({ housePropertyDetails, onHousePropertyDetailsChange, onToggle }) => (
  <div className="itr-salary-card">
    {renderSourceCardHeader({
      icon: "🏠",
      title: "House Property",
      subtitle: "Self-occupied home loan or rental income",
      toggleTitle: "Toggle House Property",
      onToggle,
    })}
    <div className="itr-form-group">
      <label className="itr-form-label">Property Classification</label>
      <div className="itr-toggle-group">
        <button
          type="button"
          className={`itr-toggle-btn ${housePropertyDetails.propertyType === "self_occupied" ? "itr-toggle-btn--active" : ""}`}
          onClick={() =>
            onHousePropertyDetailsChange({
              ...housePropertyDetails,
              propertyType: "self_occupied",
            })
          }
        >
          Self-Occupied
        </button>
        <button
          type="button"
          className={`itr-toggle-btn ${housePropertyDetails.propertyType === "let_out" ? "itr-toggle-btn--active" : ""}`}
          onClick={() =>
            onHousePropertyDetailsChange({
              ...housePropertyDetails,
              propertyType: "let_out",
            })
          }
        >
          Let-Out (Rented)
        </button>
      </div>
    </div>
    {renderCurrencyField({
      id: "hp-loan-interest",
      label: "Home Loan Interest Paid (Sec 24b)",
      placeholder:
        housePropertyDetails.propertyType === "self_occupied"
          ? "Max ₹2,00,000"
          : "e.g. 1,50,000",
      value: housePropertyDetails.homeLoanInterest,
      onChange: (val) =>
        onHousePropertyDetailsChange({
          ...housePropertyDetails,
          homeLoanInterest: val,
        }),
    })}
    {housePropertyDetails.propertyType === "let_out" && (
      <div className="itr-grid-2col">
        {renderCurrencyField({
          id: "hp-rent",
          label: "Annual Rent Received",
          placeholder: "e.g. 1,20,000",
          value: housePropertyDetails.annualRentReceived,
          onChange: (val) =>
            onHousePropertyDetailsChange({
              ...housePropertyDetails,
              annualRentReceived: val,
            }),
        })}
        {renderCurrencyField({
          id: "hp-tax",
          label: "Municipal Tax Paid",
          placeholder: "e.g. 5,000",
          value: housePropertyDetails.municipalTaxPaid,
          onChange: (val) =>
            onHousePropertyDetailsChange({
              ...housePropertyDetails,
              municipalTaxPaid: val,
            }),
        })}
      </div>
    )}
  </div>
);

export const ItrBusinessIncomeCard: React.FC<{
  businessDetails: BusinessDetails;
  onBusinessDetailsChange: (d: BusinessDetails) => void;
  onToggle: () => void;
}> = ({ businessDetails, onBusinessDetailsChange, onToggle }) => (
  <div className="itr-salary-card">
    {renderSourceCardHeader({
      icon: "🏪",
      title: "Business / Profession",
      subtitle: "Presumptive (44AD/ADA) or Regular Books",
      toggleTitle: "Toggle Business",
      onToggle,
    })}
    <div className="itr-gst-reconcile-box">
      <div className="itr-gst-reconcile-header">
        <div className="itr-gst-reconcile-title-row">
          <span className="itr-gst-icon">🏪</span>
          <span className="itr-gst-reconcile-title">
            GST ↔ ITR Turnover Reconciliation
          </span>
          <span className="itr-gst-shield-icon" aria-hidden="true">
            🛡
          </span>
        </div>
        <p className="itr-gst-reconcile-desc">
          TaxEdge imported business turnover from your filed GST returns. GST
          reporting and income tax computation can differ due to credit notes or
          advances.
        </p>
      </div>
      <div className="itr-gst-table">
        <div className="itr-gst-table-header">
          <span>SOURCE / LEDGER</span>
          <span>AMOUNT</span>
        </div>
        {GST_RECONCILE_ROWS.map((row) => (
          <div key={row.label} className="itr-gst-table-row">
            <div>
              <div className="itr-gst-row-label">{row.label}</div>
              <div className="itr-gst-row-sub">{row.sub}</div>
            </div>
            <div className="itr-gst-row-val">{row.val}</div>
          </div>
        ))}
      </div>
      <div className="itr-gst-verify-note">
        <span className="itr-gst-verify-icon">✅</span>
        <span>
          Your Tax Executive will independently cross-verify turnover with
          GSTR-9 records.
        </span>
      </div>
    </div>

    <div className="itr-form-group">
      <label className="itr-form-label">How do you report this business?</label>
      <div className="itr-business-method-list">
        {BUSINESS_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            className={`itr-business-method-card ${businessDetails.reportingMethod === method.id ? "itr-business-method-card--active" : ""}`}
            onClick={() =>
              onBusinessDetailsChange({
                ...businessDetails,
                reportingMethod: method.id,
              })
            }
          >
            <div className="itr-business-method-radio">
              <div className="itr-radio-outer">
                {businessDetails.reportingMethod === method.id && (
                  <div className="itr-radio-inner" />
                )}
              </div>
            </div>
            <div className="itr-business-method-text">
              <div className="itr-business-method-title">{method.title}</div>
              <div className="itr-business-method-desc">{method.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>

    <div className="itr-grid-2col">
      {renderCurrencyField({
        id: "biz-turnover",
        label: "Gross Turnover / Receipts",
        placeholder: "e.g. 25,00,000",
        value: businessDetails.grossTurnover,
        onChange: (val) =>
          onBusinessDetailsChange({ ...businessDetails, grossTurnover: val }),
      })}
      {renderCurrencyField({
        id: "biz-profit",
        label: "Declared Net Profit",
        placeholder: "e.g. 2,00,000",
        value: businessDetails.declaredNetProfit,
        onChange: (val) =>
          onBusinessDetailsChange({
            ...businessDetails,
            declaredNetProfit: val,
          }),
      })}
    </div>
  </div>
);

export const ItrCapitalGainsCard: React.FC<{
  capitalGainsDetails: CapitalGainsDetails;
  onCapitalGainsDetailsChange: (d: CapitalGainsDetails) => void;
  onToggle: () => void;
}> = ({ capitalGainsDetails, onCapitalGainsDetailsChange, onToggle }) => {
  const toggleAssetType = (type: string) => {
    try {
      const current = capitalGainsDetails.assetTypes;
      const updated = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      onCapitalGainsDetailsChange({
        ...capitalGainsDetails,
        assetTypes: updated,
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div className="itr-salary-card">
      {renderSourceCardHeader({
        icon: "📈",
        title: "Capital Gains & Trading",
        subtitle: "Stocks, mutual funds, F&O, crypto, property",
        toggleTitle: "Toggle Capital Gains",
        onToggle,
      })}
      <div className="itr-form-group">
        <label className="itr-form-label">Asset Types Traded</label>
        <div className="itr-asset-pills-row">
          {ASSET_TYPE_OPTIONS.map((type) => (
            <button
              key={type}
              type="button"
              className={`itr-asset-pill ${capitalGainsDetails.assetTypes.includes(type) ? "itr-asset-pill--active" : ""}`}
              onClick={() => toggleAssetType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="itr-grid-2col">
        {renderCurrencyField({
          id: "cg-stcg",
          label: "Short-Term Gains (STCG)",
          placeholder: "e.g. 30,000",
          value: capitalGainsDetails.stcg,
          onChange: (val) =>
            onCapitalGainsDetailsChange({ ...capitalGainsDetails, stcg: val }),
        })}
        {renderCurrencyField({
          id: "cg-ltcg",
          label: "Long-Term Gains (LTCG)",
          placeholder: "e.g. 50,000",
          value: capitalGainsDetails.ltcg,
          onChange: (val) =>
            onCapitalGainsDetailsChange({ ...capitalGainsDetails, ltcg: val }),
        })}
      </div>
    </div>
  );
};

export const ItrOtherSourcesCard: React.FC<{
  otherSourcesDetails: OtherSourcesDetails;
  onOtherSourcesDetailsChange: (d: OtherSourcesDetails) => void;
  onToggle: () => void;
}> = ({ otherSourcesDetails, onOtherSourcesDetailsChange, onToggle }) => (
  <div className="itr-salary-card">
    {renderSourceCardHeader({
      icon: "💰",
      title: "Other Sources",
      subtitle: "Interest, dividends, gifts, and more",
      toggleTitle: "Toggle Other Sources",
      onToggle,
    })}
    <div className="itr-grid-2col">
      {renderCurrencyField({
        id: "os-interest",
        label: "Interest Income (FD / Savings)",
        placeholder: "e.g. 12,000",
        value: otherSourcesDetails.interestIncome,
        onChange: (val) =>
          onOtherSourcesDetailsChange({
            ...otherSourcesDetails,
            interestIncome: val,
          }),
      })}
      {renderCurrencyField({
        id: "os-dividend",
        label: "Dividend Income",
        placeholder: "e.g. 5,000",
        value: otherSourcesDetails.dividendIncome,
        onChange: (val) =>
          onOtherSourcesDetailsChange({
            ...otherSourcesDetails,
            dividendIncome: val,
          }),
      })}
    </div>
    {renderCurrencyField({
      id: "os-other",
      label: "Any Other Income (Gifts, Lottery, etc.)",
      placeholder: "e.g. 0",
      value: otherSourcesDetails.otherIncome,
      onChange: (val) =>
        onOtherSourcesDetailsChange({
          ...otherSourcesDetails,
          otherIncome: val,
        }),
    })}
  </div>
);

export interface ItrIncomeSourcesViewProps {
  onBack: () => void;
  onNext: () => void;
  onSaveDraft?: () => void;
  salaryDetails: SalaryDetails;
  onSalaryDetailsChange: (details: SalaryDetails) => void;
  housePropertyDetails: HousePropertyDetails;
  onHousePropertyDetailsChange: (details: HousePropertyDetails) => void;
  businessDetails: BusinessDetails;
  onBusinessDetailsChange: (details: BusinessDetails) => void;
  capitalGainsDetails: CapitalGainsDetails;
  onCapitalGainsDetailsChange: (details: CapitalGainsDetails) => void;
  otherSourcesDetails: OtherSourcesDetails;
  onOtherSourcesDetailsChange: (details: OtherSourcesDetails) => void;
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
  selectedCategoryId?: string | null;
}

export const ItrIncomeSourcesView: React.FC<ItrIncomeSourcesViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  salaryDetails,
  onSalaryDetailsChange,
  housePropertyDetails,
  onHousePropertyDetailsChange,
  businessDetails,
  onBusinessDetailsChange,
  capitalGainsDetails,
  onCapitalGainsDetailsChange,
  otherSourcesDetails,
  onOtherSourcesDetailsChange,
  selectedSources,
  onSourcesChange,
}) => {
  const toggleSource = (id: string) => {
    try {
      onSourcesChange(
        selectedSources.includes(id)
          ? selectedSources.filter((s) => s !== id)
          : [...selectedSources, id],
      );
    } catch {
      // Fallback
    }
  };

  const applicableInfo = getApplicableFormInfo(
    selectedSources,
    businessDetails,
  );

  const isIncomeSourcesValid = Boolean(
    selectedSources.length > 0 &&
    (!selectedSources.includes("salary") ||
      Boolean(
        salaryDetails.grossSalary?.trim() || salaryDetails.employerName?.trim(),
      )) &&
    (!selectedSources.includes("house_property") ||
      housePropertyDetails.propertyType === "self_occupied" ||
      Boolean(housePropertyDetails.annualRentReceived?.trim())) &&
    (!selectedSources.includes("business") ||
      Boolean(
        businessDetails.grossTurnover?.trim() ||
        businessDetails.declaredNetProfit?.trim(),
      )) &&
    (!selectedSources.includes("capital_gains") ||
      Boolean(
        capitalGainsDetails.stcg?.trim() ||
        capitalGainsDetails.ltcg?.trim() ||
        capitalGainsDetails.assetTypes.length > 0,
      )) &&
    (!selectedSources.includes("other_sources") ||
      Boolean(
        otherSourcesDetails.interestIncome?.trim() ||
        otherSourcesDetails.dividendIncome?.trim() ||
        otherSourcesDetails.otherIncome?.trim(),
      )),
  );

  const renderCard = (sourceId: string) => {
    if (sourceId === "salary")
      return (
        <ItrSalaryIncomeCard
          key="salary"
          salaryDetails={salaryDetails}
          onSalaryDetailsChange={onSalaryDetailsChange}
          onToggle={() => toggleSource("salary")}
        />
      );
    if (sourceId === "house_property")
      return (
        <ItrHousePropertyCard
          key="house_property"
          housePropertyDetails={housePropertyDetails}
          onHousePropertyDetailsChange={onHousePropertyDetailsChange}
          onToggle={() => toggleSource("house_property")}
        />
      );
    if (sourceId === "business")
      return (
        <ItrBusinessIncomeCard
          key="business"
          businessDetails={businessDetails}
          onBusinessDetailsChange={onBusinessDetailsChange}
          onToggle={() => toggleSource("business")}
        />
      );
    if (sourceId === "capital_gains")
      return (
        <ItrCapitalGainsCard
          key="capital_gains"
          capitalGainsDetails={capitalGainsDetails}
          onCapitalGainsDetailsChange={onCapitalGainsDetailsChange}
          onToggle={() => toggleSource("capital_gains")}
        />
      );
    if (sourceId === "other_sources")
      return (
        <ItrOtherSourcesCard
          key="other_sources"
          otherSourcesDetails={otherSourcesDetails}
          onOtherSourcesDetailsChange={onOtherSourcesDetailsChange}
          onToggle={() => toggleSource("other_sources")}
        />
      );
    return null;
  };

  return (
    <div className="itr-step-view-container">
      <ItrFilingHeaderStepper currentStepId={2} />
      <div className="itr-applicable-card">
        <div className="itr-applicable-card__header">
          <div className="itr-applicable-card__title-wrap">
            <span className="itr-applicable-card__sparkle">
              <SparklesBlueIcon size={20} />
            </span>
            <h2 className="itr-applicable-card__title">
              Applicable Return Form
            </h2>
          </div>
          <span className="itr-applicable-card__badge">
            {applicableInfo.form}
          </span>
        </div>
        <p className="itr-applicable-card__desc">
          {applicableInfo.description}
        </p>
        <div className="itr-applicable-card__checklist">
          {applicableInfo.checklist.map((item) => (
            <div key={item} className="itr-applicable-card__check-item">
              <span className="itr-check-circle-icon">
                <CheckIcon size={10} strokeWidth={2.8} />
              </span>
              <span className="itr-applicable-card__check-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="itr-step-card">
        <div className="itr-sources-header">
          <h2 className="itr-sources-title">Income Sources &amp; Activity</h2>
          <p className="itr-sources-subtitle">
            Select all sources of income you earned this year. Fields will
            adjust automatically.
          </p>
          <span className="itr-sources-label">Select your income sources:</span>
        </div>
        <div
          className="itr-pills-row"
          role="group"
          aria-label="Income sources selection"
        >
          {ALL_SOURCES.map((src) => {
            const isSelected = selectedSources.includes(src.id);
            return (
              <button
                key={src.id}
                type="button"
                className={`itr-source-pill ${isSelected ? "itr-source-pill--active" : ""}`}
                onClick={() => toggleSource(src.id)}
                aria-pressed={isSelected}
              >
                {isSelected ? (
                  <span className="itr-pill-icon-active" aria-hidden="true">
                    <CheckIcon size={10} />
                  </span>
                ) : (
                  <span className="itr-pill-icon-add" aria-hidden="true">
                    +
                  </span>
                )}
                <span>{src.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedSources.map(renderCard)}

      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        backLabel="Back"
        nextLabel="Continue"
        nextDisabled={!isIncomeSourcesValid}
        extraActions={
          onSaveDraft ? (
            <button
              type="button"
              className="step-action-bar__btn step-action-bar__btn--save-draft"
              onClick={onSaveDraft}
            >
              <SaveDraftIcon size={16} />
              <span>Save Draft &amp; Exit</span>
            </button>
          ) : undefined
        }
      />
    </div>
  );
};

export default ItrIncomeSourcesView;
