import { SalesTiersModule } from './sales-tiers.module';

describe('SalesTiersModule', () => {
  let salesTiersModule: SalesTiersModule;

  beforeEach(() => {
    salesTiersModule = new SalesTiersModule();
  });

  it('should create an instance', () => {
    expect(salesTiersModule).toBeTruthy();
  });
});
