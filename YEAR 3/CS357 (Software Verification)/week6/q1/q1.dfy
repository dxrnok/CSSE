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

method {:test} TestSumFirst()
{
    var x := SumFirst(10);
    assert x == 55;

    var y :=  SumFirst(1);
    assert y == 1;

    var z := SumFirst(0);
    assert z == 0;
}