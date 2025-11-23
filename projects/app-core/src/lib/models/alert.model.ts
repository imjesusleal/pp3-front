export interface AlertModel{
    header?: string;
    message: string;
    buttons?: string[];
}

export const defaultBtns = ['Ok', 'Cancel']