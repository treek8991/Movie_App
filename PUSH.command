#!/usr/bin/env bash
# ============================================================================
# PUSH.command  --  01_Projects/20_Movie_App/code
# Double-click to commit and push THIS project only.
#
# Stages everything, commits with the correct GitHub identity, pushes to the
# branch you are on. If this project has no GitHub repo yet, it creates one.
# If you are on a feature branch it says so loudly, because a feature-branch
# push does NOT trigger a Vercel production deploy.
#
# The logic lives in TealApexGroup_Dev/_tools/tealapex_push_engine.sh. Every
# project shares that one file, so a fix there fixes every project at once.
# To push the whole portfolio instead, double-click
# TealApexGroup_Dev/PUSH_ALL_TEALAPEX.command
#
# From Terminal instead (never needs the executable bit):
#   bash "/Users/tealapexgroup/TealApexGroup_Dev/01_Projects/20_Movie_App/code/PUSH.command"
# Options:  --dry (preview)   --msg "text"   --yes (no prompt)
# ============================================================================
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"

# Find the engine by walking up to the TealApexGroup_Dev root. This keeps
# working if the project folder is ever moved or renamed.
ENGINE=""
d="$HERE"
while [ "$d" != "/" ]; do
  if [ -f "$d/_tools/tealapex_push_engine.sh" ]; then ENGINE="$d/_tools/tealapex_push_engine.sh"; break; fi
  d="$(dirname "$d")"
done
[ -z "$ENGINE" ] && [ -f "/Users/tealapexgroup/TealApexGroup_Dev/_tools/tealapex_push_engine.sh" ] && ENGINE="/Users/tealapexgroup/TealApexGroup_Dev/_tools/tealapex_push_engine.sh"

if [ -z "$ENGINE" ]; then
  echo "Could not find _tools/tealapex_push_engine.sh above this folder."
  echo "Expected at: /Users/tealapexgroup/TealApexGroup_Dev/_tools/tealapex_push_engine.sh"
  [ -t 0 ] && read -r -p "Press ENTER to close."
  exit 1
fi

bash "$ENGINE" --repo "$HERE" "$@"
STATUS=$?
echo ""
[ -t 0 ] && read -r -p "Done. Press ENTER to close this window."
exit $STATUS
