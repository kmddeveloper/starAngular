import { Field } from "./Field";

export class ProductSpec{
    title:string;
    fields:Field<string,string>[];
}