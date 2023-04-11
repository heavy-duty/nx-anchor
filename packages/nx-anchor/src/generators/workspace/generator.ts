import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';

import { addPackages, toCrateName } from '../../utils';
import { WorkspaceGeneratorSchema } from './schema';

interface NormalizedSchema extends WorkspaceGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: WorkspaceGeneratorSchema
): NormalizedSchema {
  const projectName = names(options.name).fileName;
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectName}`;

  return {
    ...options,
    projectName,
    projectRoot,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    dot: '.',
    crateName: toCrateName(options.name),
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: WorkspaceGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    targets: {
      build: {
        executor: '@heavy-duty/nx-anchor:build',
        options: {
          projectPath: normalizedOptions.projectRoot,
          monitor: true,
        },
      },
      test: {
        executor: '@heavy-duty/nx-anchor:test',
        options: {
          projectPath: normalizedOptions.projectRoot,
          monitor: true,
        },
      },
      deploy: {
        executor: '@heavy-duty/nx-anchor:deploy',
        options: {
          projectPath: normalizedOptions.projectRoot,
          monitor: true,
        },
      },
    },
  });
  // Add the main dependencies from an anchor workspace
  addPackages(tree);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
