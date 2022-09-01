"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateZod = void 0;
const std_lib_1 = require("std-lib");
function ValidateZod(schema, raw, validationErrKind) {
    const result = schema.safeParse(raw);
    if (result.success)
        return (0, std_lib_1.Ok)(result.data);
    const err = (0, std_lib_1.Whoops)(validationErrKind)
        .ctx("At zod validation.")
        .reason(formatZodMsg(result.error))
        .build();
    return (0, std_lib_1.Err)(err);
}
exports.ValidateZod = ValidateZod;
function handlePaths(paths) {
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
function formatZodMsg(err) {
    const issueOpt = (0, std_lib_1.Opt)(err.issues[0]);
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
