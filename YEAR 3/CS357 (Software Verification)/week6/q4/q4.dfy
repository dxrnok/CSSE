method Filter<T>(a: array<T>, P: T -> bool) returns (s: seq<T>)
    ensures forall x :: x in s ==> P(x)
    ensures (s == []) ==> forall x :: x in a[..] ==> !P(x)
    ensures forall x :: x in s ==> x in a[..]
{
    s := [];
    var i := 0;
    while i < a.Length
        decreases a.Length - i
        invariant 0 <= i <= a.Length
        invariant forall k :: 0 <= k < i ==> (P(a[k]) ==> a[k] in s)
        invariant forall x :: x in s ==> P(x)
        invariant forall x :: x in s ==> x in a[..i]
        invariant (s == []) <==> forall x :: x in a[..i] ==> !P(x)
        
    {
        if P(a[i]) {
            s := s + [a[i]];
        }
        i := i + 1;
    }
}
