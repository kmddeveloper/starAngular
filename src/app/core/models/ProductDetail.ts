import { ProductImage } from './ProductImage';
import {Product} from './Product';
import { ProductFeature } from './ProductFeature';
import { ProductSpec } from './ProductSpec';
import { ProductAttribute} from './ProductAttribute';

export class ProductDetail{
    product:Product;
    product_images:ProductImage[];
    product_features:ProductFeature[];
    product_specs:ProductSpec[];
    product_attributes:ProductAttribute[];
}