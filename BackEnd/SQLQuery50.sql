ALTER TABLE CropRateHistory 
ADD CONSTRAINT DF_CropRateHistory_RateDate 
DEFAULT GETDATE() FOR Rate_Date;
