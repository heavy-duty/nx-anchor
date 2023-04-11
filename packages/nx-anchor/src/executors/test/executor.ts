import { logger } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { TestExecutorSchema } from './schema';

export default async function runExecutor(options: TestExecutorSchema) {
  logger.info(`Executing "test"...`);
  logger.info(`Options: ${JSON.stringify(options, null, 2)}`);
  const command = ['anchor', 'test'].join(' ')
  execSync(command, { stdio: 'inherit', cwd: options.projectPath });
  return ({ success: true });
}
