using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FarmerBackend.Models;

public partial class ApmcdbContext : DbContext
{
    public ApmcdbContext()
    {
    }

    public ApmcdbContext(DbContextOptions<ApmcdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Buyer> Buyers { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Crop> Crops { get; set; }

    public virtual DbSet<Farmer> Farmers { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Shopkeeper> Shopkeepers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=APMCDB;Integrated Security=True; Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admin__4A3001174E832F39");

            entity.ToTable("Admin");

            entity.Property(e => e.AdminId).HasColumnName("Admin_ID");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Contact_NO");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValue("admin@gmail.com");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<Buyer>(entity =>
        {
            entity.HasKey(e => e.BuyerId).HasName("PK__tmp_ms_x__DF21C64361447D86");

            entity.ToTable("Buyer");

            entity.HasIndex(e => e.ContactNo, "UQ__tmp_ms_x__82AC28730D400BBF").IsUnique();

            entity.Property(e => e.BuyerId).HasColumnName("Buyer_Id");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Contact_No");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValue("default@gmail.com");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Last_Name");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ShopkeeperId).HasColumnName("Shopkeeper_Id");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Shopkeeper).WithMany(p => p.Buyers)
                .HasForeignKey(d => d.ShopkeeperId)
                .HasConstraintName("FK_Buyer_Shopkeeper");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__6DB38D6E817F3FF3");

            entity.ToTable("Category");

            entity.HasIndex(e => e.CategoryName, "UQ__Category__B35EB41938F1A48B").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("Category_Id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Category_Name");
        });

        modelBuilder.Entity<Crop>(entity =>
        {
            entity.HasKey(e => e.CropId).HasName("PK__Crop__89328D1F74206F1E");

            entity.ToTable("Crop");

            entity.HasIndex(e => e.CropName, "UQ__Crop__4E37CFC68A7E0212").IsUnique();

            entity.Property(e => e.CropId).HasColumnName("Crop_Id");
            entity.Property(e => e.CategoryId).HasColumnName("Category_Id");
            entity.Property(e => e.CropName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Crop_Name");

            entity.HasOne(d => d.Category).WithMany(p => p.Crops)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Crop_Category");
        });

        modelBuilder.Entity<Farmer>(entity =>
        {
            entity.HasKey(e => e.FarmerId).HasName("PK__Farmer__2C147561B8A94FB7");

            entity.ToTable("Farmer");

            entity.HasIndex(e => e.ContactNo, "UQ__Farmer__82AC28735CE74C15").IsUnique();

            entity.Property(e => e.FarmerId).HasColumnName("Farmer_Id");
            entity.Property(e => e.CategoryId).HasColumnName("Category_Id");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Contact_No");
            entity.Property(e => e.CropId).HasColumnName("Crop_Id");
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValue("default@gamil.com");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Last_Name");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ShopkeeperId).HasColumnName("Shopkeeper_Id");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Category).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Farmer_Category");

            entity.HasOne(d => d.Crop).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.CropId)
                .HasConstraintName("FK_Farmer_Crop");

            entity.HasOne(d => d.Shopkeeper).WithMany(p => p.Farmers)
                .HasForeignKey(d => d.ShopkeeperId)
                .HasConstraintName("FK_Farmer_Shopkeeper");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__feedback__7A6B2B8C2E98984D");

            entity.ToTable("feedback");

            entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");
            entity.Property(e => e.Feedback1)
                .HasColumnType("text")
                .HasColumnName("feedback");
        });

        modelBuilder.Entity<Shopkeeper>(entity =>
        {
            entity.HasKey(e => e.ShopkeeperId).HasName("PK__tmp_ms_x__1A0287E4D80D38D0");

            entity.ToTable("Shopkeeper");

            entity.HasIndex(e => e.LicenseNo, "UQ__tmp_ms_x__5CA8EF6CAF3BCA0C").IsUnique();

            entity.HasIndex(e => e.ContactNo, "UQ__tmp_ms_x__82AC28736A433BFD").IsUnique();

            entity.Property(e => e.ShopkeeperId).HasColumnName("Shopkeeper_Id");
            entity.Property(e => e.BuyerId).HasColumnName("Buyer_Id");
            entity.Property(e => e.CategoryId).HasColumnName("Category_Id");
            entity.Property(e => e.ContactNo)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("Contact_No");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasDefaultValue("default@gmail.com");
            entity.Property(e => e.FarmerId).HasColumnName("Farmer_Id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("First_Name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Last_Name");
            entity.Property(e => e.LicenseNo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("License_No");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Buyer).WithMany(p => p.Shopkeepers)
                .HasForeignKey(d => d.BuyerId)
                .HasConstraintName("FK_Shopkeeper_Buyer");

            entity.HasOne(d => d.Category).WithMany(p => p.Shopkeepers)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Shopkeeper_Category");

            entity.HasOne(d => d.Farmer).WithMany(p => p.Shopkeepers)
                .HasForeignKey(d => d.FarmerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Shopkeeper_Farmer");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
