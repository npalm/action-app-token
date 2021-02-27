import nock from 'nock';
import { token } from '../src/token';

const defaults = {
  org: '040code',
  user: 'npalm',
  repo: 'npalm/action-app-token',
  privateKeyBase64:
    'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBc3dMWExYRVVnbmhCUnpXL240TWNIaUE4MkU4Z2RmRzBXdjdrUkJDenN3bUJvS2RPCllyWk42TENuWlpjSDFUSXUwM05HSzFLUDJTR1pvTmNOVmpRN0s0YksyOWhPU2oreGw4aDBMNnZnTUpsYmFSWjUKY2pDWmNMTmNsdUZNZTExanhtQjFoYmVDQ1p1c1JMUGkyTTJ0NWJxbFhjZVVxdmNJaUVoeldZZzhBR3c3cjFOVwozR3lacmMxYjB2elY0RThtZjA1R3lCaWFuMFBhRlNOOUx6UUhlQzNET1h0WmIvd2dwUlYyODRpRS83UUFMNzJYCjNFbWFlWCt6c3ZpKzNkUHRxR1FZaFFGeEk0WGo0d0tTSkh6dlhDTnJsQlYxSjhKbWhDTTJrZ0hmUFdOQ1lsbTgKL2ZPL0JnYm5iSVVBeFZrdDR2U29xVkRQOFBuVzBuVTBJY240S1FJREFRQUJBb0lCQVFDSzRYQkpyQXFLY252SwpvSE9MY0srMjI3SDQ2K0syUHBCN2JIZHlLemNQZHhlZnFVMlNIZmZ4eUdRRzJCYldtN2xpaVhOdUZ2N05LVmxFClJMUHZKbFNsbjB6eEpTOFFRYndwa3ZZNUtmS2tJY2Fla0RZbWxuZmt6UExQaC9uTFdCZ1poeXFHVkduSnhJSHgKUjFKK2U0d255QmVWMjBxSEhXTDhRS0ZsVytHWlBSTWZjdGdocm1jOWtJcnlCSCtwd1lNOWFnSDB6YjlJQStwSgpHbVg3amFucU91RW9YeDVISmZKZDNlS0Y1L3VDcCswa0Z2L2kxdGdTdGZuOFZUVElKODVoSnV4ZTZNQmdsN21iCm5XbVpvZnpITkc1UXR4bEVycWgreW8zWkR4OC9IMGs3QzNEYkJkZklRM0tkMXZRL21QMDZXYmZtMzVNNUFQVG4KYUhUbTJnMEJBb0dCQU5lL0Y5Q0daNFNxekM2Ui9RMENtUVhuR2R1bWZFR1YydUhVTWg0c3hIZWEyTUJiQklqQQowczNTWGdibU52dk5ITWhuampFR1N0S3E2S29xb1J5UEI0c0hKMk03WW1XODFWejZlbFRCQlljNTdOSGJRR2ZCClBOMnJhYW5zSjREd3JzdlBSVXU5c0tubjJIV3h0MjBiVTFMbzQyVkgvYlQ1dUpkZys5RXNZM1VKQW9HQkFOUnAKSHZHVS9TQ1htZHBTTWppUEtUSDNJYmVLd3VPOVdnamcvVGZFaGZXOTBkSFQ1UHNUcXNzc2F0Q0J3TmN3c0xuTQpZakdwdlY5WEFyaHJLMGswQThXSkt6TDYzQXZLeUhaQmxGcExNZmtweTNoVy9lVkhRK2lkQS90MzJxM1IzRXJtCmFnL0FzR0xtMU4wZUswMGN1aHh2R1dJY083S1Mrb3hQTkdxelkxSWhBb0dBYllINFk0YWxLcWpMQk9SakRtU0EKS1lmWkR5MmRLbWtXOWNPUVFOSzJVb05OZTYxM1NyYWRDWTI2M2tPaUt3TThsZGhDUzA0SFVwRWZrYWdicVBSTQpmdHY5dVJlZVpVZUpBUzIrUkNESlhvOGZUcEc4U2kzQ2FEMm1YM0tYeHBIa0YxMDRyaTQxYXJoY25iaThBdXg0CnliK2VGSDJMSUg0VW5QbkVON01STklrQ2dZQjlxTzdRZHBiRldFcUJtUXp5M3VhOUUzblQ3bmhiYUtMQ0MvQmgKdEphWGljTitRYi8rTldWZUt4bkozbWtxSlRqM3dnejVXblNZMlkzWGNqYzZhRll1MzNZNkE2UjRLWEFzWGFHWgpSVkQ4R1ppd3lhNE1uUHQwdXFjbmRvRmRRWUQwb3BsdVZrMURSVkg2dWlWZHlqZmtLR200M0FFSkpPQ3FieFVRClpxM0VZUUtCZ0V4UUtBcHlpcUx4ZXR4QzVTNU5aSXM4bGpCYlNGWHVsNkVCNG42VTlPZU04OEtMeCswUWdvN00KWmdGNmNxVEJOY0FNLy82bWZSU1ZWQkh1aFVkN1I0NmdZeXM4TDVKWmhnVU9JY1p5VStPN0hsNlpiZkZqKzFtTwo1S2tQQXhyUlVYbUg5VjQrMXhkNFBqYkNBYXpkczdvRndkbEJpTXp1ODVPSllZL1JYaXJrCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==',
  appId: 1234,
  apiEndpoint: 'https://api.github.com',
};

function mockGetInstallation(id: number, type: string, value: string): void {
  nock(defaults.apiEndpoint).persist().get(`/${type}/${value}/installation`).reply(200, { id: id });
}

function mockAppInstallationToken(id: number): void {
  nock(defaults.apiEndpoint)
    .persist()
    .post(`/app/installations/${id}/access_tokens`)
    .reply(200, { token: 'v1.mocked', expires_at: '9999-06-01T01:01:01Z', permissions: { issues: 'write' } });
}

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();

  mockAppInstallationToken(defaults.appId);
});

test('Get token for an org', async () => {
  mockGetInstallation(defaults.appId, 'orgs', defaults.org);
  const installationToken = await token({
    id: defaults.appId,
    privateKeyBase64: defaults.privateKeyBase64,
    installation: { type: 'org', value: defaults.org },
  });

  expect(installationToken).toBeDefined();
});

test('Get token for an user', async () => {
  mockGetInstallation(defaults.appId, 'users', defaults.user);
  const installationToken = await token({
    id: defaults.appId,
    privateKeyBase64: defaults.privateKeyBase64,
    installation: { type: 'user', value: defaults.user },
  });

  expect(typeof installationToken).toBe('string');
});

test('Get token for a repo', async () => {
  mockGetInstallation(defaults.appId, 'repos', defaults.repo);
  const installationToken = await token({
    id: defaults.appId,
    privateKeyBase64: defaults.privateKeyBase64,
    installation: { type: 'repo', value: defaults.repo },
  });

  expect(typeof installationToken).toBe('string');
});

test('Error for invalid formatted', async () => {
  mockGetInstallation(defaults.appId, 'repos', defaults.repo);
  await expect(
    token({
      id: defaults.appId,
      privateKeyBase64: defaults.privateKeyBase64,
      installation: { type: 'repo', value: 'invalid' },
    }),
  ).rejects.toThrow();
});
// shows how the runner will run a javascript action with env / stdout protocol
