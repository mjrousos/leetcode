// https://leetcode.com/problems/add-two-numbers/

public class ModifiedRecursiveSolution
{
    public ListNode AddTwoNumbers(ListNode l1, ListNode l2)
    {
        return AddTwoNumbers(l1, l2, 0);
    }

    private ListNode? AddTwoNumbers(ListNode? l1, ListNode? l2, int carry)
    {
        if (l1 == null && l2 == null && carry != 1)
        {
            return null;
        }
        var value = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
        return new ListNode(value % 10, AddTwoNumbers(l1?.next, l2?.next, value / 10));
    }
}
