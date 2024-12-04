function SumTo(a: array<int>, i: nat): int
    reads a
    requires 0 <= i <= a.Length
{
    if i == 0 then 0 else SumTo(a, i - 1) + a[i - 1]
}

method CumulativeSum(a: array<int>)
    modifies a
{
    var sum := 0;
    for i := 0 to a.Length
        invariant 0 <= i <= a.Length
        invariant sum == SumTo(a, i)
    {
        sum := sum + a[i];
    }
}