** SoftenPDF Release Notes - Copyright 2026 SoftenWORKS Co. Ltd. **


## v1.6.4

**New**

- 폴더 비교에 파일 매칭 기능 추가
	- 비교 대상 파일을 Drag & Drop 하여 파일의 순서를 변경할 수 있는 기능
		- sites.yml: [site].enableVaultRename 설정 값이 true 인 경우 파일명 수정 가능
	- 비교 대상 파일의 이름을 변경하고 오름차순으로 재정렬하는 기능
- 폴더 비교에 비교 옵션 팝업 메뉴 제공
	- 기존: 사이트 기본 설정 값대로만 비교 실행됨
	- 개선: 비교 실행 전 사용자가 직접 비교 옵션 값을 수정할 수 있는 팝업 메뉴 제공 (로컬 비교와 동일)
- 폴더 비교에 재비교 기능 추가
	- 진행 중인 비교와 완료된 비교 결과의 파일 매칭 리스트로 재비교할 수 있는 버튼 제공
- 비밀번호 연속 실패 시 인증 제한 기능 추가
	- 기본 5회 연속 실패 시 사용자 Lock 처리
	- 사용자 관리 화면에서 사용자의 Lock 해제 기능 제공
	- 실패 최대 횟수 설정: soften.authentication.fail.max (0 이하이면 인증 제한 기능 사용 안함)

**Changes**

- 이미지 비교결과 화면의 툴바 버튼들을 사용자가 변경한 상태를 기억하도록 개선: 설정 캐시 기능 추가
	- 대상 버튼: 자동 줌, 페이지 이동 제한, Diff1 투명도, Diff1 표시 여부, Diff2 표시 여부
- 이미지 비교 옵션 및 비교결과 화면 내 Diff1 의 투명도 선택 값들의 정렬을 반대로 변경
	- scroll down 시 값이 작아지고, scroll up 시 값이 커지도록 구성
- 폴더 비교 기능 개선 사항
	- 비교 결과 정보 변경:
		- 진행 중인 경우 성공/실패 모두 비교 개수로 카운트하여 진행률 표시 (기존: 성공만 count)
		- 비교가 완료되면 성공한 개수만 카운트하여 성공률 표시
	- 비정상 상황의 로직 수정을 통해 오류 처리 속도 개선 
	- 폴더 비교 thread 종료 안정화 개선
	- 폴더 비교 화면 섹션 별 height 조정
- 로컬 비교 화면의 PDF 미리보기 영역에 파일을 Drag & Drop 하면 비교 대상으로 선택되도록 기능 개선
- softenpdf.ini 에 JAVA_ARG_ETC 항목 추가: 필요 시 Java 옵션 및 환경변수 추가
	- 기본 값: -Dspring.profiles.active=prod
- 기타 웹취약점 관련 강화
	- 표준 method 외에 변조된 method는 모두 제약하는 설정 추가
		- soften.security.method.allow: 기본 값은 GET,POST
	- Cookie HttpOnly 처리
	- 로그 인/아웃 시 세션 ID 강제 변경 및 무효화 처리
- 기타 화면 UI 개선 사황
	- ScrollPicker, Diff1 Color Picker 컴포넌트의  개선
	- 기타 UI 편의성 및 디자인 개선
	- 기타 화면 구조 및 내부 로직 개선
- 기타 내부 개선 사항
	- 예외 상황 처리 로직 및 메시지 개선

**Bugfix**

- 폴더 비교의 비교 대상 섹션을 접었다 펴면 선택된 폴더 값이 사라지는 오류 해결
- 파일 업로드 화면(Vault uploader):
	- 파일명 수정 후 바로 다운로드 시 발생하는 에러 해결
	- 파일명 Rename 실패 시 화면 상 이전 파일명으로 바뀌지 않는 오류 수정
	- CSRF 비적용 시 파일 업로드 실패하는 오류 해결
	- 파일명 수정/편집 중 텍스트를 삭제하기 위해 delete key를 누르면 파일 자체가 삭제되는 오류 수정
	- 대소문자 차이로 중복 파일 처리되지 않아서 발생하는 문제 수정 -> 대소문자 달라도 중복 처리하도록 수정

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.6.4)
- (필요 시) softenpdf.ini 에 추가된 옵션 설정
	- JAVA_ARG_ETC
- (필요 시) application.properties 에 추가된 옵션 설정
	- soften.authentication.fail.max: 비밀번호 연속 실패 시 인증 제한되는 횟수 설정
	- soften.security.method.allow: 설정된 http method 외에는 모두 거부하도록 설정
		- 기본 값은 GET,POST이며 값을 비우면 deny 외에 모두 허용. deny 값도 비우면 모든 method 허용
- (필요 시) message_x.properties 메시지 추가:
	- main.msg.loadingMessage.image: 로컬 파일 이미지 비교중 아이콘 아래 설명 문구
	- main.msg.loadingMessage.text: 로컬 파일 텍스트 비교중 아이콘 아래 설명 문구
	- image.restrictInside: 기본 메시지 변경됨 ("도면 내 이동 제한" -> "페이지 이동 제한")
	- text.download: 비교 결과 Summary 다운로드 버튼 명 메시지 화
	- folder.main.button.recompare: 재비교 버튼 툴팁
	- folder.main.selectFolder.button.folder.title: 폴더 선택 버튼 툴팁
	- folder.main.selectFolder.button.reload.title: 폴더 내 파일 리스트 새로고침 버튼 툴팁
	- folder.main.selectFolder.file.match.title: 파일명 매치율 툴팁
	- folder.main.selectFolder.file.message.noFileName: 폴더 비교 대상 파일 이름 변경 시 빈칸인 경우 메시지
	- folder.summary.message.dataRemoved: 데이터가 삭제된 폴더 비교 결과 화면에서 알려 주는 메시지
	- vault.message.delete.succeed: 파일 업로더에서 파일 삭제 성공한 메시지
	- vault.message.delete.fail: 파일 업로더에서 파일 삭제 실패한 메시지


## v1.6.3

**New**

- 서버 폴더 편집 기능 추가:
	- 폴더 비교 화면 내 폴더 선택 레이어 팝업에서 서버의 폴더를 추가, 삭제, 이름변경 기능
	- sites.yml 에 사이트 별 편집 기능 사용 여부 옵션 설정 추가:
		- enableFolderEditable: 폴더 편집 가능 여부. true/false (기본 값: true)
- 서버 폴더에 파일 업로드 기능 추가:
	- 선택된 폴더에 파일들을 업로드, 삭제, 다운로드, 파일명 변경하는 기능
	- sites.yml 에 사이트 별 업로드 기능 사용 여부 옵션 설정 추가:
		- enableFolderUploader: 파일 업로드 화면 사용 여부. true/false (기본 값: true)
		- enableVaultDownload: 파일 업로드 화면에서 파일 다운로드 가능 여부. true/false (기본 값: true)
- 사이트 관리 화면에서 신규 사이트 추가 시 Source/Target directory 가 자동으로 채워지는 기본 값 설정 추가: application.properties
	- soften.site.defaultSourceDir
	- soften.site.defaultTargetDir
- 메모리 사용 현황 Logger 추가: com.softenware.pdf.common.JvmMemoryLogger: DEBUG(FINE), FINER 레벨

**Changes**

- 폴더 비교 화면 내 폴더 선택 팝업 창을 레이어 팝업으로 변경
- 폴더 비교 결과 데이터 refresh 기능 및 화면 깜박거림 개선
- 메모리 사용량 최적화 개선
	- 비교 옵션으로 메모리 사용량 조절:
		- maxMemoryStreamCache: PDF load 시 메모리 캐시 최대 사용량 설정
		- maxFileStreamCache: PDF load 시 파일 캐시 최대 사용량 설정
		- resourceCacheClearInterval: 리소스 캐시 삭제 주기 (페이지 주기)
- 폴더 비교 결과 조회 기능 개선
	- 개수 로직 변경: 실패한 pdf는 비교된 개수에서 제외하여 Completed 결과에 저장
	- Completed 리스트를 완료일시 역순으로 변경
	- 기타 예외 상황 처리 개선
- 기타 개선
	- 사이트 관리, 사용자 관리 화면의 그리드 컬럼 사이즈 조절 가능하도록 개선
	- 일부 구조 개선

**Bugfix**

- 폴더 비교 화면에서 "폴더 선택" 섹션을 접었다가 다시 편 후 폴더 버튼 클릭하면 이벤트 동작하지 않는 오류 수정
- 메인홈에 나오지 않은 Default 사이트로 접속됨 -> 사이트 접근 제한을 사용하지 않는 경우이며, 모든 사이트가 리스트로 나오도록 변경
- 사용자 관리 화면에서 데이터 필터링 상태에서 저장 시 필터링 된 사용자만 저장되는 이슈 해결
- 동일한 로그인 요청(라이선스 할당 포함)이 여러 번 발생하지 않도록 로그인 화면 개선 

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.6.3)
- (필요 시) application.properties 에 추가된 옵션 설정
	- soften.site.defaultSourceDir: 사이트 관리 화면에서 신규 사이트 추가 시 Source directory 컬럼에 자동으로 채워주는 기본 값
	- soften.site.defaultTargetDir: 사이트 관리 화면에서 신규 사이트 추가 시 Target directory 컬럼에 자동으로 채워주는 기본 값
- (필요 시) sites.yml 속성 추가: 특정 사이트에 대해, 폴더 비교에서 폴더 편집 및 파일 관리 기능을 금지하려면 아래 속성을 false 로 지정해야 함
	- enableFolderEditable: 해당 사이트에서 폴더 편집 가능 여부. true/false (기본값 true)
	- enableFolderUploader: 해당 사이트에서 폴더 내 파일 관리 가능 여부. true/false (기본값 true)
	- enableVaultDownload: 해당 사이트에서 폴더 내 파일 다운로드 가능 여부(enableFolderUploader 에 종속적). true/false (기본값 true)
	- enableVaultRename: 해당 사이트에서 폴더 내 파일명 수정 가능 여부(enableFolderUploader 에 종속적). true/false (기본값 true)
	- defaultOptions(defaultImageOptions):
		- maxMemoryStreamCache: PDF load 시 메모리 캐시 최대 사용량 설정
		- maxFileStreamCache: PDF load 시 파일 캐시 최대 사용량 설정
		- resourceCacheClearInterval: 리소스 캐시 삭제 주기 (페이지 주기)
	- 썸네일 이미지 사이즈 설정 위치 변경: 사이트 설정 -> 기본 이미지 옵션 설정
		- diffThumbWidth: 썸네일 이미지 최대 width
		- diffThumbHeight: 썸네일 이미지 최대 height
- (필요 시) message_x.properties 메시지 추가:
	- folder chooser 관련 메시지 추가
	- vault 관련 메시지 추가


## v1.6.2

**New**

- "사이트 관리" 메뉴(화면) 추가
	- 기본 관리 모드: 그리드 방식으로 복사/조회/수정/삭제하고 필수 값만 수정 가능
	- 고급 관리 모드: 텍스트 편집 방식으로 모든 항목 설정 가능
- 사용자에게 사이트를 할당하는 기능 추가
	- 사용자 관리 화면에 할당 기능 추가
	- 사이트 권한 분리 기능 추가
		- 할당된 사용자만 접근 제한: soften.security.site.access.restricted
		- 할당된 사이트 외 정보 제한: soften.security.site.read.restricted
			- 현재 적용 정보: 진행 중인 폴더 비교
	- 할당된 첫 사이트의 홈으로 자동 이동
		- 할당되지 않은 사이트의 홈으로 이동 불가
		- 홈에 할당된 사이트를 선택해서 이동할 수 있는 기능 추가
- 로그인 사용자 비밀번호 변경 기능 추가:
	- 변경 팝업 화면 추가 (메인 홈 화면에 버튼 제공)
	- application.properties 설정 추가
		- soften.private.password.rule: 비밀번호 규칙 정규식
		- soften.admin.users.password.rule.apply: 사용자 관리에 정규식 적용 여부
- 설정 추가:
	- soften.site.file: 사이트 정보 저장 데이터 파일 지정
- sites.xml 에 profile 개념 추가: 설정한 profile에 맞는 파일로 적용

**Changes**

- 사이트 관리가 기존의 설정 방식에서 데이터 방식으로 변경됨
	- 파일 변경: 파일명 및 내용 변경 (Updates 항목 참고)
	- 시스템 가동 중에 사이트 변경 가능
	- 별도 "사이트 관리" 화면 제공
- 폴더 비교 결과 정보 저장 방식 변경
	- 기존 한 파일 관리 -> 사이트 별 비교 결과 로그 파일 분리
	- 사이트 내 로그 개수 제한이 넘으면 별도 파일로 분리해서 저장
		- 개수 제한 설정: soften.compare.folder.result.max
	- 폴더 비교 화면에 로그 파일 선택해서 조회하는 기능 추가
- 기타 수정
	- 관리자 화면 일부 UI 수정
	- logback 파일에서 profile 변수처리 삭제 -> 고정: 필요 시 파일명 직접 기입
	- 로컬 개발환경 개선: cmd 에 ini 파일 선택하는 두 번째 매개변수 추가
	- 홈 화면에서 5초 후 자동으로 로컬 파일 비교로 이동하는 기능 제거

**Bugfix**

- 헤더 정보 오류 내용 ALERT 시 + 표시 -> 공백으로 수정
- /loginForm 화면 접근 시 이미 로그인 된 경우 / 로 이동 시 savedRequest 가 없으면 발생하는 오류 해결
- soften-pdf-common.js ajax 관련 함수 개선: 오류 alert 중복되지 않도록 개선
- 폴더 비교 중 Exception 아닌 Error 발생 시 결과 파일에 저장되지 않는 오류 수정 

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.6.2)
- application.yml 파일을 sites.yml 로 변경
	- 파일명 변경: 기존 파일(application.yml 파일은 없어야 함)
	- 파일 내용 수정:
		- 위 4줄 삭제: spring.config.activate.on-profile 내용 삭제
		- name 속성: (필요 시 수정) 일반 이름으로 변경 가능. 화면에 표시되는 명칭 등으로 수정
		- description 속성: (필요 시 수정) 설명이 필요한 경우 속성을 추가해서 입력
- application.properties 속성 추가:
	- soften.security.site.access.restricted: 할당된 사용자만 접근 제한
	- soften.security.site.read.restricted: 할당된 사이트 외 정보 제한
	- soften.compare.folder.result.max: 파일 당 폴더 비교 결과 저장 개수
	- soften.private.password.rule: 비밀번호 규칙 정규식
	- soften.admin.users.password.rule.apply: 사용자 관리에 정규식 적용 여부
	- soften.site.file: 사이트 데이터 파일 설정
- users.json 속성 추가: (필요 시) 데이터 마이그레이션 또는 사이트 관리 화면에서 처리
	- sites 속성: ',' 구분자로 사이트 아이디 열거


## v1.6.1-p2, v1.6.3 ~

**Bugfix**

- 도면이 이동된 페이지들 비교 시, 불특정 페이지 이후의 페이지들 대부분이 비교되지 않는 현상 수정


## v1.6.1-p1, v1.6.2 ~

**Bugfix**

- 일부 PDF 비교 시 하이라이트가 보이지 않는 현상 해결: 페이지 별 별도 레이어에 하이라이트 처리
- 일부 하이라이트 북마크 위치가 다음 페이지 위치에 나오는 현상 해결: 하이라이트 처리 로직 변경


## v1.6.1

**New**

- 로컬 파일 비교 화면에서 선택한 파일을 업로드하여 서버에서 받은 파일의 내용을 조회하는 옵션 기능 추가 (DRM 처리 등 필요 시)
	- 설정: application.yml -> fileUploadViewMode
	- 설정값(모드):
		- Disabled: 해당 기능 사용 안함. 로컬 파일을 브라우저에서 바로 조회
		- Button: 업로드해서 서버의 파일로 조회하는 버튼을 별도 제공
		- Auto: 로컬 파일을 선택하면 자동으로 서버로 업로드하여 조회하는 모드

**Changes**

- 워터마크 비트맵 이미지 제거 사이즈 범위 입력 방식 변경
	- 숫자 범위 입력 -> 표현식 텍스트 입력
	- pixel 면적 범위(min ~ max) -> minWidth,minHeight-maxWidth,maxHeight
	- 사이즈 범위 입력 시 페이지 내 비율로 기입 가능:
		- 표현식의 모든 숫자가 1 이하인 경우 페이지 내 비율로 간주
		- 이 외 픽셀 또는 포인트 단위로 간주

**Bugfix**

- default 이 외의 사이트에서 비교 시 팝업되는 결과 화면에서 발생하는 오류 해결
	- 특정 사이트로 인지하지 않고 default로 인지하여 결과 디렉토리가 다른 경우 결과 파일을 찾지 못해 발생하는 오류

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.6.1)
- application.yml 속성 추가: 사이트 별 옵션 추가
	- fileUploadViewMode: 선택한 로컬 파일을 업로드하여 조회하는 기능 옵션 (기본값: Disabled)
- message_x.properties 변경:
	- main.option.optedToRemoveWatermark.imageSize 및 하위 property 제거
	- main.option.optedToRemoveWatermark.watermarkSizeRangesExpression 및 하위 property 추가
	- main.button.uploadview 버튼 관련 property들 추가


## v1.6.0

**New**

- 시스템 보안 강화
	- CSRF 적용
		- 기본 값: 미적용
		- 설정: application.properties/soften.security.csrf=false
	- HTTP Method 제한: GET, POST 외에 거부 처리
	- Cookie 보안 처리:
		- SameSite=Lax
		- Secure
	- SSL Renegotiation 거부 처리
	- Login Form 자동완성 off 처리
	- 등록된 사이트가 아닌 URL 접근 시 오류 처리: 기존은 default 사이트로 인식

**Changes**

- 메인 홈 변경
	- 각 기능 링크 메뉴 추가: 로컬 파일 비교, 서버 폴더 비교, 파일 사용자 관리, 사용 로그 조회
	- 메인 홈에 사이트 개념 추가: 사이트 별 사용여부 적용됨
	- 로그아웃 버튼 추가
- default 사이트 설정 중 폴더 비교 기능 사용여부 기본값을 false에서 true로 변경
- jQuery Open Source 버전 최신화: 3.7.1

**Bugfix**

- 폴더 비교의 이미지 비교 결과에서 상이한 페이지 리스트 팝업이 간혹 안되는 현상 해결
	- 폴더 결과의 compare id 와 중복이 발생할 수 있는 여지 제거
	- 폴더 결과 정보 파일명 변경(분리): result.soften -> folder-result.soften

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.6.0)
- application.properties: 보안 관련 속성 추가
	- #soften.security.csrf=true: CSRF 적용 여부 (기본값: false - 적용안함)
	- #security.csrf.ignore-urls=/rest/**,/ext/**: CSRF 제외 URL 지정
	- #soften.security.method.deny=DELETE,OPTIONS,PATCH,PUT,TRACE: HTTP Method 제약
- message_x.properties 변경 및 추가
	- root 화면 변경에 따른 하위 properties 변경 및 추가
- 서비스 실행 파일 변경: 보안 관련 renegotiation 제약 처리 - 대상 파일: softenpdf, softenpdf.cmd
- Migration 사항:
	- 폴더 비교 결과 데이터 파일명 변경: result.soften -> folder-result.soften
	주의) 파일 비교 결과 데이터 파일명은 그대로임: result.soften
	폴더 비교 결과 데이터 파일을 동일한 result.soften을 사용하다 파일명을 분리하는 내용


## v1.5.4

**Changes**

- PDFBOX Open Source updated from 2.0.21 to 2.0.32
- 비트맵 이미지 제거 시 null 처리 -> 1픽셀 투명 흰색 png 이미지로 교체 처리

**Bugfix**

- Adobe-Korea1-3 등 존재하지 않는 cmap에 의한 오류 제거
- 원점 이동 검사 시 발생하는 오류 제거 (페이지 크기 차이가 두 배 이상인 경우 발생하는 오류)

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.5.4)


## v1.5.3

**New**

- Rotation 정보가 서로 다른 경우 동일하게 맞춰 주는 옵션 기능 추가
- 페이지 크기가 다른 경우 좌측과 동일하게 맞춰 주는 옵션 기능 추가

**Changes**

- 시스템 시작 시 Java 기본 인코딩을 UTF-8로 지정: 콘솔 인코딩은 변경할 수 있는 설정 추가: log.config.charset.console
- IP 기반 로그인 적용 시 로컬 관리자 로그인 방법 추가
- CompareRequest 클래스를 CompareOptions에 대해 generic 화
- 폴더 비교 시 하나의 공통 request로 비교 호출하는 방식에서 파일 각각 request를 생성해서 요청하는 방식으로 변경
	- Rotation, Scale 조정 후 저장 시 request 객체의 정보를 수정하게 되면서 정보 충돌 발생
- pdf 변환은 텍스트/이미지 비교 전 Workspace에서 파일로 변환 저장한 후 비교 호출
- css, js URL에 SoftenPDF version 파라미터 추가
- useMultiPages 기본 값: false -> true (설정이 없으면 기본으로 사용)
- 리눅스/유닉스 상에서 설정 파일 형식(LF) 변경해 주는 스크립트 추가: init4unix-softenpdf
- 기타 로직 개선

**Bugfix**

- IP 기반 로그인 사용자 role 체크 시 발생하는 오류 해결
- 새로 추가된 비교 요청 속성이 기본 값으로 초기화 되지 않는 오류 해결

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.5.3)
- application.properties:
	- log.config.charset.console: 콘솔 로그 인코딩 변경 설정 (기본값 UTF-8)
- application.yml:
	- 텍스트/이미지 비교 옵션 모두에 추가된 옵션:
		- optedToAdjustRotation: true/false 자동으로 페이지 rotaion 맞추기 옵션 기본값
		- optedToAdjustScale: true/false 자동으로 페이지 사이즈 맞추기 옵션 기본값
- 실행 스크립트 업데이트
	- init4unix-softenpdf: 리눅스에 최초 설치 후 실행
	- softenpdf: file.encoding=UTF-8
	- softenpdf-kill
	- softenpdf-start
	- softenpdf-stop
	- softenpdf.cmd: file.encoding=UTF-8


## v1.5.2

**New**

- 재단영역(CropBox) 설정 옵션 추가: 텍스트/이미지 비교 시 적용
	- 옵션 입력 란에 형식에 맞춰 직접 기입
	- 해당 영역만 잘라 내어 비교
- 비교 제외 영역 설정 옵션 추가: 이미지 비교에만 적용
	- 옵션 입력 란에 형식에 맞춰 직접 기입
	- 해당 영역은 비교 제외
	- ExclusionAbility 를 구현하는 Comparator로 교체해야 함
- join thread timeout 설정 기능 추가: left/right thread join 대기 시간
	- textThreadTimeout: 밀리초
	- imageThreadTimeout: 밀리초
- 텍스트/이미지 비교 옵션 설정 항목을 custom css로 제외시킬 수 있도록 메뉴 ID 구성

**Changes**

- com.softenware.pdf.text.SoftenRectangle 제거
	- com.softenware.pdf.model.SoftenRectangle 로 대체

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.5.2)
- application.yml:
	- (필요 시)Comparator 교체 (com.softenware.pdf.image.SoftenImageBothAxesComparator2WithExclusion)
	- site.textThreadTimeout: 기본 값 60000
	- site.imageThreadTimeout: 기본 값 60000
	- site.cropBoxExpression: 재단 영역 표현식
	- site.defaultImageOpts.excludedAreasExpression: 비교 제외 영역
- message_x.properties: 재단 영역, 비교 제외 영역 옵션
	- main.option.cropBoxExpression
	- main.option.cropBoxExpression.desc
	- main.option.cropBoxExpression.valid
	- main.option.excludedAreasExpression
	- main.option.excludedAreasExpression.desc
	- main.option.excludedAreasExpression.valid


## v1.5.1

**New**

- 일반 Whitespace 외에 공백으로 처리해서 제외 옵션에 포함될 수 있도록 옵션 제공: Whitespace로 간주하도록 정규 표현식을 입력하는 옵션 추가
- 텍스트/이미지 비교 결과 Summary 다운로드 확장성 제공:
	- 다운로드 URL 변경 기능 제공하여 다운로드 기능을 바꿀 수 있도록 구성
	- 엑셀 형식 다운로드 extension 제공: softenpdf-plugin-download-1.0

**Changes**

- 세션체크 및 Ajax 에러처리 개선: Summary 다운로드 전 세션 체크 및 로그인 팝업 처리

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.5.1)
- application.properties:
	- soften.result.download.text: 텍스트 비교 결과 Summary 다운로드 URL 설정 (변수:{compareId} 포함 필수)
	- soften.result.download.image 미미지 비교 결과 Summary 다운로드 URL 설정 (변수:{compareId}, {pageIndex} 포함 필수)
- message 추가: 추가 공백 옵션 관련
	- main.option.additionalWhitespaceExp
	- main.option.additionalWhitespaceExp.desc
	- main.option.additionalWhitespaceExp.valid


## v1.5.0

**New**

- 폴더 간 비교 기능 추가
	- 서버 폴더 간 PDF 파일 비교 요청 기능
	- 폴더 비교 진행/결과 현황
	- 폴더 파일 비교 결과 Summary
	- 사이트 별 폴더 비교 사용여부 옵션화: yml
	- 폴더 비교 thread 최대 개수 설정하는 property 추가
- 사용성 로그 조회 화면 추가
	- 사용성 로그 내용 변경
	- 비교/조회 기준 상세 사용성 로그 추가
	- 사용성 로그 조회 화면 제공
	- 사용성 로그 조회 종류 지정용 property 추가
- OOTB 화면에 custom script 를 삽입하는 확장 기능 추가

**Changes**

- custom css 삽입 방식 구조 개선: 공통 자동 처리화
- commons-io dependency version up: 2.6 to 2.16.1
- build script 일부 개선

**Bugfix**

- Text diff 개수: diff type 전체 수 -> diff pair 개수

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.5.0)
- application.properties:
	- log.config.filename.usage: 사용성 로그 파일명
	- soften.system.logs.read: 사용성 로그 조회 화면에 표시할 타입 지정
	- soften.folder.progressReload.timeout: 폴더 비교 진행현황 새로고침 간격시간(밀리초)
	- soften.custom.script.xx.xx: custom script 삽입
- application.yml:
	- useFolderComparison: 사이트 별 폴더비교 사용여부 true/false
- logback-prod.xml:
	- LOG_FILE_NAME 중복 제거
	- USAGE_LOG_FILE_NAME 추가
- message_x.properties:
	- folder.xxx 추가
	- logs.xxx 추가


## v1.4.4

**New**

- 워터마크 등 비트맵 이미지 제거 후 비교하는 옵션 추가
	- 로컬 비교 옵션에 제거 여부 옵션 추가
	- 제거 설정 시 최소 최대 크기 설정 옵션 추가

**Changes**

- 이미지 비교 결과 info 팝업에 옵션 정보 추가
	- 자동이동 옵션 정보
	- 워터마크 제거 옵션 정보

**Bugfix**

- ext 프로젝트에서 custom*.css 를 수정해도 브라우저 캐쉬 때문에 잘 반영되지 않는 문제 해결 

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.4.4)
- application.yml 옵션 기본값 추가
	- optedToRemoveWatermark: true/false (비트맵 이미지 제거 여부 옵션)
    - minWatermarkSize: 0 (제거할 이미지 최소 크기)
    - maxWatermarkSize: 0 (제거할 이미지 최대 크기)
- 비트맵 이미지 제거 옵션 관련 message 추가됨: 필요 시 수정 반영
	- main.option.optedToRemoveWatermark
	- main.option.optedToRemoveWatermark.desc
	- main.option.optedToRemoveWatermark.imageSize
	- main.option.optedToRemoveWatermark.imageSize.desc
	- main.option.optedToRemoveWatermark.imageSize.min.valid
	- main.option.optedToRemoveWatermark.imageSize.max.valid


## v1.4.3

**New**

- root 메인 홈화면 custom화 기능 제공: soften.custom.page.root property (포워딩 velocity 페이지: custom/template/)

**Changes**

- custom 폴더 구조 변경
	- custom/public: static resource 모두 배치
		- custom/** 에 매핑
		- custom/css/custom.css, custom/css/custom-[site].css
	- custom/template(기존 동일): ExternalCustomView 포워딩 템플릿
	- custom/lib(기존 동일): ext 빌드 jar 및 기타 참조 라이브러리 배치
- soften.image.logo property deprecated: 이전 버전 호환 안됨. 기능 제거
	- css로 구성 -> custom.css 활용
- custom template 파일 확장자 .vm 외에 .html 도 지원
- 시스템 utility REST API에 ROLE_ADMIN 으로 제한
- 기타 시스템 warning 제거

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.4.3)
- custom 폴더 구조 migration 필요
	- css: custom/public/css (custom/css 매핑)
	- images: custom/public/images  (custom/images 매핑)
- 사이트 custom.css 방식 변경: 기존 css/[사이트명]/custom.css 에서 css/custom-[사이트명].css 로 변경
- 회사 로고 방식 변경: soften.image.logo property 삭제 -> custom.css 사용


## v1.4.2

**Changes**

- RESTful API token name 변경: token -> SOFTEN_API_TOKEN (하위 호환으로 token도 사용 가능하지만 deprecated)
	- token name 자체를 변경할 수 있는 설정 추가: soften.token.rest.tokenName
- RESTful API token 전송 방식 추가: 파라미터 외에 cookie 로도 전송 가능
- 커스텀 개발 시 ImageCompareRequest 나 TextCompareRequest 를 상속한 클래스로 요청 정보를 받고 비교할 수 있도록 지원

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.4.2)
- application.properties
	- soften.token.rest.tokenName: 필요 시 REST API token 명을 변경할 수 있는 설정 추가 (기본 값: SOFTEN_API_TOKEN)


## v1.4.1

**New**

- 텍스트 비교 옵션 추가
	- 페이지 자동 조정 옵션: MediaBox가 동일한 경우 CropBox를 동일하게 맞추는 옵션 (텍스트/이미지 각자 옵션에 추가됨)
	- 페이지 외부의 텍스트는 비교에서 제외하는 옵션: CropBox 외부 좌표의 텍스트는 추출 및 하이라이트에서 제외 처리
- 이미지 비교 옵션 추가
	- 페이지 자동 조정 옵션: MediaBox가 동일한 경우 CropBox를 동일하게 맞추는 옵션 (텍스트/이미지 각자 옵션에 추가됨)

**Changes**

- 외부 extension 개발 시 참조할 ext.jar 라이브러리에 image, text 부문 일부 클래스들도 포함
- 세션 만료 재로그인 후 비교화면 Multipart 오류 발생하면 alert 후 창 닫기 처리

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.4.1)
- application.yml 에 옵션 기본 값 파라미터 추가
	- adjustPageBox: true/false
	- defaultTextOpts:
		- excludeTextOutside: true/false
- message properties
	- main.option.adjustPageBox
	- main.option.adjustPageBox.desc
	- main.option.excludeTextOutside
	- main.option.excludeTextOutside.desc
	- error.message.session.expired.retry


## v1.4.0

**New**

- 텍스트 비교 옵션 추가
	- 공백만 추가되거나 삭제된 경우 무시하는 옵션
	- 공백의 종류(유니코드 공백 포함)가 변경된 경우 무시하는 옵션

**Changes**

- Java compatibility 11
- 비교 화면 팝업 시 세션 만료되어 다시 로그인 한 경우 MultipartException 에러 메시지 -> 다시 실행하라는 alert 후 창 닫기 => ★ properties 추가
- Extension project에서 CompareService 등 사용할 수 있도록 develop에 관련 클래스 노출

**Bugfix**

- 텍스트 비교 시 PDF에 쓰기 금지된 경우 해제 처리 후 하이라이트 처리
- extension 용 velocity view 파일 utf-8 지원 (한글깨짐 처리)
- main compare 에서 파일 선택 취소 시 화면 초기화
- 브라우저 업데이트 후 Drag & Drop 으로 이미지 이동이 안되고 기본 Drag & Drop 적용되는 이슈 해결

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.4.0)
- Java bin 위치가 11버전 미만인 경우 softenpdf.ini 에 11이상 버전으로 변경
- message properties 추가:
	- main.option.ignoreOnlyWhitespaceChanges
	- main.option.ignoreOnlyWhitespaceChanges.desc
	- main.option.ignoreDifferentWhitespaceTypes
	- main.option.ignoreDifferentWhitespaceTypes.desc
	- main.option.adjustPageBox
	- main.option.adjustPageBox.desc
	- main.option.excludeTextOutside
	- main.option.excludeTextOutside.desc
	- error.message.session.expired.retry
- application.yml 옵션 디폴트 항목 추가
	- defaultTextOpts:
		- ignoreOnlyWhitespaceChanges: true/false
		- ignoreDifferentWhitespaceTypes: true/false


## v1.3.0

**New**

- 텍스트 비교결과 Summary 기능 추가
- 사용자 관리 화면/기능 추가: 기존 파일 데이터 구조 호환 ★ message 추가

**Changes**

- 사용자 Role 명 변경: ROLE_ADMIN/ROLE_USER ★ 로컬 사용자 파일 변경 필요
- 배포판에 custom 폴더구조, lib, template 폴더 포함
- 라이선스 관련 변경 ★ message 추가

**Bugfix**

- custom.css MIME type 오류 수정

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.3.0)
- 로컬 사용자 파일에서 ROLE 명 변경: ROLE_ADMIN, ROLE_USER
- message 추가


## v1.2.4

**New**

- 수동 Rotation 기능 제공: 비교 전 pdf 선택 화면에서 rotation 후 비교 실행하면 rotation 한 대로 비교하고 결과를 제공

**Changes**

- 기타 업데이트: outline 이동 검출 체크 로직 일부 보완

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.2.4)


## v1.2.3

**New**

- 도면 이동 보정 기능 추가 => ★ properties 추가
- 외부 이벤트 핸들러 extension 제공 (업로드한 파일이 workspace에 저장된 직후 호출되는 이벤트 AfterStorePdfFileEvent 제공)

**Changes**

- log4j 및 기타 오픈소스 보안 취약점 조치
- Extension 개발환경 재구성
	- Extension 개발 환경 별도 제공
	- AfterStorePdfFileEvent
	- extension 화면으로 velocity view 개발 가능하도록 구성 

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.2.3)
- 도면이동보정 관련 message 추가(필요 시 변경):
	- main.option.optedToInspectMoved
	- main.option.optedToInspectMoved.desc
	- main.option.optedToInspectMoved.optedToAdjustApprox
	- main.option.optedToInspectMoved.optedToAdjustApprox.desc
- softenpdf.cmd, softenpdf.ini 내용 변경. 메모리 옵션, lib path를 cmd에서 ini로 이동 (신규 파일에 맞게 기존 내용 적용)
- 필요 시, application.yml 에 옵션 기본 설정 값 추가:
	- optedToInspectMoved: true/false
	- optedToAdjustApprox: true/false


## v1.2.2

**New**

- 터치 이동 기능 추가
- 터치 확대/축소 기능 추가

**Changes**

- 마우스 휠로 확대/축소 시 포인터 위치를 확대/축소 하도록 변경 (기존은 센터 기준)
- 모바일 등 작은 화면에 대응해서 이미지 결과 화면의 툴바에 가로 스크롤바 구성 (터치로 스크롤 가능)
- 토큰 파일 내용 변경 시 자동으로 reload 되도록 변경
- jbig2 이미지 지원

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.2.2)


## v1.2.1

**New**

- Client IP 기반 접근 제한 기능 => ★ properties 추가
- 회사 로고 설정 기능 추가 => ★ properties 추가
- REST API 용 token 기능 추가 => ★ properties 추가

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.2.1)
- application.properties:
 	- soften.access.ip.band=CIDR표기 IP대역(, 구분자)
	- IP 기반 자동 로그인 기능은 문의
	- soften.image.logo=회사로고파일 경로
	- soften.token.rest=토큰관리파일 경로


## v1.2.0

**New**
	- SSL 기능 추가
	- 파일 사용자 기능 추가
	- LDAP 기능 추가
	- SAML SSO 기능 추가

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.2.0)
- message 변경
- properties 추가


## v1.1.8

**New**

- Image Fit 기능 추가 => ★ 메시지 추가
- Auto Zoom 기능 추가 => ★ 메시지 추가
- image viewer 1.2.2로 업데이트 (API 변경: zoom api에 move center 포함됨->호출하는 부분에서 빠짐, animation 보완)

**Updates**

- softenpdf.ini에 어플리케이션 jar 버전 변경(1.1.8)
- 필요 시, application.yml에 defaultAutoZoom 항목을 추가하고 true/false 세팅. (기본값: true)
- 필요 시, message에 "image.autoZoom", "image.button.tooltip.fitImage" 추가/변경


## v1.1.7.210204

**Bugfix**

- rest에서 session 생성 안되도록 수정

**Updates**

- war 교체


## v1.1.7

**New**

- 인증기능 추가. SSO 등 외부 인증 가능하도록 구성. (내부 인증 미지원, 사용자 관리 없음) => ★ 필요 시 설정 추가
- 전체 접근 권한 기능 추가. 외부 DB 확인 기능 (내부 권한 미지원, 권한 관리 없음) => ★ 필요 시 설정 추가
- 커스터마이징/확장 가능 구조 구성 => ★ 필요 시 설정 추가

**Updates**

- 필요 시, 세션 타임아웃 설정
- 사용성 로그 사용 여부 설정 (설정 추가됨): soften.usageLog.use=true
- 인증/권한 사용 여부 설정 (설정 추가됨): soften.auth.use=true
- 필요 시, 특정 url을 인증 예외 설정에 추가: soften.authentication.except
- 필요 시, 외부 로그인폼/SSO체크페이지를 추가: 설정(soften.authentication.loginForm), JSP(custom/jsp/)
- 필요 시, 외부 인증 controller 추가: ext.** 패키지만 지원함
- 필요 시, 권한 체크 쿼리 추가: soften.sql.authority.global
- custom class 추가 시, 실행파일(softenpdf, softenpdf.cmd)에 loader.path 추가: custom/lib (custom/lib에 확장 클래스jar 배포)
- 인증/권한 관련 message 추가: error.noauth.message.title, error.noauth.message.main, error.loginForm.message.title
- softenpdf.ini에 어플리케이션 jar 버전 변경(1.1.7)


## v1.1.6.210126

**New**

- 각 페이지 최상단에 가이드 문구 custom화 기능 => ★ 페이지별 가이드 문구 property
- custom css 기능 추가 => ★ custom css

**Changes**

- forceLogin -> redirect 로 변경
- 이미지 비교결과 화면 툴버튼 순서 변경

**Updates**

- 필요 시, 가이드 문구 추가 (main.pageGuide, image.pageGuide, text.pageGuide)
- 필요 시, custom/ 하위에 사이트 별 custom.css 추가


## v1.1.6.210125

**Changes**

- Summary-DiffNavi-DiffRect 동기화 처리
- Diff 번호 표시
- 강제 로그인 기능 처리 => ★ 로그 쿼리에 accountId 파라미터 추가
- ⓘ 에 비교결과 생성일 및 보존기간 정보 추가 => ★ 메시지 추가 (image.info.created, image.info.retentionDays)

**Updates**

- 필요 시, application.properties 의 soften.sql.logging.access 쿼리에 accountId 파라미터 사용 가능
- 필요 시, 각 언어 custom properties에 image.info.created, image.info.retentionDays 추가
- softenpdf.ini 에 어플리케이션 이름(버전) 변경


## v1.1.5.210120

**New**

- 사용성 로그 기능 추가(파일 및 DB)

**Changes**

- 동적 DB 설정을 위해 PropertiesLauncher 로 구성됨

**Updates**

- 필요 시, application.properties 에 db logging 을 위한 설정 (spring.autoconfigure.exclude 초기화, db 설정, sql 설정)
- 필요 시, custom logback.xml 설정(내부에 UsageLogger 추가됨)
- softenpdf 및 softenpdf.cmd 에  -Dloader.path=WEB-INF/lib,WEB-INF/classes,file:lib 추가
- ini 파일에 버전 변경 softenpdf-server-1.1.5.war


## v1.1.4.210117

**Changes**

- x축, y축 모두 미세이동 적용 알고리즘 추가
- softenpdf-image.jar v1.3.0 적용
- 사이트별 비교 클래스 적용 옵션화 => ★  yml 설정에 "comparator" 설정 추가
- 기타: defaultLocale null처리

**Updates**

- application.yml 내 필요한 사이트에 comparator 추가해서 원하는 클래스 적용


## v1.1.3.210114

**New**

- No Header 오류에 대해 재실행(화면 refresh) 기능 추가

**Updates**

- application.yml 내에 필요한 사이트에 autoReloadOnError 추가


## v1.1.3.210113

**Changes**

- 사용자 언어 변경 로직 보완(resolved가 messageSource와 연관성 없음)
- 파일 저장 전/후 지연시간 설정 옵션 추가

**Updates**

- 필요한 사이트 설정에 delaytimeBeforeStoringFile, delaytimeAfterStoringFile 값 추가 (milliseconds)


## v1.1.3.210112

**New**

- 사용자 언어 변경 UI 추가 (완료) => ★  영문/한글 추가

**Changes**

- 이미지 비교결과 정보 ⓘ에 비교시 적용된 옵션 정보 포함 => 기존 결과 조회 시 해당 정보 없음

**Updates**

- custom message에 "common.language.*" 5개 추가
- en, ko 외에 custom message가 있는 경우 해당 "common.language.*" 추가


## v1.1.3.210111

**New**

- 이미지 비교 옵션 초기화 기능 추가 => ★  영문/한글 추가

**Updates**

- custom message에 "main.reset=초기화" 추가


## v1.1.3.210110

**Changes**

- 이미지 비교 방식 변경: x축 방향 비교 후, y축 방향 비교 추가 (softenpdf-image-1.2.0 적용)
- 사용자 언어 변경 UI 추가 (진행중)

**Updates**

- softenpdf.ini에 app war명 변경


## v1.1.2.210107

**Changes**

- 비교 결과 정보 내용 수정 => ★  영문/한글 수정 및 추가
- REST 호출 시 투명도가 이미지에도 적용되고, 0이 저장되는 오류 해결 => ★ siteConfig 수정 및 추가
- 에러 로그 및 화면에 compare id 정보 추가

**Updates**

- custom message에 "common.word.resolution=해상도" 추가
- custom message에 "image.info.imageInfo=결과 이미지 정보" 추가
- 필요시, custom message에 "image.info.tiles.criteria=타일 적용 조건"으로 수정
- application.yml: site에 "diffImageTransparency: 0.7" 추가
- application.yml: site.defaultOpts에 "diffARGB: 0xffffff00" 처럼 첫 두자리를 "ff"로 수정


## v1.1.2.210104

- 이미지 결과조회 화면 - 이미지 확대/축소 비율 맞춤
- 타일 강제조회도 사용자가 비적용 가능하게 수정
- 비교 결과 정보 조회 아이콘 추가 (타일화 기준 정보 가이드) => ★  영문/한글 추가
- CollectGarbage() 호출


## v1.1.2.201228

- pdfbox 2.0.10 -> 2.0.21
- 라이선스 구성 변경 => ★ 신규 라이선스 파일 필요함
- RESTful API에 멀티페이지 결과를 리스트로 반환
- 타일 버튼 태그 오류(툴팁 안나옴) 수정
- 이미지 비교 결과 화면 툴바 등 UI 일부 보완
- 이미지 비교 결과 화면에서 Diff1 투명도 조절 기능 추가 -> ★ alphaDiff1 값을 Data 클래스에 저장 (기존 결과 데이터와 차이 발생 -> ★ 필요 시 마이그레이션)
- bash shell(softenpdf)에 port를 찾아와서 적용하는 기능 추가(softenpdf-kill 과 동일하게 적용) -> ★ 필요 시 구축한 서버에 softenpdf 파일 적용
- 이미지 타일화 접합부분 어긋남 보완 (타일 사이즈 비율 ceil() 처리-스크립트 수정, 타일 사이즈 균일화(나머지 픽셀 버림)-이미지 비교 라이브러리 수정)
- 타일보기 자동 적용 옵션 추가 => ★ 사용하기 위해서는 사이트 옵션에 "tileAuto" 추가 필요 (예: tileAuto: 11088/83000000)