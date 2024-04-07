import { IsString } from 'class-validator';

export class CreateNetworkDto {
  @IsString()
  name: string;
}

// export interface NetworkDataType {
//     id: string,
//     name: string,
//     status: number,
//     createAt: string,
//     uavCount: number,
//     lastEdit: string,
//     creator: {
//       name: string,
//       id: string,
//     }
// }
