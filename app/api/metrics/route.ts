import { NextRequest } from "next/server";
import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new client.Counter({
  name: "node_request_operations_total",
  help: "The total number of processed requests",
});

export async function GET(req: NextRequest) {
  requestCounter.inc();

  const headers = {
    "Content-Type": client.register.contentType,
  };

  return Response.json(
    { metrics: client.register.metrics() },
    { status: 200, headers }
  );
}
