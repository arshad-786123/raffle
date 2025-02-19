export const formatCreditCardNumber = (value: string): string => {
    if (!value) {
      return value;
    }
  
    const clearValue = value.replace(/\D+/g, '');
    let nextValue: string;
  
    if (clearValue.length > 16) {
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 16)}`;
    } else {
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
    }
  
    return nextValue.trim();
  };
  
  export const formatCVC = (value: string): string => {
    const clearValue = value.replace(/\D+/g, '');
    return clearValue.slice(0, 4);
  };
  
  export const formatExpirationDate = (value: string): string => {
    const clearValue = value.replace(/\D+/g, '');
  
    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
  
    return clearValue;
  };
  
  export const formatFormData = (data: Record<string, any>): string[] => {
    return Object.entries(data).map(([key, value]) => `${key}: ${value}`);
  };
  