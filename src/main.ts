import * as core from '@actions/core';
import { token } from './token';

async function run(): Promise<void> {
  try {
    const appId: number = parseInt(core.getInput('appId', { required: true }));
    const appPrivateKeyBase64: string = core.getInput('appPrivateKeyBase64', { required: true });
    const appInstallationType = core.getInput('appInstallationType', { required: true }) as 'org' | 'user' | 'repo';
    const appInstallationValue = core.getInput('appInstallationValue', { required: true });

    const installationToken: string = await token({
      id: appId,
      installation: { type: appInstallationType, value: appInstallationValue },
      privateKeyBase64: appPrivateKeyBase64,
    });

    core.setOutput('token', installationToken);
  } catch (error) {
    core.debug((error as Error).message);
    core.setFailed((error as Error).message);
  }
}

run();
