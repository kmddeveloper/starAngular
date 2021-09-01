//ng g service core/services/product/product

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from 'src/app/core/models/Product';
import { ApiResponse} from 'src/app/core/models/ApiResponse';
import { ProductEditItem} from 'src/app/core/models/ProductEditItem';
import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService,private endpointService:EndpointService) { }

  getProduct(pageNum:Number, pageSize:Number, categoryId:Number):Observable<ApiResponse<Product[]>>{
    console.log(this.endpointService.browseProduct);
    return this.httpService.getAsync<ApiResponse<Product[]>>(`${this.endpointService.browseProduct}/${pageNum}/${pageSize}/${categoryId}`);
    
  }

  getTotalItems(categoryId:Number):Observable<ApiResponse<Number>>{
    console.log(this.endpointService.browseProduct);
    return this.httpService.getAsync<ApiResponse<Number>>(`${this.endpointService.totalItemsByCategoryId}/${categoryId}`);
    
  }

  getEditItem(code:String):Observable<ApiResponse<ProductEditItem>>{
    console.log(this.endpointService.browseProduct);
    return this.httpService.getAsync<ApiResponse<ProductEditItem>>(`${this.endpointService.productEditItem}/${code}`);
    
  }

  updateItem(product:Product):Observable<ApiResponse<string>>{
    console.log(this.endpointService.updateItem);
    console.log(JSON.stringify(product));
      return this.httpService.putAsync<ApiResponse<string>>(`${this.endpointService.updateItem}`,JSON.stringify(product));

  }

  getProductByCode(code:String):Observable<ApiResponse<Product>>{
    return this.httpService.getAsync<ApiResponse<Product>>(`${this.endpointService.productByCode}/${code}`);

  }
}
