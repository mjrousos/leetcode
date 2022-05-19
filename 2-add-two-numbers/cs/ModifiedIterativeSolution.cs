// https://leetcode.com/problems/add-two-numbers/

public class ModifiedIterativeSolution
{
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2)
    {
        // Initialize next value, carry, and ret variables
        var nextVal = l1.val + l2.val;
        var ret = new ListNode(nextVal % 10, null);
        var carry = nextVal > 9;

        // Track ret's tail separate so that ret can be returned
        // Advance l1, l2, and tail to the end of their lists
        var tail = ret;
        l1 = l1?.next;
        l2 = l2?.next;

        // Micro-optimization? How much does the order of the conditions in the while condition
        // matter? Presumably the more likely to be true ones should be first but if the latter
        // statements are quick to evaluate, does it matter?
        while (carry || l1 != null || l2 != null)
        {
            nextVal = (l1?.val ?? 0) + (l2?.val ?? 0) + (carry ? 1 : 0);
            tail.next = new ListNode(nextVal % 10, null);
            carry = nextVal > 9;
            tail = tail.next;
            l1 = l1?.next;
            l2 = l2?.next;
        }

        return ret;
    }
}
