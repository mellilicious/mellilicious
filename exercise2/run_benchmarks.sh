#!/usr/bin/env bash
# Runs every program 3x with GIL on and off; output goes to results.txt
PY=python3.13t
cd "$(dirname "$0")"
{
  $PY -VV
  for gil in 1 0; do
    for prog in prime_count.py prime_count_threads.py prime_count_improved.py; do
      for run in 1 2 3; do
        echo "===== PYTHON_GIL=$gil  $prog  run $run ====="
        { time env PYTHON_GIL=$gil $PY "$prog" ; } 2>&1
      done
    done
  done
} 2>&1 | tee results.txt
