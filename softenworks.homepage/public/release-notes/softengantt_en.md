** SoftenGANTT Release Notes - Copyright 2026 SoftenWORKS Co. Ltd. **


## v1.5.1

**New**:

- Added an option to select the Time Spent Source data in Resource View
	- Added widget parameter: Resource View > Time Spent Source
		- Work Item: (default) Uses the value of the Work Item's Time Spent field
		- Work Records: Uses the work time (Work Record) entered for the Work Item
- Added an option to allocate Remaining Estimate and Time Spent to the exact assignee and date in Resource View
	- Added the "Exact per assignee and date" checkbox to Gantt Resource View
		- Unchecked: (default) Evenly distributes Remaining Estimate and Time Spent across assignees and dates, as before
		- Checked: Allocates Remaining Estimate and Time Spent to the exact assignee and date
			- Remaining Estimate: Evenly distributes it only across the remaining Task schedule from today onward (and evenly among assignees). If the Task end date has passed, the entire amount is allocated to the last day.
			- Time Spent: If Time Spent Source is "Work Item," the value is evenly distributed by date and assignee. If it is "Work Records," the value is allocated to the exact date and assignee.
- Added Task progress calculation
	- Added widget parameter: Field Mapping > Progress Calculation
		- TimeSpent / InitialEstimate: (default) Plan-based automatic calculation. Automatically divides the Work Item's actual Time Spent by the planned effort (Initial Estimate) and aggregates the result to parent Tasks.
		- TimeSpent / (RemainingEstimate + TimeSpent): Actuals-based automatic calculation. Automatically divides actual Time Spent by the total current effort and aggregates the result to parent Tasks.
		- Manual: Progress is entered directly in the specified field for saving and viewing. Values are managed individually and are not aggregated to parent Tasks.
	- The Progress field mapping parameter appears only when Progress Calculation is set to "Manual"

**Changes**:

- Based on BranviBasic 1.6.2
- Other UI improvements

**Bugfix**:

- Fixed an issue in Polarion 2512 where some icons were not displayed
	- Action buttons for adding/deleting Tasks
	- Plan (Release/Iteration) icon
- Fixed an issue where markers disappeared after reloading Gantt even though the marker button remained active


## v1.5.0

**New**:

- Added support for custom Task styles (such as colors) based on Field values
	- Added parameter: Fields for Custom Styling (multiple Field selection)
	- A class in the format "fieldId-fieldValue" is added to the Task grid area and task bar
	- Colors and other styles can be changed by adding rules to the Custom CSS parameter
- Added a parameter for selecting how values are displayed in Columns added under Additional Fields
	- Additional Fields > Column > Display value as:
		- Name / Label: Displays a user name, title, or similar label
		- Value / Code: Displays an ID, code, internal value, or similar value. (For DurationTime, getHours() is used to display the value in hours.)
- Added the Split task feature to the standard WBS Gantt widget: when a parent Task is collapsed, its child Tasks are displayed in a single row
	- Split mode options:
		- None: Disables the feature (default)
		- Global: Always applies the feature to all Tasks
		- Task: Saves the setting for each Task (configured for each Task in the Lightbox) -> requires a Field in which to save the setting
- Added an option to have specified Tasks collapsed on initial load
	- Collapse Field of Task: Sets the Boolean Field ID used to store whether a Task should be collapsed (the feature is considered enabled when this setting is present)
	- Tasks set to true are displayed collapsed on initial load
- Added caching of collapsed/expanded states so they are retained when data is loaded again after Tasks are collapsed or expanded
- Added an option parameter to apply Zoom to Fit when Gantt is first loaded: Gantt Options > Zoom to Fit on first load (Yes/No)
- Added support for specifying a Work Item Type as the Milestone type
	- Previously: A Field for storing the Task type (Project/Milestone/Task) was required
	- Added: When a Work Item Type is specified, Work Items of that type are treated as Milestones -> a type storage Field is no longer required
- Added support for using Page Parameters to filter data:
	- WBS Tasks can be filtered by matching Page Parameters to Work Item Field IDs
	- Users can change filtering directly through the Page Parameter Widget
	- Related parameters:
		- Gantt Data Set > Use Page Parameters for Task Filtering: Select whether to use the feature (Yes/No)
		- Gantt Data Set > Exclude Page Parameters from Task Filtering: Enter a list of Field IDs to exclude

**Changes**:

- Applied JDK 17
- Applied Polarion 2506+:
	- Adapted to buildGroupQuery API changes
	- Changed the minimum referenced Polarion library version to 3.25.6
- Based on BranviBasic 1.6.1
- License change: A new license must be issued and applied when upgrading versions
- Changed the widget parameter structure:
	- Structure changes:
		- Include Plans as Parent tasks (formerly Display Plans): Moved from the top level to Gantt Data Set (formerly Targets)
		- Level Limit: Moved from the top level to Gantt Data Set (formerly Targets)
		- Sort: Moved from the top level to Gantt Data Set (formerly Targets)
		- Set End date as Next date: Moved from the top level to Scheduling Options
		- Use Polarion Calendar: Moved from the top level to Scheduling Options
	- Changed the order
	- Renamed:
		- Targets -> Gantt Data Set
		- Display Plans as Parent -> Include Plans as Parent tasks
- Prevented scheduled Tasks from being created under Milestones
- Deprecated: JsonConverter
- Various other code improvements

**Bugfix**:

- Fixed duplicate saves: repeatedly clicking [Save] while a save was taking a long time caused duplicate saves -> a Loading modal is now displayed during saving
- Fixed an issue where Redo worked only once
- Fixed Gantt Task Type issues
	- Fixed an issue where the Auto project type changed depending on the situation
	- Improved the Auto project type so it works when Plans are loaded
	- Fixed issues that occurred when loading and saving Manual types and unscheduled Tasks

**Updates/Caution**:

- License reissuance required
- JDK 17 or later and Polarion 2506 or later required
- Widget Parameter structure changed: Parameters moved from the top level into other parameter groups (see Changes) must be configured again if they use non-default values


## v1.4.1

**Changes**:

- Resource View:
	- Displays Workload values for each assignee according to the following option
		- Initial Estimate: Calculated and displayed in days
		- Remaining Estimate: Calculated and displayed in days
		- Remaining Estimate + Time Spent: Calculated and displayed in days
		- Task Count: Calculated and displayed as a count (existing feature)
	- Disabled the Resource View toolbar button at the Hours zoom level
	- Partially changed the UI for displaying each assignee's daily allocation
- Weekend and holiday backgrounds are now displayed starting at the Day level instead of the Week level
- Deleting a Task from the Lightbox now supports deleting child levels in the same way as the Delete action button
- Improved Gantt export so the output height is based on the number of visible Tasks rather than the total number of Tasks

**Bugfix**:

- Fixed an issue where the Reload toolbar button disappeared when ReadOnly was enabled
- Fixed an issue where the Lightbox did not open when a Project-type Task was double-clicked
- Fixed an error that occurred when Gantt data contained '\t'


## v1.4.0

**New**:

- Added inline editing [Gantt, GroupPlan]
	- Added the Set Editable widget parameter
		- Gantt Read Only: Edit column Dependency when set to No
		- Inline editing Columns: Multi-select Picker for columns in which editing is enabled
- Added Gantt Export [Gantt, GroupPlan]
	- Added PNG export of the entire Grid area excluding the Toolbar
	- Added PDF export of the entire Grid area excluding the Toolbar
- Added Resource View [Gantt]
	- Workload view of Tasks assigned to each assignee
		- Initial Estimate: Initial effort of Tasks assigned to each assignee
		- Remaining Estimate: Remaining effort of Tasks assigned to each assignee
		- Remaining Estimate + Time Spent: Remaining effort + Time Spent for Tasks assigned to each assignee
		- Task Count: Count of Tasks assigned to each assignee

**Changes**:

- Changed the Toolbar design [Gantt, GroupPlan]
	- Changed the Toolbar design
	- Changed the button order

**Bugfix**

- Fixed the Level Limit widget parameter not working [Gantt]
- Fixed duplicate display of "Add" in the Additional Fields widget parameter [Gantt]


## v1.3.1

**New**:

- Added a parameter for excluding unnecessary items from Group data (such as enums): enter a comma-separated list of IDs
- Added a parameter for constructing Group data from non-enum Fields and custom JSON. JSON takes precedence when entered.

**Bugfix**

- Fixed an error that occurred during saving when both parent and child Tasks were newly added (caused by differences introduced by the switch to the BranviBasic Gson approach)


## v1.3.0

**New**:

- Added the default tooltip feature [Gantt, GroupPlan]
	- A default tooltip appears when the pointer hovers over a Task
	- Added a widget parameter for enabling/disabling the feature
	- Defined tooltip styles in CSS
- Added the Compare with Baseline extension [Gantt, GroupPlan]
	- Added the extension to the extension widget parameter
	- Added a baseline selection combo box to the Toolbar
	- Selecting a baseline adds a baseline schedule bar to the existing task bar
- Added the Quarter scale [Gantt, GroupPlan]
- Added the Custom Script widget parameter (supports Velocity) [Gantt, GroupPlan]
- Added the Custom Style widget parameter (applies to all widgets) [Gantt, GroupPlan]
- Added Gantt Options widget parameters [Gantt, GroupPlan]
	- Row Height: Row height
	- Bar Height: Task bar height
	- Initial Zoom Level: Initial scale setting (starting at 0)
	- Enable Tooltip: Whether to use the default tooltip

**Changes**:

- Separated the branvi-basic source
	- Configured by replacing MANIFEST.MF
	- branvi-basic-core.jar is taken from branvi-basic, included, and distributed
	- Removed the previously copied basic-src source folder
	- Kept only license-related source code in lic-src

**Bugfix**

- Fixed an issue where the entire query was executed internally even after the query was modified in the GroupPlan widget parameter [GroupPlan]
- Fixed the sort parameter not being applied in Gantt and GroupPlan (the feature was only partially implemented) [Gantt, GroupPlan]


## v1.2.0

**New**:

- Added the Group Plan Widget

**Changes**:

- Toolbar buttons:
	- Added parameters for hiding the two Auto schedule buttons
	- Excluded the full screen button from toggling
- Added an option to hide a Task's action buttons through Task properties: task.hideNewButton, task.hideDeleteButton
- Added an option for specifying Lightbox time (date): params.dateSelectType
- Added an option for the initial zoom level: params.initZoomLevel
- Added an option for the Gantt load URL parameter: params.ganttLoadUrl
- task.icon now takes precedence
- ext loadBaseline() is called only when at least one baseline feature is included
- Improvement: The loading bar now closes if an error occurs during loading

**Bugfix**

- Fixed a script error that occurred when automatically selecting the previously selected Task after Gantt loaded if the Task no longer existed


## v1.1.1

**Changes**:

- Configured Extension features to load dynamically
- Added options for applying Extension features through widget parameters


## v1.1.0

**Changes**:

- Added Extension features:
	- Separated Extension source code and functionality
	- Added the View as Baseline extension
	- Added the Baseline marker feature
- Made the schedule Fields in the 'project'-type Lightbox read-only
- Added automatic positioning so the action ([+] Add button) menu opens upward when there is insufficient space below
- Added the Unscheduled concept:
	- All Tasks without schedules are treated as Unscheduled
	- Added Schedule/Unschedule buttons to the Lightbox
- Selects the previously selected Task after saving or reloading
- Reduced minColumnWidth from 80 to 20 so the timeline column width can be made smaller


**Bugfix**:

- When child schedules are changed in the Gantt chart, Plans are no longer marked as changed and are excluded from saving: fixed an error that occurred when saving after editing while Plans were visible
- Fixed an infinite-loop error when hiding a pop-up menu
- Fixed the Plan link URL: clicking a Plan link incorrectly opened a Work Item link


## v1.0.0

- Initial release of SoftenGANTT
