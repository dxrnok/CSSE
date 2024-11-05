method Smallest(a: array<int>) returns (minIndex: nat)
    requires a.Length > 0
    ensures 0 <= minIndex < a.Length
{
    var i:= 1;
    minIndex:= 0;

    while i < a.Length
        invariant minIndex < a.Length
        invariant i <= a.Length
        invariant forall j | 0 <= j < i :: a[j] >= a[minIndex]
    {
        if(a[i] < a[minIndex]){
            minIndex:= i;
        }
        i:= i+1;
    }
}

method {:main} Test()
{
    var a1 := new int[] [9, 4, 6, 3, 8];
    var a2 := new int[] [3, 3, 1, 3];
    var a3 := new int[] [1, 2, 3, 4];
    var a4 := new int[] [0];

    var b3 := Smallest(a3);
    assert b3 == 0;

    var b4 := Smallest(a4);
    assert b4 == 0;
}