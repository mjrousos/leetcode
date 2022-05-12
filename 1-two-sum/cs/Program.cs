// https://leetcode.com/problems/two-sum/

var solver = new Solution();
var solution = solver.TwoSum(new [] {2, 7, 11, 15}, 9);
Console.WriteLine($"{solution[0]}, {solution[1]}");

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var goalIndexes = new Dictionary<int, short>();
        goalIndexes[nums[0]] = 0;
        for (var i = 1; i < nums.Length; i++)
        {
            var goal = target - nums[i];
            if (goalIndexes.ContainsKey(goal))
            {
                return new [] {i, goalIndexes[goal]};
            }
            goalIndexes[nums[i]] = (short)i;
        }

        throw new ArgumentException("No valid solution");
    }
}