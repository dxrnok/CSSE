method Max(a: int, b: int) returns (m: int)
    ensures a <= b ==> m == b 
    ensures a >= b ==> m == a
{
    // todo
    if(a >= b){
        m:= a;
    }else{
        m:= b;
    }
}

method {:test} TestMax()
{
    var x := Max(2, 3);
    assert x == 3;

    var y := Max(-4, 1);
    assert y == 1;

    var z := Max(0, 0);
    assert z == 0;

    var w := Max(-1, -3);
    assert w == -1;
}