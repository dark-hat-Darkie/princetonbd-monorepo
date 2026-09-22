import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator.js';
import { ApiAdminErrors, ApiValidationErrors } from '../common/http/api-errors.decorator.js';
import { S3StorageService } from '../storage/s3-storage.service.js';
import { PresignUploadDto } from './dto/presign-upload.dto.js';
import { PresignedUploadDto } from './dto/presigned-upload.dto.js';

@ApiTags('admin: uploads')
@ApiBearerAuth('workos')
@ApiAdminErrors()
@Roles('admin')
@Controller({ path: 'admin/uploads', version: '1' })
export class AdminUploadsController {
  constructor(private readonly storage: S3StorageService) {}

  /**
   * Issues a short-lived URL the browser PUTs an image to. The API never sees
   * the bytes; it only decides what may be uploaded and where it will live.
   */
  @Post('presign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'adminPresignUpload',
    summary: 'Presign a direct-to-bucket image upload',
  })
  @ApiOkResponse({ type: PresignedUploadDto })
  @ApiValidationErrors()
  async presign(@Body() body: PresignUploadDto): Promise<PresignedUploadDto> {
    const key = this.storage.objectKey(body.kind, body.contentType);
    const { url, expiresIn } = await this.storage.presignPut({
      key,
      contentType: body.contentType,
    });

    return {
      uploadUrl: url,
      method: 'PUT',
      headers: { 'Content-Type': body.contentType },
      key,
      publicUrl: this.storage.publicUrl(key),
      expiresIn,
    };
  }
}
