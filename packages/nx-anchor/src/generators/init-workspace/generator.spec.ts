import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { InitWorkspaceGeneratorSchema } from './schema';

describe('sample generator', () => {
  let appTree: Tree;
  const options: InitWorkspaceGeneratorSchema = { cluster: 'localnet' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'localnet');
    expect(config).toBeDefined();
  });
});
