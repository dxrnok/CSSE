method {:main} TestAbs()
{
    var x := Abs(-3);
    assert x >= 0;  // ✗ fails
}

method Abs(x: int) returns (result: int)
    requires -10 < x < 10
    ensures result >= 0  // ✓ succeeds
{
    if x < 0 {
        result := -x;
    } else {
        result := x;
    }
}