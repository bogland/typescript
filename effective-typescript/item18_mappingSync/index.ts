interface ScatterProps {
  xs: number[];
  ys: number[];

  xRange: [number, number];
  yRange: [number, number];

  onClick: (x: number, y: number, index: number) => void;
}

// 차트가 정확하지만 너무 많이 렌더됨

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      if (k !== "onClick") {
        return true;
      }
    }
  }
  return false;
}

// 렌더는 적게 되지만, 누락된 경우 발생

function shouldUpdate2(oldProps: ScatterProps, newProps: ScatterProps) {
  return (
    oldProps.xs !== newProps.xs ||
    oldProps.ys !== newProps.ys ||
    oldProps.xRange !== newProps.xRange ||
    oldProps.yRange !== newProps.yRange
  );
}

//타입체커로 업데이트 누락 확인 가능
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  onClick: true,
};

function shouldUpdate3(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
  return false;
}

// 배열을 사용한 경우
const PROPS_REQUIREING_UPDATE: (keyof ScatterProps)[] = [
  "xs",
  "ys",
  "xRange",
  "yRange",
];

function shouldUpdate4(oldProps: ScatterProps, newProps: ScatterProps) {
  return PROPS_REQUIREING_UPDATE.some((k) => oldProps[k] !== newProps[k]);
}
