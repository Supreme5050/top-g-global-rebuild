export function GET() {
  return Response.json(
    {
      service: "top-g-global",
      status: "operational",
      checks: {
        application: "ok",
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
