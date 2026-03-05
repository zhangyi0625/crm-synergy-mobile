export interface TaskSearchParams {
  type?: number;
  updateTimeStart?: string;
  updateTimeEnd?: string;
  createTimeStart?: string;
  creatTimeStart?: string;
  order?: string;
  status?: string;
}

export interface CreateTaskType {
  id: string | null;
  billNo: string;
  ctnType: string;
  ctnNumber: number;
}

export interface BrashBoxListType {
  details: BrashBoxListDetailType[];
  task: BrashBoxListTaskType;
}

export interface BrashBoxListDetailType {
  barcodes: string;
  billNo: string;
  carrier: string;
  ctnNumber: number;
  ctnType: string;
  execTime: string;
  id: string;
  isSuccess: boolean;
  successCount: number;
  transit: string | null;
  vesselName: string | null;
  voyNo: string | null;
}

export interface BrashBoxListTaskType
  extends Omit<BrashBoxListDetailType, "barcodes"> {
  por: LocationItem;
  fnd: LocationItem;
}

export interface LocationItem {
  countryCode: string;
  countryLocalName: string;
  countryName: string;
  id: string;
  localName: string;
  name: string;
  unlocode: string;
  cnName: string;
  enName: string;
}
