CREATE PROCEDURE UpdateCropRateByAdmin
    @CropId INT,
    @NewRate INT,
    @AdminUser VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validate if the crop exists
    IF NOT EXISTS (SELECT 1 FROM Crop WHERE Crop_Id = @CropId)
    BEGIN
        PRINT 'Crop not found!';
        RETURN;
    END

    -- Insert the new rate with today's date
    INSERT INTO CropRateHistory (Crop_Id, Rate, Rate_Date, Updated_By, Updated_At)
    VALUES (@CropId, @NewRate, GETDATE(), @AdminUser, GETDATE());

    -- Update the Crop table with the latest rate
    UPDATE Crop
    SET Rate = @NewRate
    WHERE Crop_Id = @CropId;

    PRINT 'Crop rate updated successfully!';
END;

