function Fib(n: nat): nat
{
    if n < 2 then n else Fib(n - 1) + Fib(n - 2)
}

method FibIter(n: nat) returns (x: nat)
    ensures x == Fib(n)
{
    if n < 2 {return n;}

    var y:= 0;  //Fib 0
    var z:= 1;  //Fib 1
    var i:= 2;  //Fib n>=2

    while i <= n
        invariant i <= n + 1
        invariant z == Fib(i-1)
        invariant y == Fib(i-2)
    {
        var tmp:= y+z;
        y:= z;
        z:= tmp;
        i:= i+1;
    }   
    x:= z;
}

method {:test} TEST()
{
    var x := FibIter(5);
    assert x == 5;

    var y :=  FibIter(7);
    assert y == 13;

    var z := FibIter(0);
    assert z == 0;

    var j := FibIter(67);
    assert j == 44945570212853;
}