export interface CoreFormControl {

    controlName: string;
    title: string;
    type: 'text' | 'number' | 'password' | 'email' | 'tel';
    value: any;
}