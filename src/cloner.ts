export abstract class Cloner {
  protected cmd = '';

  protected abstract getLaunchCommand(): void;

  protected abstract createLauncher(name: string): void;

  validateCmd(): void {
    if (!this.cmd) throw new Error('missing launch command');
  }

  setUsername(name: string): void {
    this.validateCmd();

    this.cmd = this.cmd.replace(/--username .+? /, `--username ${name} `);
  }

  run(name: string): void {
    this.getLaunchCommand();
    this.setUsername(name);
    this.createLauncher(name);
  }
}
