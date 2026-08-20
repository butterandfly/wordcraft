---
name: git-workflow
description: Enforces user confirmation before any git commit and git push operations.
always_on: true
---

# Git 提交流程规范

- **在执行任何 `git commit` 或 `git push` 操作前，必须先向用户询问并列出本次提交的改动概要，等待用户明确确认后再执行。**
- 未经用户显式同意，严禁擅自自动执行 commit 和 push。
