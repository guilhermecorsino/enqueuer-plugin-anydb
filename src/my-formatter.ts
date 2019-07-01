import {ReportFormatter, OutputRequisitionModel as RequisitionModel} from 'enqueuer';

export class MyReportFormatter implements ReportFormatter {

    public format(report: RequisitionModel): string {
        return JSON.stringify(report, null, 2);
    }

}
