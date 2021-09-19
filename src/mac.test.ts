import { Mac } from './mac';

describe('mac tests', () => {
  it('gets launch command', () => {
    const mac = new Mac();
    mac.getLaunchCommand = jest.fn();
    mac.validateCmd = jest.fn();
    mac.getDirs = jest.fn();
    mac.copyDir = jest.fn();
    mac.run('x');
    expect(mac.getLaunchCommand).toBeCalled();
  });
});
