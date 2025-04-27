export enum PackId {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export type CreditsPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  lemonsqueezyVariantId: string;
};

export const CreditsPack: CreditsPack[] = [
  {
    id: PackId.SMALL,
    name: 'Small Pack',
    label: '1,000 credits',
    credits: 1000,
    price: 9.99, // $9.99
    lemonsqueezyVariantId: process.env.LEMON_SQUEEZY_VARIANT_ID_SMALL!,
  },
  {
    id: PackId.MEDIUM,
    name: 'Medium Pack',
    label: '5,000 credits',
    credits: 5000,
    price: 39, // $39.99
    lemonsqueezyVariantId: process.env.LEMON_SQUEEZY_VARIANT_ID_MEDIUM!,
  },
  {
    id: PackId.LARGE,
    name: 'Large Pack',
    label: '10,000 credits',
    credits: 10000,
    price: 69, // $69.99
    lemonsqueezyVariantId: process.env.LEMON_SQUEEZY_VARIANT_ID_LARGE!,
  },
];

export const getCreditsPack = (id: PackId) => CreditsPack.find((p) => p.id === id);
