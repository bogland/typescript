- 타입을 선언하면 해당 함수에 대해서 더 추론가능
- d.ts 파일 처럼 굳이 타입만 빼야할까?
  구현부와 분리하여 타입 추론에 더 용이
- global.d.ts로 전역적인 선언도 가능

```
// global.d.ts
declare global {
  interface Window {
    myAppVersion: string;
  }
}
```

- 외부 js 라이브러리에 타입 부여도 가능

```
// legacyLib.d.ts
declare module 'legacy-lib' {
  export function init(config: { debug: boolean }): void;
}
```
