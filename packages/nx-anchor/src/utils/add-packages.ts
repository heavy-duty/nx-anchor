import {
  addDependenciesToPackageJson,
  GeneratorCallback,
  Tree,
} from '@nrwl/devkit';

import {
  anchorVersion,
  chaiTypesVersion,
  chaiVersion,
  mochaTypesVersion,
  mochaVersion,
  typescriptVersion,
  bnJsTypesVersion,
  prettierVersion,
  tsMochaVersion
} from './versions';

export function addPackages(tree: Tree): GeneratorCallback {
  return addDependenciesToPackageJson(
    tree,
    {
      '@coral-xyz/anchor': anchorVersion,
    },
    {
      chai: chaiVersion,
      mocha: mochaVersion,
      'ts-mocha': tsMochaVersion,
      '@types/bn.js': bnJsTypesVersion,
      '@types/chai': chaiTypesVersion,
      '@types/mocha': mochaTypesVersion,
      typescript: typescriptVersion,
      prettier: prettierVersion
    }
  );
}
