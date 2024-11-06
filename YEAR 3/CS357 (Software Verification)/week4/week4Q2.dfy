method Min(a: int, b: int) returns (m: int)
    ensures a <= b ==> m == a
    ensures a >= b ==> m == b
{
    // todo
    if(a <= b){
        m:= a;
    }else{
        m:= b;
        
    }
}

method {:test} TestMin()
{
    var x := Min(2, 3);
    assert x == 2;

    var y := Min(-4, 1);
    assert y == -4;

    var z := Min(0, 0);
    assert z == 0;
}