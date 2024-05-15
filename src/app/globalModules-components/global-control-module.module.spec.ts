import { GlobalControlModuleModule } from './global-control-module.module';

describe('GlobalControlModuleModule', () => {
  let globalControlModuleModule: GlobalControlModuleModule;

  beforeEach(() => {
    globalControlModuleModule = new GlobalControlModuleModule();
  });

  it('should create an instance', () => {
    expect(globalControlModuleModule).toBeTruthy();
  });
});
