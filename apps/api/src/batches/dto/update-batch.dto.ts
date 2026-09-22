import { PartialType } from '@nestjs/swagger';

import { CreateBatchDto } from './create-batch.dto.js';

/** Every field optional; the cross-field rules are re-checked against the merged row. */
export class UpdateBatchDto extends PartialType(CreateBatchDto) {}
