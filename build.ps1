<#
    Wyam Static Website builder Script
    Copyright (C) 2018 Gianni Rosa Gallina.

    - IMPORTANT: Make sure that you have set the path to wyam as the $wyam_exe variable below
    - IMPORTANT: The script supposes your default editor is Visual Studio Code.

    - Run the following in your powershell to allow build script. Answer 'Y' to the question on allowing unsigned scripts to run.
        'Set-ExecutionPolicy -Scope CurrentUser unrestricted'
#>

Param(
    $target = "",
    $websiteRoot = '.\src',
    $outputPath = '..\output',
    $previewPort = '5080',
	[Switch]$help
)

# IMPORTANT: MAKE SURE TO SET THESE VARIABLES TO YOUR ENVIRONMENT TO AVOID BUILD FAILURES
$wyam_exe = ".\tools\wyam-v1.4.1\wyam.exe"

function WriteMessage($message, $color)
{
	write-host $message -foreground $color
}

$helpMessage = 
@"
Usage: .\build.ps1 -target [Init|Preview|Release] [options]
Options:
    -target      : choose which target to build (Init, Preview or Release)
    -websiteRoot : where website source files are stored. Default: .\src
    -outputPath  : where to store generated website files. Default: .\output
    -previewPort : built-in webserver port to host preview website. Default: 5080
    -help        : prints this message

If you don't know which options to use, just launch the script with "-target Preview".
It will generate the website using Wyam, start the built-in preview server on http://localhost:5080
and will launch Visual Studio Code to edit website source files, in order to immediately
see the results by refreshing the browser.

If you want to generate the website ready for deploy, launch with "-target Release" option.
It will generate the website using Wyam in the specified 'outputPath'.

"@

Clear-Host

if($help)
{
	WriteMessage $helpMessage 'green'
	Exit
}

if($target -eq "" -or (!($target -eq "Init") -and !($target -eq "Preview") -and !($target -eq "Release")))
{
    WriteMessage ("target not specified or not valid") 'red'
	WriteMessage $helpMessage 'green'
	Exit
}

if($target -eq "Init")
{
    & $wyam_exe new --recipe blog $websiteRoot
	Exit
}

if($target -eq "Preview")
{
    # Use Wyam to build the website, run built-in webserver for preview and enable watching for changes
    Write-Host "Executing:" $wyam_exe "build -o $outputPath -p $previewPort -w $websiteRoot"
    $processStatus = (Start-Process -FilePath "$wyam_exe" -PassThru -ArgumentList "build -o $outputPath -p $previewPort -w $websiteRoot")
    
    # Wait until the built-in server is up and running. In case of error terminates.
    while($true) 
    {
        Try
        {
            Invoke-WebRequest "http://localhost:$previewPort" | Out-Null
            Break
        }
        Catch
        {
            if($processStatus.HasExited -eq $true)
            {
                WriteMessage ("An error occurred while generating website. Check errors by launching the above command.") 'red'
                Exit
            }
            Write-Host "Waiting for Wyam built-in server to start on http://localhost:$previewPort"
            Start-Sleep -Seconds 5
        }
    }
    
    # Open browser at the preview endpoint
    & cmd.exe /C start "http://localhost:$previewPort"

    # Launch Visual Studio Code at the website root
    & code.cmd $websiteRoot
	Exit
}