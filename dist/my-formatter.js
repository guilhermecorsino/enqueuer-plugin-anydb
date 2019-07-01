"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyReportFormatter {
    format(report) {
        return JSON.stringify(report, null, 2);
    }
}
exports.MyReportFormatter = MyReportFormatter;
