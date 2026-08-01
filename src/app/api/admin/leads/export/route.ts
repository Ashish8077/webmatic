import { NextResponse } from "next/server";
import { requireAuth } from "@/modules/auth/lib/get-auth-user";
import { validate } from "@/shared/utils/validators/validation";
import { getLeadsQuerySchema } from "@/modules/leads/validation/admin-lead.schema";
import { exportLeadsService } from "@/modules/leads/services/export-leads.service";
import { handleApiError } from "@/shared/utils/http/handle-api-error";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();

    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const filters = validate(getLeadsQuerySchema, queryParams);

    const stream = exportLeadsService(filters, user);
    
    // leads-export-YYYY-MM-DD.csv
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const filename = `leads-export-${dateStr}.csv`;

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
