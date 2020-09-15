/* Validate Rows of csv data is correct */
module.exports = { 
    validateCsvData: function(rows) 
    {
        // console.log(rows);
        const dataRows = rows;
        // console.log(dataRows)
        for (let i = 0; i < dataRows.length; i++) {
        // console.log(dataRows[i]);
        const rowError = validateCsvRow(dataRows[i]);
        if (rowError) {
            return `${rowError} on row ${i + 1}`
        }
        }
        return;
    }
}

  function validateCsvRow(row) {
    // console.log(row.station);
    if (!row.station) {
    return "Missing Station or Invalid Data Type"
    }
    else if (!row.year || !Number.isInteger(Number(row.year)) || row.year.length !=4) {
    return "Invalid year"
    }
    else if (!row.month || Number(row.month) < 1 || Number(row.month) > 12 || !Number.isInteger(Number(row.month))) {
    return "Invalid month"
    }
    else if (!row.day || Number(row.day) < 1 || Number(row.day) > 31 || !Number.isInteger(Number(row.day))) {
    return "Invalid day"
    }
    else if (!row.daily_rainfall_total_mm || isNaN(parseFloat(Number(row.daily_rainfall_total_mm))) && !isFinite(Number(row.daily_rainfall_total_mm))) {
    return "Invalid daily rainfall total"
    }
    else if (!row.highest_30_min_rainfall_mm ||isNaN(parseFloat(Number(row.highest_30_min_rainfall_mm))) && !isFinite(Number(row.highest_30_min_rainfall_mm))) {
    return "Invalid highest 30 min rainfall total"
    }
    else if (!row.highest_60_min_rainfall_mm ||isNaN(parseFloat(Number(row.highest_60_min_rainfall_mm))) && !isFinite(Number(row.highest_60_min_rainfall_mm))) {
    return "Invalid highest 60 min rainfall total"
    }
    else if (!row.highest_120_min_rainfall_mm ||isNaN(parseFloat(Number(row.highest_120_min_rainfall_mm))) && !isFinite(Number(row.highest_120_min_rainfall_mm))) {
    return "Invalid highest 120 min rainfall total"
    }
    else if (!row.mean_temperature_c ||isNaN(parseFloat(Number(row.mean_temperature_c))) && !isFinite(Number(row.mean_temperature_c))) {
    return "Invalid mean temp"
    }
    else if (!row.maximum_temperature_c ||isNaN(parseFloat(Number(row.maximum_temperature_c))) && !isFinite(Number(row.maximum_temperature_c))) {
    return "Invalid max temp"
    }
    else if (!row.minimum_temperature_c ||isNaN(parseFloat(Number(row.minimum_temperature_c))) && !isFinite(Number(row.minimum_temperature_c))) {
    return "Invalid min temp"
    }
    else if (!row.mean_wind_speed_kmh ||isNaN(parseFloat(Number(row.mean_wind_speed_kmh))) && !isFinite(Number(row.mean_wind_speed_kmh))) {
    return "Invalid mean wind speed"
    }
    else if (!row.max_wind_speed_kmh ||isNaN(parseFloat(Number(row.max_wind_speed_kmh))) && !isFinite(Number(row.max_wind_speed_kmh))) {
    return "Invalid max wind speed"
    }
  
    return;
    }
