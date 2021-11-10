import { ParamListBase } from '@react-navigation/routers';
export type fileItem = {
    name: string;
    selected?: boolean;
    exists: true;
    uri: string;
    size: number;
    isDirectory: boolean;
    modificationTime: number;
    md5?: string;
  };
  