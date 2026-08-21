"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import UserListTable from "@/features/users/components/user-list-table";
import UserListFilters from "@/features/users/components/user-list-filters";
import UserListPagination from "@/features/users/components/user-list-pagination";
import { useUsers } from "@/features/users/hooks/use-users";
import { useUserFilters } from "@/features/users/hooks/use-user-filters";
import { useDeleteUser } from "@/features/users/hooks/use-delete-user";
import type { UserListItem } from "@/modules/users/types/user.types";

export default function UsersPage() {
  const {
    query,
    updateSearch,
    updateStatus,
    updatePagination,
  } = useUserFilters();

  const [userToDelete, setUserToDelete] = useState<UserListItem | null>(null);

  const { data, isLoading } = useUsers(query);
  const deleteMutation = useDeleteUser();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your users and role assignments
          </p>
        </div>
        <Link href="/admin/users/create">
          <Button className="w-full sm:w-auto gap-2">
            <Plus size={16} strokeWidth={2} />
            Create User
          </Button>
        </Link>
      </div>

      <UserListFilters
        query={query}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
      />

      <UserListTable
        users={data?.data?.items || []}
        isLoading={isLoading}
        onDelete={setUserToDelete}
      />

      {data?.data?.pagination && (
        <UserListPagination
          pagination={data.data.pagination}
          onPageChange={(page) => updatePagination(page)}
          isLoading={isLoading}
        />
      )}

      <ConfirmDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            deleteMutation.mutate(userToDelete.id);
            setUserToDelete(null);
          }
        }}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.firstName} ${userToDelete?.lastName}"? This action cannot be undone.`}
        confirmText="Delete User"
        variant="danger"
      />
    </div>
  );
}
