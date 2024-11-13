function gcd(a: int, b: int): int
    requires a > 0 && b > 0
    decreases a+b
{
    if a == b then
      a
    else if b > a then
      gcd(b - a, a)
    else
      gcd(b, a - b)
}

method {:main} Main()
{
    var x := gcd(2,2);
    assert x == 2;

    var y := gcd(6, 12);
    assert y == 6;

    var v := gcd(7, 16);
    assert v == 1;
}
