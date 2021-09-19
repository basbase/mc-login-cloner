import fse from 'fs-extra';
import { join as j, dirname } from 'path';

function workingDir(): string {
  return dirname(process.execPath);
}

export abstract class Cloner {
  protected cmd = '';

  protected sourceFullDir = '';

  protected targetFullDir(): string {
    return j(workingDir(), this.binDir);
  }

  protected binDir = '';

  protected abstract getLaunchCommand(): void;

  protected abstract createLauncher(name: string): void;

  validateCmd(): void {
    if (!this.cmd) throw new Error('missing launch command');
  }

  getDirs(): void {
    this.validateCmd();

    const match = this.cmd.match(
      /-Djava\.library\.path=(.+?[\\/]([^\\/]+?)) -D/,
    );

    if (!match) throw new Error('failed to match directories');

    const [, fullDir, binDir] = match;

    this.sourceFullDir = fullDir;
    this.binDir = binDir;
  }

  updatePath(newPath: string): void {
    this.validateCmd();

    this.cmd = this.cmd.replace(
      /-Djava\.library\.path=.+? -D/,
      `-Djava.library.path=${newPath.replace(/ /g, '\\ ')} -D`,
    );
  }

  setUsername(name: string): void {
    this.validateCmd();

    this.cmd = this.cmd.replace(/--username .+? /, `--username ${name} `);
  }

  copyDir(): void {
    fse.copySync(this.sourceFullDir, this.targetFullDir());
  }

  run(name: string): void {
    this.getLaunchCommand();
    this.getDirs();
    this.copyDir();
    this.updatePath(this.targetFullDir());
    this.setUsername(name);
    this.createLauncher(name);
  }
}
