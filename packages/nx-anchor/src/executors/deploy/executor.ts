import { logger } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { DeployExecutorSchema } from './schema';

export default async function runExecutor(options: DeployExecutorSchema) {
  logger.info(`Executing "deploy"...`);
  logger.info(`Options: ${JSON.stringify(options, null, 2)}`);
  const command = ['anchor', 'deploy'].join(' ')
  execSync(command, { stdio: 'inherit', cwd: options.projectPath });
  return { success: true };
}
