export interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number
): EMIResult {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) {
    const emi = principal / months;
    return {
      emi,
      totalPayment: principal,
      totalInterest: 0,
      principal,
    };
  }
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return {
    emi,
    totalPayment,
    totalInterest,
    principal,
  };
}

export function generateEMISchedule(
  principal: number,
  annualRate: number,
  years: number
): Array<{ month: number; emi: number; interest: number; principal: number; balance: number }> {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const { emi } = calculateEMI(principal, annualRate, years);
  let balance = principal;
  const schedule = [];
  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const principalPart = emi - interest;
    balance -= principalPart;
    schedule.push({
      month: i,
      emi,
      interest,
      principal: principalPart,
      balance: Math.max(0, balance),
    });
  }
  return schedule;
}

export interface SIPResult {
  maturityValue: number;
  totalInvested: number;
  totalReturns: number;
}

export function calculateSIP(
  monthlyInvestment: number,
  annualRate: number,
  years: number
): SIPResult {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const maturityValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);
  const totalInvested = monthlyInvestment * months;
  const totalReturns = maturityValue - totalInvested;
  return { maturityValue, totalInvested, totalReturns };
}

export interface LoanEligibilityResult {
  maxLoanAmount: number;
  maxEMI: number;
}

export function calculateLoanEligibility(
  monthlyIncome: number,
  existingEMI: number,
  annualRate: number,
  years: number,
  maxEMIRatio: number = 50
): LoanEligibilityResult {
  const maxEMI = (monthlyIncome * maxEMIRatio) / 100 - existingEMI;
  if (maxEMI <= 0) return { maxLoanAmount: 0, maxEMI: 0 };
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) {
    return { maxLoanAmount: maxEMI * months, maxEMI };
  }
  const maxLoanAmount =
    (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, months));
  return { maxLoanAmount, maxEMI };
}

export interface FDResult {
  maturityValue: number;
  totalInterest: number;
  principal: number;
}

export function calculateFD(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFreq: number = 4
): FDResult {
  const ratePerPeriod = annualRate / 100 / compoundingFreq;
  const periods = years * compoundingFreq;
  const maturityValue = principal * Math.pow(1 + ratePerPeriod, periods);
  const totalInterest = maturityValue - principal;
  return { maturityValue, totalInterest, principal };
}

export interface CompoundInterestResult {
  maturityValue: number;
  totalInterest: number;
  principal: number;
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFreq: number = 12
): CompoundInterestResult {
  const ratePerPeriod = annualRate / 100 / compoundingFreq;
  const periods = years * compoundingFreq;
  const maturityValue = principal * Math.pow(1 + ratePerPeriod, periods);
  const totalInterest = maturityValue - principal;
  return { maturityValue, totalInterest, principal };
}

export interface GSTResult {
  netAmount: number;
  gstAmount: number;
  totalAmount: number;
}

export function calculateGST(
  amount: number,
  gstRate: number,
  mode: 'exclusive' | 'inclusive' = 'exclusive'
): GSTResult {
  if (mode === 'exclusive') {
    const gstAmount = (amount * gstRate) / 100;
    return {
      netAmount: amount,
      gstAmount,
      totalAmount: amount + gstAmount,
    };
  }
  const netAmount = amount / (1 + gstRate / 100);
  const gstAmount = amount - netAmount;
  return {
    netAmount,
    gstAmount,
    totalAmount: amount,
  };
}

export interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
  principal: number;
}

export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  years: number
): SimpleInterestResult {
  const interest = (principal * annualRate * years) / 100;
  const totalAmount = principal + interest;
  return { interest, totalAmount, principal };
}

export interface IncomeTaxResult {
  oldRegimeTax: number;
  newRegimeTax: number;
  oldRegimeCess: number;
  newRegimeCess: number;
  oldRegimeTotal: number;
  newRegimeTotal: number;
  betterRegime: 'old' | 'new';
  oldRegimeDetails: Array<{ slab: string; tax: number }>;
  newRegimeDetails: Array<{ slab: string; tax: number }>;
}

export function calculateIncomeTax(
  annualIncome: number,
  deductions: { section80C: number; section80D: number; hra: number; other: number }
): IncomeTaxResult {
  const cessRate = 4;

  const oldSlabs = [
    { upTo: 250000, rate: 0 },
    { upTo: 500000, rate: 5 },
    { upTo: 1000000, rate: 20 },
    { upTo: Infinity, rate: 30 },
  ];

  const newSlabs = [
    { upTo: 300000, rate: 0 },
    { upTo: 700000, rate: 5 },
    { upTo: 1000000, rate: 10 },
    { upTo: 1200000, rate: 15 },
    { upTo: 1500000, rate: 20 },
    { upTo: Infinity, rate: 30 },
  ];

  const totalDeductions =
    deductions.section80C + deductions.section80D + deductions.hra + deductions.other;
  const oldTaxableIncome = Math.max(0, annualIncome - totalDeductions);
  const newTaxableIncome = annualIncome;

  function computeTax(taxableIncome: number, slabs: typeof oldSlabs) {
    let tax = 0;
    let prevLimit = 0;
    const details: Array<{ slab: string; tax: number }> = [];
    for (const slab of slabs) {
      if (taxableIncome > prevLimit) {
        const taxableInSlab = Math.min(taxableIncome, slab.upTo) - prevLimit;
        const slabTax = (taxableInSlab * slab.rate) / 100;
        tax += slabTax;
        if (slab.rate > 0 && taxableInSlab > 0) {
          details.push({
            slab: `\u20B9${prevLimit.toLocaleString('en-IN')} - \u20B9${slab.upTo === Infinity ? 'above' : slab.upTo.toLocaleString('en-IN')} @ ${slab.rate}%`,
            tax: slabTax,
          });
        }
        prevLimit = slab.upTo;
      } else {
        break;
      }
    }

    if (taxableIncome <= 500000 && tax > 0) {
      const rebate = Math.min(tax, 12500);
      tax -= rebate;
    }
    if (taxableIncome <= 700000 && tax > 0 && slabs === newSlabs) {
      const rebate = Math.min(tax, 25000);
      tax -= rebate;
    }

    return { tax: Math.max(0, tax), details };
  }

  const oldComputed = computeTax(oldTaxableIncome, oldSlabs);
  const newComputed = computeTax(newTaxableIncome, newSlabs);

  const oldRegimeCess = (oldComputed.tax * cessRate) / 100;
  const newRegimeCess = (newComputed.tax * cessRate) / 100;
  const oldRegimeTotal = oldComputed.tax + oldRegimeCess;
  const newRegimeTotal = newComputed.tax + newRegimeCess;

  return {
    oldRegimeTax: oldComputed.tax,
    newRegimeTax: newComputed.tax,
    oldRegimeCess,
    newRegimeCess,
    oldRegimeTotal,
    newRegimeTotal,
    betterRegime: oldRegimeTotal <= newRegimeTotal ? 'old' : 'new',
    oldRegimeDetails: oldComputed.details,
    newRegimeDetails: newComputed.details,
  };
}
