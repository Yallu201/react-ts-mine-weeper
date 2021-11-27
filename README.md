# 지뢰찾기

[Github page 배포 링크](https://yallu201.github.io/react-ts-mine-weeper/)

## 게임의 룰

#### 1. 난이도 선택

- 초급: `9` x `9`, `지뢰` 10개
- 중급: `16` x `16`, `지뢰` 40개
- 고급: `29` x `15`, `지뢰` 99개
- 커스텀: `Max 80` x `Max 80`, 최대 999개 `지뢰`

#### 2. 게임 시작

- 하단의 `cell`에 클릭 시 게임을 시작합니다.
- 타이머작동하며 **소요된 시간이 우측 상단에 표시됩니다.**
- 단, 첫번째로 클릭한 `cell` 은 지뢰가 없습니다.
- 지뢰는 랜덤으로 배치됩니다.

#### 3. 게임 중

- `cell`에 입력된 숫자는 주변 `지뢰`의 갯수 입니다.
- 마우스 우측 클릭 시 `cell`에 깃발로 **지뢰를 표시할 수 있습니다**.
- `cell`에 입력된 숫자 주변에 모든 지뢰를 표시했다면, 마우스 좌측, 우측을 동시에 클릭 시 **지뢰가 없는 `cell`을 모두 공개합니다**.

#### 3.1 종료(지뢰 선택 시)

- **모든 지뢰의 위치에 지뢰 아이콘을 표시**하며 `cell`을 클릭해도 반응하지 않습니다.
- 초기화 버튼을 클릭하여 게임을 다시 시도할 수 있습니다.

#### 3.2 종료(지뢰를 제외한 모든 `cell` 공개)

- **모든 지뢰의 위치에 깃발을 표시**하며 `cell`을 클릭해도 반응하지 않습니다.
- 초기화 버튼을 클릭하여 게임을 다시 시도할 수 있습니다.

## 구성요소

### 1. 상단 헤더

- 남은 지뢰 개수 표시
- 게임 리셋 버튼
- 게임 시작 후 소요 시간 표시(단위: 초)

### 2. 하단 `cell` 영역

- 게임 시작 전, 모든 `cell`은 비공개 상태
- 첫 클릭 시, 모든 `cell`의 상태가 결정  
  (단, 첫 클릭 `cell`은 지뢰가 아님)

## 사용 모듈 정리

```json
  "react": "^17.0.2",
  "typescript": "^4.1.2",
  "mobx": "^6.3.7",
  "mobx-react": "^7.2.1",
```
