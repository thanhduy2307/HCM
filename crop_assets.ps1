Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path "landing.jpg").Path)

# Top right portrait (x: 1040, y: 10, width: 245, height: 230)
$rectPortrait = New-Object System.Drawing.Rectangle(1040, 10, 245, 230)
$bmpPortrait = $src.Clone($rectPortrait, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpPortrait.Save((Join-Path (Get-Location) "portrait_bac_ho_sketch.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpPortrait.Dispose()

# Bottom left footprint quote (x: 20, y: 1040, width: 380, height: 125)
$rectFoot = New-Object System.Drawing.Rectangle(20, 1040, 380, 125)
$bmpFoot = $src.Clone($rectFoot, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpFoot.Save((Join-Path (Get-Location) "footer_footprint_sketch.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFoot.Dispose()

# Finale badge art (x: 860, y: 755, width: 430, height: 395)
$rectFinale = New-Object System.Drawing.Rectangle(860, 755, 430, 395)
$bmpFinale = $src.Clone($rectFinale, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpFinale.Save((Join-Path (Get-Location) "finale_badge_art.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFinale.Dispose()

# Lotus accent (x: 10, y: 310, width: 85, height: 85)
$rectLotus = New-Object System.Drawing.Rectangle(10, 310, 85, 85)
$bmpLotus = $src.Clone($rectLotus, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpLotus.Save((Join-Path (Get-Location) "lotus_accent.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpLotus.Dispose()

# Paper plane doodle (x: 15, y: 10, width: 100, height: 100)
$rectPlane = New-Object System.Drawing.Rectangle(15, 10, 100, 100)
$bmpPlane = $src.Clone($rectPlane, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpPlane.Save((Join-Path (Get-Location) "plane_doodle.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmpPlane.Dispose()

# Background paper patch sample for background texture
$rectPaper = New-Object System.Drawing.Rectangle(150, 450, 200, 200)
$bmpPaper = $src.Clone($rectPaper, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$bmpPaper.Save((Join-Path (Get-Location) "parchment_sample.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmpPaper.Dispose()

$src.Dispose()
Write-Output "ALL_CROPPED_OK"
