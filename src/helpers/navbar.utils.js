export const isNavItemActive = (pathname, href) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
