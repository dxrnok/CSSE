predicate sorted(a: array<int>)
    reads a
{
    forall i, j | 0 <= i < j < a.Length :: a[i] < a[j]
}

method BinarySearch(a: array<int>, value: int) returns (index: int)
    requires sorted(a)
    ensures index == -1 || 0 <= index < a.Length
    ensures index == -1 ==> value !in a[..]
    ensures index >= 0  ==> a[index] == value
{
    var low := 0;
    var high := a.Length;

    while low < high
        invariant 0 <= low <= high <= a.Length
        invariant value !in a[..low] && value !in a[high..]
    {
        var mid := (high + low) / 2;

        if a[mid] < value {
            low := mid + 1;
        } else if a[mid] > value {
            high := mid;
        } else {
            return mid;
        }
    }
    index := -1;
}