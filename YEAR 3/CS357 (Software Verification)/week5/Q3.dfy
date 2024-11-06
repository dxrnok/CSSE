function PowF(a: int, n: nat): int
    //decreases n
{
    if n == 0 then
        1
    else
        a * PowF(a, n-1)
}

method Pow(a: int, n: nat) returns (result: int)
    // needs postcondition
    //ensures result > 0
    ensures result == PowF(a, n)
{
    // todo
    if n == 0 
    {
        result:= 1;
    } else {
        var i := 0;
    }
    result := 1;
    var i := 0;
    while i < n
        invariant 0 <= i <= n
        invariant result == PowF(a, i)
        // needs another invariant
    {
        // todo
        result := result * a;
        i := i + 1;
    }
}

method {:main} Main()
{
    var x := Pow(2,0);
    assert x == 1;

    var y := Pow(-1, 2);
    assert y == 1;

    var v := Pow(2, 2);
    assert v == 4;
}