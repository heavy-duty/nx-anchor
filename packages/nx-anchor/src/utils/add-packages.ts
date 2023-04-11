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
  web3JsVersion,
} from './versions';

export function addPackages(tree: Tree): GeneratorCallback {
  return addDependenciesToPackageJson(
    tree,
    {
      '@project-serum/anchor': anchorVersion,
      '@solana/web3.js': web3JsVersion,
    },
    {
      '@types/chai': chaiTypesVersion,
      '@types/mocha': mochaTypesVersion,
      chai: chaiVersion,
      mocha: mochaVersion,
      typescript: typescriptVersion,
    }
  );
}
