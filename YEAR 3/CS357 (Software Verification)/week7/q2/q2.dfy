method DoubleArray(s: array<int>, t: array<int>)
    modifies t
    requires s.Length == t.Length
    ensures forall i :: 0 <= i < s.Length ==> t[i] == 2 * s[i]
{
    var i := 0;
    var tmp := new int[s.Length];
    while i < tmp.Length
        invariant i <= tmp.Length
        invariant forall j :: 0 <= j < i ==> tmp[j] == 2 * s[j]
    {
        tmp[i] := 2 * s[i];
        i:= i+1;
    }

    i:= 0;
    while i < t.Length
        invariant i <= t.Length
        invariant forall j :: 0 <= j < i ==> t[j] == 2 * s[j]
    {
        t[i] := tmp[i];
        i:= i + 1;
    }
}
