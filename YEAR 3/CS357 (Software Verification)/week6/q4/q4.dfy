method Filter<T>(a: array<T>, P: T -> bool) returns (s: seq<T>)
    ensures forall x :: x in s ==> P(x)   // All elements of the output sequence satisfy P
    ensures (|s| == 0) ==> (forall x :: x in a ==> not P(x))  // If s is empty, no element in a satisfies P
    ensures multiset(s) <= multiset(a[..])  // The output sequence only contains elements from a
{
    var result := [];
    // Iterate through the array a
    for i := 0 to a.Length - 1
        if P(a[i]) {
            result := result + [a[i]];  // Add the element to the result sequence if it satisfies P
        }
    s := result;  // Return the final result sequence
}