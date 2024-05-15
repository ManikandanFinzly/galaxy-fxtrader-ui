import { RateSourceModule } from './rate-source.module';

describe('RateSourceModule', () => {
  let rateSourceModule: RateSourceModule;

  beforeEach(() => {
    rateSourceModule = new RateSourceModule();
  });

  it('should create an instance', () => {
    expect(rateSourceModule).toBeTruthy();
  });
});
