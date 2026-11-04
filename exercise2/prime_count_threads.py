"""Exercise 2 - prime count with two threads."""
import random
import sys
import threading
import time

SEED = 42
N = 1_000_000
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


def count_primes(numbers, results, index):
    """Worker: count primes in its part and store the partial result."""
    count = 0
    for x in numbers:
        if is_prime(x):
            count += 1
    results[index] = count   # each thread writes its own slot -> no lock needed


def gil_state():
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

    half = N // 2
    first, second = A[:half], A[half:]      # 500,000 entries each
    results = [0, 0]
    t1 = threading.Thread(target=count_primes, args=(first, results, 0))
    t2 = threading.Thread(target=count_primes, args=(second, results, 1))

    print("Starting count with 2 threads...")
    start = time.perf_counter()
    t1.start()
    t2.start()          # start both before waiting
    t1.join()
    t2.join()           # wait until both are finished
    count = results[0] + results[1]
    elapsed = time.perf_counter() - start
    print("Count finished.")

    print(f"Workers: 2 threads")
    print(f"Partial counts: {results[0]} + {results[1]}")
    print(f"Prime count: {count}")
    print(f"Elapsed time: {elapsed:.3f} s")

    # Optional check against the sequential result (outside the timing):
    #   python3.13t prime_count_threads.py --verify
    if "--verify" in sys.argv:
        expected = sum(1 for x in A if is_prime(x))
        print(f"Sequential check: {expected} -> {'OK' if expected == count else 'MISMATCH'}")


if __name__ == "__main__":
    main()
