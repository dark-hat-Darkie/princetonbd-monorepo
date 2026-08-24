import { SetMetadata, type CustomDecorator } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Exempt a route from the globally-registered auth guard.
 *
 * The guard is global by default so a new controller is protected unless
 * someone opts out on purpose — the safe direction for the mistake to run in.
 */
export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
