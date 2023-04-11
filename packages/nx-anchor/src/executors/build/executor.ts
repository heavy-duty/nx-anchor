import { logger } from '@nrwl/devkit';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { fromCommand } from '../../utils';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema) {
  logger.info(`Executing "build"...`);
  logger.info(`Options: ${JSON.stringify(options, null, 2)}`);

  return fromCommand(`anchor build`, {
    monitor: options.monitor,
    cwd: options.projectPath,
  })
    .pipe(
      map(() => ({ success: true })),
      catchError(() => of({ success: false }))
    )
    .toPromise();
}
