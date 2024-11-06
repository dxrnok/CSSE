function MaxDef(a: int, b: int): int
{
    if a > b then a else b
}

function MinDef(a: int, b: int): int
{
    if a < b then a else b
}

method Max(a: int, b: int) returns (m: int)
    ensures m == MaxDef(a, b)
    //ensures a <= b ==> m == a
    //ensures a >= b ==> m == b
{
    // todo
    if(a >= b){
        m:= a;
    }else{
        m:= b;
        
    }
}

method Min(a: int, b: int) returns (m: int)
    ensures m == MinDef(a, b)
    //ensures a <= b ==> m == a
    //ensures a >= b ==> m == b
{
    // todo
    if(a <= b){
        m:= a;
    }else{
        m:= b;
        
    }
}


method {:main} Main()
{
    var x1 := Max(2,3);
    assert x1==3;

    var x2 := Max(2,2);
    assert x2==2;

    var x3 := Max(-1,-3);
    assert x3==-1;

    var y1 := Min(2, 3);
    assert y1 == 2;

    var y2 := Min(-4, 1);
    assert y2 == -4;

    var y3 := Min(0, 0);
    assert y3 == 0;
}