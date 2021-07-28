// https://leetcode.com/problems/jump-game-iii

using System;
using System.Collections.Generic;

namespace jumpgame
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Jump game");

            var exampleInputs = new[]
            {
                (new int[] { 4, 2, 3, 0, 3, 1, 2 }, 5),
                (new int[] { 4, 2, 3, 0, 3, 1, 2 }, 0),
                (new int[] { 3, 0, 2, 1, 2 }, 2),
            };

            foreach (var input in exampleInputs)
            {
                Console.WriteLine($"arr = [{string.Join(", ", input.Item1)}], start = {input.Item2}: {CanReachDynamic(input.Item1, input.Item2)}");
            }
        }

        /// <summary>
        /// Simple, recursive implementation
        /// </summary>
        public static bool CanReachRecursive(int[] arr, int start) => CanReachRecursive(arr, start, new SortedSet<int>());

        private static bool CanReachRecursive(int[] arr, int start, SortedSet<int> visited)
        {
            if (arr[start] == 0)
            {
                return true;
            }

            if (visited.Contains(start))
            {
                return false;
            }

            // TODO : Using a concurrent dictionary would allow this to be done asynchronously in parallel
            visited.Add(start);
            var left = start - arr[start];
            var right = start + arr[start];

            if (left >= 0 && CanReachRecursive(arr, left, visited))
            {
                return true;
            }

            if (right < arr.Length && CanReachRecursive(arr, right, visited))
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// Dynamic programming approach that uses a bit more memory (array of visited items) to save on execution time
        /// </summary>
        public static bool CanReachDynamic(int[] arr, int start)
        {
            var queued = new bool[arr.Length];
            var toVisit = new Queue<int>();

            toVisit.Enqueue(start);
            queued[start] = true;

            while (toVisit.Count > 0)
            {
                var index = toVisit.Dequeue();

                if (arr[index] == 0)
                {
                    return true;
                }

                queued[index] = true;

                var left = index - arr[index];
                if (left >= 0 && !queued[left])
                {
                    toVisit.Enqueue(left);
                    queued[left] = true;
                }

                var right = index + arr[index];
                if (right < arr.Length && !queued[right])
                {
                    toVisit.Enqueue(right);
                    queued[right] = true;
                }
            }

            return false;
        }
    }
}
