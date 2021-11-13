+++
title = "Zola on github Pages"
description = "Deploy your Zola generated website to github pages"
date = 2021-11-11
[taxonomies]
categories=["development"]
tags=["github", "zola"]
[extra]
toc = true
[extra.author]
name = "Joachim maggle"
avatar = "/img/tchartron.png"
+++

# Deploy a zola site to GitHub pages

This will explain how to deploy a website created with [Zola](https://www.getzola.org/) SSG to github pages and host it for free.

## Requirements 

- Github account
- Ready to deploy Zola website (as git repository)
- (Optional) Domain name

## Steps

1. Create a github reposity with this form : <username>.github.io and make it public
2. Create a simple README.md file to describe your project.
3. Add this repository which will be used to host the website as a git submodule of your Zola website.

```bash
cd my-zola-website
git submodule add -b main git@github.com:<username>/<username>.github.io.git public
```
This added the repository we created as a submodule in the `public` folder.

4. Now go back to the root of the Zola website and copy this [script](https://github.com/tchartron/tchartron-zola/blob/main/deploy-github.sh) as `deploy.sh` and make it executable

```bash
cd ..
touch deploy.sh

#deploy.sh content
#!/usr/bin/env bash

# If a command fails then the deploy stops
set -e

if [ -d "public" ]
then
    echo -e "\033[0;32mRemoving public folder except .git and README.md and CNAME \033[0m\n"
    cd public
    find . -not -name '.git' -not -name 'README.md' -not -name 'CNAME' -delete
    cd ..
fi

echo -e "\033[0;32mDeploying updates to GitHub pages repository\033[0m\n"
# Build the project to another directory because zola will delete the submodule /public otherwise
zola build --output-dir public_zola
#Now copy built files to public directory
cp -a public_zola/* public/
rm -rf public_zola

echo -e "\033[0;32mCommit change to main repository\033[0m\n"
git add .
git commit -m "update"
git push origin main

# Go To Public folder
cd public

# Add changes to git.
git add .

# Commit changes.
msg="update site content $(date)"
if [ -n "$*" ]; then
    msg="$*"
fi
git commit -m "$msg"
# Push source
git push origin main
```

5. Now deploy your website to https://<username>.github.io with this simple command : `./deploy.sh "update site content"`.
This will remove the previous version of the website locally, then commit all changes

## Set up a custom domain name

1. Go to your domain name provider DNS zone configuration
2. Add A entry pointing to one of github pages IP addresses : 185.199.108.153 [list here]((https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain))
3. In your github <username>.github.io repository go to Settings >> Pages >> In Custom Subdomain enter subdomain (example : mydomain.com)
4. In you DNS zone configuration i recommend adding another entry to use `www.mydomain.com` also.
5. Add CNAME entry example : www.mydomain.com >> <username>.github.io. (don't forget final dot for absolute notation)

## Troubleshooting
If a submodule was previously added and throws an error like : "A git directory for 'public' is found locally with remote(s)" you can do this

```bash
rm -rf public
# Delete the relevant lines from the .gitmodules
git rm --cached public
rm -rf .git/modules/public
# Then re add the submodule
git submodule add -b main git@github.com:<username>/<username>.github.io.git public
```

