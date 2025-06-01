---
title: How to Move Commits to a New Branch When Committed to Wrong Branch
description: ""
pubDate: 2025-06-01T01:57:00.769Z
image: ""
categories: ["Git"]
---

Sometimes you make the mistake of committing to the wrong branch while working. Here's how to resolve the situation when you should have created a new branch from `develop` but accidentally committed to `branch-a`.

## Example Situation
- `branch-a` is an existing branch with previous work
- `develop` is the base branch where you intended to start new work
- You accidentally committed to `branch-a`
- You haven't pushed with `git push` yet

## Goal
- Move the current commit to a new branch based on `develop`
- Restore `branch-a` to its state before the commit

## Step-by-Step Procedure

### 1. Check Recent Commit Hash
```bash
git log --oneline
```
Copy the hash value of the topmost commit.  
Example: `abc1234`

### 2. Create New Branch from develop
```bash
git checkout develop
git checkout -b new-feature-branch
```

### 3. Bring Commit to New Branch
```bash
git cherry-pick abc1234
```

### 4. Remove Commit from branch-a
```bash
git checkout branch-a
git reset --hard HEAD~1
```
※ For multiple commits use `HEAD~2` or `HEAD~3` or use `git rebase -i`.

## Work Summary
| Task | Command |
|------|---------|
| Check commit hash | `git log --oneline` |
| Create new branch | `git checkout -b new-feature-branch develop` |
| Move commit | `git cherry-pick <commit-hash>` |
| Reset original branch | `git reset --hard HEAD~1` |

## Alternative Methods

### Method 1: Create and Checkout Branch in One Command
```bash
git checkout -b new-feature-branch develop
```

### Method 2: Handle Multiple Commits at Once
```bash
# Cherry-pick multiple commits
git cherry-pick abc1234^..def5678
# Specify range
git cherry-pick abc1234~3..abc1234
```

### Method 3: Using Interactive Rebase
```bash
git checkout branch-a
git rebase -i HEAD~n  # n is the number of commits to roll back
```

## Important Notes
- This method can only be used safely **before pushing**
- If already pushed use methods like `git revert` or `reflog` or `reset --hard origin/branch`