import { Octokit } from '@octokit/rest';

export interface AppInstallation {
  type: 'user' | 'org' | 'repo';
  value: string;
}

interface Installation {
  getInstallationId(ocktokit: Octokit): Promise<number>;
}
class UserInstallation implements Installation {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  async getInstallationId(ocktokit: Octokit): Promise<number> {
    const result = await ocktokit.apps.getUserInstallation({
      username: this.value,
    });

    return result.data.id;
  }
}

class OrgInstallation implements Installation {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  async getInstallationId(ocktokit: Octokit): Promise<number> {
    const result = await ocktokit.apps.getOrgInstallation({
      org: this.value,
    });

    return result.data.id;
  }
}

class RepoInstallation implements Installation {
  repo: string;
  owner: string;

  constructor(value: string) {
    const values = value.split('/');
    if (values.length !== 2) throw new Error(`The value '$(value)' is not valid for installation type repo.`);

    this.owner = values[0];
    this.repo = values[1];
  }

  async getInstallationId(ocktokit: Octokit): Promise<number> {
    const result = await ocktokit.apps.getRepoInstallation({
      owner: this.owner,
      repo: this.repo,
    });

    return result.data.id;
  }
}

export async function getInstallationId(appInstallation: AppInstallation, octokit: Octokit): Promise<number> {
  switch (appInstallation.type) {
    case 'org': {
      return new OrgInstallation(appInstallation.value).getInstallationId(octokit);
    }

    case 'user': {
      return new UserInstallation(appInstallation.value).getInstallationId(octokit);
    }

    case 'repo': {
      return new RepoInstallation(appInstallation.value).getInstallationId(octokit);
    }
  }
}
