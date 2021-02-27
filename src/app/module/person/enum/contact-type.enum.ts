export enum ContactTypeEnum {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  MOBILE = 'MOBILE'
}

export const contactTypes = () => {
  return [
    {label: 'Telefone', value: ContactTypeEnum.PHONE},
    {label: 'Email', value: ContactTypeEnum.EMAIL},
    {label: 'Celular', value: ContactTypeEnum.MOBILE},
  ];
};
