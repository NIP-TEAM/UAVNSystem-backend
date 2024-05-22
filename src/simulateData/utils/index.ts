import * as uavsJsonInfo from '../uavSet.json';

export const findIpByMac = (macInfo: string) =>
  uavsJsonInfo.find(({ mac }) => mac === macInfo);
