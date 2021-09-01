export class Field<TKey, TVal>{
    key:TKey
    value:TVal

    constructor(k:TKey, v:TVal){
        this.key=k;
        this.value=v;
    }
}