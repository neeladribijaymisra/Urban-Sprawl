using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UrbanScope.Api.Models;

namespace UrbanScope.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<SatelliteUpload> SatelliteUploads => Set<SatelliteUpload>();
    public DbSet<Prediction> Predictions => Set<Prediction>();
    public DbSet<Comparison> Comparisons => Set<Comparison>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(user => user.Email)
            .IsUnique();

        modelBuilder.Entity<SatelliteUpload>()
            .HasOne(upload => upload.Prediction)
            .WithOne(prediction => prediction.Upload)
            .HasForeignKey<Prediction>(prediction => prediction.UploadId);

        modelBuilder.Entity<Comparison>()
            .HasOne(comparison => comparison.OldUpload)
            .WithMany()
            .HasForeignKey(comparison => comparison.OldUploadId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Comparison>()
            .HasOne(comparison => comparison.NewUpload)
            .WithMany()
            .HasForeignKey(comparison => comparison.NewUploadId)
            .OnDelete(DeleteBehavior.Restrict);

        Seed(modelBuilder);
    }

    private static void Seed(ModelBuilder modelBuilder)
    {
        var passwordHasher = new PasswordHasher<User>();

        var tenant = new Tenant
        {
            Id = 1,
            OrganizationName = "GreenGrid Analytics",
            City = "Pune",
            State = "Maharashtra",
            Country = "India",
            Plan = "Growth",
            Status = "Active",
            CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc)
        };

        var superAdmin = new User
        {
            Id = 1,
            FullName = "Super Admin",
            Email = "superadmin@urbanscope.ai",
            Role = "SuperAdmin",
            TenantId = 1,
            CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc),
            IsActive = true
        };
        superAdmin.PasswordHash = passwordHasher.HashPassword(superAdmin, "Admin@123");

        var tenantAdmin = new User
        {
            Id = 2,
            FullName = "Tenant Admin",
            Email = "tenantadmin@urbanscope.ai",
            Role = "TenantAdmin",
            TenantId = 1,
            CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc),
            IsActive = true
        };
        tenantAdmin.PasswordHash = passwordHasher.HashPassword(tenantAdmin, "Admin@123");

        var user = new User
        {
            Id = 3,
            FullName = "Workspace User",
            Email = "user@urbanscope.ai",
            Role = "User",
            TenantId = 1,
            CreatedAt = new DateTime(2026, 1, 10, 0, 0, 0, DateTimeKind.Utc),
            IsActive = true
        };
        user.PasswordHash = passwordHasher.HashPassword(user, "User@123");

        var uploadOne = new SatelliteUpload
        {
            Id = 1,
            TenantId = 1,
            UserId = 2,
            CityName = "Pune",
            LocationName = "Hinjawadi Phase 2",
            Latitude = 18.5912,
            Longitude = 73.7389,
            Year = 2024,
            ImageUrl = "/uploads/sample-pune-2024.jpg",
            UploadedAt = new DateTime(2026, 5, 10, 9, 0, 0, DateTimeKind.Utc)
        };

        var uploadTwo = new SatelliteUpload
        {
            Id = 2,
            TenantId = 1,
            UserId = 3,
            CityName = "Pune",
            LocationName = "Hinjawadi Phase 2",
            Latitude = 18.5912,
            Longitude = 73.7389,
            Year = 2018,
            ImageUrl = "/uploads/sample-pune-2018.jpg",
            UploadedAt = new DateTime(2026, 5, 9, 9, 0, 0, DateTimeKind.Utc)
        };

        var predictionOne = new Prediction
        {
            Id = 1,
            UploadId = 1,
            PredictedClass = "Residential",
            Confidence = 0.94,
            SprawlScore = 0.88,
            ResidentialScore = 0.70,
            IndustrialScore = 0.12,
            GreenCoverScore = 0.08,
            FullProbabilityJson = "{\"Residential\":0.70,\"Industrial\":0.12,\"Highway\":0.05,\"Forest\":0.02}",
            CreatedAt = new DateTime(2026, 5, 10, 9, 5, 0, DateTimeKind.Utc)
        };

        var predictionTwo = new Prediction
        {
            Id = 2,
            UploadId = 2,
            PredictedClass = "Forest",
            Confidence = 0.89,
            SprawlScore = 0.06,
            ResidentialScore = 0.01,
            IndustrialScore = 0.01,
            GreenCoverScore = 0.81,
            FullProbabilityJson = "{\"Forest\":0.67,\"Pasture\":0.14,\"Residential\":0.01,\"Industrial\":0.01}",
            CreatedAt = new DateTime(2026, 5, 9, 9, 4, 0, DateTimeKind.Utc)
        };

        var comparison = new Comparison
        {
            Id = 1,
            TenantId = 1,
            OldUploadId = 2,
            NewUploadId = 1,
            OldYear = 2018,
            NewYear = 2024,
            OldClass = "Forest",
            NewClass = "Residential",
            SprawlScoreChange = 0.82,
            ChangeType = "Green Cover to Urban Built-up",
            CreatedAt = new DateTime(2026, 5, 11, 8, 0, 0, DateTimeKind.Utc)
        };

        modelBuilder.Entity<Tenant>().HasData(tenant);
        modelBuilder.Entity<User>().HasData(superAdmin, tenantAdmin, user);
        modelBuilder.Entity<SatelliteUpload>().HasData(uploadOne, uploadTwo);
        modelBuilder.Entity<Prediction>().HasData(predictionOne, predictionTwo);
        modelBuilder.Entity<Comparison>().HasData(comparison);
    }
}
