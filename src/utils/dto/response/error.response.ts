import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  statusCode: string;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = String(statusCode);
  }
}
