export interface IBaseResponseApi {
  isSuccess: boolean;
  statusCode: number;
  errorMessages: string[];
}
export interface IBaseResponseApiMCR {
  isSuccess: boolean;
  statusCode: number;
  ResponseMessage: string;
}
export interface IBaseResponseApiGolang {
  message: string;
  status: string;
}

export type IMenuBase = {
  headerMenu: string;
  icon: string;
  menu: string;
  url: string;
};

export interface DataUserApprove {
  date?: string | null;
  name: LEVEL_USER;
}

export type LEVEL_USER = '' | 'MAKER' | 'CHECKER' | 'SIGNER' | 'PRODUCT_OWNER';

export type TResponseGetMenu = IBaseResponseApi & { result: IMenuBase[] };
