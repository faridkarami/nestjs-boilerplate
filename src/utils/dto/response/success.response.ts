import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<type> {
  @ApiProperty({ type: Object })
  data: type;

  @ApiProperty({ type: String, required: false })
  message?: string;

  @ApiProperty({ type: String })
  statusCode: string;

  constructor(data: type, message?: string, statusCode: number = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = String(statusCode);
  }
}
