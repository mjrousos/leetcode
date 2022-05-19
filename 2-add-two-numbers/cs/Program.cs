// https://leetcode.com/problems/add-two-numbers/

using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

var sln = new IterativeSolution();

var a = new ListNode(2, new ListNode(8, new ListNode(5, null)));
var b = new ListNode(5, new ListNode(3, null));

Console.WriteLine($"{sln.AddTwoNumbers(a, b)}");

var summary = BenchmarkRunner.Run<TestClass>();

public class TestClass
{
    private IterativeSolution IterativeSolution = new(); 
    private RecursiveSolution RecursiveSolution = new();

    List<ListNode> Inputs = new List<ListNode>();

    [GlobalSetup]
    public void Setup()
    {
        var listNode = new ListNode(5);
        for (var i = 0; i < 1000; i++)
        {
            Inputs.Add(listNode);
            listNode = new ListNode(i % 10, listNode);
        }
    }

    [Benchmark]
    public void RecursiveTest()
    {
        foreach (var a in Inputs)
            foreach (var b in Inputs)
                RecursiveSolution.AddTwoNumbers(a, b);
    }

    [Benchmark]
    public void IterativeTest()
    {
        foreach (var a in Inputs)
            foreach (var b in Inputs)
                IterativeSolution.AddTwoNumbers(a, b);
    }
}

public class ListNode
{
    public int val;
    public ListNode? next;

    public ListNode(int val = 0, ListNode? next = null)
    {
        this.val = val;
        this.next = next;
    }

    public override string ToString()
    {
        return $"{val}{(next is null ? string.Empty : ", " + next.ToString())}";
    }
}