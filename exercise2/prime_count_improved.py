"""Exercise 2 - improved version.

Changes compared to prime_count_threads.py:
 1. Number of workers = number of CPU cores (instead of fixed 2).
    Run with:  python3.13t prime_count_improved.py [workers]
 2. Faster is_prime: upper bound computed once with math.isqrt()
    instead of computing i * i in every loop iteration; local variables only.
 3. Counting with sum(map(...)) instead of a Python for loop with count += 1
    (less bytecode per element).
 4. Even numbers are filtered out cheaply before calling is_prime
    (about half of all values), except 2.
Same seed and same data -> prime count must be identical to the baseline.
"""
import math
import os
import random
import sys
import threading
import time

SEED = 42
N = 1_000_000
LOW, HIGH = 1, 10_000_000


def is_prime(n):
    if n <= 3:
        return n > 1
    if n % 2 == 0 or n % 3 == 0:
        return False
    limit = math.isqrt(n)
    i = 5
    while i <= limit:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def count_primes(numbers, results, index):
    # odd numbers or the number 2 are the only candidates
    results[index] = sum(map(is_prime, (x for x in numbers if x & 1 or x == 2)))


def gil_state():
    if hasattr(sys, "_is_gil_enabled"):
        return "enabled" if sys._is_gil_enabled() else "disabled"
    return "unknown (Python < 3.13)"


def main():
    workers = int(sys.argv[1]) if len(sys.argv) > 1 else (os.cpu_count() or 2)
    print(f"Python: {sys.version.split()[0]}")
    print(f"GIL: {gil_state()}")

    print(f"Generating list of {N:,} random numbers (seed={SEED})...")
    random.seed(SEED)
    A = [random.randint(LOW, HIGH) for _ in range(N)]
    print("List generated.")

    # split into `workers` nearly equal parts
    size = math.ceil(N / workers)
    parts = [A[k:k + size] for k in range(0, N, size)]
    results = [0] * len(parts)
    threads = [threading.Thread(target=count_primes, args=(p, results, k))
               for k, p in enumerate(parts)]

    print(f"Starting count with {len(threads)} threads...")
    start = time.perf_counter()
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    count = sum(results)
    elapsed = time.perf_counter() - start
    print("Count finished.")

    print(f"Workers: {len(threads)} threads")
    print(f"Prime count: {count}")
    print(f"Elapsed time: {elapsed:.3f} s")


if __name__ == "__main__":
    main()
