# Database Notes

The default backend configuration uses SQL Server through Entity Framework Core.

## Default database

- Provider: SQL Server
- Connection string key: `ConnectionStrings:DefaultConnection`
- EF Core startup project: `backend`

## Seeded records

- 1 SuperAdmin
- 1 Tenant
- 1 TenantAdmin
- 1 User
- 2 sample uploads
- 2 sample predictions
- 1 sample comparison

## Default seed credentials

- `superadmin@urbanscope.ai` / `Admin@123`
- `tenantadmin@urbanscope.ai` / `Admin@123`
- `user@urbanscope.ai` / `User@123`

## Notes

- The backend currently uses `Database.EnsureCreated()` for a smooth starter experience.
- To move fully into migrations later, replace that with `Database.Migrate()` and run EF migrations once the .NET SDK is installed.
