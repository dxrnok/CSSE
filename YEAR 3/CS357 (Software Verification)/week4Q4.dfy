method swap(a: array<int>, i: nat, j: nat)
    modifies a

    // requires relationship between i and a.Length
    // requires relationship between j and a.Length
    requires i < a.Length
    requires j < a.Length
    ensures a[i] == old(a[j])
    ensures a[j] == old(a[i])
{
    if(i != j){
        var k := a[i];
        a[i] := a[j];
        a[j] := k;
    }
}

method {:main} TestSwap()
{
    var a := new int[] [1, 2, 3, 4];

    assert a[1] == 2 && a[3] == 4;
    swap(a, 1, 3);
    assert a[1] == 4 && a[3] == 2;
}