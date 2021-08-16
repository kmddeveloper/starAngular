//ng g service core/services/product/product

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from 'src/app/core/models/Product';
import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';
import { HttpService } from 'src/app/core/services/http/http.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService,private endpointService:EndpointService) { }

  getProduct(pageNum:Number, pageSize:Number, categoryId:Number):Observable<Product[]>{
    console.log(this.endpointService.browseProduct);
    return this.httpService.getAsync<Product[]>(`${this.endpointService.browseProduct}/${pageNum}/${pageSize}/${categoryId}`);
    
  }
}
