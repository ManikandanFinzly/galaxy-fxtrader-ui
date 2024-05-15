import { TradingTiersModule } from './trading-tiers.module';

describe('TradingTiersModule', () => {
  let tradingTiersModule: TradingTiersModule;

  beforeEach(() => {
    tradingTiersModule = new TradingTiersModule();
  });

  it('should create an instance', () => {
    expect(tradingTiersModule).toBeTruthy();
  });
});
