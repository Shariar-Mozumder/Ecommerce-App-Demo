import { Product } from "./Product";
import{ Image} from "./Image";

export interface VmSaveProduct {
  Product: Product;
  ImageList: Image[];
}