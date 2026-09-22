import { ApiProperty } from '@nestjs/swagger';

/**
 * Everything the browser needs to PUT the file itself. After a 2xx from the
 * bucket, `publicUrl` is the value to store on the record being edited.
 */
export class PresignedUploadDto {
  @ApiProperty({ description: 'Presigned URL to PUT the file body to.' })
  uploadUrl!: string;

  @ApiProperty({ enum: ['PUT'] })
  method!: 'PUT';

  /** Headers the signature covers; send them exactly as given. */
  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  headers!: Record<string, string>;

  @ApiProperty({ example: 'teacher-image/2026/09/6f1c1a2e-….jpg' })
  key!: string;

  @ApiProperty({ description: 'Where the object will be served from once uploaded.' })
  publicUrl!: string;

  @ApiProperty({ description: 'Seconds until the upload URL stops working.' })
  expiresIn!: number;
}
