//ng g i IproductList
import { Product} from '../core/models/Product';

export interface IproductList {


    products:Product[][];

    populateGrid(data:Product[]):Product[][];
}
