import { AmountTiersModule } from './amount-tiers.module';

describe('AmountTiersModule', () => {
  let amountTiersModule: AmountTiersModule;

  beforeEach(() => {
    amountTiersModule = new AmountTiersModule();
  });

  it('should create an instance', () => {
    expect(amountTiersModule).toBeTruthy();
  });
});
