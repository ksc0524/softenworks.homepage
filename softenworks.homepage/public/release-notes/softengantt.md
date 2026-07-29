** SoftenGANTT Release Notes - Copyright 2026 SoftenWORKS Co. Ltd. **


## v1.5.1

**New**:

- Resource View 에 Time Spent Source 데이터를 선택하는 기능 추가
	- 위젯 파라미터 추가: Resource View > Time Spent Source
		- Work Item: (기본 값) Work Item 의 Time Spent 필드의 값을 데이터로 사용
		- Work Records: 해당 Work Item 에 작성된 작업 시간(Work Record)의 값을 데이터로 사용
- Resource view 에 Remaining Estimate 와 Time Spent 를 정확한 지점에 할당하는 옵션 추가
	- Gantt Resource View 에 "Exact per assignee and date" 체크박스 추가
		- Unchecked: (기본 값) 기존과 동일하게, Remaining Estimate 와 Time Spent 를 담당자와 날짜 별로 균등하게 분배
		- Checked: Remaining Estimate 와 Time Spent 를 담당자와 해당 날짜에 정확히 할당
			- Remaining Estimate: Task 일정 내 오늘부터 이후 일정에만 균등하게 분배함(담당자 간에는 균등 분배). Task 종료일이 오늘을 지난 경우 마지막 날에 모두 할당함.
			- Time Spent: Time Spent Source 가 "Work Item" 이면 날짜와 담당자 별로 균등하게 분배하고, "Work Records" 이면 해당 날짜와 담당자에게 정확하게 할당함.
- Task 진행률 계산 기능 추가
	- 위젯 파라미터 추가: Field Mapping > Progress Calculation
		- TimeSpent / InitialEstimate: (기본 값) 계획 기반 자동 계산 방식. Work Item 의 Time Spent 실적을 계획공수(Initial Estimate)로 나누어 자동 계산 및 상위로 합산
		- TimeSpent / (RemainingEstimate + TimeSpent): 실적 기반 자동 계산 방식. Time Spent 실적을 현 시점에서의 전체 공수로 나누어 자동 계산 및 상위로 합산
		- Manual: 지정한 필드에 진행률을 직접 입력하여 저장하고 조회하는 방식. 상위 합산이 안되고 개별로 관리
	- Progress 필드 매핑 파라미터는 Progress Calculation 의 선택 값이 "Manual" 인 경우에만 나타남

**Changes**:

- BranviBasic 1.6.2 기반
- 기타 UI 개선

**Bugfix**:

- Polarion 2512 버전에서 일부 아이콘이 보이지 않는 현상 해결
	- Task 추가/삭제하는 액션 버튼
	- Plan(Release/Iteration) 아이콘
- Gantt reload 시 marker 버튼은 활성화되어 있으나 marker 는 사라지는 문제 해결


## v1.5.0

**New**:

- Field 의 값에 따라 Task 의 style(색상 등) 을 custom 하게 구성할 수 있도록 해주는 기능 추가
	- 파라미터 추가: Fields for Custom Styling (필드 다중 선택)
	- Task 의 grid 영역과 task bar 에 "fieldId-fieldValue" 형태로 class 가 추가됨
	- Custom CSS 파라미터에 스타일을 추가하여 색상 등 변경 가능
- Additional Fields 에 추가된 Column 의 내용에 보여 주는 값을 선택하는 파라미터 추가
	- Additional Fields > Column > Display value as:
		- Name / Label: 사용자 이름, 제목 등으로 표시
		- Value / Code: 아이디, 코드, 내부 값 등으로 표시. (DurationTime 의 경우 getHours()를 사용해 시간 값으로 표시)
- 일반 WBS Gantt 위젯에도 Split task 기능 추가: 상위 Task 가 접히면 하위 task 들을 한 행에 보여 주는 기능
	- Split 모드 선택:
		- None: 기능 사용 안함 (기본 값)
		- Global: 모든 Task 에 항상 적용
		- Task: task 별로 설정 저장(Lightbox 에서 task 마다 설정) -> 저장할 field 지정 필요
- 최초 로딩 시 특정 task 가 접혀 있도록 설정하는 기능 추가
	- Collapse Field of Task: task 에 접히게 할지 여부를 저장하는 boolean 필드 id 설정 (설정 값이 존재하면 기능 사용으로 간주)
	- true 로 설정된 task 는 최초 로딩 시 접혀서 조회됨
- 최초 로딩 이후 접거나 펼치면 캐시 처리하여 다시 데이터 로딩 시 접히거나 펼친 상태를 유지하는 기능 추가
- Gantt 최초 로딩 시 Zoom to Fit 으로 적용하는 옵션 파라미터 추가: Gantt Options > Zoom to Fit on first load (Yes/No)
- Milestone 타입을 work item type 으로 지정할 수 있는 기능 추가
	- 기존: task type(Project/Milestone/Task)을 저장하는 필드가 꼭 필요했음
	- 추가: Work Item Type을 지정하면 해당 타입의 work item 은 Milestone 으로 간주 -> 타입 저장할 필드 불필요
- Page Parameter 를 데이터 필터링으로 사용하는 기능 추가:
	- Page Parameter 를 work item 의 field id 와 맞추면 wbs task 를 필터링할 수 있는 기능
	- Page Parameter Widget 을 사용하면 사용자가 직접 변경해서 필터링할 수 있음
	- 관련 파라미터:
		- Gantt Data Set > Use Page Parameters for Task Filtering: 사용 여부 선택 (Yes/No)
		- Gantt Data Set > Exclude Page Parameters from Task Filtering: 제외할 field id 리스트 입력

**Changes**:

- JDK 17 버전 적용
- Polarion 2506+ 버전 적용:
	- buildGroupQuery API 변경 대응
	- 참조하는 Polarion library 버전을 최소 3.25.6 으로 변경
- BranviBasic 1.6.1 기반
- License 변경: 버전 업 시 라이선스를 새로 발급하여 적용해야 함
- 위젯 파라미터 구조 변경:
	- 구조 변경:
		- Include Plans as Parent tasks(구 Display Plans): 최상위 -> Gantt Data Set(구: Targets) 하위로 이동
		- Level Limit: 최상위 -> Gantt Data Set(구: Targets) 하위로 이동
		- Sort: 최상위 -> Gantt Data Set(구: Targets) 하위로 이동
		- Set End date as Next date: 최상위 -> Scheduling Options 하위로 이동
		- Use Polarion Calendar: 최상위 -> Scheduling Options 하위로 이동
	- 순서 변경
	- 명칭 변경:
		- Targets -> Gantt Data Set
		- Display Plans as Parent -> Include Plans as Parent tasks
- Milestone 하위에 scheduled task 를 만들지 못하도록 변경
- Deprecated: JsonConverter
- 기타 코드 개선 다수

**Bugfix**:

- 중복 저장 문제 해결: 저장 시간이 오래 걸리는 중에 [Save] 버튼을 중복 클릭하면 중복 저장되던 문제 -> 저장 시에도 Loading modal 처리
- Redo 가 한 번만 되던 문제 해결
- Gantt Task Type 이상 현상 문제 해결
	- Auto project type 이 상황에 따라 달라지는 문제 해결
	- Plan 조회 시 auto project type 이 작동하지 않는 문제 개선
	- Manual type 과 unscheduled 조회 및 저장 시 발생하는 문제 개선

**Updates/Caution**:

- License 재발급 필요
- JDK 17 이상, Polarion 2506 이상
- Widget Parameter 구조 변경: 최상위 레벨에서 다른 파라미터 그룹 하위로 이동한 파라미터들(Changes 참고)은 기존 값을 다시 지정해야 함(기본 값이 아닌 경우)


## v1.4.1

**Changes**:

- Resource View:
	- 담당자 별 Workload 값을 다음 옵션에 따라 값 표시
		- Initial Estimate: day 단위로 계산하여 표시
		- Remaining Estimate: day 단위로 계산하여 표시
		- Remaining Estimate + Time Spent: day 단위로 계산하여 표시
		- Task Count: 개수 단위로 계산하여 표시 (기존 기능)
	- Hours level zoom 에서 Resource View 툴버튼 비활성화
	- 담당자 일별 할당 값 표시 UI 일부 변경
- 주말, 휴일 배경 표시: 기존 Week 레벨 부터 -> Day 레벨 부터
- LightBox 에서 task Delete 시 하위레벨 삭제할 수 있도록 액션 버튼 Delete 와 동일하게 처리
- gantt export 시 전체 task 개수의 높이로 출력되던 기능을 visible task 개수의 높이로 출력되도록 개선

**Bugfix**:

- ReadOnly 설정 시 Reload 툴버튼이 사라지는 오류 수정
- Project type task 더블클릭 시 lightbox 팝업 안되던 오류 수정
- Gantt 데이터 내용에 '\t' 이 포함된 경우 발생하는 오류 수정


## v1.4.0

**New**:

- Inline editing 기능 추가 [Gantt, GroupPlan]
	- Set Editable 위젯 파라미터 추가
		- Gantt Read Only : No 일때 edit column Dependency
		- Inline editing Columns : edit 활성화 column 다중 선택 Picker
- Gantt Export 기능 추가 [Gantt, GroupPlan]
	- Toolbar 제외, Grid 전체 영역 PNG export 기능 추가
	- Toolbar 제외, Grid 전체 영역 PDF export 기능 추가
- Resource View 기능 추가 [Gantt]
	- assignee 별 Task에 할당된 Workload view
		- Initial Estimate : assignee 별 할당된 Task의 초기 공수
		- Remaining Estimate : assignee 별 할당된 Task의 남은 공수
		- Remaining Estimate + Time Spent : assignee 별 할당된 Task의 남은 공수 + Time Spent
		- Task Count : assignee 별 할당된 Task의 count

**Changes**:

- Toolbar 디자인 변경 [Gantt, GroupPlan]
	- Toolbar 디자인 변경
	- 버튼 순서 변경

**Bugfix**

- Level Limit 위젯 파라미터 기능 미동작 오류 수정 [Gantt]
- Additional Fields 위젯 파라미터 "Add" 중복 표시 수정 [Gantt]


## v1.3.1

**New**:

- Group 데이터(enum 등)에서 불필요한 항목들은 제외시킬 수 있는 파라미터 기능 추가: 콤마 separator로 id 리스트 기입
- Group 데이터를 enum이 아닌 필드와 custom json 으로 구성할 수 있는 파라미터 기능 추가. json이 입력되어 있으면 우선함

**Bugfix**

- 상하위 모두 새로 추가된 task인 경우 저장 시 발생하는 에러 수정 (BranviBasic Gson 방식으로 변경된 차이점이 원인)


## v1.3.0

**New**:

- 기본 툴팁 기능 추가 [Gantt, GroupPlan]
	- Task에 마우스 올리면 기본 툴팁 팝업
	- 사용 여부 위젯 파라미터 추가
	- CSS 에 툴팁 스타일 정의
- Compare with Baseline 확장 기능 추가 [Gantt, GroupPlan]
	- extension 위젯 파라미터에 확장 기능 추가
	- 툴바에 베이스라인 선택 콤보박스 추가
	- 베이스라인 선택 시 기존 task bar에 베이스라인 일정 bar가 추가됨
- Quarter 스케일 추가 [Gantt, GroupPlan]
- Custom Script 위젯 파라미터 추가 (velocity 지원) [Gantt, GroupPlan]
- Custom Style 위젯 파라미터 추가 (위젯 모두 적용) [Gantt, GroupPlan]
- Gantt Options 위젯 파라미터 추가 [Gantt, GroupPlan]
	- Row Height: 행의 높이
	- Bar Height: task bar 의 높이
	- Initial Zoom Level: 초기 스케일 설정 (0부터 시작)
	- Enable Tooltip: 기본 툴팁 사용 여부

**Changes**:

- branvi-basic 소스 분리 적용
	- MANIFEST.MF 교체하는 방식으로 구성
	- branvi-basic에서 branvi-basic-core.jar를 가져 와서 포함해서 배포하는 방식
	- 기존 복사하던 basic-src 소스폴더 제거
	- license 관련 소스만 lic-src로 구성

**Bugfix**

- GroupPlan 위젯 파라미터에서 쿼리 수정해도 내부적으로 전체 쿼리되는 오류 수정 [GroupPlan]
- Gantt 및 GroupPlan의 sort 파라미터 적용 안되는 오류 수정 (기능 구현 일부 안됐음) [Gantt, GroupPlan]


## v1.2.0

**New**:

- Group Plan Widget 추가

**Changes**:

- Toolbar buttons:
	- Auto schedule 버튼 2개: 숨길 수 있도록 파라미터로 옵션화
	- full screen 버튼 토글 제외
- Task의 action button을 task의 property로 숨길 수 있도록 옵션화: task.hideNewButton, task.hideDeleteButton
- lightbox time(date) 지정 방식 옵션화: params.dateSelectType
- 시작 zoom level 옵션화: params.initZoomLevel
- gantt load url 파라미터 옵션화: params.ganttLoadUrl
- task.icon 우선화
- ext loadBaseline() 은 베이스라인 기능 하나라도 포함되어 있어야 호출하도록 체크
- 개선: load 중 오류 발생 시 로딩바 닫도록 처리

**Bugfix**

- Gantt load 후 자동으로 이전 task 선택 시 해당 task가 없으면 스크립트 오류 발생하는 버그 수정


## v1.1.1

**Changes**:

- Extension 기능들을 동적으로 로드되도록 구성
- Extension 기능들을 위젯 파라미터로 적용할 수 있도록 옵션화


## v1.1.0

**Changes**:

- 확장(Extension) 기능 추가:
	- 확장 기능 분리 구성: 소스분리, 기능 분리
	- View as Baseline 확장 기능 추가
	- Baseline marker 기능 추가
- 'project' 타입 lightbox 의 일정 필드를 readonly 처리
- 액션([+] 추가 버튼) 메뉴 팝업 시 하위 자리가 없는 경우 상위로 팝업되도록 자동 위치 조정
- Unscheduled 개념 추가:
	- 일정이 없는 task는 모두 Unscheduled 처리
	- lightbox에 Schedule/Unschedule 버튼 제공
- save 또는 reload 후 이전에 선택된 task 선택
- timeline column width 를 더 작게 줄일 수 있도록 minColumnWidth를 80에서 20으로 축소


**Bugfix**:

- 간트차트에서 하위 일정 변경 시 플랜은 변경표시 안되고 저장 시에도 제외되도록 처리: 플랜 보이는 상태에서 수정 후 저장 시 오류 발생
- 팝업메뉴 hide 시 무한루프 오류 수정
- Plan 링크 url 수정: Plan 링크 클릭 시 work item 링크로 이동하는 오류 해결


## v1.0.0

- SoftenGANTT 기본 기능 릴리즈