import type { z } from "zod";
import { WhoopsError, RsResult } from "std-lib";
export declare function ValidateZod<T extends Zod.ZodTypeAny, ErrorType extends {}>(schema: T, raw: any, validationErrKind: ErrorType): RsResult<z.infer<typeof schema>, WhoopsError<ErrorType>>;
//# sourceMappingURL=index.d.ts.map