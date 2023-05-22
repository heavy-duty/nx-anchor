import {
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { InitWorkspaceGeneratorSchema } from './schema';
import { updateSourceFile } from '../../utils';

export default async function (
  tree: Tree,
  options: InitWorkspaceGeneratorSchema
) {
  generateFiles(tree, path.join(__dirname, 'files'), '', options);
  updateSourceFile(tree, '.gitignore', (source) => {
    source.insertText(0, '.anchor\n');
    source.insertText(0, 'target\n');
    return source;
  });
  await formatFiles(tree);
}
