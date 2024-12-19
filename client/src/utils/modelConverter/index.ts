import { instanceToPlain, plainToClass } from "class-transformer";
export declare type Type<T> = new (...args: Array<any>) => T;

export default class ModelConverter {
  //Convert model class to json
  static encode = <T extends object>(value: T): any => {
    return instanceToPlain(value);
  };

  //Convert json to model class
  static decode = <T extends object>(value: any, type: Type<T>): any => {
    return plainToClass(type, value);
  };
}
