---
title: Automating a Full-Stack Multi-Environment Deployment Pipeline
description: Let's figure out how to automate the deployment of a full stack project using tailored configurations for different environments, without increasing developer workload or technical debt
image: /images/blog/quinten-de-graaf-pipelines.jpg
tags: devops, cicd, automation, webdev
created: 1731610486
lastUpdated:
---

I have a confession to make, I am not great at remembering all the different deployment checks and publishing chores for each of my projects. It's embarrassing, I know. Now that the aire has been cleared, let's find a way to compensate for my shortcomings.

In my latest project, I'll set up a full-stack multi-environment deployment pipeline using [GitHub Actions](https://github.com/features/actions). This has been so incredibly useful, I decided to share some details about why I chose this configuration and the benefits of this approach:

## But Why?

<img className="post-inline-image" alt="But Why?" width="300" src="/images/blog/but-why.jpg#right" >
For my project, I needed a safe space to test code changes before they went live. Local development is great, but can be a pain for applications hosted on multiple environments. Staging is also a valuable platform for stakeholder reviews, allowing crucial feedback during all phases of implementation. This facilitates managing stakeholder expectations and early identification of potential issues.

## Designing My Pipeline

I organized my repository with separate branches to accommodate each environment: main for production and develop for staging. Don't forget, this is a full-stack app, with front and backend hosted on different environments. This pipeline uses two Sync-to-FTP actions to deploy both front and backend to their respective servers. I shake my head when I think about all the time I wasted doing this manually.

To control each environment independently, we can use environment-specific configurations. My staging environment uses a separate database, different API keys, and its own settings. GitHub Actions made handling these environment variables and secrets simple. I used repository secrets for sensitive information and environment variables for things that varied between environments, like API endpoints.

Conditional job execution allowed workflows to run differently depending on the branch. Staging can run a full suite of tests, providing confidence in the stability of the codebase. Production only gets a quick smoke test. To make it easier to inspect and debug code in the browser console, I disabled minification and enabled sourcemaps on the staging environment for the front-end. On production, minification was enabled to optimize performance and debug logging disabled to prevent accidental leaking of sensitive user data.

## Access Control

One key benefit of this approach is access control. By granting developers access to specific branches, they automatically gain the ability to trigger deployments to the corresponding environments. Instead of juggling individual logins or shared credentials for each environment's hosting platform, I could manage access at the repository branch level. This not only streamlined onboarding and offboarding but also significantly improved security.

## Deployment Workflow Structure

Workflows are triggered by pushes to the relevant branches. In my workflow, a push to develop triggers the staging deployment, and a push to main triggers the production deployment.

The front-end build process uses `npm run build` which runs the Vite build process for the front end, but other build tools will also work here. On staging we add the `--config vite.dev.config.js` flag to customize build options. The back-end build uses a generic `composer install` action, which could be customized further.

Here's a more detailed snippet, tying it all together:

```YAML
name: Deploy Main to LIVE FTP
on:
  push:
    branches:
      - main
jobs:
  FTP-Deploy-Action:
    name: Deploy to LIVE Action
    runs-on: ubuntu-latest
    steps:
    - name: Get latest code
      uses: actions/checkout@v4

    - name: Use Node.js 18
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Build Front
      run: |
        npm install
        npm run build
      working-directory: ./front/

    - name: Sync Front Files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5
      with:
        server: ##.###.##.###
        username: ftpuser
        password: ${{ secrets.ftp_password }}
        protocol: ftps
        local-dir: ./front/
        server-dir: /front/

    - name: Setup PHP
      uses: "shivammathur/setup-php@v2"
      with:
        php-version: "latest"

    - name: Build Backend
      uses: "ramsey/composer-install@v3"
      with:
        working-directory: ./back/

    - name: Sync Back Files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5
      with:
        server: ##.###.##.###
        username: ftpuser
        password: ${{ secrets.ftp_password }}
        protocol: ftps
        local-dir: ./back/
        server-dir: /back/
```

## To be continued...

This multi-environment deployment pipeline has been working great. The simplified access control and the ability to customize build processes for each environment have made deployments much easier and faster, freeing me up for other stuff. I no longer need to remember all the processes and details required to safely publish projects that use this approach. There are lots of ways I plan on building on this in the future.

### Related Links

- [Official Documentation:](https://docs.github.com/en/actions) From Github
- [Using secrets in GitHub Actions:](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) From Github
