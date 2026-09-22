import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, Max, Min } from 'class-validator';

/** What an upload is for; becomes the first path segment of the object key. */
export const uploadKinds = ['course-thumbnail', 'teacher-image', 'testimonial-image'] as const;
export type UploadKind = (typeof uploadKinds)[number];

export const uploadContentTypes = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type UploadContentType = (typeof uploadContentTypes)[number];

/** 5 MiB. Photos for a card do not need more, and the limit keeps a mistaken RAW upload out. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export class PresignUploadDto {
  @ApiProperty({ enum: uploadKinds, enumName: 'UploadKind' })
  @IsIn(uploadKinds)
  kind!: UploadKind;

  @ApiProperty({ enum: uploadContentTypes, enumName: 'UploadContentType' })
  @IsIn(uploadContentTypes)
  contentType!: UploadContentType;

  /** Size in bytes, as reported by the browser's File object. */
  @ApiProperty({ example: 245_112, maximum: MAX_UPLOAD_BYTES })
  @IsInt()
  @Min(1)
  @Max(MAX_UPLOAD_BYTES, {
    message: `size must not exceed ${String(MAX_UPLOAD_BYTES)} bytes (5 MiB)`,
  })
  size!: number;
}
