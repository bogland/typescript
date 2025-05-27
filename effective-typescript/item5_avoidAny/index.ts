let age: number = 20;
age = "20" as any;

age += 1;

function calculateAge(birthDate: Date): number {
  return 20;
}

let birthDate: any = "1990-01-19";
calculateAge(birthDate); // 에러가 안남

interface Person {
  firstName: string;
  lastName2: string;
}

const person: Person = {
  firstName: "John",
  lastName2: "Doe",
};
const formatName = (p: Person) => `${p.firstName} ${p.lastName2}`;
const formatNameAny = (p: any) => `${p.firstName} ${p.lastName}`;

interface ComponentProps {
  onSelectItem: (item: any) => void;
}

function renderSelector(props: ComponentProps) {}
let selectedId: number = 0;

function handleSelectItem(item: any) {
  selectedId = item.id; // item이 any타입이라 id를 뽑아도 에러가 안나지만 runtime 에서 에러남
}

renderSelector({ onSelectItem: handleSelectItem });

interface ComponentProps2 {
  onSelectItem: (id: number) => void;
}
