import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { routePaths } from "@core/config";

const Itr = lazy(() => import("./pages/Itr"));
const FileItr = lazy(() => import("./pages/FileItr"));
const ItrFiling = lazy(() => import("./pages/ItrFiling"));
const TdsRefund = lazy(() => import("./pages/TdsRefund"));
const PreviousYearItr = lazy(
  () => import("./pages/PreviousYearItr"),
);
const RevisedItr = lazy(() => import("./pages/RevisedItr"));
const TaxNoticeAssistance = lazy(
  () => import("./pages/TaxNoticeAssistance"),
);
const TdsRefundEstimator = lazy(
  () => import("./pages/TdsRefundEstimator"),
);
const TaxComputation = lazy(
  () => import("./pages/TaxComputation"),
);

export const itrRoutes: RouteObject[] = [
  { path: routePaths.itr.root, element: <Itr /> },
  { path: routePaths.itr.fileItr, element: <FileItr /> },
  { path: routePaths.itr.itrFiling, element: <ItrFiling /> },
  { path: routePaths.itr.tdsRefund, element: <TdsRefund /> },
  { path: routePaths.itr.previousYearItr, element: <PreviousYearItr /> },
  { path: routePaths.itr.revisedItr, element: <RevisedItr /> },
  {
    path: routePaths.itr.taxNoticeAssistance,
    element: <TaxNoticeAssistance />,
  },
  { path: routePaths.itr.tdsRefundEstimator, element: <TdsRefundEstimator /> },
  { path: routePaths.itr.taxComputation, element: <TaxComputation /> },
];
