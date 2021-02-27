<p>
  <a href="https://github.com/npalm/app-token-action/actions"><img alt="app-token-action status" src="https://github.com/npalm/app-token-action/workflows/build-test/badge.svg"></a>
</p>

# Action to get GitHub app installation token <!-- omit in toc -->

GitHub action to create an installation token for a GitHub app installed with scope org, user or repo.

## Motivation

Many actions requires access to the GitHub API, as long the required scope is within the [authorization](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token) of the GitHub action there is no issue. But in several cases actions requires a PAT token (personal access token) that have access to an org, user, or admin rights on a repo.

The downside of the PAT is clear, the token has the same access as the user that owns the token. Alternatively you can create a GitHub app and install the app to your user, org or specific repo. For the app you configure the access level to that user, org or repo in a more fine grained way then you can do with a PAT token.

This action let you easy create an app token in the workflow that you can pass to subsequent actions in the workflow for authorization against the GitHub API via an app. Se for example the [release flow](./.github/workflows/release.yml) in this repo.

## Usages

```yaml
      - uses: 040code/app-token-action
        id: app-token
        with:
          appId: <THE APP ID>
          appPrivateKeyBase64: ${{ secrets.APP_PRIVATE_KEY_BASE64 }}
          appInstallationType: <user | org | repo>
          appInstallationValue: <npalm | 040code | 040code/app-token-action>
      - uses: some-other-action
        with:
          token: ${{ steps.app-token.outputs.token }}
```


<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| - | - | - | - |
| appId | App id of the app to use. | `true` |  |
| appPrivateKeyBase64 | Base64 encoded private key of the app. | `true` |  |
| appInstallationType | Supported types are: org, user and repo | `true` |  |
| appInstallationValue | Depending on the type provide name of org, user or repo slug (owner/repo) | `true` |  |



<!-- action-docs-inputs -->
<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| - | - |
| token | GitHub app installation token |



<!-- action-docs-outputs -->
<!-- action-docs-runs -->
## Runs

This action is an `node12` action.


<!-- action-docs-runs -->


## License

This project are released under the [MIT License](./LICENSE).