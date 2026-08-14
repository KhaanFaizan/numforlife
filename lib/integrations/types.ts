export type IntegrationStatus = "ok" | "degraded" | "error" | "unconfigured";

export type IntegrationCheck = {
  id: string;
  name: string;
  status: IntegrationStatus;
  message: string;
  detail?: string;
};

export type IntegrationHealthReport = {
  ok: boolean;
  checkedAt: string;
  checks: IntegrationCheck[];
};
