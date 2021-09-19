import fse from 'fs-extra';
import { join as j } from 'path';
import { execSync } from 'child_process';
import { Cloner } from './cloner';
import { workingDir } from './util';

export class Win extends Cloner {
  getLaunchCommand(): void {
    const cmd = execSync(
      'WMIC path win32_process where "caption=\'javaw.exe\'" get Commandline /value',
      { encoding: 'utf8' },
    )
      .trim()
      .replace(/^CommandLine=/, '');

    if (!cmd) {
      throw new Error(
        'Failed to get launch command. Make sure the game is running.',
      );
    }

    this.cmd = cmd;
  }

  createLauncher(name: string): void {
    const launchScript = j(workingDir(), `launch_${name}.bat`);

    fse.writeFileSync(launchScript, `${this.cmd}`, { mode: 0o755 });
  }
}
