method DoubleArray(s: array<int>, t: array<int>)
    requires s.Length == t.Length
    ensures forall i | 0 <= i < s.Length :: t[i] == 2 * old(s[i])
    modifies t
{
    var i := 0;
    while i < s.Length
        invariant 0 <= i <= s.Length
        invariant forall j | 0 <= j < i :: t[j] == 2* old(s[j])
        invariant forall j | i <= j < s.Length :: s[j] == old(s[j])
    {
        t[i] := 2 * s[i];
        i := i + 1;
    }
}