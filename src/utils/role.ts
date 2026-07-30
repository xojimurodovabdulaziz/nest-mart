
export type AppRole = "admin" | "vendor" | "user";

function collectCandidateStrings(me: any): string[] {
  const candidates: any[] = [
    me?.data?.user?.role,
    me?.data?.profile?.role,
    me?.data?.role,
    me?.user?.role,
    me?.role,
    ...(Array.isArray(me?.data?.user?.roles) ? me.data.user.roles : []),
    ...(Array.isArray(me?.data?.roles) ? me.data.roles : []),
  ];
  return candidates.filter((c) => typeof c === "string").map((c) => c.toLowerCase().trim());
}

function hasAdminFlag(me: any): boolean {
  return Boolean(
    me?.data?.user?.is_admin ??
      me?.data?.user?.isAdmin ??
      me?.data?.profile?.is_admin ??
      me?.data?.is_admin
  );
}

export function normalizeRole(meResponse: any): AppRole {
  const strings = collectCandidateStrings(meResponse);

  if (
    hasAdminFlag(meResponse) ||
    strings.some((s) => ["admin", "administrator", "superadmin", "super_admin", "owner"].includes(s))
  ) {
    return "admin";
  }

  if (strings.some((s) => ["vendor", "seller", "shop_owner"].includes(s))) {
    return "vendor";
  }

  return "user";
}

export function isAdminRole(role: string | null): boolean {
  return (role || "").toLowerCase().trim() === "admin";
}

export function isVendorRole(role: string | null): boolean {
  return (role || "").toLowerCase().trim() === "vendor";
}
