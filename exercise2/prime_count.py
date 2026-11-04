"""Exercise 2 - sequential prime count (baseline)."""
import random
import sys
import time

SEED = 42            # fixed seed -> same data set in every program/run
N = 1_000_000        # number of random integers
LOW, HIGH = 1, 10_000_000


def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def gil_state():
    # sys._is_gil_enabled() only exists in Python 3.13+
    if hasattr(sys, "_is_gil_enabled"):
        return "enabled" if sys._is_gil_enabled() else "disabled"
    return "unknown (Python < 3.13)"


def main():
    print(f"Python: {sys.version.split()[0]}")
    print(f"GIL: {gil_state()}")

    print(f"Generating list of {N:,} random numbers (seed={SEED})...")
    random.seed(SEED)
    A = []
    for _ in range(N):
        A.append(random.randint(LOW, HIGH))
    print("List generated.")

    print("Starting count...")
    start = time.perf_counter()
    count = 0
    for x in A:
        if is_prime(x):
            count += 1
    elapsed = time.perf_counter() - start
    print("Count finished.")

    print(f"Workers: 1 (sequential)")
    print(f"Prime count: {count}")
    print(f"Elapsed time: {elapsed:.3f} s")


if __name__ == "__main__":
    main()
