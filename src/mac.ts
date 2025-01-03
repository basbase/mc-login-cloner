import fse from 'fs-extra';
import { join as j } from 'path';
import { execSync } from 'child_process';
import { Cloner } from './cloner';
import { workingDir } from './util';

const escapeCommand = (cmd: string): string =>
  cmd.replace(/\/Application Support\//g, '/Application\\ Support/');

export class Mac extends Cloner {
  getLaunchCommand(): void {
    const cmd = execSync('ps -eo args -r | grep craft/runtime/java-runtime', {
      encoding: 'utf8',
    }).trim().split(
      '\n').sort((a, b) => b.length - a.length)[0];

    if (!cmd.includes('minecraft/bin')) {
      throw new Error(
        'Failed to get launch command. Make sure the game is running.',
      );
    }

    this.cmd = cmd;
  }

  createLauncher(name: string): void {
    const launchScript = j(workingDir(), `launch_${name}`);
    fse.writeFileSync(launchScript, `#!/bin/sh\n${escapeCommand(this.cmd)}`, {
      mode: 0o755,
    });
  }
}
