** SoftenPDF Release Notes - Copyright 2026 SoftenWORKS Co. Ltd. **


## v1.6.4

**New**

- Added file matching to folder comparison
	- Comparison files can be reordered using Drag & Drop
		- File names can be edited when `[site].enableVaultRename` in sites.yml is set to true
	- Comparison file names can be changed and then reordered in ascending order
- Added a comparison options pop-up menu to folder comparison
	- Previously: Comparisons could be run only with the site's default settings
	- Improved: Before running a comparison, users can directly change comparison option values in a pop-up menu (same as local comparison)
- Added re-comparison to folder comparison
	- Added a button that can rerun a comparison using the file matching list from an in-progress or completed comparison
- Added authentication lockout after consecutive password failures
	- By default, the user is locked after five consecutive failures
	- Added the ability to unlock users from the User Management screen
	- Maximum failure count setting: soften.authentication.fail.max (authentication lockout is disabled when set to 0 or less)

**Changes**

- Improved the image comparison results screen so it remembers user changes to Toolbar button states by adding settings caching
	- Affected buttons: Auto Zoom, Restrict Page Movement, Diff1 Opacity, Show Diff1, and Show Diff2
- Reversed the order of Diff1 opacity values in the image comparison options and comparison results screen
	- Scrolling down now decreases the value, and scrolling up increases it
- Folder comparison improvements
	- Changed comparison result information:
		- While a comparison is in progress, both successes and failures are counted in the comparison total used to display progress (previously, only successes were counted)
		- After the comparison is complete, only successful comparisons are counted to display the success rate
	- Improved error-handling speed by revising logic for abnormal conditions
	- Improved the stability of folder comparison thread termination
	- Adjusted the height of each section on the folder comparison screen
- Improved local comparison so files dropped into the PDF preview area using Drag & Drop are selected for comparison
- Added JAVA_ARG_ETC to softenpdf.ini: Java options and environment variables can be added as needed
	- Default value: -Dspring.profiles.active=prod
- Other web security enhancements
	- Added a setting that rejects all modified or nonstandard methods
		- soften.security.method.allow: default values are GET,POST
	- Applied HttpOnly to cookies
	- Enforced session ID rotation on login and session invalidation on logout
- Other screen UI improvements
	- Improved the ScrollPicker and Diff1 Color Picker components
	- Other usability and design improvements
	- Other screen structure and internal logic improvements
- Other internal improvements
	- Improved exception-handling logic and messages

**Bugfix**

- Fixed an issue where the selected folder value disappeared after collapsing and expanding the comparison target section in folder comparison
- File upload screen (Vault uploader):
	- Fixed an error that occurred when downloading immediately after changing a file name
	- Fixed an issue where the previous file name was not restored on screen when Rename failed
	- Fixed file uploads failing when CSRF was not applied
	- Fixed an issue where pressing the Delete key to remove text while editing a file name deleted the file itself
	- Fixed duplicate files not being detected when their names differed only in letter case -> names are now treated as duplicates regardless of letter case

**Updates**

- Changed the application JAR version in softenpdf.ini (1.6.4)
- Configure the option added to softenpdf.ini as needed
	- JAVA_ARG_ETC
- Configure the options added to application.properties as needed
	- soften.authentication.fail.max: Number of consecutive password failures before authentication is locked
	- soften.security.method.allow: Rejects all HTTP methods other than those configured
		- The default values are GET,POST. If the value is empty, all methods except those in deny are allowed. If deny is also empty, all methods are allowed.
- Add messages to message_x.properties as needed:
	- main.msg.loadingMessage.image: Description shown under the icon while comparing images in local files
	- main.msg.loadingMessage.text: Description shown under the icon while comparing text in local files
	- image.restrictInside: Default message changed ("Restrict Movement Within Drawing" -> "Restrict Page Movement")
	- text.download: Message for the comparison result Summary download button label
	- folder.main.button.recompare: Re-compare button tooltip
	- folder.main.selectFolder.button.folder.title: Select Folder button tooltip
	- folder.main.selectFolder.button.reload.title: Refresh file list in folder button tooltip
	- folder.main.selectFolder.file.match.title: File name match rate tooltip
	- folder.main.selectFolder.file.message.noFileName: Message displayed when a folder comparison target file name is left blank during renaming
	- folder.summary.message.dataRemoved: Message displayed on the folder comparison results screen when the data has been deleted
	- vault.message.delete.succeed: Message displayed when a file is successfully deleted from the file uploader
	- vault.message.delete.fail: Message displayed when a file fails to be deleted from the file uploader


## v1.6.3

**New**

- Added server folder editing:
	- Added the ability to create, delete, and rename server folders in the folder selection layer pop-up on the folder comparison screen
	- Added an option in sites.yml to enable or disable editing for each site:
		- enableFolderEditable: Whether folder editing is allowed. true/false (default: true)
- Added file upload to server folders:
	- Added the ability to upload, delete, download, and rename files in the selected folder
	- Added options in sites.yml to enable or disable uploads for each site:
		- enableFolderUploader: Whether the file upload screen is enabled. true/false (default: true)
		- enableVaultDownload: Whether files can be downloaded from the file upload screen. true/false (default: true)
- Added default values in application.properties that automatically populate the Source/Target directory when a new site is added on the Site Management screen
	- soften.site.defaultSourceDir
	- soften.site.defaultTargetDir
- Added memory usage Logger: com.softenware.pdf.common.JvmMemoryLogger at DEBUG (FINE) and FINER levels

**Changes**

- Changed the folder selection pop-up on the folder comparison screen to a layer pop-up
- Improved refresh functionality for folder comparison result data and reduced screen flickering
- Improved memory usage optimization
	- Control memory usage with comparison options:
		- maxMemoryStreamCache: Maximum memory cache usage when loading PDFs
		- maxFileStreamCache: Maximum file cache usage when loading PDFs
		- resourceCacheClearInterval: Resource cache clearing interval (in pages)
- Improved folder comparison result retrieval
	- Changed count logic: Failed PDFs are excluded from the comparison count stored in Completed results
	- Changed the Completed list to reverse chronological order by completion date/time
	- Improved handling of other exceptional conditions
- Other improvements
	- Grid column widths can now be adjusted on the Site Management and User Management screens
	- Some structural improvements

**Bugfix**

- Fixed an issue where the event did not run when the folder button was clicked after the "Select Folder" section on the folder comparison screen was collapsed and expanded
- Fixed access to a Default site not shown on the main home page -> this occurred when site access restrictions were not used; all sites are now displayed in the list
- Fixed an issue where saving from the User Management screen while data was filtered saved only the filtered users
- Improved the login screen to prevent multiple identical login requests (including license allocation)

**Updates**

- Changed the application JAR version in softenpdf.ini (1.6.3)
- Configure the options added to application.properties as needed
	- soften.site.defaultSourceDir: Default value automatically populated in the Source directory column when a new site is added on the Site Management screen
	- soften.site.defaultTargetDir: Default value automatically populated in the Target directory column when a new site is added on the Site Management screen
- Add sites.yml properties as needed: To prohibit folder editing and file management in folder comparison for a specific site, set the following properties to false
	- enableFolderEditable: Whether folder editing is allowed for the site. true/false (default: true)
	- enableFolderUploader: Whether file management within folders is allowed for the site. true/false (default: true)
	- enableVaultDownload: Whether files can be downloaded from folders for the site (depends on enableFolderUploader). true/false (default: true)
	- enableVaultRename: Whether file names can be changed within folders for the site (depends on enableFolderUploader). true/false (default: true)
	- defaultOptions(defaultImageOptions):
		- maxMemoryStreamCache: Maximum memory cache usage when loading PDFs
		- maxFileStreamCache: Maximum file cache usage when loading PDFs
		- resourceCacheClearInterval: Resource cache clearing interval (in pages)
	- Thumbnail image size settings moved: Site Settings -> Default Image Options
		- diffThumbWidth: Maximum thumbnail image width
		- diffThumbHeight: Maximum thumbnail image height
- Add messages to message_x.properties as needed:
	- Added messages related to the folder chooser
	- Added messages related to the Vault


## v1.6.2

**New**

- Added the "Site Management" menu (screen)
	- Basic management mode: Copy, view, edit, and delete in a grid; only required values can be edited
	- Advanced management mode: Configure all items using text editing
- Added the ability to assign sites to users
	- Added assignment functionality to the User Management screen
	- Added site permission separation
		- Restrict access to assigned users only: soften.security.site.access.restricted
		- Restrict information outside assigned sites: soften.security.site.read.restricted
			- Currently applied to: In-progress folder comparisons
	- Automatically redirects to the home page of the first assigned site
		- Users cannot navigate to the home page of an unassigned site
		- Added the ability to select and navigate to an assigned site from the home page
- Added password changes for logged-in users:
	- Added a password change pop-up (button provided on the main home screen)
	- Added application.properties settings
		- soften.private.password.rule: Regular expression for the password rule
		- soften.admin.users.password.rule.apply: Whether to apply the regular expression in User Management
- Added setting:
	- soften.site.file: Specifies the data file used to store site information
- Added the concept of profiles to sites.xml: Applies the file corresponding to the configured profile

**Changes**

- Changed Site Management from the previous configuration-based approach to a data-based approach
	- File changed: File name and contents changed (see Updates)
	- Sites can be changed while the system is running
	- Provides a separate "Site Management" screen
- Changed how folder comparison result information is stored
	- Previously managed in a single file -> comparison result log files are now separated by site
	- When the number of logs within a site exceeds the limit, they are stored in a separate file
		- Count limit setting: soften.compare.folder.result.max
	- Added the ability to select and view log files on the folder comparison screen
- Other changes
	- Updated parts of the Admin screen UI
	- Removed profile variable handling from the logback file -> fixed value; enter the file name directly if needed
	- Improved the local development environment: added a second command-line parameter for selecting the INI file
	- Removed automatic redirection to local file comparison after five seconds on the home screen

**Bugfix**

- Changed the + symbol to a space in header information error ALERT messages
- Fixed an error that occurred when navigating to / while already logged in and no savedRequest existed when accessing /loginForm
- Improved AJAX-related functions in soften-pdf-common.js to prevent duplicate error alerts
- Fixed an issue where an Error other than an Exception during folder comparison was not saved to the result file

**Updates**

- Changed the application JAR version in softenpdf.ini (1.6.2)
- Renamed application.yml to sites.yml
	- File name changed: The existing application.yml file must not remain
	- File content changes:
		- Delete the first four lines containing spring.config.activate.on-profile
		- name property: (change if needed) Can be changed to a general name, such as a display name
		- description property: (if needed) Add and enter the property when a description is required
- Added application.properties properties:
	- soften.security.site.access.restricted: Restrict access to assigned users only
	- soften.security.site.read.restricted: Restrict information outside assigned sites
	- soften.compare.folder.result.max: Number of folder comparison results stored per file
	- soften.private.password.rule: Regular expression for the password rule
	- soften.admin.users.password.rule.apply: Whether to apply the regular expression in User Management
	- soften.site.file: Site data file setting
- Added users.json property: (if needed) Handle through data migration or the Site Management screen
	- sites property: List site IDs separated by ','


## v1.6.1-p2, v1.6.3 ~

**Bugfix**

- Fixed an issue where most pages after an unspecified page were not compared when comparing pages containing moved drawings


## v1.6.1-p1, v1.6.2 ~

**Bugfix**

- Fixed highlights not appearing in some PDF comparisons: highlights are now rendered on separate layers for each page
- Fixed some highlight bookmark positions appearing at locations on the next page by changing the highlight processing logic


## v1.6.1

**New**

- Added an option to upload a file selected on the local file comparison screen and display the contents of the file returned by the server (for DRM processing or similar needs)
	- Setting: application.yml -> fileUploadViewMode
	- Setting values (modes):
		- Disabled: Disables the feature. Local files are displayed directly in the browser.
		- Button: Provides a separate button for uploading and displaying the server-returned file
		- Auto: Automatically uploads a selected local file to the server and displays it

**Changes**

- Changed how the size range for removing watermark bitmap images is entered
	- Numeric range input -> expression text input
	- Pixel area range (min ~ max) -> minWidth,minHeight-maxWidth,maxHeight
	- Size ranges can be entered as proportions of the page:
		- If every number in the expression is 1 or less, the values are treated as page proportions
		- Otherwise, the values are treated as pixels or points

**Bugfix**

- Fixed an error on a pop-up results screen when comparing on a site other than default
	- The site was incorrectly recognized as default, so the result file could not be found when the result directory differed

**Updates**

- Changed the application JAR version in softenpdf.ini (1.6.1)
- Added application.yml property: Per-site option
	- fileUploadViewMode: Option for uploading and displaying a selected local file (default: Disabled)
- Changed message_x.properties:
	- Removed main.option.optedToRemoveWatermark.imageSize and its child properties
	- Added main.option.optedToRemoveWatermark.watermarkSizeRangesExpression and its child properties
	- Added properties related to the main.button.uploadview button


## v1.6.0

**New**

- Enhanced system security
	- Applied CSRF
		- Default: Not applied
		- Setting: application.properties/soften.security.csrf=false
	- Restricted HTTP Methods: All methods other than GET and POST are rejected
	- Secured cookies:
		- SameSite=Lax
		- Secure
	- Rejected SSL Renegotiation
	- Disabled Login Form autocomplete
	- Added error handling for URLs that do not belong to a registered site; previously, such URLs were treated as the default site

**Changes**

- Changed the main home page
	- Added menu links to each feature: Local File Comparison, Server Folder Comparison, File User Management, and Usage Log Viewer
	- Added the concept of sites to the main home page: feature availability is applied per site
	- Added a Logout button
- Changed the default for enabling folder comparison in the default site settings from false to true
- Updated the jQuery open-source version to 3.7.1

**Bugfix**

- Fixed an intermittent issue where the list of differing pages did not pop up in image comparison results for folder comparison
	- Removed the possibility of duplicate compare IDs in folder results
	- Changed (separated) the folder result information file name: result.soften -> folder-result.soften

**Updates**

- Changed the application JAR version in softenpdf.ini (1.6.0)
- application.properties: Added security-related properties
	- #soften.security.csrf=true: Whether to apply CSRF (default: false - not applied)
	- #security.csrf.ignore-urls=/rest/**,/ext/**: Specifies URLs excluded from CSRF
	- #soften.security.method.deny=DELETE,OPTIONS,PATCH,PUT,TRACE: HTTP Method restrictions
- Changed and added message_x.properties
	- Changed and added child properties to reflect changes to the root screen
- Changed service executables to restrict security-related renegotiation - affected files: softenpdf, softenpdf.cmd
- Migration:
	- Changed the folder comparison result data file name: result.soften -> folder-result.soften
	Caution) The file comparison result data file name remains result.soften
	This separates the folder comparison result data file, which previously used the same result.soften file name


## v1.5.4

**Changes**

- PDFBOX open source updated from 2.0.21 to 2.0.32
- When removing bitmap images, null results are now replaced with a one-pixel transparent white PNG image

**Bugfix**

- Eliminated errors caused by nonexistent CMaps such as Adobe-Korea1-3
- Eliminated errors that occurred during origin movement inspection (when page sizes differed by a factor of two or more)

**Updates**

- Changed the application JAR version in softenpdf.ini (1.5.4)


## v1.5.3

**New**

- Added an option to align differing Rotation information
- Added an option to match differing page sizes to the left page

**Changes**

- Set the Java default encoding to UTF-8 at system startup and added a setting for changing console encoding: log.config.charset.console
- Added a local administrator login method when IP-based login is enabled
- Generalized the CompareRequest class for CompareOptions
- Changed folder comparison from using one common request to creating a separate request for each file
	- Saving after Rotation or Scale adjustments modified information in the request object and caused information conflicts
- PDF conversion now saves the converted file in the Workspace before text/image comparison is called
- Added the SoftenPDF version parameter to CSS and JS URLs
- Changed the useMultiPages default from false to true (enabled by default when no setting exists)
- Added a script to change configuration files to LF format on Linux/Unix: init4unix-softenpdf
- Other logic improvements

**Bugfix**

- Fixed an error that occurred when checking the role of a user logged in through IP-based login
- Fixed an issue where newly added comparison request properties were not initialized to their default values

**Updates**

- Changed the application JAR version in softenpdf.ini (1.5.3)
- application.properties:
	- log.config.charset.console: Setting for changing console log encoding (default: UTF-8)
- application.yml:
	- Options added to both text and image comparison options:
		- optedToAdjustRotation: true/false; default value for automatically aligning page rotation
		- optedToAdjustScale: true/false; default value for automatically aligning page sizes
- Updated execution scripts
	- init4unix-softenpdf: Run after the initial installation on Linux
	- softenpdf: file.encoding=UTF-8
	- softenpdf-kill
	- softenpdf-start
	- softenpdf-stop
	- softenpdf.cmd: file.encoding=UTF-8


## v1.5.2

**New**

- Added a CropBox configuration option for text/image comparison
	- Enter the value directly in the option field using the required format
	- Crops and compares only the specified area
- Added an excluded-area configuration option for image comparison only
	- Enter the value directly in the option field using the required format
	- Excludes the specified area from comparison
	- The Comparator must be replaced with one that implements ExclusionAbility
- Added join thread timeout settings for left/right thread join wait times
	- textThreadTimeout: Milliseconds
	- imageThreadTimeout: Milliseconds
- Added menu IDs so text/image comparison option items can be hidden using custom CSS

**Changes**

- Removed com.softenware.pdf.text.SoftenRectangle
	- Replaced with com.softenware.pdf.model.SoftenRectangle

**Updates**

- Changed the application JAR version in softenpdf.ini (1.5.2)
- application.yml:
	- Replace the Comparator as needed (com.softenware.pdf.image.SoftenImageBothAxesComparator2WithExclusion)
	- site.textThreadTimeout: default 60000
	- site.imageThreadTimeout: default 60000
	- site.cropBoxExpression: Crop area expression
	- site.defaultImageOpts.excludedAreasExpression: Area excluded from comparison
- message_x.properties: Crop area and excluded-area options
	- main.option.cropBoxExpression
	- main.option.cropBoxExpression.desc
	- main.option.cropBoxExpression.valid
	- main.option.excludedAreasExpression
	- main.option.excludedAreasExpression.desc
	- main.option.excludedAreasExpression.valid


## v1.5.1

**New**

- Added an option for treating characters other than ordinary Whitespace as whitespace so they can be included in exclusion options: enter a regular expression identifying characters to treat as Whitespace
- Added extensibility for downloading text/image comparison result Summaries:
	- The download URL can be changed to replace the download functionality
	- Added an Excel-format download extension: softenpdf-plugin-download-1.0

**Changes**

- Improved session checks and AJAX error handling: checks the session before downloading a Summary and displays the login pop-up when needed

**Updates**

- Changed the application JAR version in softenpdf.ini (1.5.1)
- application.properties:
	- soften.result.download.text: Text comparison result Summary download URL setting (must include the variable {compareId})
	- soften.result.download.image: Image comparison result Summary download URL setting (must include the variables {compareId} and {pageIndex})
- Added messages related to the additional whitespace option
	- main.option.additionalWhitespaceExp
	- main.option.additionalWhitespaceExp.desc
	- main.option.additionalWhitespaceExp.valid


## v1.5.0

**New**

- Added folder-to-folder comparison
	- Requests comparison of PDF files between server folders
	- Folder comparison progress/result status
	- Folder file comparison result Summary
	- Per-site option for enabling/disabling folder comparison: yml
	- Added a property for setting the maximum number of folder comparison threads
- Added the Usage Log Viewer screen
	- Changed usage log contents
	- Added detailed comparison/viewing-based usage logs
	- Added the Usage Log Viewer screen
	- Added a property for specifying the types displayed in the Usage Log Viewer
- Added an extension for inserting custom scripts into OOTB screens

**Changes**

- Improved the structure of custom CSS insertion through common automatic processing
- Updated commons-io dependency version from 2.6 to 2.16.1
- Improved parts of the build script

**Bugfix**

- Text diff count: Changed from the total number of diff types to the number of diff pairs

**Updates**

- Changed the application JAR version in softenpdf.ini (1.5.0)
- application.properties:
	- log.config.filename.usage: Usage log file name
	- soften.system.logs.read: Specifies the types displayed on the Usage Log Viewer screen
	- soften.folder.progressReload.timeout: Folder comparison progress refresh interval (milliseconds)
	- soften.custom.script.xx.xx: Inserts a custom script
- application.yml:
	- useFolderComparison: Enables/disables folder comparison per site; true/false
- logback-prod.xml:
	- Removed duplicate LOG_FILE_NAME
	- Added USAGE_LOG_FILE_NAME
- message_x.properties:
	- Added folder.xxx
	- Added logs.xxx


## v1.4.4

**New**

- Added an option to compare after removing bitmap images such as watermarks
	- Added a removal option to local comparison options
	- Added options for configuring the minimum and maximum sizes when removal is enabled

**Changes**

- Added option information to the Info pop-up in image comparison results
	- Auto-movement option information
	- Watermark removal option information

**Bugfix**

- Fixed changes to custom*.css in the ext project not being applied properly because of browser caching

**Updates**

- Changed the application JAR version in softenpdf.ini (1.4.4)
- Added default option values to application.yml
	- optedToRemoveWatermark: true/false (whether to remove bitmap images)
    - minWatermarkSize: 0 (minimum size of images to remove)
    - maxWatermarkSize: 0 (maximum size of images to remove)
- Added messages related to the bitmap image removal option; update them as needed
	- main.option.optedToRemoveWatermark
	- main.option.optedToRemoveWatermark.desc
	- main.option.optedToRemoveWatermark.imageSize
	- main.option.optedToRemoveWatermark.imageSize.desc
	- main.option.optedToRemoveWatermark.imageSize.min.valid
	- main.option.optedToRemoveWatermark.imageSize.max.valid


## v1.4.3

**New**

- Added support for customizing the root main home screen: soften.custom.page.root property (forwarding Velocity page: custom/template/)

**Changes**

- Changed the custom folder structure
	- custom/public: Contains all static resources
		- Mapped to custom/**
		- custom/css/custom.css, custom/css/custom-[site].css
	- custom/template (unchanged): ExternalCustomView forwarding templates
	- custom/lib (unchanged): ext build JARs and other referenced libraries
- Deprecated the soften.image.logo property: Not backward compatible. Feature removed.
	- Configure through CSS -> use custom.css
- Added support for .html in addition to .vm as custom template file extensions
- Restricted the system utility REST API to ROLE_ADMIN
- Removed other system warnings

**Updates**

- Changed the application JAR version in softenpdf.ini (1.4.3)
- The custom folder structure must be migrated
	- CSS: custom/public/css (mapped to custom/css)
	- Images: custom/public/images (mapped to custom/images)
- Changed the site custom.css method: from css/[site-name]/custom.css to css/custom-[site-name].css
- Changed the company logo method: removed the soften.image.logo property -> use custom.css


## v1.4.2

**Changes**

- Changed the RESTful API token name: token -> SOFTEN_API_TOKEN (token remains available for backward compatibility but is deprecated)
	- Added a setting for changing the token name itself: soften.token.rest.tokenName
- Added a RESTful API token transmission method: tokens can now be sent by cookie as well as by parameter
- Added support for receiving request information and running comparisons through classes that extend ImageCompareRequest or TextCompareRequest in custom development

**Updates**

- Changed the application JAR version in softenpdf.ini (1.4.2)
- application.properties
	- soften.token.rest.tokenName: Added a setting for changing the REST API token name as needed (default: SOFTEN_API_TOKEN)


## v1.4.1

**New**

- Added text comparison options
	- Automatic page adjustment: Aligns CropBox values when MediaBox values are identical (added separately to text and image options)
	- Exclude text outside the page from comparison: Text at coordinates outside the CropBox is excluded from extraction and highlighting
- Added an image comparison option
	- Automatic page adjustment: Aligns CropBox values when MediaBox values are identical (added separately to text and image options)

**Changes**

- Added some image- and text-related classes to the ext.jar library referenced during external extension development
- If a Multipart error occurs on the comparison screen after logging in again following session expiration, an alert is displayed and the window closes

**Updates**

- Changed the application JAR version in softenpdf.ini (1.4.1)
- Added default option parameters to application.yml
	- adjustPageBox: true/false
	- defaultTextOpts:
		- excludeTextOutside: true/false
- Message properties
	- main.option.adjustPageBox
	- main.option.adjustPageBox.desc
	- main.option.excludeTextOutside
	- main.option.excludeTextOutside.desc
	- error.message.session.expired.retry


## v1.4.0

**New**

- Added text comparison options
	- Ignore changes in which only whitespace is added or removed
	- Ignore changes in whitespace type (including Unicode whitespace)

**Changes**

- Java 11 compatibility
- If the session has expired when the comparison screen opens and the user logs in again, the MultipartException error message is replaced with an alert instructing the user to try again, after which the window closes => ★ properties added
- Exposed related classes for development so CompareService and similar components can be used in Extension projects

**Bugfix**

- When PDF writing is prohibited during text comparison, the restriction is removed before highlighting
- Added UTF-8 support for Velocity view files used by extensions (fixed corrupted Korean text)
- Reset the main comparison screen when file selection is canceled
- Fixed an issue where, after a browser update, image movement using Drag & Drop stopped working and the default Drag & Drop behavior was applied instead

**Updates**

- Changed the application JAR version in softenpdf.ini (1.4.0)
- If the Java bin location points to a version earlier than 11, change it in softenpdf.ini to version 11 or later
- Added message properties:
	- main.option.ignoreOnlyWhitespaceChanges
	- main.option.ignoreOnlyWhitespaceChanges.desc
	- main.option.ignoreDifferentWhitespaceTypes
	- main.option.ignoreDifferentWhitespaceTypes.desc
	- main.option.adjustPageBox
	- main.option.adjustPageBox.desc
	- main.option.excludeTextOutside
	- main.option.excludeTextOutside.desc
	- error.message.session.expired.retry
- Added default option items to application.yml
	- defaultTextOpts:
		- ignoreOnlyWhitespaceChanges: true/false
		- ignoreDifferentWhitespaceTypes: true/false


## v1.3.0

**New**

- Added the text comparison result Summary feature
- Added the User Management screen and functionality: compatible with the existing file data structure ★ message added

**Changes**

- Changed user Role names to ROLE_ADMIN/ROLE_USER ★ local user file must be changed
- Included the custom folder structure, lib, and template folders in the distribution
- License-related changes ★ message added

**Bugfix**

- Fixed a custom.css MIME type error

**Updates**

- Changed the application JAR version in softenpdf.ini (1.3.0)
- Changed Role names in the local user file to ROLE_ADMIN and ROLE_USER
- Added messages


## v1.2.4

**New**

- Added manual Rotation: If a PDF is rotated on the pre-comparison PDF selection screen before the comparison runs, it is compared in the selected orientation and results are provided accordingly

**Changes**

- Other update: Partially improved the outline movement detection check logic

**Updates**

- Changed the application JAR version in softenpdf.ini (1.2.4)


## v1.2.3

**New**

- Added drawing movement correction => ★ properties added
- Added an external event handler extension (AfterStorePdfFileEvent is invoked immediately after an uploaded file is stored in the Workspace)

**Changes**

- Addressed Log4j and other open-source security vulnerabilities
- Reconfigured the Extension development environment
	- Provides a separate Extension development environment
	- AfterStorePdfFileEvent
	- Velocity views can be developed for Extension screens

**Updates**

- Changed the application JAR version in softenpdf.ini (1.2.3)
- Added messages related to drawing movement correction (change as needed):
	- main.option.optedToInspectMoved
	- main.option.optedToInspectMoved.desc
	- main.option.optedToInspectMoved.optedToAdjustApprox
	- main.option.optedToInspectMoved.optedToAdjustApprox.desc
- Changed softenpdf.cmd and softenpdf.ini contents. Moved memory options and the lib path from cmd to ini (apply the existing settings to the new files)
- Add default option settings to application.yml as needed:
	- optedToInspectMoved: true/false
	- optedToAdjustApprox: true/false


## v1.2.2

**New**

- Added touch panning
- Added pinch-to-zoom

**Changes**

- Mouse-wheel zoom now centers on the pointer position (previously centered on the screen)
- Added a horizontal scrollbar to the image results screen Toolbar for small screens such as mobile devices (supports touch scrolling)
- Token files now reload automatically when their contents change
- Added JBIG2 image support

**Updates**

- Changed the application JAR version in softenpdf.ini (1.2.2)


## v1.2.1

**New**

- Added Client IP-based access restrictions => ★ properties added
- Added company logo configuration => ★ properties added
- Added token functionality for the REST API => ★ properties added

**Updates**

- Changed the application JAR version in softenpdf.ini (1.2.1)
- application.properties:
 	- soften.access.ip.band=IP ranges in CIDR notation (comma-separated)
	- Contact us regarding IP-based automatic login
	- soften.image.logo=Company logo file path
	- soften.token.rest=Token management file path


## v1.2.0

**New**
	- Added SSL support
	- Added file user functionality
	- Added LDAP support
	- Added SAML SSO support

**Updates**

- Changed the application JAR version in softenpdf.ini (1.2.0)
- Changed messages
- Added properties


## v1.1.8

**New**

- Added Image Fit => ★ message added
- Added Auto Zoom => ★ message added
- Updated image viewer to 1.2.2 (API change: move center is now included in the zoom API and was removed from the calling code; animation improved)

**Updates**

- Changed the application JAR version in softenpdf.ini (1.1.8)
- Add defaultAutoZoom to application.yml and set it to true/false as needed (default: true)
- Add or change "image.autoZoom" and "image.button.tooltip.fitImage" in messages as needed


## v1.1.7.210204

**Bugfix**

- Changed REST requests so they do not create sessions

**Updates**

- Replaced the WAR file


## v1.1.7

**New**

- Added authentication. Supports external authentication such as SSO. (Internal authentication is not supported; no user management.) => ★ add settings as needed
- Added global access authorization. Supports external database verification. (Internal authorization is not supported; no authorization management.) => ★ add settings as needed
- Added a customizable and extensible structure => ★ add settings as needed

**Updates**

- Configure the session timeout as needed
- Configure whether to use usage logs (setting added): soften.usageLog.use=true
- Configure whether to use authentication/authorization (setting added): soften.auth.use=true
- Add specific URLs to authentication exceptions as needed: soften.authentication.except
- Add an external login form/SSO check page as needed: setting (soften.authentication.loginForm), JSP (custom/jsp/)
- Add an external authentication controller as needed: only the ext.** package is supported
- Add an authorization check query as needed: soften.sql.authority.global
- When adding custom classes, add loader.path to the executables (softenpdf, softenpdf.cmd): custom/lib (deploy extension class JARs to custom/lib)
- Added authentication/authorization-related messages: error.noauth.message.title, error.noauth.message.main, error.loginForm.message.title
- Changed the application JAR version in softenpdf.ini (1.1.7)


## v1.1.6.210126

**New**

- Added customization of guidance text at the top of each page => ★ per-page guidance text properties
- Added custom CSS => ★ custom CSS

**Changes**

- Changed forceLogin to redirect
- Changed the order of Toolbar buttons on the image comparison results screen

**Updates**

- Add guidance text as needed (main.pageGuide, image.pageGuide, text.pageGuide)
- Add site-specific custom.css under custom/ as needed


## v1.1.6.210125

**Changes**

- Synchronized Summary-DiffNavi-DiffRect
- Added Diff number display
- Added forced login handling => ★ added the accountId parameter to the log query
- Added comparison result creation date and retention period information to ⓘ => ★ messages added (image.info.created, image.info.retentionDays)

**Updates**

- The accountId parameter can be used in the soften.sql.logging.access query in application.properties as needed
- Add image.info.created and image.info.retentionDays to custom properties for each language as needed
- Changed the application name (version) in softenpdf.ini


## v1.1.5.210120

**New**

- Added usage logging (file and database)

**Changes**

- Configured with PropertiesLauncher to support dynamic database settings

**Updates**

- Add settings for database logging in application.properties as needed (initialize spring.autoconfigure.exclude; configure the database and SQL)
- Configure a custom logback.xml as needed (UsageLogger added inside)
- Added -Dloader.path=WEB-INF/lib,WEB-INF/classes,file:lib to softenpdf and softenpdf.cmd
- Changed the version in the INI file to softenpdf-server-1.1.5.war


## v1.1.4.210117

**Changes**

- Added an algorithm that applies fine movement on both the x- and y-axes
- Applied softenpdf-image.jar v1.3.0
- Added an option to apply comparison classes per site => ★ added the "comparator" setting to yml
- Other: Handled null defaultLocale values

**Updates**

- Add comparator to the required sites in application.yml to apply the desired class


## v1.1.3.210114

**New**

- Added the ability to retry (refresh the screen) after a No Header error

**Updates**

- Add autoReloadOnError to the required sites in application.yml


## v1.1.3.210113

**Changes**

- Improved the user language change logic (resolved has no relationship to messageSource)
- Added options for setting delays before and after saving files

**Updates**

- Add delaytimeBeforeStoringFile and delaytimeAfterStoringFile values (milliseconds) to the required site settings


## v1.1.3.210112

**New**

- Added the user language change UI (completed) => ★ added English/Korean

**Changes**

- Added information about options applied during comparison to the image comparison result information ⓘ; this information is not available when viewing existing results

**Updates**

- Added five "common.language.*" entries to custom messages
- If custom messages exist for languages other than en and ko, add the corresponding "common.language.*" entries


## v1.1.3.210111

**New**

- Added image comparison option reset => ★ added English/Korean

**Updates**

- Added "main.reset=Reset" to custom messages


## v1.1.3.210110

**Changes**

- Changed the image comparison method: Added y-axis comparison after x-axis comparison (applied softenpdf-image-1.2.0)
- Added the user language change UI (in progress)

**Updates**

- Changed the app WAR name in softenpdf.ini


## v1.1.2.210107

**Changes**

- Changed comparison result information => ★ changed and added English/Korean
- Fixed opacity being applied to images during REST calls and 0 being saved => ★ changed and added siteConfig
- Added compare ID information to error logs and screens

**Updates**

- Added "common.word.resolution=Resolution" to custom messages
- Added "image.info.imageInfo=Result Image Information" to custom messages
- Change to "image.info.tiles.criteria=Tile Application Criteria" in custom messages as needed
- application.yml: Added "diffImageTransparency: 0.7" to site
- application.yml: Changed the first two digits of values such as "diffARGB: 0xffffff00" to "ff" in site.defaultOpts


## v1.1.2.210104

- Matched image zoom ratios on the image results screen
- Allowed users to disable forced tile viewing
- Added a comparison result information icon (tile criteria guide) => ★ added English/Korean
- Called CollectGarbage()


## v1.1.2.201228

- Updated pdfbox 2.0.10 -> 2.0.21
- Changed the license structure => ★ a new license file is required
- RESTful API returns multi-page results as a list
- Fixed a tile button tag error (tooltip not displayed)
- Improved parts of the UI, including the Toolbar, on the image comparison results screen
- Added Diff1 opacity adjustment to the image comparison results screen -> ★ stores alphaDiff1 in the Data class (creates differences from existing result data -> ★ migrate as needed)
- Added the ability to find and apply the port in the Bash shell (softenpdf), the same as softenpdf-kill -> ★ apply the softenpdf file to deployed servers as needed
- Improved misalignment at tile seams (script: use ceil() for the tile size ratio; image comparison library: discard remaining pixels to standardize tile sizes)
- Added an option to apply tiled viewing automatically => ★ add "tileAuto" to site options to use it (example: tileAuto: 11088/83000000)
