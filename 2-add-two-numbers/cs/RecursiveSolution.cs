// https://leetcode.com/problems/add-two-numbers/

public class RecursiveSolution
{
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2)
    {
        return AddTwoNumbers(l1, l2, 0);
    }

    private ListNode? AddTwoNumbers(ListNode? l1, ListNode? l2, int carry)
    {
        // Micro-optimization: The if statement is arranged the way it is (and not
        // inverted) because || can be faster than && if the first condition is often true.
        if (l1 != null || l2 != null || carry == 1)
        {
            var value = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
            return new ListNode(value % 10, AddTwoNumbers(l1?.next, l2?.next, value / 10));
        }

        return null;
    }
}
