export interface AsaasFeesEntity {
  payment: {
    bankSlip: {
      defaultValue: number;
      discountValue: any;
      expirationDate: any;
      daysToReceive: number;
    };
    creditCard: {
      operationValue: number;
      oneInstallmentPercentage: number;
      upToSixInstallmentsPercentage: number;
      upToTwelveInstallmentsPercentage: number;
      discountOneInstallmentPercentage: number;
      discountUpToSixInstallmentsPercentage: number;
      discountUpToTwelveInstallmentsPercentage: number;
      hasValidDiscount: boolean;
      daysToReceive: number;
      discountExpiration: string;
    };
    debitCard: {
      operationValue: number;
      defaultPercentage: number;
      daysToReceive: number;
    };
    pix: {
      fixedFeeValue: number;
      fixedFeeValueWithDiscount: any;
      percentageFee: any;
      minimumFeeValue: any;
      maximumFeeValue: any;
      discountExpiration: any;
      type: string;
      monthlyCreditsWithoutFee: number;
      creditsReceivedOfCurrentMonth: number;
    };
  };
  transfer: {
    monthlyTransfersWithoutFee: number;
    ted: {
      feeValue: number;
      consideredInMonthlyTransfersWithoutFee: boolean;
    };
    pix: {
      feeValue: number;
      discountValue: any;
      expirationDate: any;
      consideredInMonthlyTransfersWithoutFee: boolean;
    };
  };
  asaasCard: {
    debit: {
      requestFeeValue: number;
      deniedReasons: any;
      nationalCashWithdrawalFeeValue: number;
      internationalCashWithdrawalProcessingFeePercentage: number;
      internationalCashWithdrawalExchangeFeeValue: number;
      internationalPurchaseWithdrawalFeePercentage: number;
    };
    prepaid: {
      requestFeeValue: number;
      deniedReasons: Array<{
        code: string;
        description: string;
      }>;
      nationalCashWithdrawalFeeValue: number;
      internationalCashWithdrawalProcessingFeePercentage: number;
      internationalCashWithdrawalExchangeFeeValue: number;
      internationalPurchaseWithdrawalFeePercentage: number;
    };
    credit: {
      requestFeeValue: number;
      deniedReasons: any;
      nationalCashWithdrawalFeeValue: number;
      internationalCashWithdrawalProcessingFeePercentage: number;
      internationalCashWithdrawalExchangeFeeValue: number;
      internationalPurchaseWithdrawalFeePercentage: number;
    };
  };
  notification: {
    phoneCallFeeValue: number;
    whatsAppFeeValue: number;
    messagingFeeValue: number;
    postalServiceFeeValue: number;
    smsFeeValue: number;
  };
  creditBureauReport: {
    naturalPersonFeeValue: number;
    legalPersonFeeValue: number;
  };
  invoice: {
    feeValue: number;
  };
  anticipation: {
    bankSlip: {
      monthlyFeePercentage: number;
    };
    creditCard: {
      detachedMonthlyFeeValue: number;
      installmentMonthlyFeeValue: number;
    };
  };
  bill: {
    utilityFeeValue: number;
  };
  childAccount: {
    creationFeeValue: number;
  };
}
