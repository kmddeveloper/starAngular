//ng g service core/services/product/product

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from 'src/app/core/models/Product';
import { ProductColor } from 'src/app/core/models/ProductColor';
import { ProductSize } from 'src/app/core/models/ProductSize';
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

  getProducDetailtByCode(code:String):Observable<ApiResponse<any>>{
    return this.httpService.getAsync<ApiResponse<any>>(`${this.endpointService.productDetailByCode}/${code}`);
  }

  requestProfuctItemId(productId:number, colorId:number, sizeId:number):Observable<ApiResponse<number>>{
    return this.httpService.postAsync<ApiResponse<number>>(`${this.endpointService.requestProductItemIdBySizeColor}`,{'productid':productId, 'colorid':colorId, 'sizeid':sizeId});
  }

  getAvailableColors(productId:number, sizeId:number):Observable<ApiResponse<ProductColor[]>>{
    console.log(`${this.endpointService.availableColors}/${productId}/${sizeId}`);
    return this.httpService.getAsync<ApiResponse<ProductColor[]>>(`${this.endpointService.availableColors}/${productId}/${sizeId}`);
  }

  getAvailableSizes(productId:number, colorId:number):Observable<ApiResponse<any>>{
    console.log(`${this.endpointService.availableSizes}/${productId}/${colorId}`);
    return this.httpService.getAsync<ApiResponse<any>>(`${this.endpointService.availableSizes}/${productId}/${colorId}`);
  }


}
