#!/usr/bin/env bash

# If a command fails then the deploy stops
set -e

if [ -d "public" ]
then
    printf "\033[0;32mRemoving public folder except .git and README.md and CNAME \033[0m\n"
    cd public
    find . -not -name '.git' -not -name 'README.md' -not -name 'CNAME' -delete
    cd ..
fi

printf "\033[0;32mDeploying updates to GitHub pages...\033[0m\n"

# Build the project.
zola build --output-dir public_zola

cp public_zola/* public/

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
