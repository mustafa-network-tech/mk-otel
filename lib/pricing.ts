export type PricingContext={basePrice:number;checkIn:string;checkOut:string};
export function calculateNightlyPrice({basePrice}:PricingContext){return basePrice;}
export function calculateTotal(context:PricingContext,nights:number){return calculateNightlyPrice(context)*nights;}
// Pricing rules intentionally live outside UI/database access. Weekend, season,
// special-day and campaign strategies can be composed here in a later phase.
