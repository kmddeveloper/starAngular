
import { Injectable } from '@angular/core';
import { ProductDetail } from "../core/models/ProductDetail";
import { ProductImage } from '../core/models/ProductImage';
import { ProductSize } from '../core/models/ProductSize';


@Injectable({
    providedIn: 'root'
})

export class ProductMapper{

    constructor(){}

    mapProductDetail(data:any):ProductDetail{

        let productDetail:ProductDetail=new ProductDetail();
        if (data){

            console.log('MAP inside DATA=',data);
        

            if (data.item){
                console.log('MAP inside DATA.ITEM');
                productDetail.product = data.item;
            }
            if (data.itemImages && data.itemImages.length > 0){                        

                console.log('MAP inside DATA.itemImages');
                productDetail.product_images=[];
                data.itemImages.forEach(element => {
                    productDetail.product_images.push({
                        imageUrl:element.imageUrl,
                        product_item_id:element.productItemId,
                        material_type:element.mediaType,
                        product_id:element.productId
                    });
                });
            }
            if (data.features && data.features.length > 0){
                console.log('MAP inside DATA.features');
                productDetail.product_features=[];
                data.features.forEach(element => {
                    productDetail.product_features.push({
                        product_id: element.productId,
                        feature: element.feature
                    });
                });
            }
            if (data.specs && data.specs.length > 0){
                console.log('MAP inside DATA.specs');
                productDetail.product_specs=[];
                data.specs.forEach(element => {
                    productDetail.product_specs.push({
                        title:element.title,
                        fields:element.fields
                    });
                });
            }
            if (data.attributes && data.attributes.length > 0){
                console.log('MAP inside DATA.attributes');
                productDetail.product_attributes=[];
                data.attributes.forEach(element => {
                    productDetail.product_attributes.push({
                       product_id: element.productId,
                       attribute: element.attribute
                    });
                });        

            }
        }
        return productDetail;
    }

    mapProductSizes(data:any):ProductSize[]{
        let productSizes:ProductSize[]=[];
        if (data){
            data.forEach(element => {
                if (element){
                    productSizes.push({
                        id: element.id,
                        size: `${element.menSize}  [${element.womenSize} Women]`                      
                    })  
                }
            });
        }
        return productSizes;
    }
}
