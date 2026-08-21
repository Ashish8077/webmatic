import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SquarePen, Trash2 } from "lucide-react";
import type { UserListItem } from "@/modules/users/types/user.types";

interface UserListTableProps {
  users: UserListItem[];
  isLoading?: boolean;
  onDelete: (user: UserListItem) => void;
}

export default function UserListTable({
  users,
  isLoading,
  onDelete,
}: UserListTableProps) {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-3">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden">
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-3">
            <span className="text-muted-foreground text-2xl">👥</span>
          </div>
          <p className="text-sm text-muted-foreground">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-surface-hover/30">
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  User
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                  Joined
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="hover:text-accent transition-colors block"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {user.email}
                      </p>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-muted-foreground">{user.roleName || "—"}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={user.status as "active" | "inactive" | "suspended"}>{user.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/users/${user.id}`}>
                        <button
                          title="Edit"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all cursor-pointer"
                        >
                          <SquarePen size={15} strokeWidth={1.8} />
                        </button>
                      </Link>

                      <button
                        title="Delete"
                        onClick={() => onDelete(user)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all cursor-pointer"
                      >
                        <Trash2 size={15} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
