class Pointer {
    var a: array<int>

    method InitArray(size: nat)
        // modifies what?
        modifies this
    {
        var b := new int[size];
        a := b;
    }
}