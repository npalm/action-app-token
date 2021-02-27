import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';
import { AppInstallation, getInstallationId } from './installation';

interface Options {
  id: number;
  privateKeyBase64: string;
  installation: AppInstallation;
}

export async function token(options: Options): Promise<string> {
  const privateKey = Buffer.from(options.privateKeyBase64, 'base64').toString();

  const authAuth = createAppAuth({
    appId: options.id,
    privateKey,
  });

  const auth = await authAuth({
    type: 'app',
  });

  const octokit = new Octokit({ auth: auth.token });
  const installationId = await getInstallationId(options.installation, octokit);

  return (
    await createAppAuth({
      appId: options.id,
      privateKey,
      installationId,
    })({ type: 'installation' })
  ).token;
}
