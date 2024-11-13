method Smallest(a: array<int>) returns (minIndex: nat)
    requires a.Length > 0
    ensures 0 <= minIndex < a.Length

{
    var i:= 1;
    minIndex:= 0;

    while i < a.Length
        invariant minIndex < a.Length
        invariant i <= a.Length
    {
        if(a[i] < a[minIndex]){
            minIndex:= i;
        }
        i:= i+1;
    }
}