import db from "./src/database/connection";
import { getDashboardStatsService } from "./src/modules/dashboard/services/get-dashboard-stats.service";
import { AuthUser } from "./src/modules/auth/types/auth-user";
import { PERMISSIONS } from "./src/modules/auth/constants/permissions";

async function run() {
  try {
    const mockUser: AuthUser = {
      id: 1,
      email: "test@test.com",
      firstName: "Test",
      lastName: "Test",
      role: {
        id: 1,
        name: "Super Admin",
        description: "",
      },
      permissions: [PERMISSIONS.DASHBOARD_VIEW],
    };
    
    console.log("Calling getDashboardStatsService...");
    const stats = await getDashboardStatsService(mockUser, 30);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
