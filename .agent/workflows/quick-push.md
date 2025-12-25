---
description: Quickly commit and push changes to GitHub
---

# Quick Push Workflow

This workflow helps you quickly commit and push your changes to GitHub.

## Steps

// turbo
1. **Stage all changes**
```bash
cd /Users/mac/Documents/pwork && git add .
```

2. **Commit with a message**
```bash
cd /Users/mac/Documents/pwork && git commit -m "your commit message here"
```

// turbo
3. **Push to GitHub**
```bash
cd /Users/mac/Documents/pwork && git push origin main
```

## Quick One-Liner

For convenience, you can do all three steps at once:

```bash
cd /Users/mac/Documents/pwork && git add . && git commit -m "Update" && git push origin main
```

## Tips

- Customize the commit message to describe your changes
- Use `git status` to see what files have changed
- Use `git log` to see commit history
- Use `git pull` before pushing if working with others
