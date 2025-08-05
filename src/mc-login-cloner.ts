import prompt from 'prompt';
import pressAnyKey from 'press-any-key';
import { Mac } from './mac';
import { Win } from './win';
import { workingDir } from './util';

function getPlatformSpecificCloner() {
  switch (process.platform) {
    case 'darwin':
      return Mac;
    case 'win32':
      return Win;
    default:
      throw new Error('No cloner for this platform');
  }
}

async function promptUsername() {
  console.log(
    `MC Login Cloner
  
This program will change your username in the launch command. This allows you to play using a different username on servers that do not verify identity. This can be useful for LAN play.

[!] First launch the game using the launcher and keep it running while this program does it's job.

What username do you want?`,
  );

  const { username } = await prompt.get({
    properties: {
      username: {
        pattern: /^[a-zA-Z0-9]+$/,
        message: 'Use only letters and numbers',
        required: true,
      },
    },
  });
  return username;
}

async function promptRam() {
  console.log(`Do you want to change the default RAM usage from 2 to 4 GB? (Y/n) (This will replace -Xmx2G with  -Xmx4G, recommended for Distant Horizons mod)`);

  const {updateRam} = await prompt.get({
    properties: {
      updateRam: {
        pattern: /^[yn]$/i,
        message: 'Use Y or N',
        default: 'y',
        required: false,
      }
    }
  });
  return updateRam.toLowerCase() === 'y'
}

async function run() {
  try {
    const name = await promptUsername();
    const updateRam = await promptRam();
    const cloner = new (getPlatformSpecificCloner())();

    cloner.run(name, updateRam);

    console.log(
      `Success! You can now run the launch_${name} script to start the game. You can find it in this directory: ${workingDir()}`,
    );
  } catch (e) {
    console.error(`${e}`);
  }
  await pressAnyKey('Press any key to quit this program...');
}

run();
