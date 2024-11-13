method SumFirst(n: nat) returns (sum: nat)
    ensures sum == n * (n + 1) / 2
{
    var i:= 0;
    sum:= 0;
    while i < n
        invariant i <= n
        invariant sum == i * (i + 1) / 2
    {
        i := i + 1;
        sum := sum + i;
    }
}