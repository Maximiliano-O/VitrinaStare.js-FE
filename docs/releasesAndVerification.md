# StArE.js Platform Upload and Verificatión Guide

This is the general publication and verification process of the StArE.js Platform.

### Repository Publication

At this stage there is no community verification, the main requirement will be that the given repository URL must be of a GitHub repository that exists, this will be checked by the platform.

## Before the Release Publication

Once the user has registered a repository on the platform, they will be able to register releases for that repository.

The platform is designed to work with CodeSandbox, so in other to avoid any posterior modifications to releases, each specific release is associated to a specific commit.

The user will have to upload codesandbox URL with that specific release. The process is as follows:

Example:

```bash
"https://github.com/User/Repository/commit/a2e76df76sd5sf84gycxvbs8w"
```

Here we have the commit URL associated to a specifc repository.

In this case, by replacing "commit" in the URL with "tree", and replacing "github" with "githubbox", the user will be able to access a CodeSandbox instance using that specific commit as a basis.

```bash
"https://githubbox.com/User/Repository/tree/a2e9fe26345baa2e801308606d1127fd32d36877"
```

It is adviced for users to test the release themselves on Codesandbox before registering the release on the platform, as it may display different behaviour to running locally on a machine.

The CodeSanbox URL should be the one submitted on the release form.

## After the Release Publication

Once the user submits a release, a N number of users defined on the .env file (Not including the Author), will be selected as verifiers, and they will have to either approve or reject the content of that specific release.

The rejection could be made because the content is not related to StArE.js or because it contains inappropiate content.

If over 50% of the verifiers approve, the release is marked as "Verified", and if it is the first verified release of a repository, the whole repository is marked as "Verified".

If over 50% of the verifiers reject, then the specific release is deleted.


This system allows for the community to regulate the content by itself instead of designating moderators.
