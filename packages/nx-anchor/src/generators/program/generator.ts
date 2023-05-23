import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { toCrateName } from '../../utils';
import { ProgramGeneratorSchema } from './schema';

interface NormalizedSchema extends ProgramGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

function normalizeOptions(
  tree: Tree,
  options: ProgramGeneratorSchema
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

export default async function (tree: Tree, options: ProgramGeneratorSchema) {
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
  addFiles(tree, normalizedOptions);

  // update anchor toml to include the new program
  await formatFiles(tree);
}
