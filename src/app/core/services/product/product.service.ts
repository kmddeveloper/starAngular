//ng g service core/services/product/product

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product} from 'src/app/core/models/Product';
import { EnvService } from '../env.service';
import { HttpService } from '../http.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService,private envService:EnvService) { }

  getProduct(pageNum:Number, pageSize:Number, categoryId:Number):Observable<Product[]>{

    return this.httpService.getAsync<Product[]>(`${this.envService.apiBaseUrl}/api/product/browse/${pageNum}/${pageSize}/${categoryId}`);
    
  }
}
