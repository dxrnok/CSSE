function pow2(n: nat): nat
{
    if n == 0 then
        1
    else
        2 * pow2(n-1)
}

function PowF(a: int, n: nat): int
    //decreases n
{
    if n == 0 then
        1
    else
        a * PowF(a, n-1)
}

method {:main} Main()
{
    var x := pow2(0);
    assert x == 1;

    var y := pow2(2);
    assert y == 4;

    var v := pow2(3);
    assert v == 8;
}