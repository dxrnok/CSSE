function SumTo(a: array<int>, i: nat): int
    reads a
    requires 0 <= i <= a.Length
{
    if i == 0 then 0 else SumTo(a, i - 1) + a[i - 1]
}

method CumulativeSum(a: array<int>)
    // needs modifies clause and postcondition
    modifies a
    requires a != null
    requires a.Length > 1
    ensures forall i :: 0 <= i < a.Length ==> a[i] == SumTo(a, i)
    
{
    // todo
    var i:=0;
    //var sum:= 0;
    
    while i < a.Length
        invariant 0 <= i <= a.Length
        //invariant sum == SumTo(a, i)
        invariant forall j :: 0 <= j < i ==> a[j] == SumTo(a, j)
    {
        //sum:= SumTo(a, i);
        a[i]:= SumTo(a, i);
        i:= i+1;
    }
}

/* 
function SumTo(a: array<int>, i: nat): int
    reads a
    requires 0 <= i <= a.Length
{
    if i == 0 then 0 else SumTo(a, i - 1) + a[i - 1]
}

method CumulativeSum(a: array<int>)
    requires a != null
    requires a.Length >= 1
    modifies a
    ensures forall x | 0 <= x < a.Length :: a[x] == SumTo(a,x)
{
    a[0] := a[0];
    var i := 1;

    while i < a.Length
        invariant a[0] == SumTo(a,0)
        invariant 1 <= i <= a.Length

        //ERROR : invariant might not be maintained by the loop.
        invariant forall j :: 0 <= x < i ==> a[j] == SumTo(a,j+1)

        decreases a.Length - i
    {
        a[i] := a[i] + a[i-1];
        i := i + 1;
    }
}
 */