import { logger } from '@nx/devkit';
import { execSync } from 'child_process';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema) {
  logger.info(`Executing "build"...`);
  logger.info(`Options: ${JSON.stringify(options, null, 2)}`);
  const command = ['anchor', 'build'].join(' ');
  execSync(command, { stdio: 'inherit', cwd: options.projectPath });
  return { success: true };
}
