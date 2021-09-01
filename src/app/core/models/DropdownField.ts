export class DropdownField<TKey, TVal>{
    key:TKey
    value:TVal
    selected: boolean

    constructor(k:TKey, v:TVal, selected:boolean){
        this.key=k;
        this.value=v;
        this.selected=selected;        
    }
}