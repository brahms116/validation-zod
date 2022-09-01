import type { ZodError, z } from "zod";
import { Opt, WhoopsError, Ok, Err, Whoops, RsResult } from "std-lib";

export function ValidateZod<T extends Zod.ZodTypeAny, ErrorType extends {}>(
  schema: T,
  raw: any,
  validationErrKind: ErrorType
): RsResult<z.infer<typeof schema>, WhoopsError<ErrorType>> {
  const result = schema.safeParse(raw);

  if (result.success) return Ok(result.data);

  const err = Whoops(validationErrKind)
    .context("At zod validation.")
    .reason(formatZodMsg(result.error))
    .build();

  return Err(err);
}

function handlePaths(paths: (string | number)[]) {
  let res = "";
  for (let i = 0; i < paths.length; i++) {
    const el = paths[i];
    if (typeof el === "string") {
      res = res + el;
    }
    if (typeof el === "number") {
      res = res + `[${el}]`;
    }
    if (i < paths.length - 1) {
      res = res + ".";
    }
  }
  return res;
}

function formatZodMsg(err: ZodError): string {
  const issueOpt = Opt(err.issues[0]);

  if (issueOpt.isNone()) {
    return "Empty Zod Error";
  }
  const issue = issueOpt.unwrap();
  let field = "";
  if (issue.path.length) {
    field = `At ${handlePaths(issue.path)}, `;
  }
  return `${field} ${issue.message}`;
}
